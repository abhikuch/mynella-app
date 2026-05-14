"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition, type FormEvent, type ReactNode } from "react";
import { submitLead } from "@/actions/submitLead";
import {
  MAX_EMAIL_LEN,
  MAX_PHONE_INPUT_LEN,
  validateNewsletterFormData,
} from "@/lib/form-validation";
import { INDIA_MOBILE_HELP } from "@/lib/phone-india";
import styles from "./leadCapture.module.css";

type Props = {
  initialHasAccess: boolean;
  privacyHref: string;
  children: ReactNode;
};

export function BlogLeadGate({ initialHasAccess, privacyHref, children }: Props) {
  const router = useRouter();
  const [unlocked, setUnlocked] = useState(initialHasAccess);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    if (initialHasAccess) setUnlocked(true);
  }, [initialHasAccess]);

  if (unlocked) {
    return <>{children}</>;
  }

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
        setUnlocked(true);
        router.refresh();
      } else {
        setError(r.error);
      }
    });
  }

  return (
    <div className={styles.gateRoot}>
      <div className={styles.dimmed} aria-hidden="true">
        {children}
      </div>
      <div className={styles.backdrop} role="presentation">
        <div
          className={styles.dialog}
          role="dialog"
          aria-modal="true"
          aria-labelledby="blog-gate-title"
        >
          <h2 id="blog-gate-title" className={styles.dialogTitle}>
            Read the full piece
          </h2>
          <p className={styles.dialogLead}>
            We ask for your email and Indian mobile number so we can follow up with context that
            matters—research, regulatory updates, and invitations when relevant. Both fields are
            required. We won&apos;t misuse your details; see our privacy policy below.
          </p>
          <form className={styles.form} onSubmit={onSubmit} noValidate>
            <input type="hidden" name="source" value="blog" />
            <label className={styles.honeypot} htmlFor="blog-lead-website">
              Website
            </label>
            <input
              className={styles.honeypot}
              id="blog-lead-website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
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
                  aria-describedby="gate-phone-hint"
                />
                <span id="gate-phone-hint" className={styles.fieldHint}>
                  {INDIA_MOBILE_HELP}
                </span>
              </label>
            </div>
            <label className={styles.consent}>
              <input name="consent" type="checkbox" required />
              <span>
                I agree to be contacted when appropriate and accept the{" "}
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
            <button type="submit" className={styles.submit} disabled={pending}>
              {pending ? "Sending…" : "Continue reading"}
            </button>
          </form>
          <p className={styles.dialogFootnote}>
            After you continue, we&apos;ll remember this browser so you can read other on-site
            articles here without repeating this step.
          </p>
        </div>
      </div>
    </div>
  );
}
