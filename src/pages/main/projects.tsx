import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import ReactLogo from "@assets/react.svg?react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Project {
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  color: string;
  icon: React.ReactNode;
  githubLink?: string;
  deploymentLink?: string;
  status: "live" | "wip" | "planned";
}

// ─── Project Data ─────────────────────────────────────────────────────────────

const useProjects = (): Project[] => {
  const { t } = useTranslation();
  return [
    {
      title: "Portfolio",
      description: t("Dieses Portfolio – gebaut mit React, Three.js & Framer Motion."),
      longDescription: t("Ein kreatives Portfolio mit 3D-Partikel-Hero, animiertem Lebenslauf, Fähigkeiten-Raster und Scroll-Abschnitten. Gebaut mit React 18, TypeScript, Vite, Tailwind, Framer Motion und React Three Fiber."),
      tags: ["React", "Three.js", "Framer Motion", "TypeScript", "Tailwind"],
      color: "#6c63ff",
      icon: <ReactLogo width="48" height="48" />,
      githubLink: "https://github.com/MarkusLoeffler01/Portfolio",
      deploymentLink: "https://portfolio.m-loeffler.de",
      status: "live" as const,
    },
    {
      title: "ToDo App",
      description: t("Eine moderne Todo Application, gebaut mit React, mit Echtzeit-Updates und lokaler Speicherung."),
      longDescription: t("Eine aufgeräumte Aufgaben-App mit React. Echtzeit-Updates und lokale Speicherung."),
      tags: ["React", "TypeScript", "Local Storage"],
      color: "#00d4ff",
      icon: <span style={{ fontSize: 48 }}>✅</span>,
      githubLink: "https://github.com/MarkusLoeffler01/portfolio-todo-react",
      deploymentLink: "https://portfolio.m-loeffler.de/todo",
      status: "live" as const,
    },
    {
      title: "API Backend",
      description: t("RESTful Gästebuch-API mit Express, PostgreSQL & Pagination."),
      longDescription: t("Eine Node.js + Express REST API für das Portfolio-Gästebuch. Kommentare, Pagination und CORS."),
      tags: ["Node.js", "Express", "PostgreSQL", "REST"],
      color: "#ff2d6b",
      icon: <span style={{ fontSize: 48 }}>🔌</span>,
      status: "live" as const,
    },
    {
      title: "Coming Soon",
      description: t("Nächstes Projekt in Arbeit – bleib dran."),
      longDescription: t("Immer am Bauen. Schau bald wieder rein oder folge dem GitHub."),
      tags: ["TBD"],
      color: "#a8ff78",
      icon: <span style={{ fontSize: 48 }}>🚀</span>,
      status: "planned" as const,
    },
  ];
};

