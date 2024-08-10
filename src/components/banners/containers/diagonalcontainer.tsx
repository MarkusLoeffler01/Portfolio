import TypeScriptLogo from '@assets/typescript.svg?react';
import JavaScriptLogo from '@assets/javascript.svg?react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';

function getMode(mode: "light" | "dark") {
    return mode === "light" ? "#0a0d7a" : "#0a0d7a";
}

export const BannerContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  width: '75%',
  backgroundColor: getMode(theme.palette.mode),
  padding: theme.spacing(2),
  borderRadius: '15px',
  position: 'relative',
}));

export const Logo = styled('img')(({ theme }) => ({
  width: '100px',
  height: '100px',
  [theme.breakpoints.down('sm')]: {
    width: '70px',
    height: '70px',
  },
}));

const BackgroundLeft = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: '#252525',
  clipPath: 'polygon(0 0, 50% 0, 100% 100%, 0% 100%)',
  borderRadius: '15px',
});

const BackgroundRight = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: '#757575',
  clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 0 100%)',
  borderRadius: '15px',
});

const DiagonalCutSVG = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& svg': {
    width: '100%',
    height: '100%',
  },
});

const Banner = () => {
  return (
    <BannerContainer>
      <BackgroundLeft />
      <BackgroundRight />
      <DiagonalCutSVG>
        <svg width="400" height="400" viewBox="0 0 400 400">
          <defs>
            <clipPath id="clipPath1">
              <polygon points="0,0 250,0 400,400 0,400" />
            </clipPath>
            <clipPath id="clipPath2">
              <polygon points="250,0 400,0 400,400 0,400" />
            </clipPath>
          </defs>

          {/* Erstes SVG */}
          <g clipPath="url(#clipPath1)">
            <TypeScriptLogo width="400" height="400" />
          </g>

          {/* Zweites SVG */}
          <g clipPath="url(#clipPath2)">
            <JavaScriptLogo width="400" height="400" />
          </g>
        </svg>
      </DiagonalCutSVG>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        TypeScript && JavaScript
      </Typography>
    </BannerContainer>
  );
};

export default Banner;
