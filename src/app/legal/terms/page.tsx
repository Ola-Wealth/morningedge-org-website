import type { Metadata } from "next";
import { LegalDoc } from "@/components/LegalDoc";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "The terms that govern use of the MorningEdge website. Provided for transparency and subject to legal review.",
  alternates: { canonical: `${site.url}/legal/terms` },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <LegalDoc eyebrow="Legal" title="Terms of Use" updated="19 September 2026">
      <p>
        These terms govern your use of this website, operated by {site.legalName} ({site.rc}), trading as
        MorningEdge. By using the site, you accept them. They are provided for transparency and should be
        reviewed by legal counsel before you rely on them. They do not govern any engagement we enter
        with you, which is set out in a separate signed agreement.
      </p>

      <h2>Using this site</h2>
      <p>
        You may read, share, and reference the content here for your own business purposes. You may not
        copy it wholesale, present it as your own, or use it to build a competing offer. You agree not to
        interfere with the site, probe it for vulnerabilities, or use it in any way that breaks Nigerian
        law.
      </p>

      <h2>The information here is general</h2>
      <p>
        The content on this site describes what we do. It is not advice for your specific situation, and
        reading it does not create a client relationship. Any figures, timelines, and service shapes are
        indicative. What we would actually commit to appears only in a written proposal and a signed
        agreement.
      </p>

      <h2>Enquiries are not engagements</h2>
      <p>
        Submitting the contact form starts a conversation. It does not oblige us to take on the work, and
        it does not oblige you to proceed. Not every enquiry becomes an engagement, and we will say so
        plainly when it is not a fit.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The name MorningEdge, the content, and the design of this site belong to us. Third-party names we
        reference, such as ERPNext, Microsoft 365 Copilot, and Frappe, belong to their respective owners
        and are used only to describe our work.
      </p>

      <h2>No warranty, and limits on liability</h2>
      <p>
        The site is provided as is. We work to keep it accurate and available, but we do not warrant that
        it will be error-free or uninterrupted. To the extent Nigerian law allows, we are not liable for
        loss arising from your use of, or reliance on, this website. Nothing here limits liability that
        cannot be limited by law.
      </p>

      <h2>Links to other sites</h2>
      <p>
        Where we link out, including to the AI Edge cohort site, we do so for convenience. We are not
        responsible for the content or practices of sites we do not control.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of the Federal Republic of Nigeria, and the courts of Lagos
        State have jurisdiction over any dispute arising from them.
      </p>

      <h2>Changes and contact</h2>
      <p>
        We may update these terms. The date at the top shows the current version. For any question about
        them, email <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </LegalDoc>
  );
}
