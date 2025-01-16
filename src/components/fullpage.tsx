import React, { Fragment } from "react";
import "@css/waves.css";
import Wave from "./shapes/wavesOpacity";

interface FullPageWrapperProps {
  children: React.ReactElement<{color: string}>[];
}

const FullPageWrapper: React.FC<FullPageWrapperProps> = ({ children }) => {
  return (
    <>
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child;

        const { viewHeight = 100, color = "", noWave, className } = child.props as {
          height?: string;
          viewHeight?: number;
          color?: string;
          noWave?: boolean;
          className?: string;
        };

        return (
          <Fragment key={index}>
            <div
              style={{
                minHeight: `${viewHeight}vh`,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  backgroundColor: color,
                  width: "100%",
                  minHeight: `${viewHeight}vh`,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  className={`${className ?? ""} ${
                    className?.includes("w-") ? "" : "w-[70%]"
                  } max-w-[100%] min-w-[60%] z-10`}
                  style={{ marginTop: index !== 0 ? "5vh" : "0" }}
                >
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
