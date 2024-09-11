import NeonBox, { NewLine } from "@/components/NeonBox";
import React from "react";

function Flow({ className: _, color: __, viewHeight: ___ }: { className: string, color: string, viewHeight: number }) {
    const boxData = [
      { id: 1, text: "Box 1", className: "box left-box" },
      { id: 2, text: "Box 2", className: "box right-box" },
      { id: 3, text: "Box 3", className: "box left-box" },
      { id: 4, text: "Box 4", className: "box right-box" },
      { id: 5, text: "Box 5", className: "box left-box" },
      { id: 6, text: "Box 6", className: "box right-box" },
  
    ];
  
    // Initialisiere hier ein Array von Refs, aber rufe useRef nur einmal pro Box auf
    // const boxRefs = useRef<(HTMLDivElement | null)[]>([]); // Array für alle Box-Refs
    const boxRefs = React.useRef(boxData.map(() => React.createRef<HTMLDivElement>()));
  
    // Fülle das Array nur einmal beim Rendern
    // if (boxRefs.current.length !== boxData.length) {
    //   boxRefs.current = boxData.map(() => null);
    // }
  
    return (
      <div className="grid-container">
        <NewLine boxRefs={boxRefs.current} />
        {boxData.map((box, index) => (
          <React.Fragment key={box.id}>
            {/* Zuweisen der Referenz zu jedem NeonBox */}
            <NeonBox className={box.className} ref={boxRefs.current[index]}>
              {box.text}
            </NeonBox>
          </React.Fragment>
        ))}
      </div>
    );
}

export default Flow;