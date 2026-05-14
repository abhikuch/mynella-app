"use client";

import { useState, useTransition, type FormEvent } from "react";
import { submitLead } from "@/actions/submitLead";
import {
  MAX_EMAIL_LEN,
  MAX_PHONE_INPUT_LEN,
  validateNewsletterFormData,
} from "@/lib/form-validation";
import { INDIA_MOBILE_HELP } from "@/lib/phone-india";
import styles from "./leadCapture.module.css";

type Props = {
  privacyHref: string;
  title?: string;
  /** Wide footer: two-column field row + full-width hint below (symmetrical). */
  layout?: "default" | "footerBand";
  /** `aria-labelledby` target for the surrounding section. */
  titleId?: string;
};

export function NewsletterForm({
  privacyHref,
  title = "Stay in the loop",
  layout = "default",
  titleId,
}: Props) {
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [pending, startTransition] = useTransition();
  const isBand = layout === "footerBand";

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const clientErr = validateNewsletterFormData(fd);
    if (clientErr) {
      setError(clientErr);
      return;
    }
    startTransition(async () => {
      const r = await submitLead(fd);
      if (r.ok) {
        setDone(true);
        form.reset();
      } else {
        setError(r.error);
      }
    });
  }

  const rootClass = isBand ? `${styles.newsletterRoot} ${styles.newsletterRootBand}` : styles.newsletterRoot;

  return (
    <div className={rootClass}>
      {isBand ? (
        <h2 id={titleId} className={styles.bandTitle}>
          {title}
        </h2>
      ) : (
        <h5 className={styles.blockTitle}>{title}</h5>
      )}
      {done ? (
        <p className={styles.success} role="status">
          You&apos;re on the list. We&apos;ll be in touch when we have something worth your time.
        </p>
      ) : (
        <>
          {!isBand ? (
            <p className={styles.intro}>
              Occasional updates on launches, editorial drops, and Nella app news — no spam. Email and mobile are both
              required so we can reach you reliably.
            </p>
          ) : null}
          <form className={isBand ? `${styles.form} ${styles.formBand}` : styles.form} onSubmit={onSubmit} noValidate>
            <input type="hidden" name="source" value="footer" />
            <label className={styles.honeypot} htmlFor="footer-lead-website">
              Website
            </label>
            <input
              className={styles.honeypot}
              id="footer-lead-website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
            {isBand ? (
              <div className={styles.bandFieldGrid}>
                <label className={styles.field}>
                  <span className={styles.label}>Email address</span>
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    maxLength={MAX_EMAIL_LEN}
                    className={styles.input}
                    placeholder="you@example.com"
                  />
                </label>
                <label className={styles.field}>
                  <span className={styles.label}>Mobile number</span>
                  <input
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    inputMode="numeric"
                    required
                    maxLength={MAX_PHONE_INPUT_LEN}
                    className={styles.input}
                    placeholder="+91 98765 43210"
                    aria-describedby="footer-band-phone-hint"
                  />
                </label>
                <p id="footer-band-phone-hint" className={styles.bandHint}>
                  {INDIA_MOBILE_HELP}
                </p>
              </div>
            ) : (
              <div className={styles.fieldPair}>
                <label className={styles.field}>
                  <span className={styles.label}>Email</span>
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    maxLength={MAX_EMAIL_LEN}
                    className={styles.input}
                    placeholder="you@example.com"
                  />
                </label>
                <label className={styles.field}>
                  <span className={styles.label}>Mobile</span>
                  <input
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    inputMode="numeric"
                    required
                    maxLength={MAX_PHONE_INPUT_LEN}
                    className={styles.input}
                    placeholder="+91 98765 43210"
                    aria-describedby="footer-phone-hint"
                  />
                  <span id="footer-phone-hint" className={styles.fieldHint}>
                    {INDIA_MOBILE_HELP}
                  </span>
                </label>
              </div>
            )}
            <label className={styles.consent}>
              <input name="consent" type="checkbox" required />
              <span>
                I agree to be contacted about MyNella updates and accept the{" "}
                <a href={privacyHref} target="_blank" rel="noopener noreferrer">
                  Privacy Policy
                </a>
                .
              </span>
            </label>
            {error ? (
              <p className={styles.error} role="alert">
                {error}
              </p>
            ) : null}
            <button
              type="submit"
              className={isBand ? `${styles.submit} ${styles.submitBand}` : styles.submit}
              disabled={pending}
            >
              {pending ? "Sending…" : "Subscribe"}
            </button>
          </form>
        </>
      )}
    </div>
  );
}
