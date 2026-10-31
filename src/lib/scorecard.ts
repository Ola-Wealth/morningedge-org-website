/**
 * The Copilot Adoption Scorecard. Shared by the page and the API route, so the
 * server recomputes the score from the raw answers rather than trusting the
 * browser's arithmetic.
 *
 * Twelve questions, three per area, each option worth 0 to 3. Maximum 36.
 * Licensing wording follows the canonical position: Copilot is present in the
 * apps on the included tier (shallower, capped); paid licences are full strength.
 */

export const AREAS = ["Access", "Use", "Safety", "Measurement"] as const;

export type Question = { area: number; q: string; options: [string, number][] };

export const QUESTIONS: Question[] = [
  { area: 0, q: "Which Microsoft 365 setup does your organisation have?", options: [
    ["We are not sure", 0],
    ["Microsoft 365, but nobody has checked what Copilot it includes", 1],
    ["The included Copilot in Word, Excel and Outlook", 2],
    ["Paid Microsoft 365 Copilot licences for some or all staff", 3],
  ] },
  { area: 0, q: "How many of your staff know Copilot is already inside Word, Excel, Outlook and Teams?", options: [
    ["Almost none", 0], ["A few early adopters", 1], ["About half", 2], ["Most of them", 3],
  ] },
  { area: 0, q: "Has anyone shown your team how to use it on their own work?", options: [
    ["No", 0], ["A general demo or a video", 1], ["A one-off training session", 2],
    ["Training built around our function, with follow-up", 3],
  ] },
  { area: 1, q: "In a normal week, what share of your team uses Copilot or any AI on real work?", options: [
    ["Under 10%", 0], ["10% to 25%", 1], ["25% to 50%", 2], ["Over 50%", 3],
  ] },
  { area: 1, q: "Where does that use happen?", options: [
    ["It mostly does not happen", 0], ["In a chat window, as a question-and-answer tool", 1],
    ["Inside one app, usually Outlook or Word", 2], ["Across several apps, as part of daily work", 3],
  ] },
  { area: 1, q: "Can you name one recurring task in your function where AI now produces the first draft?", options: [
    ["No", 0], ["One person does it as a personal habit", 1],
    ["One team process runs this way", 2], ["Several processes, written down", 3],
  ] },
  { area: 2, q: "When your staff use AI on work, which tool do they use?", options: [
    ["I do not know", 0], ["Mostly personal accounts such as free ChatGPT", 0],
    ["A mix of personal and work tools", 1], ["Mostly Copilot, signed in with their work account", 3],
  ] },
  { area: 2, q: "Is there a written policy on what information may go into which AI tool?", options: [
    ["No", 0], ["Being drafted", 1], ["It exists, and few people have read it", 2],
    ["It exists, covers the NDPA 2023, and staff have been taken through it", 3],
  ] },
  { area: 2, q: "Before AI-assisted work leaves your department, is there a defined human check?", options: [
    ["No", 0], ["Informally, depending on the person", 1],
    ["For some outputs", 2], ["Yes, defined for every output type", 3],
  ] },
  { area: 3, q: "Do you know how many of your staff used Copilot last month?", options: [
    ["No", 0], ["A rough guess", 1], ["IT could pull the figure if asked", 2], ["We review it regularly", 3],
  ] },
  { area: 3, q: "Who owns AI adoption in your organisation?", options: [
    ["Nobody", 0], ["IT, by default", 1], ["A committee or working group", 2], ["A named person with a usage target", 3],
  ] },
  { area: 3, q: "Have you measured time saved on any process?", options: [
    ["No", 0], ["We have anecdotes", 1], ["One process has been measured", 2],
    ["We have a baseline and track it", 3],
  ] },
];

export type Band = { max: number; name: string; tone: "risk" | "warn" | "navy" | "good"; text: string; cost: string };

