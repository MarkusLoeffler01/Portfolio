import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { keyframes } from '@mui/system';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { useTranslation } from 'react-i18next';

const glitch = keyframes`
  0% {
    text-shadow: 0.05em 0 0 #00fffc, -0.03em -0.04em 0 #fc00ff,
                 0.025em 0.04em 0 #fffc00;
  }
  15% {
    text-shadow: 0.05em 0 0 #00fffc, -0.03em -0.04em 0 #fc00ff,
                 0.025em 0.04em 0 #fffc00;
  }
  16% {
    text-shadow: -0.05em -0.025em 0 #00fffc, 0.025em 0.035em 0 #fc00ff,
                 -0.05em -0.05em 0 #fffc00;
  }
  49% {
    text-shadow: -0.05em -0.025em 0 #00fffc, 0.025em 0.035em 0 #fc00ff,
                 -0.05em -0.05em 0 #fffc00;
  }
  50% {
    text-shadow: 0.05em 0.035em 0 #00fffc, 0.03em 0 0 #fc00ff,
                 0 -0.04em 0 #fffc00;
  }
  99% {
    text-shadow: 0.05em 0.035em 0 #00fffc, 0.03em 0 0 #fc00ff,
                 0 -0.04em 0 #fffc00;
  }
  100% {
    text-shadow: -0.05em 0 0 #00fffc, -0.025em -0.04em 0 #fc00ff,
                 -0.04em -0.025em 0 #fffc00;
  }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-20px) rotate(-10deg); }
  75% { transform: translateY(-10px) rotate(10deg); }
`;

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: '#1a1a1a',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          width: '200%',
          height: '200%',
          background: 'radial-gradient(circle, rgba(100,108,255,0.1) 0%, rgba(0,0,0,0) 70%)',
          animation: 'rotate 20s linear infinite',
        }
      }}
    >
      <SmartToyIcon 
        sx={{ 
          fontSize: 100, 
          mb: 4,
          animation: `${float} 3s ease-in-out infinite`,
          color: '#646cff'
        }} 
      />
      <Typography 
        variant="h1" 
        sx={{ 
          fontSize: { xs: '6rem', md: '10rem' },
          fontWeight: 'bold',
          animation: `${glitch} 2.5s infinite`,
          mb: 2,
          cursor: 'pointer',
          '&:hover': {
            transform: 'scale(1.1)',
            transition: 'transform 0.3s ease'
          }
        }}
      >
        404
      </Typography>
      <Typography 
        variant="h4" 
        sx={{ 
          mb: 4,
          textAlign: 'center',
          px: 2,
          fontWeight: 300
        }}
      >
        {t("Beep Boop! Diese Seite scheint im Cyberspace verloren gegangen zu sein")}
      </Typography>
      <Button 
        variant="outlined"
        size="large"
        onClick={() => window.location.href = "/"}
        startIcon={<SmartToyIcon />}
        sx={{
          borderColor: '#646cff',
          color: 'white',
          borderWidth: 2,
          borderRadius: 2,
          px: 4,
          py: 1.5,
          '&:hover': {
            borderColor: '#646cff',
            bgcolor: 'rgba(100,108,255,0.1)',
            transform: 'translateY(-3px)',
            transition: 'transform 0.2s ease'
          }
        }}
      >
        {t("Nach Hause telefonieren")}
      </Button>
    </Box>
  );
};

export default NotFound;