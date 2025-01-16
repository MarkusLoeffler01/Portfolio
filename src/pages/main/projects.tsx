import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import CheckList from "@mui/icons-material/Checklist";
import GlowingCard from '@components/GlowCard';
import ReactLogo from "@assets/react.svg?react"

interface ProjectCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  technologies: React.ReactNode[];
  deploymentLink: string;
  githubLink: string;
}

const ProjectCard = ({ title, description, icon, technologies, deploymentLink, githubLink }: ProjectCardProps) => (
  <GlowingCard size={300} description={description} deploymentLink={deploymentLink} githubLink={githubLink}>
    <CardContent>
      <CardTitle variant="h4">
        {title}
      </CardTitle>
      
      <IconWrapper>
        {icon}
      </IconWrapper>

      <TechnologySection>
        <TechnologyLabel variant="subtitle1">
          Built with
        </TechnologyLabel>
        <TechnologyIcons>
          {technologies.map((tech, index) => (
            <TechnologyIcon key={index}>
              {tech}
            </TechnologyIcon>
          ))}
        </TechnologyIcons>
      </TechnologySection>
    </CardContent>
  </GlowingCard>
);

const CardTitle = styled(Typography)({
  fontWeight: 600,
  marginBottom: '0.5rem',
  color: '#ffffff'
});

const TechnologySection = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: 'auto'
});

const TechnologyLabel = styled(Typography)({
  marginBottom: '0.5rem',
  color: '#bdbdbd'
});

const TechnologyIcons = styled(Box)({
  display: 'flex',
  gap: '1rem',
  alignItems: 'center'
});

const TechnologyIcon = styled(Box)({
  width: '40px',
  height: '40px'
});

const GridBox = styled(Box)(() => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '1rem',
    padding: '1rem',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center'
}));

const CardContent = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: '100%',
  padding: '20px',
  gap: '1rem'
});

const IconWrapper = styled(Box)({
  margin: '1rem 0',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.1)'
  }
});

type Project = {
  title: string;
  description: string;
  icon: React.ReactElement<SVGElement>;
  technologies: React.ReactElement<SVGElement>[];
  deploymentLink: string;
  githubLink: string;
} 

const Projects = ({color: _}: {color: string}) => {
  const todoProjects: Project[] = [{
    title: "ToDo App",
    description: "A modern Todo application built with React, featuring real-time updates and local storage persistence.",
    icon: <CheckList sx={{ width: '64px', height: '64px', color: '#4CAF50' }} />,
    technologies: [<ReactLogo width="40px" key="reactLogo" height="40px" />],
    githubLink: "https://github.com/MarkusLoeffler01/portfolio-todo-react",
    deploymentLink: "https://portfolio.m-loeffler.de/todo"
  }];

  return (
    <>
        <Typography variant="h2" align="center" sx={{ color: '#ffffff' }}>
          Projects
        </Typography>
        <GridBox>
            {todoProjects.map((project, index) => (
                <ProjectCard key={index} {...project} />
            ))}
        </GridBox>
    </>
    
  );
};

export default Projects;