import SkillSlider from "./SkillSlider";
import GuestBook from "./GuestBook";
import Profile from "./Profile";
import FullPage from "@components/fullpage";
import Footer from "./footer";
import Flow from "./Flow";
import Projects from "./projects";

const MainPage = () => {
    return (
        <FullPage>
            <Profile className="w-[95%]" color="#252525" />
            <SkillSlider color="#3c31dd" />
            <Projects color="rgb(10, 10, 10)" />
            <GuestBook className="flex flex-row justify-center top-[-5vh] relative" color="#252525" viewHeight={150} />
            <Flow className="flex flex-col justify-center top-[-5vh] relative w-full text-center items-center mb-[0%]" color="#030303" viewHeight={363} />
            <Footer color="#FF2942" height="auto" viewHeight={50} noWave  />
        </FullPage>
    )
}

export default MainPage;