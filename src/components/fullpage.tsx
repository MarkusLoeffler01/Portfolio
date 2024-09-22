import React, { Fragment } from "react";
import "@css/waves.css";
import Wave from "./shapes/wavesOpacity";

interface FullPageWrapperProps {
  children: React.ReactNode;
}

const FullPageWrapper: React.FC<FullPageWrapperProps> = ({ children }) => {
  return (
    <>
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child;

        const { viewHeight = 100, color = "", noWave, className } = child.props as {
          height: string;
          viewHeight: number;
          color: string;
          noWave: boolean;
          className: string;
        };

        return (
          <Fragment key={index}>
            <div
              style={{
                height: `${viewHeight}vh`,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
                justifyContent: "space-between",
                // paddingBottom: `${Math.ceil(marginBottomFromViewHeight(viewHeight))}%`,
                // paddingTop: "8%",

                // marginBottom: `${Math.ceil(marginBottomFromViewHeight(viewHeight))}%`,
              }}
            >
              <div
                style={{
                  backgroundColor: color,
                  width: "100%",
                  height: `${viewHeight}vh`,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  //Adjusting the scaling based on screen width
                  transform: "scale(calc(1 - 0.005 * (100 - (100% / 10))))",
                  // transform: "scale(1)",
                  transition: "transform 0.3s ease"
                }}
              >
                <div className={`${className ?? ""}${className?.includes("w-") ? "" : "w-[70%]"} ${index !== 0 ? "mt-[15vh]" : ""} max-w-[100%] min-w-[60%] z-10`}>
                  {React.cloneElement(child, { ...child.props })}
                </div>
              </div>
            </div>
            {!noWave && <Wave fill={color} />}
          </Fragment>
        );
      })}
    </>
  );
};

export default FullPageWrapper;
