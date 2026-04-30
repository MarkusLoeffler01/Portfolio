import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import type { SxProps, Theme } from '@mui/material/styles';
import type { CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';
import German from "@assets/flags/de.svg?react";
import English from "@assets/flags/gb.svg?react";
import { keyframes } from '@mui/system';

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
`;

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const containerStyle: CSSProperties = {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1000,
    display: 'flex',
    gap: '16px',
    background: 'rgba(26, 26, 26, 0.8)',
    backdropFilter: 'blur(8px)',
    padding: '8px',
    borderRadius: '12px',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  };
  const getButtonSx = (language: 'en' | 'de'): SxProps<Theme> => ({
    width: 48,
    height: 48,
    transition: 'all 0.3s ease',
    '&:hover': {
      animation: `${float} 2s ease-in-out infinite`,
      transform: 'scale(1.1)',
    },
    filter:
      i18n.language === language
        ? 'drop-shadow(0 0 8px rgba(100,108,255,0.5))'
        : 'grayscale(0.5)',
  });

  return (
    <div style={containerStyle}>
      <Tooltip 
        title="English" 
        arrow 
        placement="bottom"
        sx={{ fontSize: '1.2rem' }}
      >
        <IconButton 
          onClick={() => i18n.changeLanguage('en')}
          sx={getButtonSx('en')}
        >
          <English />
        </IconButton>
      </Tooltip>
      
      <Tooltip 
        title="Deutsch" 
        arrow 
        placement="bottom"
        sx={{ fontSize: '1.2rem' }}
      >
        <IconButton
          onClick={() => i18n.changeLanguage('de')}
          sx={getButtonSx('de')}
        >
          <German />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default LanguageSwitcher;
