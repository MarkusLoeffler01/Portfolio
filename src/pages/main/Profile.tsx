import Markus from "@assets/image.png";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { age } from "@/ts/calc";
import ProfilePicture from "@/components/shapes/profilePicture";

// ─── Utilities ────────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
      style={{
        background: "rgba(108,99,255,0.12)",
        border: "1px solid rgba(108,99,255,0.3)",
        color: "var(--color-accent)",
      }}
    >
      {children}
    </span>
  );
}

function RevealOnScroll({
  children,
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const initial = {
    opacity: 0,
    y: direction === "up" ? 30 : 0,
    x: direction === "left" ? -40 : direction === "right" ? 40 : 0,
  };

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : initial}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

// ─── Timeline Entry ───────────────────────────────────────────────────────────

interface TimelineEntryProps {
  from: string;
  to?: string;
  title: string;
  subtitle?: string;
  tags?: string[];
  accentColor?: string;
  isRight?: boolean;
  index: number;
}

function TimelineEntry({
  from,
  to,
  title,
  subtitle,
  tags = [],
  accentColor = "var(--color-accent)",
  isRight = false,
  index,
}: TimelineEntryProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div
      ref={ref}
      className={`relative flex w-full mb-8 ${isRight ? "flex-row-reverse" : "flex-row"}`}
    >
      <motion.div
        className={`w-5/12 ${isRight ? "ml-auto pr-0 pl-4 text-right" : "mr-auto pl-0 pr-4 text-left"}`}
        initial={{ opacity: 0, x: isRight ? 50 : -50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div
          className="glass rounded-2xl p-4 border-glow relative overflow-hidden"
          style={{
            borderLeft: isRight ? undefined : `3px solid ${accentColor}`,
            borderRight: isRight ? `3px solid ${accentColor}` : undefined,
          }}
        >
          <p className="text-xs font-mono mb-1" style={{ color: accentColor }}>
            {to ? `${from} → ${to}` : `${from} →`}
          </p>
          <h4 className="font-bold text-sm sm:text-base mb-1" style={{ color: "var(--color-text)" }}>
            {title}
          </h4>
          {subtitle && (
            <p className="text-xs sm:text-sm mb-2" style={{ color: "var(--color-text-secondary)" }}>
              {subtitle}
            </p>
          )}
          {tags.length > 0 && (
            <div className={`flex flex-wrap gap-1 mt-2 ${isRight ? "justify-end" : "justify-start"}`}>
              {tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{
                    background: `${accentColor}22`,
                    border: `1px solid ${accentColor}44`,
                    color: accentColor,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      {/* Center dot */}
      <div className="absolute left-1/2 top-4 -translate-x-1/2 z-10">
        <motion.div
          className="w-4 h-4 rounded-full border-2"
          style={{ background: accentColor, borderColor: "var(--color-base)" }}
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
        />
      </div>
    </div>
  );
}

// ─── Timeline ─────────────────────────────────────────────────────────────────

function Timeline({ title, entries }: {
  title: string;
  entries: Omit<TimelineEntryProps, "isRight" | "index">[];
}) {
  return (
    <div className="mb-12">
      <h3 className="text-lg font-bold mb-6 text-center" style={{ color: "var(--color-accent-2)" }}>
        {title}
      </h3>
      <div className="relative">
        <div
          className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
          style={{
            background: "linear-gradient(to bottom, var(--color-accent), var(--color-accent-2), var(--color-accent-3))",
          }}
        />
        {entries.map((entry, i) => (
          <TimelineEntry key={i} {...entry} isRight={i % 2 === 1} index={i} />
        ))}
      </div>
    </div>
  );
}

// ─── Bio Card ─────────────────────────────────────────────────────────────────

function BioCard() {
  const { t } = useTranslation();
  const jsYears = age(new Date("2018-05-31"));
  const myAge = age(new Date("2001-07-31"));

  const facts = [
    { icon: "🎂", label: "Age", value: `${myAge}` },
    { icon: "💻", label: "JS Experience", value: `${jsYears}+ years` },
    { icon: "🐧", label: "OS", value: "Linux only" },
    { icon: "🗾", label: "Learning", value: "日本語" },
    { icon: "🌍", label: "Politics", value: "Democratic" },
    { icon: "🏃", label: "Hobbies", value: "Sports, OSS" },
  ];

  return (
    <RevealOnScroll>
      <div className="glass rounded-3xl p-6 sm:p-8 border-glow mb-8">
        <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
          <div className="flex-shrink-0">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div
                className="absolute inset-0 rounded-full blur-xl opacity-60"
                style={{ background: "linear-gradient(135deg, var(--color-accent), var(--color-accent-2))" }}
              />
              <ProfilePicture src={Markus} className="w-32 h-32 sm:w-44 sm:h-44 relative z-10" />
            </motion.div>
          </div>

          <div className="flex-1 text-left">
            <h2 className="font-pacifico text-3xl sm:text-4xl mb-1" style={{ color: "var(--color-text)" }}>
              Markus <span className="text-shimmer">Löffler</span>
            </h2>
            <p className="text-sm mb-3" style={{ color: "var(--color-accent)" }}>
              {t("Full-Stack Developer · Consultant · Open-Source Befürworter")}
            </p>
            <p className="text-sm sm:text-base leading-relaxed mb-4" style={{ color: "var(--color-text-secondary)" }}>
              {t("Herzlich Willkommen auf meinem Portfolio. Ich heiße Markus, bin")}{" "}
              {myAge}{" "}
              {t("Jahre alt und beschäftige mich seit")}{" "}
              {jsYears}{" "}
              {t("Jahren mit JavaScript. In meiner Freizeit mache ich gerne Sport, zeige Engegement in einer demokratischen Partei, lerne Japanisch (まさに、日本人), entwickle eigene Projekte und informiere mich über neue Technologien.")}
            </p>
            <p className="text-sm sm:text-base leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
              {t("Ich nutze privat ausschließlich Linux für meine Projekte und bin ein großer Verfechter von Open-Source-Software.")}
            </p>
            <div className="flex items-center gap-2 mt-4 flex-wrap">
              <span className="text-sm" style={{ color: "var(--color-muted)" }}>
                {t("Das GitHub-Repository finden Sie hier")}
              </span>
              <img
                alt="GitHub Repository"
                className="cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => window.open("https://github.com/MarkusLoeffler01/Portfolio", "_blank")?.focus()}
                src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">
          {facts.map(({ icon, label, value }, i) => (
            <RevealOnScroll key={i} delay={i * 0.05}>
              <motion.div
                className="rounded-xl p-3 text-left"
                style={{ background: "rgba(108,99,255,0.06)", border: "1px solid rgba(108,99,255,0.12)" }}
                whileHover={{ scale: 1.03, background: "rgba(108,99,255,0.12)" }}
              >
                <span className="text-xl">{icon}</span>
                <p className="text-xs mt-1" style={{ color: "var(--color-muted)" }}>{label}</p>
                <p className="text-sm font-semibold" style={{ color: "var(--color-text)" }}>{value}</p>
              </motion.div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </RevealOnScroll>
  );
}

// ─── Personal Data ────────────────────────────────────────────────────────────

function PersonalData() {
  const { t } = useTranslation();
  const data = [
    { icon: "👤", label: t("Vorname"), value: "Markus" },
    { icon: "📛", label: t("Nachname"), value: "Löffler" },
    { icon: "🎂", label: t("Geburtstag"), value: "31.07.2001" },
    { icon: "💼", label: t("Titel"), value: t("Full-Stack-Entwickler") },
    { icon: "📍", label: t("Wohnsitz"), value: t("LK Reutlingen") },
  ];

  return (
    <RevealOnScroll>
      <div className="glass rounded-2xl p-5 border-glow mb-6">
        <h3 className="font-bold mb-4 text-sm uppercase tracking-widest" style={{ color: "var(--color-accent-2)" }}>
          {t("Persönliche Daten")}
        </h3>
        <div className="space-y-2">
          {data.map(({ icon, label, value }, i) => (
            <div key={i} className="flex items-center gap-3 text-sm">
              <span className="w-6 text-center">{icon}</span>
              <span className="font-medium w-24 shrink-0" style={{ color: "var(--color-muted)" }}>{label}</span>
              <span style={{ color: "var(--color-text)" }}>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </RevealOnScroll>
  );
}

// ─── CV Timelines ─────────────────────────────────────────────────────────────

function CVTimelines() {
  const { t } = useTranslation();

  const educationEntries: Omit<TimelineEntryProps, "isRight" | "index">[] = [
    {
      from: "2019",
      to: `${t("Juni")} 2022`,
      title: "it.schule Stuttgart",
      subtitle: t("Fachinformatiker für Anwendungsentwicklung"),
      tags: ["IT", "Application Dev"],
      accentColor: "var(--color-accent)",
    },
    {
      from: "2017",
      to: "2019",
      title: "Ferdinand-von-Steinbeis-Schule Reutlingen",
      subtitle: t("Fachhochschulreife"),
      tags: ["FHR", "IKT"],
      accentColor: "var(--color-accent-2)",
    },
    {
      from: "2011",
      to: "2017",
      title: "Geschwister-Scholl-Realschule Bad Urach",
      subtitle: t("Mittlere Reife"),
      accentColor: "var(--color-accent-3)",
    },
    {
      from: "2007",
      to: "2011",
      title: `${t("Grundschule")} Dettingen`,
      accentColor: "var(--color-accent)",
    },
  ];

  const jobEntries: Omit<TimelineEntryProps, "isRight" | "index">[] = [
    {
      from: `${t("September")} 2019`,
      to: `${t("Juni")} 2022`,
      title: `Putzmeister ${t("Gruppe")}`,
      subtitle: t("Ausbildung zum Fachinformatiker Anwendungsentwicklung"),
      tags: ["Apprenticeship", "C#", "SAP"],
      accentColor: "var(--color-accent)",
    },
    {
      from: `${t("Juni")} 2022`,
      to: `${t("Juni")} 2024`,
      title: "netcare Business Solutions GmbH",
      subtitle: "Dev-Ops · Full-Stack · QA · Infrastructure",
      tags: ["React", "Docker", "Jenkins", "PostgreSQL"],
      accentColor: "var(--color-accent-2)",
    },
    {
      from: `${t("September")} 2024`,
      to: `${t("Januar")} 2025`,
      title: "merlin.zwo GmbH",
      subtitle: `${t("Systementwickler")} · ${t("Oracle Apex Entwickler")}`,
      tags: ["Oracle Apex", "PL/SQL"],
      accentColor: "var(--color-accent-3)",
    },
    {
      from: `${t("Juli")} 2025`,
      title: "technology&strategy Group",
      subtitle: `${t("Softwareentwickler")} · ${t("Consultant")}`,
      tags: ["Consulting", "Full-Stack"],
      accentColor: "var(--color-accent)",
    },
  ];

  return (
    <div className="space-y-8">
      <Timeline title={`🎓 ${t("Ausbildung")}`} entries={educationEntries} />
      <Timeline title={`💼 ${t("Berufserfahrung")}`} entries={jobEntries} />
      <RevealOnScroll>
        <div className="glass rounded-2xl p-5 border-glow">
          <h3 className="font-bold mb-3 text-sm uppercase tracking-widest" style={{ color: "var(--color-accent-2)" }}>
            🏢 {t("Praktika")}
          </h3>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono" style={{ color: "var(--color-accent)" }}>{t("Juni")} 2018</span>
            <span style={{ color: "var(--color-text)" }}>Advanced UniByte GmbH, Metzingen</span>
          </div>
        </div>
      </RevealOnScroll>
    </div>
  );
}

// ─── Profile ──────────────────────────────────────────────────────────────────

const Profile = ({
  color: _,
  className: __,
}: {
  color?: string;
  className?: string;
}) => {
  const { t } = useTranslation();
  return (
    <section
      id="about"
      className="relative w-full section-pad"
      style={{ background: "var(--color-surface)" }}
    >
      <div className="relative z-10 max-w-6xl mx-auto">
        <RevealOnScroll>
          <div className="text-center mb-12">
            <SectionLabel>{t("Über mich")}</SectionLabel>
            <h2 className="text-4xl sm:text-5xl font-bold" style={{ color: "var(--color-text)" }}>
              {t("Wer bin ich?")}
            </h2>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          <div className="lg:col-span-2">
            <BioCard />
          </div>
          <div>
            <PersonalData />
          </div>
        </div>

        <RevealOnScroll>
          <div className="text-center mb-10">
            <SectionLabel>{t("Lebenslauf")}</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: "var(--color-text)" }}>
              {t("Mein Werdegang")}
            </h2>
          </div>
        </RevealOnScroll>
        <CVTimelines />
      </div>
    </section>
  );
};

export default Profile;
