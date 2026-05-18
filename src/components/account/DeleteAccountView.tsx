import Link from "next/link";
import { MarketingPageShell } from "@/components/landing/MarketingPageShell";
import shell from "@/components/landing/marketing-shell.module.css";
import { DeleteAccountForm } from "./DeleteAccountForm";

const SUPPORT_EMAIL = "hello@mynella.com";

export function DeleteAccountView() {
  return (
    <MarketingPageShell activeNav="delete-account">
      <section className={shell.pageHero} aria-labelledby="delete-account-heading">
        <div className={shell.pageHeroInner}>
          <p className={shell.eyebrow}>Nella app</p>
          <h1 id="delete-account-heading" className={shell.pageTitle}>
            Delete your <em>Nella</em> account
          </h1>
          <p className={shell.pageLead}>
            Use this page to request deletion of your <strong>Nella</strong> companion app account and the
            personal data tied to it. You do not need the app installed to submit a request here.
          </p>
        </div>
      </section>

      <section className={shell.section} aria-labelledby="delete-how-heading">
        <div className={shell.sectionInner}>
          <h2 id="delete-how-heading" className={shell.sectionTitle}>
            How to request deletion
          </h2>
          <p className={shell.body}>
            Fill out the form below with the email you use to sign in to Nella. We will verify your request
            and delete your account and associated app data within <strong>30 days</strong>, unless a longer
            period is required by law. We will email you when deletion is complete.
          </p>
          <p className={shell.body}>
            You can also email us at{" "}
            <a href={`mailto:${SUPPORT_EMAIL}?subject=Nella%20account%20deletion%20request`}>
              {SUPPORT_EMAIL}
            </a>{" "}
            with the subject line &ldquo;Nella account deletion request.&rdquo;
          </p>
          <DeleteAccountForm />
        </div>
      </section>

      <section className={`${shell.section} ${shell.sectionMuted}`} aria-labelledby="delete-data-heading">
        <div className={shell.sectionInner}>
          <h2 id="delete-data-heading" className={shell.sectionTitle}>
            What we delete
          </h2>
          <ul className={shell.list}>
            <li>Your Nella app account profile and sign-in credentials</li>
            <li>Treatment visits, reminders, and aftercare notes you stored in the app</li>
            <li>Preferences and in-app settings linked to your account</li>
            <li>Device tokens used for push notifications tied to your account</li>
          </ul>
          <p className={shell.body}>
            If you joined the MyNella waitlist with the same email, that is separate from your app account.
            Mention it in the form if you want waitlist data removed too.
          </p>
        </div>
      </section>

      <section className={shell.section} aria-labelledby="delete-keep-heading">
        <div className={shell.sectionInner}>
          <h2 id="delete-keep-heading" className={shell.sectionTitle}>
            What we may keep
          </h2>
          <p className={shell.body}>
            We may retain limited information where required for fraud prevention, security, dispute
            resolution, or legal compliance. Details are in our{" "}
            <Link href="/privacy">Privacy Policy</Link>.
          </p>
        </div>
      </section>

      <section className={`${shell.section} ${shell.sectionMuted}`} aria-labelledby="delete-faq-heading">
        <div className={shell.sectionInner}>
          <h2 id="delete-faq-heading" className={shell.sectionTitle}>
            Common questions
          </h2>
          <dl className={shell.faqList}>
            <div className={shell.faqItem}>
              <dt className={shell.faqQ}>Can I delete my account inside the app?</dt>
              <dd className={shell.faqA}>
                When available, you can start deletion from Nella account settings. This web page is for
                everyone — including people who already uninstalled the app.
              </dd>
            </div>
            <div className={shell.faqItem}>
              <dt className={shell.faqQ}>Do I need to cancel anything else?</dt>
              <dd className={shell.faqA}>
                Nella is in development. If you have an active subscription through Google Play in a future
                release, cancel it in Play Store subscriptions before or after requesting deletion so billing
                stops.
              </dd>
            </div>
            <div className={shell.faqItem}>
              <dt className={shell.faqQ}>How do I contact support?</dt>
              <dd className={shell.faqA}>
                For questions about this process, use our <Link href="/contact">Contact page</Link> or email{" "}
                {SUPPORT_EMAIL}.
              </dd>
            </div>
          </dl>
        </div>
      </section>
    </MarketingPageShell>
  );
}
