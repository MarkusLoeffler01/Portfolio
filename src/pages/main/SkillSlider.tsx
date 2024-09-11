import { useState } from 'react'
import Banner from "@components/banners/containers/container";
import * as logos from "@assets/index";
import csLogo from "@assets/cs.svg";
import DiagonalCutSVG from "@components/diagonalSVG";
import SkillSliderComponent from "@components/SkillsSlider";

import Select, { SelectChangeEvent} from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { skillType } from '@/interfaces/skillType';


interface Item {
  skillType: skillType;
  label: string;
  shortLabel: string;
}

const items: Item[] = [
  { skillType: "language", label: "Languages", shortLabel: "Langs" },
  // { skillType: "frontend", label: "Frontend Frameworks", shortLabel: "Frontend" },
  // { skillType: "backend", label: "Backend Frameworks", shortLabel: "Backend" },
  { skillType: "framework", label: "Libraries / Frameworks", shortLabel: "Libs" },
  { skillType: "database", label: "Databases", shortLabel: "DBs" },
  { skillType: "ci/cd", label: "Continues Development / Integration", shortLabel: "CI/CD" },
  { skillType: "other", label: "Other", shortLabel: "Other" }
];
const banners = [

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


const NewFilter = ({ selectedItems, setItems }: { selectedItems: string[], setItems: (items: string[]) => void }) => {
  const handleChange = (event: SelectChangeEvent<string[]>) => {
    setItems((event.target.value as string[]).map(item => {
      console.log(items.find(i => i.shortLabel === item)?.shortLabel.toString());
      return items.find(i => i.shortLabel === item)?.shortLabel.toString() ?? "";
    }));
  };

  return (<FormControl sx={{ width: "50%", float: "right", marginBottom: "10px" }}>
    <InputLabel id="multi-select-dropdown-label" >Filter by Category</InputLabel>
    <Select
      labelId="multi-select-dropdown-label"
      id="multi-select-dropdown"
      data-testid="multi-select-dropdown"
      multiple
      color="primary"
      value={selectedItems}
      onChange={handleChange}
      renderValue={(selected) => (selected as string[]).join(', ')}
    >
      {items.map(item => (
        <MenuItem key={item.skillType} value={item.shortLabel} color={"#000000"} data-testid={item.label}>
          <Checkbox checked={selectedItems.includes(item.shortLabel)} data-testid={`checkbox-${item.label}`} />
          <ListItemText primary={item.label} />
        </MenuItem>
      ))}
    </Select>
  </FormControl>)

};

const SkillSlider = ({color: _, viewHeight: __}: {color?: string, viewHeight?: number}) => {

  const [skillShortNameFilter, setSkillShortNameFilter] = useState<string[]>([]);

  return (
    <>
    <h1 className="mb-10">Meine Skills</h1>
      <NewFilter selectedItems={skillShortNameFilter} setItems={setSkillShortNameFilter} />
      <SkillSliderComponent>
        {banners.filter((banner) => {
          if (skillShortNameFilter.length === 0) {
            return true;
          }
          const bannerType = banner.props.type as skillType;
          const shortName = items.find(item => item.skillType === bannerType)?.shortLabel ?? "";
          return skillShortNameFilter.includes(shortName);
        })}
      </SkillSliderComponent>
    </>
  );
};

export default SkillSlider;