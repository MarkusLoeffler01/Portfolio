import React, { useRef } from 'react';
import NeonBox, { Line } from '@components/NeonBox'; // Dein vorhandenes NeonBox-Modul

// Interface zur Definition der Boxen
interface BoxData {
  id: number;
  text: string;
  backgroundColor?: string;
  hoverBackgroundColor?: string;
  className: string;
}

const App: React.FC = () => {
  // Erstelle eine Liste von Boxen mit dynamischen Eigenschaften
  const boxes: BoxData[] = [
    { id: 1, text: 'Box 1', className: 'left-box' },
    { id: 2, text: 'Box 2', className: 'right-box' },
  ];

  const startBoxRef = useRef<HTMLDivElement>(null);
  const endBoxRef = useRef<HTMLDivElement>(null);

  return (
    <div className="container">
      {boxes.map((box, index) => (
        <React.Fragment key={box.id}>
          {/* NeonBox-Komponente wird hier verwendet */}
          <NeonBox
            backgroundColor={box.backgroundColor}
            hoverBackgroundColor={box.hoverBackgroundColor}
            className={box.className}
            ref={index === 0 ? startBoxRef : endBoxRef} // Bindet Referenzen an die Boxen
          >
            {box.text}
          </NeonBox>
        </React.Fragment>
      ))}

      {/* Linie wird nur gerendert, wenn wir zwei Boxen haben */}
      {boxes.length === 2 && <Line startBoxRef={startBoxRef} endBoxRef={endBoxRef} />}
    </div>
  );
};

export default App;
