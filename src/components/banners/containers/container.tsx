import Paper from '@mui/material/Paper';
// We can import SxProps safely because types are stripped in the build process
// eslint-disable-next-line no-restricted-imports
import { SxProps } from '@mui/material';
import { styled } from '@mui/system';
import Typography from '@mui/material/Typography';


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
    width: width || '200px',
    height: height || '200px',
    [theme.breakpoints.down('sm')]: {
      width: '70px',
      height: '70px',
    },
}));


const NewBanner = ({logo, title, subtitle, dark = false, spin = false, sx, logoSx}: {logo: string | JSX.Element, title: string, subtitle: string, dark?: boolean, spin?: boolean, sx?: SxProps, logoSx?: SxProps}) => {
  return (
    <BannerContainer sx={{...sx, color: dark ? "white" : "black", height: "110%"}}>
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