import Image from "next/image";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { FAQ, type FAQItem } from "@/components/ui/FAQ";
import { PostBody } from "@/components/blog/PostBody";
import { ctaLinks } from "@/lib/navigation";
import { companyLinkedIn } from "@/lib/company-profile";
import { resolveFounderPortraitSrc } from "@/lib/founder-portrait";
import {
  leadership,
  rosterWithStaticPortraits,
  teamFunctions,
  teamRosterFootnote,
} from "@/lib/team";
import type { CmsTeamMember, SiteSettingsDoc } from "@/sanity/lib/site";
import heroStyles from "./shared/MarketingHero.module.css";
import styles from "./AboutLanding.module.css";
import { TeamMemberCard } from "./TeamMemberCard";


export function AboutHero({
  settings,
}: {
  settings: SiteSettingsDoc | null;
}) {
  const pill1 =
    settings?.aboutPill1?.trim() ||
    "SEBI Portfolio Manager & Research Analyst";
  const pill2 = settings?.aboutPill2?.trim() || "Pune · India";
  const title1 =
    settings?.aboutTitleLine1?.trim() || "Institutional discipline.";
  const titleEm =
    settings?.aboutTitleEmphasis?.trim() || "Built for Indian investors.";
  const sub =
    settings?.aboutSub?.trim() ||
    "SEBI-registered Portfolio Manager and Research Analyst in Pune — system-driven mandates for investors who want process, not noise.";

  return (
    <section className={heroStyles.hero}>
      <div className={heroStyles.heroGrid} />
      <div className={heroStyles.heroGlow} />
      <div className={heroStyles.heroInner}>
        <div className={heroStyles.heroPills}>
          <span className={heroStyles.pill}>
            <span className={heroStyles.pillDot} />
            {pill1}
          </span>
          <span className={heroStyles.pill}>
            <span className={heroStyles.pillDot} />
            {pill2}
          </span>
        </div>
        <h1 className={heroStyles.heroTitle}>
          {title1}
          <br />
          <em>{titleEm}</em>
        </h1>
        <p className={heroStyles.heroSub}>{sub}</p>
        <div className={heroStyles.heroCtas}>
          <Button href={ctaLinks.bookCall} external>
            Schedule a conversation
          </Button>
          <Button href="/pms/polaris" variant="ghost">
            Explore Polaris PMS
          </Button>
        </div>
      </div>
    </section>
  );
}

