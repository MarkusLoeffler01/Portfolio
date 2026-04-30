import { forwardRef, useEffect, useState } from "react";
import "@css/NeonBox.css";

interface NeonBoxProps {
  backgroundColor?: string;
  hoverBackgroundColor?: string;
  margin?: string;
  children: React.ReactNode;
  className?: string;
}

const NeonBox = forwardRef<HTMLDivElement, NeonBoxProps>(
  ({ backgroundColor, hoverBackgroundColor, margin, children, className }, ref) => {
    const bg =
      backgroundColor ??
      `linear-gradient(black, black), radial-gradient(circle at top left, #ff00ff, #ffff00, #00ffff, #39FF14)`;

    return (
      <div
        ref={ref}
        className={className}
        style={{
          width: "70%",
          maxWidth: "500px",
          minHeight: "150px",
          marginTop: margin ?? "150px",
          marginBottom: margin ?? "150px",
          marginLeft: "70px",
          marginRight: "70px",
          border: "double 4px transparent",
          borderRadius: "16px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "1.2rem",
          fontWeight: "bold",
          textAlign: "center",
          backgroundImage: bg,
          backgroundOrigin: "border-box",
          backgroundClip: "content-box, border-box",
          transition: "all 0.3s ease",
          // CSS custom-property trick for hover – handled via onMouseEnter/Leave
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget;
          el.style.transform = "scale(1.05)";
          el.style.boxShadow =
            "0 0 20px rgba(255,255,255,0.6), 0 0 60px rgba(255,255,255,0.8)";
          el.style.backgroundColor = hoverBackgroundColor ?? "#111";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget;
          el.style.transform = "";
          el.style.boxShadow = "";
          el.style.backgroundColor = "";
        }}
      >
        {children}
      </div>
    );
  }
);

NeonBox.displayName = "NeonBox";

export default NeonBox;

interface LineProps {
  boxRefs: React.RefObject<HTMLDivElement | null>[];
}

export const NewLine = ({ boxRefs }: LineProps) => {
  const [paths, setPaths] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 600);

  // Native media query – no MUI needed
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 599px)");
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const updatePaths = () => {
      const newPaths: string[] = [];

      for (let i = 0; i < boxRefs.length - 1; i++) {
        const startBox = boxRefs[i].current;
        const endBox = boxRefs[i + 1].current;

        if (!startBox || !endBox) continue;

        const startRect = startBox.getBoundingClientRect();
        const endRect = endBox.getBoundingClientRect();

        const svg = document.getElementById("line-svg");
        if (!svg) continue;
        const svgRect = svg.getBoundingClientRect();

        const startX = startRect.left + startRect.width / 2 - svgRect.left;
        const startY = startRect.bottom - svgRect.top;
        let endX = endRect.left + endRect.width / 2 - svgRect.left;
        const endY = endRect.top - svgRect.top;

        if (startX === endX && startY === endY) {
          endX += 1;
        }

        const middleY = (startY + endY) / 2;

        const d = `
          M ${startX},${startY}
          L ${startX},${middleY}
          L ${endX},${middleY}
          L ${endX},${endY}
        `;

        newPaths.push(d);
      }

      setPaths(newPaths);
    };

    updatePaths();
    window.addEventListener("resize", updatePaths);
    window.addEventListener("scroll", updatePaths);

    return () => {
      window.removeEventListener("resize", updatePaths);
      window.removeEventListener("scroll", updatePaths);
    };
  }, [boxRefs]);

  return (
    <svg
      id="line-svg"
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
    >
      <defs>
        <linearGradient
          id="grad1"
          x1="0%"
          y1="0%"
          x2={isMobile ? "0%" : "100%"}
          y2={isMobile ? "100%" : undefined}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="33.33%" stopColor="#ff00ff" stopOpacity={1} />
          <stop offset="66.66%" stopColor="#ffff00" stopOpacity={1} />
          <stop offset="99.99%" stopColor="#39FF14" stopOpacity={1} />
        </linearGradient>
      </defs>
      {paths.map((d, index) => (
        <path key={index} d={d} stroke="url(#grad1)" strokeWidth="2" fill="none" />
      ))}
    </svg>
  );
};

interface NeonBoxProps {
  backgroundColor?: string;
  hoverBackgroundColor?: string;
  margin?: string;
  children: React.ReactNode;
  className?: string;
}
