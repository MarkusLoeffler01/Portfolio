import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import * as logos from "@assets/index";
import csLogo from "@assets/cs.svg";

// ─── Skill Data ───────────────────────────────────────────────────────────────

interface Skill {
  name: string;
  since: number;
  level: number; // 0-100
  logo: string | React.ReactNode;
  category: Category;
  color: string;
}

type Category = "language" | "framework" | "database" | "ci/cd" | "other";

const CATEGORIES: { key: Category; label: string; icon: string; color: string }[] = [
  { key: "language",  label: "Sprachen",    icon: "〈/〉", color: "#6c63ff" },
  { key: "framework", label: "Frameworks",  icon: "⚛",    color: "#00d4ff" },
  { key: "database",  label: "Datenbanken", icon: "🗄",    color: "#ff2d6b" },
  { key: "ci/cd",     label: "CI/CD",       icon: "🔄",    color: "#ffd700" },
  { key: "other",     label: "Sonstige",    icon: "🛠",    color: "#a8ff78" },
];

const SKILLS: Skill[] = [
  // Languages
  { name: "JavaScript", since: 2018, level: 95, logo: logos.jsonLogo, category: "language", color: "#f7df1e" },
  { name: "TypeScript", since: 2020, level: 90, logo: logos.mssqlLogo, category: "language", color: "#3178c6" },
  { name: "C#", since: 2019, level: 70, logo: csLogo, category: "language", color: "#9b4993" },

  // Frameworks
  { name: "React", since: 2022, level: 92, logo: logos.reactLogo, category: "framework", color: "#61dafb" },
  { name: "NodeJS", since: 2018, level: 88, logo: logos.nodeLogo, category: "framework", color: "#68a063" },
  { name: "Express", since: 2018, level: 82, logo: logos.nodeLogo, category: "framework", color: "#ffffff" },
  { name: "TailwindCSS", since: 2022, level: 85, logo: logos.tailwindLogo, category: "framework", color: "#38bdf8" },
  { name: "Vue", since: 2023, level: 60, logo: logos.vueLogo, category: "framework", color: "#42d392" },
  { name: "React Native", since: 2023, level: 55, logo: logos.reactLogo, category: "framework", color: "#61dafb" },
  { name: "Jest", since: 2023, level: 75, logo: logos.jestLogo, category: "framework", color: "#c21325" },
  { name: "Vitest", since: 2023, level: 78, logo: logos.vitestLogo, category: "framework", color: "#6e9f18" },

  // Databases
  { name: "MariaDB", since: 2018, level: 80, logo: logos.mariaDBLogo, category: "database", color: "#003545" },
  { name: "MSSQL", since: 2019, level: 72, logo: logos.mssqlLogo, category: "database", color: "#CC2927" },
  { name: "PostgreSQL", since: 2019, level: 78, logo: logos.postgresqlLogo, category: "database", color: "#336791" },
  { name: "MongoDB", since: 2022, level: 65, logo: logos.mongodbLogo, category: "database", color: "#47a248" },

  // CI/CD
  { name: "Docker", since: 2022, level: 82, logo: logos.dockerLogo, category: "ci/cd", color: "#2496ed" },
  { name: "GitHub Actions", since: 2022, level: 78, logo: logos.githubActionsLogo, category: "ci/cd", color: "#2088ff" },
  { name: "Jenkins", since: 2023, level: 65, logo: logos.jenkinsLogo, category: "ci/cd", color: "#d33833" },
  { name: "Harbor", since: 2024, level: 55, logo: logos.harborLogo, category: "ci/cd", color: "#60b932" },

  // Other
  { name: "Linux", since: 2018, level: 90, logo: logos.tuxLogo, category: "other", color: "#fcc624" },
  { name: "Git", since: 2018, level: 88, logo: logos.gitLogo, category: "other", color: "#f05032" },
  { name: "REST APIs", since: 2018, level: 85, logo: logos.jsonLogo, category: "other", color: "#9b59b6" },
  { name: "Make/CMake", since: 2021, level: 60, logo: logos.cmakeLogo, category: "other", color: "#064f8c" },
  { name: "GCC", since: 2021, level: 55, logo: logos.gccLogo, category: "other", color: "#a42e2b" },
];

const CURRENT_YEAR = new Date().getFullYear();

// ─── Progress Ring ────────────────────────────────────────────────────────────

function ProgressRing({ level, color, size = 56 }: { level: number; color: string; size?: number }) {
  const ref = useRef<SVGCircleElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (level / 100) * circumference;

  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="4" />
      <motion.circle
        ref={ref}
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={inView ? { strokeDashoffset: offset } : {}}
        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ filter: `drop-shadow(0 0 4px ${color})` }}
      />
    </svg>
  );
}

// ─── Skill Card ───────────────────────────────────────────────────────────────

