import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useTranslation } from "react-i18next";

// Section IDs never change — kept at module level for stable useEffect dependency
const SECTION_IDS = ["hero", "about", "skills", "projects", "guestbook"] as const;

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function LanguageToggle() {
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith("en");

  return (
    <motion.button
      onClick={() => i18n.changeLanguage(isEn ? "de" : "en")}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
      style={{
        background: "rgba(108,99,255,0.12)",
        border: "1px solid rgba(108,99,255,0.3)",
        color: "var(--color-accent)",
      }}
      whileHover={{ scale: 1.06, background: "rgba(108,99,255,0.2)" }}
      whileTap={{ scale: 0.96 }}
    >
      <span>{isEn ? "🇩🇪" : "🇬🇧"}</span>
      <span>{isEn ? "DE" : "EN"}</span>
    </motion.button>
  );
}

const Navbar = () => {
  const { t } = useTranslation();
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [atTop, setAtTop] = useState(true);
  const { scrollY } = useScroll();

  const NAV_ITEMS = [
    { id: "hero",      label: t("Home") },
    { id: "about",     label: t("Über mich") },
    { id: "skills",    label: t("Fähigkeiten") },
    { id: "projects",  label: t("Projekte") },
    { id: "guestbook", label: t("Gästebuch") },
  ];

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(latest > prev && latest > 80);
    setAtTop(latest < 50);
  });

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveSection(visible[visible.length - 1].target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-8 py-3"
      style={{
        background: atTop ? "transparent" : "rgba(8,8,16,0.85)",
        backdropFilter: atTop ? "none" : "blur(20px)",
        WebkitBackdropFilter: atTop ? "none" : "blur(20px)",
        borderBottom: atTop ? "none" : "1px solid rgba(108,99,255,0.12)",
        transition: "background 0.3s, border-color 0.3s",
      }}
      variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Logo / Name */}
      <motion.button
        onClick={() => scrollTo("hero")}
        className="font-pacifico text-lg sm:text-xl text-shimmer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
      >
        ML
      </motion.button>

      {/* Nav links */}
      <div className="hidden sm:flex items-center gap-1">
        {NAV_ITEMS.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className="relative px-3 py-1.5 rounded-full text-sm font-medium transition-colors"
            style={{
              color: activeSection === item.id ? "var(--color-text)" : "var(--color-muted)",
            }}
            whileHover={{ color: "var(--color-text)" }}
          >
            {item.label}
            {activeSection === item.id && (
              <motion.div
                layoutId="nav-indicator"
                className="absolute inset-0 rounded-full"
                style={{ background: "rgba(108,99,255,0.15)", border: "1px solid rgba(108,99,255,0.3)" }}
                transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Right: Language toggle */}
      <div className="flex items-center gap-2">
        <LanguageToggle />
      </div>
    </motion.nav>
  );
};

export default Navbar;
