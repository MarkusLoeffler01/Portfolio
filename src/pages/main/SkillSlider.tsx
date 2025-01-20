import { useState } from 'react'
import SkillSliderComponent from "@components/SkillsSlider";
import { items, banners } from '@/data/skillSliderItems';


import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { skillType } from '@/interfaces/skillType';
import { useTranslation } from 'react-i18next';






const NewFilter = ({ selectedItems, setItems }: { selectedItems: string[], setItems: (items: string[]) => void }) => {
  const { t } = useTranslation();
  const handleChange = (event: SelectChangeEvent<string[]>) => {
    setItems((event.target.value as string[]).map(item => {
      console.log(items.find(i => i.shortLabel === item)?.shortLabel.toString());
      return items.find(i => i.shortLabel === item)?.shortLabel.toString() ?? "";
    }));
  };

  return (<FormControl sx={{ width: "50%", float: "right", marginBottom: "10px" }}>
    <InputLabel id="multi-select-dropdown-label" >{t("Filter by Category")}</InputLabel>
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

const SkillSlider = ({ color: _, viewHeight: __ }: { color?: string, viewHeight?: number }) => {

  const [skillShortNameFilter, setSkillShortNameFilter] = useState<string[]>([]);
  const { t } = useTranslation();

  return (
    <>
      <h1 className="mb-10">{t("Meine Skills")}</h1>
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