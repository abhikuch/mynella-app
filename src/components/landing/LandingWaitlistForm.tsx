"use client";

import { useState, useTransition, type FormEvent } from "react";
import { submitLead } from "@/actions/submitLead";
import {
  MAX_EMAIL_LEN,
  MAX_PHONE_INPUT_LEN,
  validateNewsletterFormData,
} from "@/lib/form-validation";
import { sendGtagEvent } from "@/lib/gtag";
import { INDIA_MOBILE_HELP } from "@/lib/phone-india";
import styles from "./landing-waitlist.module.css";

export type LandingWaitlistPlacement = "landing-hero" | "landing-bottom";

type Props = {
  placement: LandingWaitlistPlacement;
  privacyHref: string;
  title?: string;
};

export function LandingWaitlistForm({ placement, privacyHref, title = "Get launch updates" }: Props) {
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [pending, startTransition] = useTransition();

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
        sendGtagEvent("waitlist_submit", {
          form_placement: placement === "landing-hero" ? "hero" : "bottom",
        });
      } else {
        setError(r.error);
      }
    });
  }

  const honeypotId =
    placement === "landing-hero" ? "nl-waitlist-hp-hero" : "nl-waitlist-hp-bottom";

  return (
    <div className={styles.wrap}>
      <h2 className={styles.title}>{title}</h2>
      {done ? (
        <p className={styles.success} role="status">
          You&apos;re on the list. We&apos;ll email you when the Nella app opens up — no spam.
        </p>
      ) : (
        <>
          <p className={styles.intro}>
            Email + India mobile (so we can reach you reliably). One short note on launches and
            early access.
          </p>
          <form className={styles.form} onSubmit={onSubmit} noValidate>
            <input type="hidden" name="source" value={placement} />
            <label className={styles.honeypot} htmlFor={honeypotId}>
              Company website
            </label>
            <input
              className={styles.honeypot}
              id={honeypotId}
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
            <div className={styles.row}>
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
                  aria-describedby={`${placement}-phone-hint`}
                />
              </label>
              <p id={`${placement}-phone-hint`} className={styles.hint}>
                {INDIA_MOBILE_HELP}
              </p>
            </div>
            <label className={styles.consent}>
              <input name="consent" type="checkbox" required />
              <span>
                I agree to be contacted about Nella / MyNella updates and accept the{" "}
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
              {pending ? "Sending…" : "Join the waitlist"}
            </button>
          </form>
        </>
      )}
    </div>
  );
}
