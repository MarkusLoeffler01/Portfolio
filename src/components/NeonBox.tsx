import { forwardRef, useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import "@css/NeonBox.css";


interface NeonBoxProps {
  backgroundColor?: string;
  hoverBackgroundColor?: string;
  children: React.ReactNode;
  className: string;
}

const StyledNeonBox = styled(Box)(({ backgroundColor, hoverBackgroundColor }: { backgroundColor?: string, hoverBackgroundColor?: string }) => ({
  width: "500px",
  height: "200px",
  border: "double 4px transparent",
  borderRadius: "16px",
  backgroundImage: backgroundColor ?? `linear-gradient(black , black),` + `radial-gradient(circle at top left, #ff00ff, #ffff00, #00ffff, #39FF14)`,
  backgroundOrigin: "border-box",
  backgroundClip: "content-box, border-box",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "scale(1.2)",
    boxShadow: "0 0 20px rgba(255, 255, 255, 0.6), 0 0 60px rgba(255, 255, 255, 0.8)",
    backgroundColor: hoverBackgroundColor ?? '#111',  // Leicht veränderte Hintergrundfarbe beim Hover
  }
}));



const NeonBox = forwardRef<HTMLDivElement, NeonBoxProps>(
  // eslint-disable-next-line react/prop-types
  ({ backgroundColor, hoverBackgroundColor, children, className }, ref) => {
    return (
      <StyledNeonBox
        ref={ref}
        backgroundColor={backgroundColor}
        hoverBackgroundColor={hoverBackgroundColor}
        className={className}
      >
        {children}
      </StyledNeonBox>
    );
  }
);

NeonBox.displayName = "NeonBox";

export default NeonBox;


interface LineProps {
  boxRefs: React.RefObject<HTMLDivElement>[];
}

export const NewLine = ({ boxRefs }: LineProps) => {
  const pathRefs = useRef<(SVGPathElement | null)[]>([]); // Ref for each path element
  const [paths, setPaths] = useState<string[]>([]);
  const ticking = useRef(false);

  useEffect(() => {
    const updatePaths = () => {
      const newPaths: string[] = [];

      for (let i = 0; i < boxRefs.length - 1; i++) {
        const startBoxRect = boxRefs[i].current?.getBoundingClientRect();
        const endBoxRect = boxRefs[i + 1].current?.getBoundingClientRect();

        if (!startBoxRect || !endBoxRect) continue;

        const startX = startBoxRect.left + startBoxRect.width / 2;
        const startY = startBoxRect.bottom;
        const endX = endBoxRect.left + endBoxRect.width / 2;
        const endY = endBoxRect.top;
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
      ticking.current = false;
    };


    const handleScrollImmediate = () => {
      updatePaths();
    };

    // ResizeObserver to handle box size changes
    const observer = new ResizeObserver(() => {
      updatePaths();
    });

    // Observe each box ref
    boxRefs.forEach((boxRef) => {
      if (boxRef.current) {
        observer.observe(boxRef.current);
      }
    });

    // Add both scroll handlers
    window.addEventListener("scroll", handleScrollImmediate, { passive: true });
    window.addEventListener("resize", updatePaths);

    updatePaths(); // Initial update

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScrollImmediate);
      window.removeEventListener("resize", updatePaths);
    };
  }, [boxRefs]);

  return (
    <svg
      className="line"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
      }}
    >
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%">
          <stop offset="33.33%" style={{ stopColor: '#ff00ff', stopOpacity: 1 }} />
          <stop offset="66.66%" style={{ stopColor: '#ffff00', stopOpacity: 1 }} />
          <stop offset="99.99%" style={{ stopColor: '#39FF14', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      {paths.map((d, index) => (
        <path key={index} d={d} ref={(el) => (pathRefs.current[index] = el)} />
      ))}
    </svg>
  );
};



/**
 * @deprecated use NewLine
 */
export const Line = ({ startBoxRef, endBoxRef }: { startBoxRef: React.RefObject<HTMLDivElement>, endBoxRef: React.RefObject<HTMLDivElement> }) => {
  const pathRef = useRef<SVGPathElement | null>(null);

  const [d, setD] = useState("");

  useEffect(() => {
    const path = pathRef.current;
    const leftBoxRect = startBoxRef.current?.getBoundingClientRect();
    const rightBoxRect = endBoxRef.current?.getBoundingClientRect();


    console.log(rightBoxRect);
    console.log(leftBoxRect);
    console.log(path);

    // Überprüfe, ob alle benötigten Elemente vorhanden sind
    if (!path || !leftBoxRect || !rightBoxRect) {
      console.warn("Path, leftBoxRect, or rightBoxRect is null. Skipping rendering.");
      return; // Verlasse die Funktion, falls eines der Elemente nicht existiert
    }


    // if (!path || !leftBoxRect || !rightBoxRect) throw new Error("Path, leftBoxRect, or rightBoxRect is null");

    const startX = leftBoxRect.left + leftBoxRect.width / 2;
    const startY = leftBoxRect.bottom;
    const middleY = (startY + rightBoxRect.top) / 2;
    const endX = rightBoxRect.left + rightBoxRect.width / 2;
    const endY = rightBoxRect.top;

    const d = `
      M ${startX},${startY} 
      L ${startX},${middleY}
      L ${endX},${middleY}
      L ${endX},${endY}
    `;

    setD(d);
  }, [startBoxRef, endBoxRef]);

  return (
    <svg className="line">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="33.33%" style={{ stopColor: '#ff00ff', stopOpacity: 1 }} />
          <stop offset="66.66%" style={{ stopColor: '#ffff00', stopOpacity: 1 }} />
          <stop offset="99.99%" style={{ stopColor: '#39FF14', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <path d={d} ref={pathRef} />
    </svg>
  );
};

