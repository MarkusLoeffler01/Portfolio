import { lazy, Suspense } from "react";
import Navbar from "@components/Navbar";
import Profile from "./Profile";
import SkillSlider from "./SkillSlider";
import Projects from "./projects";
import GuestBook from "./GuestBook";
import Flow from "./Flow";
import CiCd from "./CiCd";
import Footer from "./footer";

// Lazy-load the 3D hero to keep initial bundle small
const Hero = lazy(() => import("./Hero"));

const MainPage = () => {
    return (
        <div className="relative w-full" style={{ background: "var(--color-base)" }}>
            <Navbar />
            <Suspense fallback={<div className="w-full min-h-screen" style={{ background: "var(--color-base)" }} />}>
                <Hero />
            </Suspense>
            <Profile />
            <SkillSlider />
            <Projects />
            <GuestBook className="flex flex-row justify-center" color="#0f0f1a" viewHeight={150} />
            <CiCd />
            <Flow className="flex flex-col justify-center w-full text-center items-center" color="#080810" viewHeight={363} />
            <Footer />
        </div>
    );
};

export default MainPage;