import Banner from "@components/banners/containers/container";
import * as logos from "@assets/index";
import csLogo from "@assets/cs.svg";
import DiagonalCutSVG from "@components/diagonalSVG";
import { skillType } from '@/interfaces/skillType';

export const items: Item[] = [
    { skillType: "language", label: "Languages", shortLabel: "Langs" },
    // { skillType: "frontend", label: "Frontend Frameworks", shortLabel: "Frontend" },
    // { skillType: "backend", label: "Backend Frameworks", shortLabel: "Backend" },
    { skillType: "framework", label: "Libraries / Frameworks", shortLabel: "Libs" },
    { skillType: "database", label: "Databases", shortLabel: "DBs" },
    { skillType: "ci/cd", label: "Continues Development / Integration", shortLabel: "CI/CD" },
    { skillType: "other", label: "Other", shortLabel: "Other" }
  ];
  export const banners = [
  
    // Languages
    <Banner logo={<DiagonalCutSVG css={{ paddingBottom: "4%", marginTop: "5%", width: "200px", height: "200px" }} />} title='JavaScript && TypeScript' subtitle='Since 2018 && 2020' sx={{ backgroundColor: "#252525" }} dark key="BannerJavaScript" type="language" />,
    <Banner logo={csLogo} title='C#' subtitle='Since 2019' sx={{ backgroundColor: "rgb(121, 0, 109)" }} key="BannerCS" type="language" />,
  
    // Frameworks
  
    <Banner logo={logos.nodeLogo} subtitle='Since 2018' title='NodeJS' sx={{ backgroundColor: "rgba(13, 18, 28, 1)" }} dark key="BannerNode" type="framework" />,
    <Banner logo={logos.nodeLogo} subtitle='Since 2018' title='Express' sx={{ backgroundColor: "rgba(13, 18, 28, .5)" }} dark key="BannerExpress" type="framework" />,
    <Banner logo={logos.tailwindLogo} subtitle='Since 2022' title='TailwindCSS' sx={{ backgroundColor: "rgb(39, 98, 122)" }} key="BannerTailwind" type="framework" />,
    <Banner logo={logos.reactLogo} subtitle='Since 2022' title='React' spin dark key="BannerReact" type="framework" />,
    <Banner logo={logos.jestLogo} subtitle='Since 2023' title='Jest' sx={{ backgroundColor: "rgb(206, 116, 32)" }} key="BannerJest" type="framework" />,
    <Banner logo={logos.vitestLogo} subtitle='Since 2023' title='Vitest' sx={{ backgroundColor: "rgb(38, 182, 52)" }} key="BannerVitest" type="framework" />,
    <Banner logo={logos.reactLogo} subtitle='Since 2023' title='React Native' spin dark key="BannerReactNative" type="framework" />,
  
    // DBs
    <Banner logo={logos.mariaDBLogo} subtitle='Since 2018' title='MariaDB' sx={{ backgroundColor: "rgb(255, 255, 255)" }} key="BannerMariaDB" type="database" />,
    <Banner logo={logos.mssqlLogo} subtitle='Since 2019' title='MSSQL' sx={{ backgroundColor: "rgb(142, 236, 150)" }} key="BannerMSSQL" type="database" />,
    <Banner logo={logos.postgresqlLogo} subtitle='Since 2019' title='PostgreSQL' sx={{ backgroundColor: "rgb(249, 34, 125)" }} key="BannerPostreSQL" type="database" />,
    <Banner logo={logos.mongodbLogo} subtitle='Since 2022' title='MongoDB' sx={{ backgroundColor: "rgb(32, 34, 125)" }} dark logoSx={{ width: "200px"}} key="BannerMongoDB" type="database" />,
  
    // CI/CD
    <Banner logo={logos.dockerLogo} subtitle='Since 2022' title='Docker' sx={{ backgroundColor: "rgba(23, 25, 30,1)" }} dark key="BannerDocker" type="ci/cd" />,
    <Banner logo={logos.githubLogo} subtitle='Since 2022' title='Github Actions' sx={{ backgroundColor: "rgb(100, 100, 100)" }} key="BannerGithubActions" type="ci/cd" />,
    <Banner logo={logos.harborLogo} subtitle='Since 2024' title='Harbor' sx={{ backgroundColor: "rgb(149, 70, 125)" }} key="BannerHarbor" type="ci/cd" />,
    <Banner logo={logos.jenkinsLogo} subtitle='Since 2023' title='Jenkins' sx={{ backgroundColor: "rgb(211, 56, 51)" }} key="BannerJenkins" type="ci/cd" />,
  
    // Other
    <Banner logo={logos.tuxLogo} subtitle='Since 2018' title='Linux' sx={{ backgroundColor: "rgb(25, 25, 25)" }} dark key="BannerLinux" type="other" />,
    <Banner logo={logos.gitLogo} subtitle='Since 2018' title='Git' sx={{ backgroundColor: "rgb(80, 90, 100)" }} key="BannerGit" type="other" />,
    <Banner logo={logos.githubLogo} subtitle='Since 2018' title='JSON' sx={{ backgroundColor: "rgb(80, 90, 100)" }} key="BannerJSON" type="other" />,
    <Banner logo={logos.tuxLogo} subtitle='Since 2019' title='REST' sx={{ backgroundColor: "rgb(78, 32, 62)" }} key="BannerREST" type="other" />,
    <Banner logo={logos.cmakeLogo} subtitle='Since 2021' title='Make / CMake' sx={{ backgroundColor: "rgb(12, 85, 194)" }} key="BannerMake" type="other" />,
    <Banner logo={logos.gccLogo} subtitle='Since 2021' title='GCC' sx={{ backgroundColor: "rgb(255, 207, 171)" }} key="BannerGCC" type="other" />,
  
    //! Add stars as skill to the banners
  ];

  interface Item {
    skillType: skillType;
    label: string;
    shortLabel: string;
  }
  