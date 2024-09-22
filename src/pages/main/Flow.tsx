import NeonBox, { NewLine } from "@/components/NeonBox";
import React from "react";
import Typography from "@mui/material/Typography";

function Flow({ className: _, color: __, viewHeight: ___ }: { className: string, color: string, viewHeight: number }) {


  /**
   * Steps:
   * 1. Writing code
   * 2. Pushing to branch
   * 3. Writing and validating tests
   * 4. Creating a pull request
   * 5. Reviewing the pull request and merging into dev
   * 6. Action deploys the code to the dev environment
   * 7. Testing the dev environment
   * 8. Creating a PR to main
   * 9. Action deploys the code to the staging environment
   * 10. Testing the staging environment
   * 11. Merge the PR to main
   * 12. Action deploys the code to the production environment
   * 
   */


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
      "Staging--Umgebung wird getestet",
      "Durch merge wird main zu live-Umgebung deployed",
      // { id: 13, text: "Box 6", className: "box left-box" },
  
    ];
  
    // Initialisiere hier ein Array von Refs, aber rufe useRef nur einmal pro Box auf
    // const boxRefs = useRef<(HTMLDivElement | null)[]>([]); // Array für alle Box-Refs
    const boxRefs = React.useRef(boxData.map(() => React.createRef<HTMLDivElement>()));
  
    // Fülle das Array nur einmal beim Rendern
    // if (boxRefs.current.length !== boxData.length) {
    //   boxRefs.current = boxData.map(() => null);
    // }
  
    return (
      <>
      <Typography variant="h3" className="text-center mt-5">Lifecycle meiner Dev-Umgebung</Typography>
      <div className="grid-container">
        <NewLine boxRefs={boxRefs.current} />
        {boxData.map((text, index) => (
          <React.Fragment key={index}>
            {/* Zuweisen der Referenz zu jedem NeonBox */}
            <NeonBox className={"box " + (index % 2 === 0 ? "left-box" : "right-box")} ref={boxRefs.current[index]}>
              {text}
            </NeonBox>
          </React.Fragment>
        ))}
      </div>
      </>
    );
}

export default Flow;