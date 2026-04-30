import Markus from "@assets/image.png";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
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

  // Scroll-driven scale: card peaks at 1.04× when centred in viewport
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: cardProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const cardScale = useTransform(cardProgress, [0, 0.4, 0.6, 1], [0.92, 1.04, 1.04, 0.92]);
  const cardOpacity = useTransform(cardProgress, [0, 0.25, 0.75, 1], [0.55, 1, 1, 0.55]);

  return (
    <div
      ref={ref}
      className={`relative flex w-full mb-8 sm:${isRight ? "flex-row-reverse" : "flex-row"} flex-col`}
    >
      <motion.div
        className={`w-full sm:w-5/12 ${isRight ? "sm:ml-auto sm:pr-0 sm:pl-4 sm:text-right" : "sm:mr-auto sm:pl-0 sm:pr-4"} text-left`}
        initial={{ opacity: 0, x: isRight ? 50 : -50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <motion.div
          ref={cardRef}
          className="glass rounded-2xl p-4 border-glow relative overflow-hidden"
          style={{
            borderLeft: `3px solid ${accentColor}`,
            scale: cardScale,
            opacity: cardOpacity,
          }}
          whileHover={{ scale: 1.06, boxShadow: `0 0 36px ${accentColor}55` }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
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
        </motion.div>
      </motion.div>

      {/* Center dot — hidden on mobile */}
      <div className="hidden sm:block absolute left-1/2 top-4 -translate-x-1/2 z-10">
        <div className="relative w-4 h-4">
          {inView && (
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ background: accentColor }}
              animate={{ scale: [1, 2.8, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.15 }}
            />
          )}
          <motion.div
            className="w-4 h-4 rounded-full border-2 relative z-10"
            style={{ background: accentColor, borderColor: "var(--color-base)" }}
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
          />
        </div>
      </div>
    </div>
  );
}

// ─── Timeline ─────────────────────────────────────────────────────────────────

function Timeline({ title, entries }: {
  title: string;
  entries: Omit<TimelineEntryProps, "isRight" | "index">[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Follower dot: tracks scroll progress through the whole timeline block
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });
  // Map progress 0→1 to "0%"→"100%" along the line
  const followerY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="mb-12">
      <h3 className="text-lg font-bold mb-6 text-center" style={{ color: "var(--color-accent-2)" }}>
        {title}
      </h3>
      <div className="relative" ref={containerRef}>
        {/* Static gradient line — hidden on mobile */}
        <div
          className="hidden sm:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
          style={{
            background: "linear-gradient(to bottom, var(--color-accent), var(--color-accent-2), var(--color-accent-3))",
          }}
        />
        {/* Follower dot that slides down the line — hidden on mobile */}
        <motion.div
          className="hidden sm:block absolute left-1/2 z-30 pointer-events-none"
          style={{
            top: followerY,
            x: "-50%",
            y: "-50%",
            background: "transparent",
            filter: "drop-shadow(0 0 8px var(--color-accent-2))",
          }}
        >
          {/* outer pulse ring */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ background: "var(--color-accent)", margin: "-6px" }}
            animate={{ scale: [1, 2.5, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* core dot */}
          <div
            className="w-4 h-4 rounded-full border-2"
            style={{
              background: "var(--color-accent-2)",
              borderColor: "var(--color-base)",
            }}
          />
        </motion.div>
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
    { icon: "🎂", label: t("Alter"), value: `${myAge}` },
    { icon: "💻", label: "JS " + t("Erfahrung"), value: `${jsYears}+ ${t("Jahre")}` },
    { icon: "🐧", label: t("Betriebssystem"), value: t("Nur Linux") },
    { icon: "🗾", label: t("Am Lernen"), value: "日本語" },
    { icon: "🌍", label: t("Politik"), value: t("Democratic") },
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
            <div className="flex items-center gap-3 mt-5 flex-wrap">
              <motion.a
                href="https://github.com/MarkusLoeffler01/Portfolio"
                target="_blank"
                rel="noopener noreferrer"
                className="relative group flex items-center gap-2.5 px-5 py-2.5 rounded-2xl font-semibold text-sm overflow-hidden select-none"
                style={{
                  background: "linear-gradient(135deg, #161622 0%, #1e1e30 100%)",
                  border: "1px solid rgba(108,99,255,0.35)",
                  color: "#f0eeff",
                  boxShadow: "0 0 0 0 rgba(108,99,255,0)",
                  textDecoration: "none",
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 28px rgba(108,99,255,0.55), 0 0 60px rgba(108,99,255,0.2)",
                  borderColor: "rgba(108,99,255,0.8)",
                }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 340, damping: 22 }}
              >
                {/* Animated shimmer sweep */}
                <motion.span
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "linear-gradient(105deg, transparent 35%, rgba(108,99,255,0.18) 50%, transparent 65%)",
                    backgroundSize: "200% 100%",
                  }}
                  animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                />
                {/* GitHub icon (inline SVG so no extra dep) */}
                <motion.svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="currentColor"
                  animate={{ rotate: [0, 8, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
                >
                  <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23A11.51 11.51 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12z" />
                </motion.svg>
                <span className="relative z-10 tracking-wide">View on GitHub</span>
                {/* Arrow that slides in on hover */}
                <motion.span
                  className="relative z-10 inline-block"
                  initial={{ x: -4, opacity: 0 }}
                  whileHover={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  style={{ color: "var(--color-accent)" }}
                >
                  →
                </motion.span>
              </motion.a>
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
            <motion.div
              key={i}
              className="flex items-center gap-3 text-sm"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.09, duration: 0.4, ease: "easeOut" }}
            >
              <span className="w-6 text-center">{icon}</span>
              <span className="font-medium w-24 shrink-0" style={{ color: "var(--color-muted)" }}>{label}</span>
              <span style={{ color: "var(--color-text)" }}>{value}</span>
            </motion.div>
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
  ].reverse();

  const jobEntries: Omit<TimelineEntryProps, "isRight" | "index">[] = [
    {
      from: `${t("September")} 2019`,
      to: `${t("Juni")} 2022`,
      title: `Putzmeister ${t("Gruppe")}`,
      subtitle: t("Ausbildung zum Fachinformatiker Anwendungsentwicklung"),
      tags: ["Apprenticeship", "JavaScript", "SAP"],
      accentColor: "var(--color-accent)",
    },
    {
      from: `${t("Juni")} 2022`,
      to: `${t("Juni")} 2024`,
      title: "netcare Business Solutions GmbH",
      subtitle: "Dev-Ops · Full-Stack · QA · Infrastructure",
      tags: ["React", "TypeScript", "Vue.js", "Docker", "Jenkins", "PostgreSQL"],
      accentColor: "var(--color-accent-2)",
    },
    {
      from: `${t("September")} 2024`,
      to: `${t("Januar")} 2025`,
      title: "merlin.zwo GmbH",
      subtitle: `${t("Systementwickler")} · ${t("Oracle Apex Entwickler")}`,
      tags: ["Oracle Apex", "PL/SQL", "TypeScript"],
      accentColor: "var(--color-accent-3)",
    },
    {
      from: `${t("Juli")} 2025`,
      title: "technology&strategy Group",
      subtitle: `${t("Softwareentwickler")} · ${t("Consultant")}`,
      tags: ["Consulting", "Full-Stack", "TypeScript", "React", "Golang", "CI/CD"],
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
      className="relative w-full section-pad overflow-hidden"
      style={{ background: "var(--color-surface)" }}
    >
      <motion.div
        className="absolute -top-10 -left-24 w-[32rem] h-[32rem] rounded-full blur-3xl pointer-events-none"
        style={{ background: "rgba(108,99,255,0.06)" }}
        animate={{ y: [0, -40, 0], x: [0, 20, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-32 -right-24 w-[28rem] h-[28rem] rounded-full blur-3xl pointer-events-none"
        style={{ background: "rgba(0,212,255,0.05)" }}
        animate={{ y: [0, 35, 0], x: [0, -25, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: "rgba(255,45,107,0.04)" }}
        animate={{ scale: [1, 1.35, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 6 }}
      />
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