export const BANDS: Band[] = [
  { max: 12, name: "Licence on the shelf", tone: "risk",
    text: "Your organisation is paying for capability that very few people have opened. Where AI is being used, it is likely happening in personal tools, outside your view and outside your data protections.",
    cost: "The cost sits in two places: hours your team spends on work the tool could draft, and client or staff data moving through accounts you do not control." },
  { max: 21, name: "Pockets of use", tone: "warn",
    text: "A handful of people have found the tool and use it well. Their results stay with them. Nobody else learns the method, and nobody can say what it is worth.",
    cost: "Each strong user is a working example your other staff never see. The distance between your best user and your average user is capacity left on the desk." },
  { max: 29, name: "Used, not yet measured", tone: "navy",
    text: "AI is part of how work gets done in your team. What is missing is a number: a baseline, an owner and a target. Without them, adoption drifts back once the first enthusiasm fades.",
    cost: "Unmeasured adoption is hard to defend at budget time and easy to lose when a key user moves on." },
  { max: 36, name: "Adoption in motion", tone: "good",
    text: "You have access, real use, safeguards and a measure. The next gains come from moving AI from assisting a person to carrying whole processes.",
    cost: "The opportunity now is depth: the processes where AI can run end to end with a human check, inside your systems." },
];

export const WEAKEST_ACTION = [
  "Access is your weakest area. Your staff cannot use what nobody has shown them. Confirm what your licence includes, then show one team how it works on their own documents.",
  "Use is your weakest area. The tool is available and sits idle. Pick one recurring task in one team and make AI the first draft for it, every time, for 30 days.",
  "Safety is your weakest area, and it carries the most risk. Write down which information may go into which tool, move people onto their work accounts, and define the human check before anything leaves the department.",
  "Measurement is your weakest area. Name an owner, ask IT for last month's usage figure, and time one process before and after. Without a baseline, nobody can say whether any of this worked.",
];

export const ROLES = [
  { value: "exec", label: "MD, CEO or executive director" },
  { value: "head", label: "Head of a function or department" },
  { value: "hr", label: "HR, L&D or People lead" },
  { value: "it", label: "IT or Technology" },
  { value: "ic", label: "Individual professional" },
];

export const SIZES = [
  { value: "1", label: "Fewer than 20" },
  { value: "2", label: "20 to 99" },
  { value: "3", label: "100 to 499" },
  { value: "4", label: "500 or more" },
];

export type Result = {
  total: number;
  areas: number[];
  band: Band;
  weakest: number;
};

/** Returns null when the answers are malformed. */
export function score(answers: unknown): Result | null {
  if (!Array.isArray(answers) || answers.length !== QUESTIONS.length) return null;
  const areas = [0, 0, 0, 0];
  for (let k = 0; k < QUESTIONS.length; k++) {
    const a = answers[k];
    if (!Number.isInteger(a) || a < 0 || a >= QUESTIONS[k].options.length) return null;
    areas[QUESTIONS[k].area] += QUESTIONS[k].options[a][1];
  }
  const total = areas.reduce((x, y) => x + y, 0);
  const band = BANDS.find((b) => total <= b.max) ?? BANDS[BANDS.length - 1];
  const weakest = areas.indexOf(Math.min(...areas));
  return { total, areas, band, weakest };
}

/** About 173 working hours in a month; 4.33 weeks in a month. */
export function capacity(staff: number, salary: number, hoursPerWeek: number) {
  const monthlyHours = staff * hoursPerWeek * 4.33;
  const hourlyCost = salary / 173;
  return { monthlyHours, hourlyCost, monthlyValue: monthlyHours * hourlyCost };
}

export function formatNaira(n: number) {
  return "₦" + Math.round(n).toLocaleString("en-NG");
}

/** Function heads, HR and executives at 20+ staff are routed to The Room. */
export function qualifiesForRoom(role: string, size: string) {
  return ["exec", "head", "hr"].includes(role) && Number(size) >= 2;
}
