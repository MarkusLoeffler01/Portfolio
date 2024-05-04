import {useState, useEffect} from "react";
import GästeBuch from "./Guestbook";
import { AppBar, Tabs, Tab, Box, Typography } from "@mui/material";

const tabsData = [
    { label: "Über mich", content: "Tab 1 Content" },
    { label: "Meine Arbeit", content: "Tab 2 Content" },
    { label: "Gästebuch", content: "Tab 3 Content" },
]

function handleScroll(event: React.UIEvent<HTMLDivElement>) {
    // Implement scroll event handler logic here
    console.log(event);
}

function TabComponent() {
    const [selectedTab, setSelectedTab] = useState(0);

    

    return <>
    <Tabs value={selectedTab} onChange={(event, newValue) => setSelectedTab(newValue)} indicatorColor="primary"  onScroll={handleScroll}>
        {tabsData.map((tab, index) => (
            <Tab onScroll={handleScroll} key={index} label={tab.label} content={tab.content} sx={{color: "white"}} />
        ))}
    </Tabs>
    <CustomTabPanel value={selectedTab} index={0}>
        {tabsData[selectedTab].content}
    </CustomTabPanel>
    <CustomTabPanel value={selectedTab} index={1}>
        {tabsData[selectedTab].content}
    </CustomTabPanel>
    <CustomTabPanel value={selectedTab} index={2}>
        <GästeBuch/>
    </CustomTabPanel>
    </>
}


function CustomTabPanel(props: {value: number, index: number, children: React.ReactNode}) {
    const { value, index, children } = props;
    return (
        <div
            role="tabpanel"
            style={{ display: value === index ? "block" : "none" }}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
        >
            <Box sx={{p: 3}}>
                {children}
            </Box>
        </div>
    );
}


export default TabComponent;