import { useRef, useEffect, useState } from "react";
import { motion, useInView, useAnimate } from "framer-motion";
import { useTranslation } from "react-i18next";

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

const BOX_W = 64;
const BOX_H = 64;
const LID_H = 20;

const WAYPOINTS = [
  { id: "github", icon: "🐙", label: "GitHub\nActions", color: "#a78bfa" },
  { id: "harbor", icon: "⚓", label: "Harbor\nRegistry", color: "#00d4ff" },
  { id: "server", icon: "🖥️", label: "Production\nServer", color: "#ff2d6b" },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
      style={{
        background: "rgba(0,212,255,0.10)",
        border: "1px solid rgba(0,212,255,0.3)",
        color: "var(--color-accent-2)",
      }}
    >
      {children}
    </span>
  );
}

function InfoCard({
  icon, title, body, color, delay, inView,
}: { icon: string; title: string; body: string; color: string; delay: number; inView: boolean }) {
  return (
    <motion.div
      className="glass rounded-2xl p-5 border-glow flex flex-col gap-2 relative overflow-hidden"
      style={{ borderTop: `3px solid ${color}` }}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ scale: 1.02, boxShadow: `0 0 28px ${color}44` }}
    >
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0"
        style={{ background: `radial-gradient(circle at 50% 0%, ${color}18, transparent 70%)` }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      <span className="text-2xl">{icon}</span>
      <h4 className="font-bold text-sm sm:text-base" style={{ color }}>{title}</h4>
      <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>{body}</p>
    </motion.div>
  );
}