export function AboutTeam({
  settings,
  cmsTeam,
}: {
  settings: SiteSettingsDoc | null;
  cmsTeam: CmsTeamMember[];
}) {
  const roster = rosterWithStaticPortraits(cmsTeam);

  const founderName = settings?.founderName?.trim() || leadership.name;
  const founderRole = settings?.founderRole?.trim() || leadership.role;
  const founderCreds = settings?.founderCreds?.trim() || leadership.creds;
  const rosterLead =
    settings?.teamRosterLead?.trim() ||
    "When LinkedIn is listed, it opens in a new tab. Photos when available; otherwise initials.";
  const cmsFounderBio = settings?.founderBio ?? [];
  const useCmsFounderBio = cmsFounderBio.length > 0;
  const founderPortraitSrc = resolveFounderPortraitSrc(settings?.founderPortrait);
  const founderPortraitAlt = `Portrait of ${founderName}`;

  return (
    <SectionWrapper variant="alt" id="team">
      <Eyebrow>About</Eyebrow>
      <h2>Leadership &amp; how we work.</h2>
      <p className={styles.leadMuted}>
        {companyLinkedIn.about} {companyLinkedIn.industry}, headquartered in{" "}
        {companyLinkedIn.headquarters}. LinkedIn lists a {companyLinkedIn.sizeBand} organisation
        with a growing roster — we feature our team below as names become public on our{" "}
        <a href={companyLinkedIn.url} target="_blank" rel="noopener noreferrer">
          company page
        </a>
        .
      </p>

      <div className={styles.teamLeadCard}>
        <div className={styles.founderAvatar}>
          <Image
            src={founderPortraitSrc}
            alt={founderPortraitAlt}
            width={120}
            height={120}
            className={styles.founderAvatarImg}
            sizes="120px"
            priority={false}
          />
        </div>
        <div>
          <div className={styles.founderName}>{founderName}</div>
          <div className={styles.founderRole}>{founderRole}</div>
          <p className={styles.founderCreds}>{founderCreds}</p>
          <div className={styles.founderBody}>
            {useCmsFounderBio ? (
              <PostBody value={cmsFounderBio} variant="inline" />
            ) : (
              leadership.bio.map((p, i) => <p key={i}>{p}</p>)
            )}
          </div>
        </div>
      </div>

      <div className={styles.teamRosterBlock}>
        <header className={styles.teamRosterHeader}>
          <h3 className={styles.teamRosterHeading}>Team</h3>
          <p className={styles.teamRosterSub}>
            People who make MyNella, what it is
          </p>
          <p className={styles.teamRosterLead}>{rosterLead}</p>
        </header>
        <ul className={styles.empGrid}>
          {roster.map((m) => (
            <TeamMemberCard key={m.name} member={m} />
          ))}
        </ul>
        <p className={styles.teamRosterFoot}>
          <a href={teamRosterFootnote.href} target="_blank" rel="noopener noreferrer">
            {teamRosterFootnote.label}
          </a>
          <span className={styles.teamRosterFootHint}> · {teamRosterFootnote.hint}</span>
        </p>
      </div>

      <h3 className={styles.teamFnHeading}>Across the firm</h3>
      <div className={styles.teamFnGrid}>
        {teamFunctions.map((f) => (
          <div key={f.title} className={styles.teamFnCard}>
            <div className={styles.teamFnTitle}>{f.title}</div>
            <p className={styles.teamFnDesc}>{f.desc}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}

export function AboutCredentials() {
  return (
    <SectionWrapper variant="alt">
      <Eyebrow>Regulatory</Eyebrow>
      <h2>Registered. Documented. Accountable.</h2>
      <div className={styles.credStrip}>
        <div className={styles.credCard}>
          <div className={styles.credLabel}>Portfolio Manager</div>
          <div className={styles.credValue}>REG-NUMBER-PMS</div>
        </div>
        <div className={styles.credCard}>
          <div className={styles.credLabel}>Research Analyst</div>
          <div className={styles.credValue}>REG-NUMBER-RA</div>
        </div>
        <div className={styles.credCard}>
          <div className={styles.credLabel}>Corporate</div>
          <div className={styles.credValue}>CIN U74900PN2010PTC137497</div>
        </div>
        <div className={styles.credCard}>
          <div className={styles.credLabel}>Founded</div>
          <div className={styles.credValue}>2015</div>
        </div>
      </div>
    </SectionWrapper>
  );
}

export function AboutFAQ({ items }: { items: FAQItem[] }) {
  return (
    <SectionWrapper>
      <Eyebrow>FAQ</Eyebrow>
      <h2>About MyNella — common questions.</h2>
      <div style={{ marginTop: 36 }}>
        <FAQ items={items} />
      </div>
    </SectionWrapper>
  );
}

export function AboutCTA() {
  return (
    <section className={styles.ctaBand}>
      <div className={styles.ctaGlow} />
      <div className={styles.ctaInner}>
        <Eyebrow>Next step</Eyebrow>
        <h2>Ready to explore fit?</h2>
        <p className={styles.ctaLead}>
          Book a call with our team or browse products to see which mandate
          matches your capital and conviction.
        </p>
        <div className={styles.ctaBtns}>
          <Button href={ctaLinks.bookCall} external>
            Book a Call
          </Button>
          <Button href="/model-portfolios" variant="ghost">
            Model Portfolios
          </Button>
        </div>
      </div>
    </section>
  );
}
