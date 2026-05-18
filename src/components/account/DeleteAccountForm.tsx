"use client";

import { useState, useTransition, type FormEvent } from "react";
import Link from "next/link";
import { submitDeleteAccount } from "@/actions/submitDeleteAccount";
import { validateDeleteAccountFormData } from "@/lib/form-validation";
import { INDIA_MOBILE_HELP } from "@/lib/phone-india";
import { MAX_EMAIL_LEN, MAX_MESSAGE_LEN, MAX_PHONE_INPUT_LEN } from "@/lib/form-validation";
import styles from "./delete-account.module.css";

export function DeleteAccountForm() {
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [pending, startTransition] = useTransition();

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const clientErr = validateDeleteAccountFormData(fd);
    if (clientErr) {
      setError(clientErr);
      return;
    }

    startTransition(async () => {
      const r = await submitDeleteAccount(fd);
      if (r.ok) {
        setDone(true);
        form.reset();
      } else {
        setError(r.error);
      }
    });
  }

  if (done) {
    return (
      <div className={styles.success} role="status">
        <p className={styles.successTitle}>Request received</p>
        <p className={styles.successBody}>
          We will process your Nella account deletion within 30 days and email you at the address you
          provided when it is complete. If we need to verify your identity, we will contact you first.
        </p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <input type="text" name="website" className={styles.honeypot} tabIndex={-1} autoComplete="off" aria-hidden />

      <div className={styles.field}>
        <label htmlFor="delete-email">Email used for your Nella account</label>
        <input
          id="delete-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          maxLength={MAX_EMAIL_LEN}
          placeholder="you@example.com"
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="delete-phone">
          Mobile number on file <span className={styles.optional}>(optional)</span>
        </label>
        <input
          id="delete-phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          maxLength={MAX_PHONE_INPUT_LEN}
          placeholder="+91 98765 43210"
          aria-describedby="delete-phone-help"
        />
        <p id="delete-phone-help" className={styles.hint}>
          {INDIA_MOBILE_HELP}
        </p>
      </div>

      <div className={styles.field}>
        <label htmlFor="delete-note">
          Account details <span className={styles.optional}>(optional)</span>
        </label>
        <textarea
          id="delete-note"
          name="accountNote"
          rows={3}
          maxLength={MAX_MESSAGE_LEN}
          placeholder="Username, sign-in method, or anything that helps us locate your account"
        />
      </div>

      <label className={styles.checkbox}>
        <input type="checkbox" name="confirmDeletion" required />
        <span>
          I understand this permanently deletes my <strong>Nella</strong> app account and associated
          personal data, except where we must keep information for legal or security reasons (see our{" "}
          <Link href="/privacy">Privacy Policy</Link>).
        </span>
      </label>

      {error ? (
        <p className={styles.error} role="alert">
          {error}
        </p>
      ) : null}

      <button type="submit" className={styles.submit} disabled={pending}>
        {pending ? "Sending…" : "Request account deletion"}
      </button>
    </form>
  );
}
