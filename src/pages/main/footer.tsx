import { motion } from "framer-motion";
import GithubLogo from "@assets/github.svg?react";
import LinkedInLogo from "@assets/linkedin.svg?react";
import { useTranslation } from "react-i18next";

const SOCIALS = [
  {
    label: "LinkedIn",
    color: "#0a66c2",
    href: "https://www.linkedin.com/in/markus-l%C3%B6ffler-859559318/",
    icon: <LinkedInLogo style={{ width: 28, height: 28, fill: "currentColor" }} />,
  },
  {
    label: "GitHub",
    color: "#ffffff",
    href: "https://github.com/MarkusLoeffler01",
    icon: <GithubLogo style={{ width: 28, height: 28, fill: "currentColor" }} />,
  },
  {
    label: "Email",
    color: "#6c63ff",
    href: "mailto:markus.loeffler01@gmail.com",
    icon: <span style={{ fontSize: 24 }}>✉</span>,
  },
];

export default function Footer({
  color: _,
}: {
  color?: string;
  viewHeight?: number;
  height?: number | string;
  noWave?: boolean;
}) {
  const { t } = useTranslation();
  return (
    <footer
      id="footer"
      className="relative w-full"
      style={{ background: "var(--color-surface)" }}
    >
      {/* Angle divider top */}
      <div
        className="absolute top-0 left-0 right-0 h-16 pointer-events-none"
        style={{
          background: "var(--color-base)",
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 0)",
        }}
      />
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          {/* Branding */}
          <div className="text-center md:text-left">
            <p className="font-pacifico text-3xl text-shimmer mb-2">Markus Löffler</p>
            <p className="text-sm" style={{ color: "var(--color-muted)" }}>
              {t("Full-Stack Developer · Open-Source Befürworter")}
            </p>
          </div>

          {/* Socials */}
          <div className="flex gap-4">
            {SOCIALS.map(({ label, color, href, icon }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass rounded-2xl w-14 h-14 flex items-center justify-center"
                style={{ color, borderColor: `${color}33` }}
                whileHover={{
                  scale: 1.12,
                  boxShadow: `0 0 20px ${color}66`,
                  borderColor: `${color}88`,
                }}
                whileTap={{ scale: 0.96 }}
                title={label}
              >
                {icon}
              </motion.a>
            ))}
          </div>

          {/* Legal */}
          <div className="flex flex-col items-center md:items-end gap-2 text-sm">
            <a
              href="/impressum"
              target="_blank"
              style={{ color: "var(--color-muted)" }}
              className="hover:text-white transition-colors"
            >
              {t("Impressum")}
            </a>
            <a
              href="/datenschutz"
              target="_blank"
              style={{ color: "var(--color-muted)" }}
              className="hover:text-white transition-colors"
            >
              {t("Datenschutzerklärung")}
            </a>
          </div>
        </div>

        {/* Divider */}
        <div
          className="my-8 h-px"
          style={{ background: "linear-gradient(to right, transparent, rgba(108,99,255,0.3), transparent)" }}
        />

        {/* Bottom bar */}
        <p className="text-center text-xs" style={{ color: "var(--color-muted)" }}>
          © {new Date().getFullYear()} Markus Löffler. Built with ❤️, React & Three.js
        </p>
      </div>
    </footer>
  );
}
