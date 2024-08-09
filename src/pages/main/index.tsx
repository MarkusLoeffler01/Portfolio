import SkillSlider from "./SkillSlider";
import Profile from "./Profile";
import FullPage from "@components/fullpage";

const MainPage = () => {
    return (
        <FullPage>
            <Profile disableViewWidth color="#252525" />
            <SkillSlider color="#3c31dd" />
            <SkillSlider color="#99FF34" viewHeight={150} />
            <SkillSlider color="#FF2942" />
        </FullPage>
    )
}

export default MainPage;