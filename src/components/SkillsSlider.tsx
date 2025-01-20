import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import useMediaQuery from "@mui/material/useMediaQuery";
import useTheme from "@mui/material/styles/useTheme";

function SkillSlider({ children }: { children: React.ReactNode }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const theme = useTheme();

  // Medienabfrage, um die Bildschirmgröße zu ermitteln
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const childrenCount = React.Children.count(children);
    if (childrenCount <= currentIndex) setCurrentIndex(0);
  }, [children, currentIndex]);

  function handleChange(now?: number) {
    if (now === undefined) return;

    setTimeout(() => {
      const childrenCount = React.Children.count(children);
      if (childrenCount <= now) setCurrentIndex(0);
      else setCurrentIndex(now);
    }, 600);
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Carousel
        autoPlay
        onChange={handleChange}
        index={currentIndex}
        swipe
        indicators={!isMobile}
        cycleNavigation
        fullHeightHover
        stopAutoPlayOnHover
        duration={500}
        interval={2000}
        animation="slide"
        data-testid="carousel"
        className="carousel"
        navButtonsAlwaysVisible={!isMobile}
        height="400px"
        // Responsive Höhe mit dem sx-Prop
        sx={{
          width: "100%",
          border: "1px solid white",
          borderRadius: "15px",
        }}
      >
        {children}
      </Carousel>
    </div>
  );
}

export default SkillSlider;
