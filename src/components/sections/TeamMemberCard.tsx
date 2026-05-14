"use client";

import { useState } from "react";
import type { TeamMember } from "@/lib/team";
import { teamMemberAvatarUrl, teamMemberInitials } from "@/lib/team";
import styles from "./AboutLanding.module.css";

export function TeamMemberCard({ member }: { member: TeamMember }) {
  const [showPhoto, setShowPhoto] = useState(true);
  const linkedInUrl = member.linkedInUrl?.trim() || "";
  const linkedInAvatar = teamMemberAvatarUrl(linkedInUrl);
  const cmsSrc = member.portraitUrl?.trim() || null;
  const src = cmsSrc || linkedInAvatar;
  const initials = teamMemberInitials(member.name);

  return (
    <li className={styles.empGridItem}>
      <article className={styles.empCard}>
        <div className={styles.empAvatar} aria-hidden>
          {src && showPhoto ? (
            <img
              src={src}
              alt=""
              width={112}
              height={112}
              className={styles.empAvatarImg}
              loading="lazy"
              referrerPolicy={cmsSrc ? undefined : "no-referrer"}
              onError={() => setShowPhoto(false)}
            />
          ) : (
            <span className={styles.empAvatarInitials}>{initials}</span>
          )}
        </div>
        <div className={styles.empBody}>
          <div className={styles.empName}>{member.name}</div>
          <p className={`${styles.empRole} ${styles.empRoleSoft}`}>{member.role}</p>
          {linkedInUrl ?
            <a
              href={linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.empLinkedInRow}
              aria-label={`${member.name} on LinkedIn (opens in new tab)`}
            >
              <svg
                className={styles.empLinkedInIcon}
                viewBox="0 0 24 24"
                width={16}
                height={16}
                fill="currentColor"
                focusable="false"
                aria-hidden={true}
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span>LinkedIn</span>
            </a>
          : null}
        </div>
      </article>
    </li>
  );
}
