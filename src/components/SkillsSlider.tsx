// import AutoplaySlider from "react-awesome-slider/src/hoc/autoplay/index.js";
// import AwesomeSliderStyles from "react-awesome-slider/src/styled/fold-out-animation/fold-out-animation.scss";
import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";

function SkillSlider({children}: {children: React.ReactNode}) {

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const childrenCount = React.Children.count(children);
        if(childrenCount <= currentIndex) setCurrentIndex(0);
    }, [children, currentIndex]);

    function handleChange(now?: number, previous?: number) {
        //Check if the index of now is in the array of children
        console.log(now, previous);

        if(now === undefined) return;

        setTimeout(() => {
            const childrenCount = React.Children.count(children);
            if(childrenCount <= now) setCurrentIndex(0);
            else setCurrentIndex(now);
        }, 600);
    }

    return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
            <Carousel autoPlay onChange={handleChange} index={currentIndex} sx={{width: "100%", border: "1px solid white", borderRadius: "15px"}} swipe cycleNavigation fullHeightHover navButtonsAlwaysVisible stopAutoPlayOnHover duration={500} interval={2_000} height={"400px"} animation="slide">
                {children}
            </Carousel>
        </div>
}


export default SkillSlider;