import React from "react";
import NeonBox, { NewLine } from "@/components/NeonBox";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTranslation } from "react-i18next";

function Flow({
  className: _,
  color: __,
  viewHeight: ___,
}: {
  className?: string;
  color?: string;
  viewHeight?: number;
}) {
  const { t } = useTranslation();
  const boxData = [
    t("Code in neuem Branch schreiben und pushen"),
    t("Tests schreiben und validieren"),
    t("Pull Request auf Dev-Branch erstellen"),
    t("Branch-Umgebung wird durch Action deployed"),
    t("Branch-Umgebung wird getestet"),
    t("Branch wird nach Validierung in Dev gemerged"),
    t("Dev-Umgebung wird durch Action deployed"),
    t("Dev-Umgebung wird getestet"),
    t("Pull Request auf main wird erstellt"),
    t("Staging-Umgebung wird durch Action deployed"),
    t("Staging-Umgebung wird getestet"),
    t("Durch Merge wird main zu Live-Umgebung deployed"),
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
        {t("Entwicklungsprozess")}
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
