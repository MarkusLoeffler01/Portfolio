import { Paper, SxProps } from '@mui/material';
import { styled } from '@mui/system';
import { Typography } from '@mui/material';
import { skillType } from '@/interfaces/skillType';

function getMode(mode: "light" | "dark") {
    return mode === "light" ? "#0a0d7a" : "#0a0d7a";
}

export const BannerContainer = styled(Paper)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: getMode(theme.palette.mode),
    padding: theme.spacing(2),
    borderRadius: '15px',
  }));
  
export const Logo = styled('img')(({ theme, width, height }) => ({
    width: width || '100px',
    height: height || '100px',
    [theme.breakpoints.down('sm')]: {
      width: '70px',
      height: '70px',
    },
}));


const NewBanner = ({type, logo, title, subtitle, dark = false, spin = false, sx, logoSx}: {type: skillType, logo: string | JSX.Element, title: string, subtitle: string, dark?: boolean, spin?: boolean, sx?: SxProps, logoSx?: SxProps}) => {
  return (
    <BannerContainer sx={{...sx, color: dark ? "white" : "black"}}>
      {typeof logo === "string" ? <Logo src={logo} sx={logoSx} className={[title.toString().toLocaleLowerCase(), "logo", spin && "spin"].join(" ")} alt="Logo" /> : logo}
      {title && <Typography variant="h4" component="h1" align="center" gutterBottom>
        {title}
      </Typography>}
      {subtitle && <Typography variant="h5" component="h1" align="center" gutterBottom>
        {subtitle}
      </Typography> }
    </BannerContainer>
  );

}

export default NewBanner;