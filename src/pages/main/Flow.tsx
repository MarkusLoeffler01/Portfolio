import React from "react";
import NeonBox, { NewLine } from "@/components/NeonBox";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";

function Flow({
  className: _,
  color: __,
  viewHeight: ___,
}: {
  className?: string;
  color?: string;
  viewHeight?: number;
}) {
  const boxData = [
    "Code in neuem Branch schreiben und pushen.",
    "Tests schreiben und validieren",
    "Pull Request auf Dev-Branch erstellen",
    "Branch-Umgebung wird durch Action deployed",
    "Branch-Umgebung wird getestet",
    "Branch wird nach Validierung in Dev gemerged",
    "Dev-Umgebung wird durch Action deployed",
    "Dev-Umgebung wird getestet",
    "Pull Request auf main wird erstellt",
    "Staging-Umgebung wird durch Action deployed",
    "Staging-Umgebung wird getestet",
    "Durch Merge wird main zu Live-Umgebung deployed",
  ];

  const boxRefs = React.useRef(
    boxData.map(() => React.createRef<HTMLDivElement>())
  );

  const theme = useTheme();

    // Medienabfrage, um die Bildschirmgröße zu ermitteln
    const isSmaller = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <Typography variant="h3" className="text-center mt-5">
        Lifecycle meiner Dev-Umgebung
      </Typography>
      <div className="relative flex flex-col items-center md:grid md:grid-cols-2 md:gap-10">
        <NewLine boxRefs={boxRefs.current} />
        {boxData.map((text, index) => (
          <NeonBox
            margin={isSmaller ? "20px" : undefined}
            key={index}
            className={`my-10 w-11/12 md:w-full z-[99] ${
              index % 2 === 0 ? "md:justify-self-start" : "md:justify-self-end"
            }`}
            ref={boxRefs.current[index]}
          >
            {text}
          </NeonBox>
        ))}
      </div>
    </>
  );
}

export default Flow;
