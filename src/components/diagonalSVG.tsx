import TypeScriptLogo from '@assets/typescript.svg?react';
import JavaScriptLogo from '@assets/javascript.svg?react';
import { CSSProperties } from 'react';

const DiagonalCutSVG = ({css}: {css: CSSProperties}) => {
  return (
    <svg style={css} className="logo" width="100" height="100" viewBox="0 0 400 400" >
      <defs>
        <clipPath id="clipPath1">
          <polygon points="0,0 400,0 400,400 0,400" />
        </clipPath>
        <clipPath id="clipPath2">
          <polygon points="400,0 400,0 400,400 0,400" />
        </clipPath>
      </defs>

      {/* Erstes SVG */}
      <g clipPath="url(#clipPath1)">
        <TypeScriptLogo width="430" height="430" />
      </g>

      {/* Zweites SVG */}
      <g clipPath="url(#clipPath2)">
        <JavaScriptLogo width="400" height="400" />
      </g>
    </svg>
  );
};

export default DiagonalCutSVG;