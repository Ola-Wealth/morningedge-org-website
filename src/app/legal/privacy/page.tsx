import type { Metadata } from "next";
import { LegalDoc } from "@/components/LegalDoc";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description:
    "How MorningEdge collects, uses, and protects personal data, in line with the Nigeria Data Protection Act 2023 (NDPA).",
  alternates: { canonical: `${site.url}/legal/privacy` },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <LegalDoc eyebrow="Legal" title="Privacy Notice" updated="19 September 2026">
      <p>
        This notice explains how {site.legalName} ({site.rc}), trading as MorningEdge, collects and
        handles personal data through this website. It is written in line with the Nigeria Data
        Protection Act 2023 (NDPA). It is provided for transparency and should be reviewed by legal
        counsel before you rely on it.
      </p>

      <h2>Who we are</h2>
      <p>
        MorningEdge is a business operations firm based in Lagos, Nigeria. For the purposes of the NDPA,
        we are the data controller for the personal data described here. Our registered office is{" "}
        {site.registeredOffice}. You can reach us at{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>

      <h2>What we collect</h2>
      <p>We collect only what you give us through the contact form, and nothing more. That is:</p>
      <ul>
        <li>Your name, work email, company, and role.</li>
        <li>The size of your company, its number of entities, and the systems it currently uses.</li>
        <li>Which service you are enquiring about, and a description of what you are trying to fix.</li>
      </ul>
      <p>
        We do not run advertising trackers, and we do not build a profile of you across other sites. The
        site does not set marketing cookies.
      </p>

      <h2>Why we use it, and our lawful basis</h2>
      <p>
        We use this data for one purpose: to respond to your enquiry and, where there is a fit, to scope
        an engagement. Our lawful basis is your consent when you submit the form, and our legitimate
        interest in responding to a business enquiry you started. We do not sell your data, and we do not
        use it for automated decision-making.
      </p>

      <h2>Who processes it on our behalf</h2>
      <p>
        Your submission is stored and routed through a small number of processors, each used only to
        deliver the service above:
      </p>
      <ul>
        <li>Vercel, which hosts this website and runs the form endpoint.</li>
        <li>Google Workspace, which records the enquiry and delivers the notification to our inbox.</li>
      </ul>
      <p>
        These processors may store data outside Nigeria. Where they do, we rely on their contractual and
        technical safeguards for that transfer.
      </p>

      <h2>How long we keep it</h2>
      <p>
        We keep enquiry data only as long as needed to respond and, where an engagement follows, for the
        life of that engagement and any period we are required to retain records afterwards. If no
        engagement follows, we remove it on request, or during routine review.
      </p>

      <h2>Your rights</h2>
      <p>Under the NDPA you have the right to:</p>
      <ul>
        <li>Ask what personal data we hold about you, and get a copy.</li>
        <li>Ask us to correct data that is wrong, or complete data that is incomplete.</li>
        <li>Ask us to delete your data where there is no lawful reason to keep it.</li>
        <li>Withdraw consent at any time, and object to our use of your data.</li>
        <li>Lodge a complaint with the Nigeria Data Protection Commission.</li>
      </ul>
      <p>
        To exercise any of these, email <a href={`mailto:${site.email}`}>{site.email}</a>. We will respond
        within the timeframe the NDPA requires.
      </p>

      <h2>Changes to this notice</h2>
      <p>
        We update this notice when our practice changes. The date at the top shows the current version.
      </p>
    </LegalDoc>
  );
}
