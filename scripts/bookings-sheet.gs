/**
 * MorningEdge bookings log.
 *
 * A separate Google Sheet from the contact-form one. It records every
 * consultation request: who booked, when the session runs, the payment
 * reference they must quote on their transfer, and whether it has been paid.
 *
 * The meeting link column is filled in by hand once the transfer is
 * confirmed and the meeting has been created.
 *
 * SETUP
 *  1. Create a new Google Sheet. Name the first tab "Bookings".
 *  2. Extensions > Apps Script. Delete the sample code, paste this file in.
 *  3. Set NOTIFY_EMAIL below if you want a copy by mail on every booking.
 *  4. Deploy > New deployment > type "Web app".
 *       Execute as:      Me
 *       Who has access:  Anyone
 *     "Anyone" is required because the website calls this from its server.
 *     The URL is unguessable and the script only accepts the two actions
 *     below, but treat the URL itself as a secret.
 *  5. Copy the deployment URL into Vercel as BOOKINGS_SHEET_WEBHOOK_URL.
 *  6. Re-deploy (Manage deployments > edit > Version: New version) after any
 *     change to this file, or the old code keeps running.
 *
 * The script is idempotent on the payment reference: if the same reference
 * arrives twice, the first row stands and nothing is duplicated.
 */

var SHEET_NAME = 'Bookings';
var NOTIFY_EMAIL = '';   // e.g. 'hello@morningedgesystems.com'. Leave empty for no mail.

var HEADERS = [
  'Recorded at',
  'Session date',
  'Session time (WAT)',
  'Name',
  'Email',
  'Firm',
  'Role',
  'Who joins',
  'Their roles',
  'Format',
  'Amount (NGN)',
  'Payment reference',
  'Payment status',
  'Meeting link sent',
  'What they want to work through',
  'What should be true afterwards'
];

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    // Serialises concurrent calls so two requests cannot both append.
    lock.waitLock(20000);
  } catch (err) {
    return json({ result: 'error', error: 'busy' });
  }

  try {
    var body = {};
    if (e && e.postData && e.postData.contents) {
      body = JSON.parse(e.postData.contents);
    }

    var action = String(body.action || 'record');
    var reference = String(body.reference || '').trim();
    if (!reference) return json({ result: 'error', error: 'missing reference' });

    var sheet = getSheet();
    var found = findByReference(sheet, reference);

    if (action === 'lookup') {
      return json(found ? { result: 'success', found: true, row: found } : { result: 'success', found: false });
    }

    if (action === 'confirm') {
      if (!found) return json({ result: 'error', error: 'not found' });
      sheet.getRange(found.rowNumber, STATUS_COLUMN).setValue('Paid');
      if (body.joinUrl) {
        sheet.getRange(found.rowNumber, LINK_COLUMN).setValue(String(body.joinUrl));
      }
      return json({ result: 'success', row: found });
    }

    if (action !== 'record') {
      return json({ result: 'error', error: 'unknown action' });
    }

    // Already there: report success without writing a second row.
    if (found) {
      return json({ result: 'success', duplicate: true, row: found });
    }

    sheet.appendRow([
      new Date(),
      body.date || '',
      body.time || '',
      body.name || '',
      body.email || '',
      body.company || '',
      body.role || '',
      body.attendees || '',
      body.attendeeRoles || '',
      body.format || '',
      body.amountNaira || '',
      reference,
      body.status || 'Awaiting payment',
      '',
      body.reason || '',
      body.outcome || ''
    ]);

    if (NOTIFY_EMAIL) {
      notify(body, reference);
    }

    return json({ result: 'success' });
  } catch (err) {
    return json({ result: 'error', error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

/** Health check in a browser. */
function doGet() {
  return json({ result: 'success', service: 'MorningEdge bookings log' });
}

function getSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

var REFERENCE_COLUMN = 12; // "Payment reference"
var STATUS_COLUMN = 13;    // "Payment status"
var LINK_COLUMN = 14;      // "Meeting link sent"

function findByReference(sheet, reference) {
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return null;

  var refs = sheet.getRange(2, REFERENCE_COLUMN, lastRow - 1, 1).getValues();
  for (var i = 0; i < refs.length; i++) {
    if (String(refs[i][0]).trim() === reference) {
      var values = sheet.getRange(i + 2, 1, 1, HEADERS.length).getValues()[0];
      return {
        rowNumber: i + 2,
        date: String(values[1]),
        time: String(values[2]),
        name: String(values[3]),
        email: String(values[4]),
        company: String(values[5]),
        role: String(values[6]),
        reference: String(values[11]),
        status: String(values[12]),
        joinUrl: String(values[13])
      };
    }
  }
  return null;
}

function notify(body, reference) {
  var lines = [
    'Consultation slot requested. Payment not yet confirmed.',
    '',
    'When:      ' + (body.date || '') + ' at ' + (body.time || '') + ' WAT',
    'Who:       ' + (body.name || '') + (body.role ? ', ' + body.role : ''),
    'Firm:      ' + (body.company || ''),
    'Email:     ' + (body.email || ''),
    'Joining:   ' + (body.attendees || 'Not provided'),
    'Format:    ' + (body.format || 'Not provided'),
    'Amount:    NGN ' + (body.amountNaira || ''),
    'Reference: ' + reference,
    '',
    'Status:    ' + (body.status || 'Awaiting payment'),
    '',
    'Next: confirm the transfer, create the meeting, send the link, then set',
    'Payment status to Paid on the row.',
    '',
    'What they want to work through:',
    body.reason || '',
    '',
    'What should be true afterwards:',
    body.outcome || 'Not provided'
  ].join('\n');

  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    subject: 'Consultation booked: ' + (body.name || 'Unknown') + ' on ' + (body.date || ''),
    body: lines
  });
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