function JourneyAnimation({ inView }: { inView: boolean }) {
  const [scope, animate] = useAnimate();
  const waypointRefs = useRef<(HTMLDivElement | null)[]>([null, null, null]);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 640);
  const loopRef = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const h = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);

  useEffect(() => {
    if (!inView || loopRef.current) return;
    loopRef.current = true;
    let alive = true;

    const run = async () => {
      while (alive) {
        const container = scope.current as HTMLElement | null;
        if (!container) break;
        const cRect = container.getBoundingClientRect();

        const boxLeft = isMobile ? cRect.width / 2 - BOX_W / 2 : 8;
        const boxTop  = isMobile ? 8 : cRect.height / 2 - BOX_H / 2;

        await animate(".journey-box", { x: 0, y: 0 }, { duration: 0 });
        await animate(".box-lid",    { y: -(LID_H + 6) }, { duration: 0 });
        await animate(".code-icon",  { opacity: 0, y: -52 }, { duration: 0 });

        await sleep(600);

        // code drops in
        await animate(".code-icon", { opacity: 1, y: 0 }, {
          duration: 0.55,
          ease: [0.34, 1.56, 0.64, 1],
        });
        await sleep(300);

        // lid closes
        await animate(".box-lid", { y: 0 }, { duration: 0.3, ease: [0.4, 0, 0.2, 1] });
        await animate(".journey-box", { rotate: [-2, 2, -1, 1, 0] }, { duration: 0.35 });
        await sleep(500);

        // travel through waypoints
        for (let i = 0; i < WAYPOINTS.length; i++) {
          const wpEl = waypointRefs.current[i];
          if (!wpEl || !alive) break;
          const wpRect = wpEl.getBoundingClientRect();

          const dx = isMobile ? 0 : wpRect.left - cRect.left + wpRect.width / 2 - BOX_W / 2 - boxLeft;
          const dy = isMobile ? wpRect.top - cRect.top + wpRect.height / 2 - BOX_H / 2 - boxTop : 0;

          await animate(".journey-box", { x: dx, y: dy }, { duration: 0.65, ease: [0.4, 0, 0.2, 1] });

          await animate(`#wp-${WAYPOINTS[i].id}`, {
            scale: [1, 1.28, 1],
            boxShadow: [
              `0 0 0px ${WAYPOINTS[i].color}00`,
              `0 0 36px ${WAYPOINTS[i].color}ee`,
              `0 0 12px ${WAYPOINTS[i].color}55`,
            ],
          }, { duration: 0.55 });

          await sleep(250);
        }

        // travel to end
        const endDx = isMobile ? 0 : cRect.width - BOX_W - 8 - boxLeft;
        const endDy = isMobile ? cRect.height - BOX_H - 8 - boxTop : 0;
        await animate(".journey-box", { x: endDx, y: endDy }, { duration: 0.65, ease: [0.4, 0, 0.2, 1] });
        await sleep(350);

        // lid opens
        await animate(".box-lid", { y: -(LID_H + 6) }, { duration: 0.35, ease: [0.4, 0, 0.2, 1] });
        await sleep(200);

        // code floats out
        await animate(".code-icon", { opacity: 0, y: -55 }, { duration: 0.65, ease: "easeIn" });
        await sleep(1600);
      }
    };

    run().catch(() => {});
    return () => { alive = false; loopRef.current = false; };
  }, [inView, isMobile, animate, scope]);

  return (
    <div
      ref={scope}
      className="relative w-full rounded-2xl overflow-hidden"
      style={{
        height: isMobile ? "420px" : "180px",
        background: "rgba(12,12,24,0.7)",
        border: "1px solid rgba(108,99,255,0.18)",
      }}
    >
      {/* Track line */}
      <div
        className="absolute pointer-events-none"
        style={
          isMobile
            ? { left: "50%", transform: "translateX(-50%)", top: 0, bottom: 0, width: 2,
                background: "linear-gradient(to bottom, #6c63ff55, #a78bfa55, #00d4ff55, #ff2d6b55)" }
            : { top: "50%", transform: "translateY(-50%)", left: 0, right: 0, height: 2,
                background: "linear-gradient(to right, #6c63ff55, #a78bfa55, #00d4ff55, #ff2d6b55)" }
        }
      />

      {/* Waypoints */}
      <div
        className="absolute inset-0 flex items-center"
        style={{ flexDirection: isMobile ? "column" : "row", justifyContent: "space-around" }}
      >
        {WAYPOINTS.map((wp, i) => (
          <div
            key={wp.id}
            id={`wp-${wp.id}`}
            ref={(el) => { waypointRefs.current[i] = el; }}
            className="flex flex-col items-center justify-center gap-1 z-10"
            style={{
              width: 84, height: 84,
              borderRadius: 18,
              background: `${wp.color}0e`,
              border: `2px solid ${wp.color}33`,
              flexShrink: 0,
            }}
          >
            <span style={{ fontSize: 30, lineHeight: 1 }}>{wp.icon}</span>
            <span
              className="font-semibold text-center leading-tight"
              style={{ fontSize: 9, color: wp.color, maxWidth: 72, whiteSpace: "pre-line" }}
            >
              {wp.label}
            </span>
          </div>
        ))}
      </div>

      {/* Travelling Docker container box */}
      <div
        className="journey-box"
        style={{
          position: "absolute",
          width: BOX_W,
          height: BOX_H,
          zIndex: 20,
          left: isMobile ? `calc(50% - ${BOX_W / 2}px)` : "8px",
          top:  isMobile ? "8px" : `calc(50% - ${BOX_H / 2}px)`,
        }}
      >
        {/* ── Docker-blue body ── */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(160deg, #0f1b2d 0%, #0a2540 100%)",
          border: "2px solid #00acf0",
          borderRadius: 10,
          boxShadow: "0 0 18px rgba(0,172,240,0.45), inset 0 0 12px rgba(0,172,240,0.08)",
          zIndex: 1,
          overflow: "hidden",
        }}>
          {/* stacked container lines (Docker logo motif) */}
          {[14, 22, 30].map((top, i) => (
            <div key={i} style={{
              position: "absolute",
              left: 8, right: 8,
              top,
              height: 5,
              borderRadius: 2,
              background: `rgba(0,172,240,${0.25 + i * 0.12})`,
              border: "1px solid rgba(0,172,240,0.4)",
            }} />
          ))}
          {/* subtle whale-blue tint at bottom */}
          <div style={{
            position: "absolute",
            left: 0, right: 0, bottom: 0,
            height: 14,
            background: "linear-gradient(to top, rgba(0,172,240,0.18), transparent)",
          }} />
        </div>

        {/* ── Lid (top panel, same Docker blue) ── */}
        <div
          className="box-lid"
          style={{
            position: "absolute",
            top: 0, left: 3, right: 3,
            height: LID_H,
            background: "linear-gradient(135deg, #00acf0, #0076a8)",
            borderRadius: "8px 8px 0 0",
            zIndex: 3,
            boxShadow: "0 -4px 16px rgba(0,172,240,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Tiny Docker whale mark on the lid */}
          <svg viewBox="0 0 24 14" width="28" height="14" fill="none">
            {[
              {x:1,y:0,w:4,h:3},{x:6,y:0,w:4,h:3},{x:11,y:0,w:4,h:3},
              {x:1,y:4,w:4,h:3},{x:6,y:4,w:4,h:3},
              {x:1,y:8,w:4,h:3},
            ].map((r,i) => (
              <rect key={i} x={r.x} y={r.y} width={r.w} height={r.h} rx="0.6" fill="rgba(255,255,255,0.75)" />
            ))}
          </svg>
        </div>

        {/* ── Code icon (drops in / floats out) ── */}
        <div
          className="code-icon"
          style={{
            position: "absolute",
            top: LID_H + 4, left: 0, right: 0, bottom: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 5, fontSize: 20, pointerEvents: "none",
          }}
        >
          💻
        </div>
      </div>
    </div>
  );
}

export default function CiCd() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const animInView = useInView(animRef, { once: true, margin: "-60px" });

  const cards = [
    {
      icon: "🐙", title: "GitHub Actions", color: "#a78bfa",
      body: t("Jeder Push triggert automatisch eine Pipeline: Tests laufen, der Docker-Build startet und das Image landet im Registry – vollautomatisch, ohne manuellen Eingriff."),
    },
    {
      icon: "🐳", title: "Docker", color: "#00acf0",
      body: t("Der Code wird in ein reproduzierbares Docker-Image verpackt. Gleiche Umgebung, egal ob lokal, auf dem CI-Server oder in Produktion. Kein 'works on my machine'."),
    },
    {
      icon: "⚓", title: "Harbor Registry", color: "#00d4ff",
      body: t("Images werden in einer selbst gehosteten Harbor-Registry versioniert gespeichert. Jedes Build-Tag ist auditierbar – Rollbacks in Sekunden möglich."),
    },
    {
      icon: "🚀", title: t("Automatisches Deployment"), color: "#ff2d6b",
      body: t("Nach erfolgreichem Merge in den Ziel-Branch deployt die Action das neue Image direkt auf den Server. Dev, Staging, Live – jede Umgebung hat ihre eigene Pipeline."),
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ background: "var(--color-base)", padding: "6rem 5vw" }}
    >
      <motion.div
        className="absolute -top-32 -right-32 w-[36rem] h-[36rem] rounded-full blur-3xl pointer-events-none"
        style={{ background: "rgba(0,212,255,0.04)" }}
      />
      <motion.div
        className="absolute -bottom-24 -left-24 w-[28rem] h-[28rem] rounded-full blur-3xl pointer-events-none"
        style={{ background: "rgba(108,99,255,0.05)" }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <SectionLabel>DevOps · CI/CD · Automation</SectionLabel>
          <h2 className="text-4xl sm:text-5xl font-bold mb-3" style={{ color: "var(--color-text)" }}>
            {t("Automation is Key")}
          </h2>
          <p className="text-base sm:text-lg max-w-2xl mx-auto" style={{ color: "var(--color-text-secondary)" }}>
            {t("Von der ersten Zeile Code bis zum Live-Deployment – vollständig automatisiert. Kein manuelles Eingreifen, keine Überraschungen.")}
          </p>
        </motion.div>

        <motion.div
          ref={animRef}
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <p className="text-center text-xs font-mono uppercase tracking-widest mb-4" style={{ color: "var(--color-muted)" }}>
            {t("Der Weg des Codes")}
          </p>
          <JourneyAnimation inView={animInView} />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {cards.map((card, i) => (
            <InfoCard key={card.title} {...card} delay={0.15 + i * 0.1} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