function SkillCard({ skill }: { skill: Skill }) {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const yearsExp = CURRENT_YEAR - skill.since;

  return (
    <motion.div
      ref={ref}
      className="glass rounded-2xl p-4 flex flex-col items-center gap-2 cursor-default group relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ scale: 1.04, boxShadow: `0 0 25px ${skill.color}44` }}
    >
      {/* Glow background on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl"
        style={{ background: `radial-gradient(circle at center, ${skill.color}, transparent)` }}
      />

      {/* Progress ring with logo */}
      <div className="relative flex items-center justify-center">
        <ProgressRing level={skill.level} color={skill.color} size={60} />
        <div className="absolute text-xs font-bold" style={{ color: skill.color }}>
          {skill.level}%
        </div>
      </div>

      {/* Logo image */}
      {typeof skill.logo === "string" ? (
        <img src={skill.logo} alt={skill.name} className="w-8 h-8 object-contain" />
      ) : (
        <div className="w-8 h-8 flex items-center justify-center">{skill.logo}</div>
      )}

      {/* Name */}
      <p className="text-sm font-semibold text-center leading-tight" style={{ color: "var(--color-text)" }}>
        {skill.name}
      </p>

      {/* Since */}
      <p className="text-xs" style={{ color: "var(--color-muted)" }}>
        {yearsExp} {yearsExp === 1 ? t("Jahr Erfahrung") : t("Jahre Erfahrung")}
      </p>
    </motion.div>
  );
}

// ─── Category Tab ─────────────────────────────────────────────────────────────

function CategoryTab({
  cat,
  active,
  onClick,
}: {
  cat: typeof CATEGORIES[number];
  active: boolean;
  onClick: () => void;
}) {
  const { t } = useTranslation();
  return (
    <motion.button
      onClick={onClick}
      className="relative px-4 py-2 rounded-full text-sm font-medium transition-colors"
      style={{
        color: active ? cat.color : "var(--color-muted)",
        background: active ? `${cat.color}18` : "transparent",
        border: active ? `1px solid ${cat.color}44` : "1px solid transparent",
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
    >
      <span className="mr-1">{cat.icon}</span> {t(cat.label)}
    </motion.button>
  );
}

// ─── Skills Section ───────────────────────────────────────────────────────────

const SkillSlider = ({ color: _, viewHeight: __ }: { color?: string; viewHeight?: number }) => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<Category | "all">("all");

  const filtered =
    activeCategory === "all"
      ? SKILLS
      : SKILLS.filter((s) => s.category === activeCategory);

  const activeCatData = CATEGORIES.find((c) => c.key === activeCategory);

  return (
    <section
      id="skills"
      className="relative w-full section-pad"
      style={{ background: "var(--color-surface-2)" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
            style={{
              background: "rgba(0,212,255,0.12)",
              border: "1px solid rgba(0,212,255,0.3)",
              color: "var(--color-accent-2)",
            }}
          >
            {t("Technische Fähigkeiten")}
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold" style={{ color: "var(--color-text)" }}>
            {t("Meine Skills")}
          </h2>
          <p className="mt-3 text-base" style={{ color: "var(--color-muted)" }}>
            {SKILLS.length} {t("Technologien")} · {CURRENT_YEAR - 2018}+ {t("Jahre am Coden")}
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          <motion.button
            onClick={() => setActiveCategory("all")}
            className="px-4 py-2 rounded-full text-sm font-medium"
            style={{
              color: activeCategory === "all" ? "var(--color-accent)" : "var(--color-muted)",
              background: activeCategory === "all" ? "rgba(108,99,255,0.15)" : "transparent",
              border: activeCategory === "all" ? "1px solid rgba(108,99,255,0.4)" : "1px solid transparent",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
          >
            ✶ {t("Alle")}
          </motion.button>
          {CATEGORIES.map((cat) => (
            <CategoryTab
              key={cat.key}
              cat={cat}
              active={activeCategory === cat.key}
              onClick={() => setActiveCategory(cat.key)}
            />
          ))}
        </div>

        {/* Category accent bar */}
        <AnimatePresence mode="wait">
          {activeCatData && (
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              exit={{ opacity: 0, scaleX: 0 }}
              className="h-0.5 w-24 mx-auto mb-8 rounded-full"
              style={{ background: activeCatData.color }}
            />
          )}
        </AnimatePresence>

        {/* Skills grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filtered.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.04, duration: 0.3 }}
              >
                <SkillCard skill={skill} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12">
          {[
            { value: "7+", label: "Years coding" },
            { value: `${SKILLS.length}+`, label: "Technologies" },
            { value: "4", label: "Companies" },
            { value: "∞", label: "Curiosity" },
          ].map(({ value, label }, i) => (
            <motion.div
              key={i}
              className="glass rounded-2xl p-4 text-center border-glow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.04 }}
            >
              <p className="text-3xl font-bold text-shimmer">{value}</p>
              <p className="text-sm mt-1" style={{ color: "var(--color-muted)" }}>{label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillSlider;
