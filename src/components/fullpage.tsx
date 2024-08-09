import React from "react"

import "@css/waves.css";
import Wave from "./shapes/wavesOpacity";
import { marginBottomFromViewHeight } from "@/ts/calc";


const FullPageWrapper = ({ children }: { children: React.ReactNode }) => {
    return React.Children.map(children, (child, index) => {
            if(!React.isValidElement(child)) return child;
            return <div 
            key={index} 
            style={{ 
              height: '100vh',
              minWidth: "100vh",
              width: '100vw',
              // marginBottom: "-5%", //! Change marginBottom with height of child to increase size of page
              marginBottom: `${Math.ceil(marginBottomFromViewHeight(child.props.viewHeight))}%`,
            }}
          >
            <div style={{ 
              backgroundColor: child.props.color ?? "",
              zIndex: -1,
              width: '100vw', 
              // height: "90vh", //! Change height with parent marginBottom to increase size of page
              height: child.props.viewHeight ? `${child.props.viewHeight}vh` : "100vh",
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
            }}>
              <div className={`${child.props.disableViewWidth || "w-[70vw]"} ${index !== 0 && "mt-[15vh]" }`} >
                {{...child, props: {...child.props}}}
              </div>
            </div>
            <Wave fill={child.props.color}/>
          </div>
        })
};
  

export default FullPageWrapper;