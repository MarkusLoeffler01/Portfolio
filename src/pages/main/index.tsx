import SkillSlider from "./SkillSlider";
import FullPage from "@components/fullpage";

const MainPage = () => {
    return (
        <FullPage>
            <SkillSlider color="#3c31dd" />
            <SkillSlider color="#99FF34" viewHeight={150} />
            <SkillSlider color="#FF2942" />
        </FullPage>
    )
}

export default MainPage;