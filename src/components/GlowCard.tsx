// src/components/GlowingCard.tsx
import { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import GitHubIcon from '@mui/icons-material/GitHub';

interface GlowingCardProps {
  children: React.ReactNode;
  maxRotation?: number;
  glowColor?: string;
  backgroundColor?: string;
  size?: number | string;
  description?: string;
  deploymentLink?: string;
  githubLink?: string;
}

const DescriptionOverlay = styled('div')({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  background: 'rgba(0, 0, 0, 0.85)',
  color: 'white',
  padding: '20px',
  transform: 'translateY(100%)',
  transition: 'transform 0.3s ease-in-out',
  borderBottomLeftRadius: '8px',
  borderBottomRightRadius: '8px',
});

const LinkContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  gap: '1rem',
  marginTop: '1rem',
});

const IconLink = styled('a')({
  color: 'white',
  transition: 'transform 0.2s ease-in-out, color 0.2s ease-in-out',
  '&:hover': {
    color: '#4CAF50',
    transform: 'scale(1.1)',
  }
});

const StyledCard = styled(Box)<{ size?: number | string }>(({ size = '300px' }) => ({
  position: 'relative',
  transformStyle: 'preserve-3d',
  transition: 'transform 0.1s ease-out',
  backgroundColor: '#1a1a1a',
  borderRadius: '8px',
  padding: '20px',
  cursor: 'pointer',
  width: size,
  height: size,
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-2px',
    left: '-2px',
    right: '-2px', 
    bottom: '-2px',
    background: 'linear-gradient(45deg, #ff00ff, #00ffff)',
    borderRadius: '10px',
    zIndex: -1,
    transition: 'opacity 0.3s ease-in-out',
    opacity: 0
  },
  '&:hover::before': {
    opacity: 1
  },
  '&:hover .description-overlay': {
    transform: 'translateY(0)',
  }
}));

const GlowingCard = ({ 
  children, 
  maxRotation = 20, 
  glowColor = '#00ff00',
  backgroundColor = '#1a1a1a',
  size = '300px',
  description,
  deploymentLink,
  githubLink
}: GlowingCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -maxRotation;
    const rotateY = ((x - centerX) / centerX) * maxRotation;

    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg)');
  };

  return (
    <StyledCard
      size={size}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      sx={{
        transform,
        backgroundColor,
        boxShadow: `0 0 20px ${glowColor}`,
      }}
    >
      {children}
      {description && (
        <DescriptionOverlay className="description-overlay">
          {description}
          <LinkContainer>
            {deploymentLink && (
              <IconLink href={deploymentLink} target="_blank" rel="noopener noreferrer">
                <OpenInNewIcon />
              </IconLink>
            )}
            {githubLink && (
              <IconLink href={githubLink} target="_blank" rel="noopener noreferrer">
                <GitHubIcon />
              </IconLink>
            )}
          </LinkContainer>
        </DescriptionOverlay>
      )}
    </StyledCard>
  );
};

export default GlowingCard;