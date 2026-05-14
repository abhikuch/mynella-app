"use client";

import { useState, useTransition, type FormEvent } from "react";
import { submitContact } from "@/actions/submitContact";
import type { ContactProductOption } from "@/lib/contact-page-content";
import {
  MAX_EMAIL_LEN,
  MAX_MESSAGE_LEN,
  MAX_NAME_LEN,
  MAX_PHONE_INPUT_LEN,
  validateContactFormData,
} from "@/lib/form-validation";
import { INDIA_MOBILE_HELP } from "@/lib/phone-india";
import styles from "./ContactPage.module.css";

type Props = {
  submitLabel: string;
  placeholders: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    product: string;
    message: string;
  };
  productOptions: ContactProductOption[];
};

export function ContactForm({ submitLabel, placeholders, productOptions }: Props) {
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [pending, startTransition] = useTransition();

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const clientErr = validateContactFormData(fd);
    if (clientErr) {
      setError(clientErr);
      return;
    }

    startTransition(async () => {
      const r = await submitContact(fd);
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
      <div className={styles.formSuccessWrap}>
        <p className={styles.formSuccess} role="status">
          Thank you—we&apos;ve received your message.
        </p>
        <p className={styles.formSuccessSub}>
          Our team will reach out using the email or mobile you shared. If it&apos;s urgent, call
          the number in the sidebar.
        </p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <p className={styles.formLead}>
        Share how we can help. Email and mobile are both required so we can respond quickly.
      </p>
      <label className={styles.honeypot} htmlFor="contact-lead-website">
        Website
      </label>
      <input
        className={styles.honeypot}
        id="contact-lead-website"
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
      />
      <div className={styles.nameRow}>
        <label className={styles.field}>
          <span className={styles.label}>First name</span>
          <input
            name="firstName"
            type="text"
            autoComplete="given-name"
            placeholder={placeholders.firstName}
            className={styles.input}
          />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>Last name</span>
          <input
            name="lastName"
            type="text"
            autoComplete="family-name"
            placeholder={placeholders.lastName}
            className={styles.input}
          />
        </label>
      </div>
      <div className={styles.contactPair}>
        <label className={styles.field}>
          <span className={styles.label}>Email</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={MAX_EMAIL_LEN}
            placeholder={placeholders.email}
            className={styles.input}
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
            placeholder={placeholders.phone}
            className={styles.input}
            aria-describedby="contact-phone-hint"
          />
          <span id="contact-phone-hint" className={styles.fieldHint}>
            {INDIA_MOBILE_HELP}
          </span>
        </label>
      </div>
      <label className={styles.field}>
        <span className={styles.label}>I&apos;m interested in</span>
        <select name="product" className={styles.select} defaultValue="" required>
          <option value="" disabled>
            {placeholders.product}
          </option>
          {productOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </label>
      <label className={styles.field}>
        <span className={styles.label}>Message (optional)</span>
        <textarea
          name="message"
          rows={4}
          maxLength={MAX_MESSAGE_LEN}
          placeholder={placeholders.message}
          className={styles.textarea}
        />
      </label>
      {error ? (
        <p className={styles.formError} role="alert">
          {error}
        </p>
      ) : null}
      <button type="submit" className={styles.submit} disabled={pending}>
        {pending ? "Sending…" : submitLabel}
      </button>
    </form>
  );
}