// ─── Status Badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: Project["status"] }) {
  const { t } = useTranslation();
  const config = {
    live:    { label: t("Live"),     color: "#a8ff78", bg: "rgba(168,255,120,0.1)" },
    wip:     { label: t("In Arbeit"), color: "#ffd700", bg: "rgba(255,215,0,0.1)" },
    planned: { label: t("Geplant"),  color: "#8888aa", bg: "rgba(136,136,170,0.1)" },
  }[status];

  return (
    <span
      className="text-xs px-2 py-0.5 rounded-full font-medium"
      style={{ color: config.color, background: config.bg, border: `1px solid ${config.color}44` }}
    >
      ● {config.label}
    </span>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { t } = useTranslation();
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      className="relative cursor-pointer"
      style={{ height: 280, perspective: 1400 }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      onClick={() => setFlipped((f) => !f)}
    >
      <motion.div
        className="w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Front — horizontal layout: icon left, content right */}
        <div
          className="absolute inset-0 glass rounded-3xl border-glow overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            borderLeft: `4px solid ${project.color}`,
          }}
        >
          {/* Glow blob top-right */}
          <motion.div
            className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl pointer-events-none"
            style={{ background: project.color }}
            animate={{ scale: [1, 1.35, 1], opacity: [0.10, 0.22, 0.10] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative z-10 flex h-full gap-5 p-6">
            {/* Left: icon + status */}
            <div className="flex flex-col items-center justify-center gap-3 flex-shrink-0 w-20">
              <div style={{ filter: `drop-shadow(0 0 14px ${project.color}99)` }}>
                {project.icon}
              </div>
              <StatusBadge status={project.status} />
            </div>

            {/* Divider */}
            <div className="w-px self-stretch" style={{ background: `${project.color}30` }} />

            {/* Right: title, description, tags, hint */}
            <div className="flex flex-col justify-center gap-2 min-w-0 flex-1">
              <h3 className="text-xl font-bold leading-tight" style={{ color: "var(--color-text)" }}>
                {project.title}
              </h3>
              <p className="text-sm leading-snug line-clamp-2" style={{ color: "var(--color-text-secondary)" }}>
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {project.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-full whitespace-nowrap font-medium"
                    style={{ background: `${project.color}18`, border: `1px solid ${project.color}44`, color: project.color }}
                  >
                    {tag}
                  </span>
                ))}
                {project.tags.length > 4 && (
                  <span
                    className="text-xs px-2.5 py-1 rounded-full whitespace-nowrap font-medium"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "var(--color-muted)" }}
                  >
                    +{project.tags.length - 4}
                  </span>
                )}
              </div>
              <p className="text-xs" style={{ color: "var(--color-muted)" }}>
                {t("Zum Umdrehen klicken →")}
              </p>
            </div>
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 glass rounded-3xl border-glow flex flex-col justify-between p-6 overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            borderRight: `4px solid ${project.color}`,
          }}
        >
          {/* Glow blob bottom-left */}
          <div
            className="absolute bottom-0 left-0 w-40 h-40 rounded-full blur-3xl opacity-10 pointer-events-none"
            style={{ background: project.color }}
          />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="text-2xl" style={{ filter: `drop-shadow(0 0 8px ${project.color}88)` }}>
                {project.icon}
              </div>
              <h3 className="text-lg font-bold" style={{ color: project.color }}>
                {project.title}
              </h3>
            </div>
            <p className="text-sm leading-relaxed line-clamp-4" style={{ color: "var(--color-text-secondary)" }}>
              {project.longDescription}
            </p>
          </div>

          <div className="relative z-10 flex gap-3 mt-4">
            {project.githubLink && (
              <motion.a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex-1 py-2 rounded-xl text-sm font-semibold text-center"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "var(--color-text)",
                }}
                whileHover={{ scale: 1.04, background: "rgba(255,255,255,0.12)" }}
              >
                GitHub →
              </motion.a>
            )}
            {project.deploymentLink && (
              <motion.a
                href={project.deploymentLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex-1 py-2 rounded-xl text-sm font-semibold text-center"
                style={{
                  background: `${project.color}22`,
                  border: `1px solid ${project.color}44`,
                  color: project.color,
                }}
                whileHover={{ scale: 1.04, background: `${project.color}33` }}
              >
                Live ↗
              </motion.a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Projects ─────────────────────────────────────────────────────────────────

const Projects = ({ color: _ }: { color?: string }) => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<Project["status"] | "all">("all");
  const projects = useProjects();

  const filtered = filter === "all" ? projects : projects.filter((p) => p.status === filter);

  return (
    <section
      id="projects"
      className="relative w-full overflow-hidden"
      style={{ background: "var(--color-base)", padding: "6rem 10vw" }}
    >
      <motion.div
        className="absolute -top-20 right-0 w-[36rem] h-[36rem] rounded-full blur-3xl pointer-events-none"
        style={{ background: "rgba(255,45,107,0.05)" }}
        animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 -left-20 w-[28rem] h-[28rem] rounded-full blur-3xl pointer-events-none"
        style={{ background: "rgba(108,99,255,0.06)" }}
        animate={{ y: [0, 28, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <div className="relative z-10 w-full">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.span
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
            style={{
              background: "rgba(255,45,107,0.12)",
              border: "1px solid rgba(255,45,107,0.3)",
              color: "var(--color-accent-3)",
            }}
            animate={{ boxShadow: ["0 0 0px rgba(255,45,107,0)", "0 0 18px rgba(255,45,107,0.45)", "0 0 0px rgba(255,45,107,0)"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            Portfolio
          </motion.span>
          <h2 className="text-4xl sm:text-5xl font-bold" style={{ color: "var(--color-text)" }}>
            {t("Projekte")}
          </h2>
          <motion.div
            className="mx-auto mt-3 h-0.5 rounded-full"
            style={{ background: "linear-gradient(90deg, var(--color-accent), var(--color-accent-2), var(--color-accent-3))" }}
            initial={{ width: 0 }}
            whileInView={{ width: "8rem" }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
          <p className="mt-3 text-base" style={{ color: "var(--color-muted)" }}>
            {t("Klick auf eine Karte für mehr Details")}
          </p>
        </motion.div>

        {/* Filter buttons */}
        <div className="flex gap-2 justify-center mb-8 flex-wrap">
          {(["all", "live", "wip", "planned"] as const).map((status, si) => {
            const statusLabels: Record<typeof status, string> = {
              all:     t("Alle"),
              live:    t("Live"),
              wip:     t("In Arbeit"),
              planned: t("Geplant"),
            };
            return (
              <motion.button
                key={status}
                onClick={() => setFilter(status)}
                className="px-4 py-1.5 rounded-full text-sm font-medium capitalize"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{
                  background: filter === status ? "rgba(255,45,107,0.15)" : "transparent",
                  border: filter === status ? "1px solid rgba(255,45,107,0.4)" : "1px solid rgba(255,255,255,0.08)",
                  color: filter === status ? "var(--color-accent-3)" : "var(--color-muted)",
                }}
                transition={{ delay: si * 0.07, duration: 0.35 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
              >
                {statusLabels[status]}
              </motion.button>
            );
          })}
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;
