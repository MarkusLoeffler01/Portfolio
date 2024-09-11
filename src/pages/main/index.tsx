import SkillSlider from "./SkillSlider";
import GuestBook from "./GuestBook";
import Profile from "./Profile";
import FullPage from "@components/fullpage";
import Footer from "./footer";
import Flow from "./Flow";

const MainPage = () => {
    return (
        <FullPage>
            <Profile className="w-[100vw]" color="#252525" />
            <SkillSlider color="#3c31dd" />
            <GuestBook className="flex flex-row justify-center top-[-5vh] relative" color="#252525" viewHeight={150} />
            <Flow className="flex flex-row justify-center top-[-5vh] relative w-full" color="#030303" viewHeight={150} />
            <Footer color="#FF2942" height="auto" viewHeight={50} noWave  />
        </FullPage>
    )
}

export default MainPage;