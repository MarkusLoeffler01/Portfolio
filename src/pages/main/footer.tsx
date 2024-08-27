import Box from "@mui/material/Box";
import MailOutlineIcon from "@mui/icons-material/MailOutline";


import GithubLogo from "@assets/github.svg?react";
import LinkedInLogo from "@assets/linkedin.svg?react";

export default function Footer({ color: _ }: { color?: string, viewHeight?: number, height?: number | string, noWave?: boolean }) {
    return <>
        <Box sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
        }}>
            <Box sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                justifySelf: "center",
                width: "auto",
                height: "auto",
                overflow: "hidden",
                "> *": {
                    cursor: "pointer",
                    margin: "10px",
                    height: "100px",
                    width: "100px",
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                        transform: "scale(1.1)",
                    }
                }
            }}>
                <LinkedInLogo onClick={() => window.open("https://www.linkedin.com/in/markus-l%C3%B6ffler-859559318/", "_blank")} />
                <GithubLogo onClick={() => window.open("https://github.com/MarkusLoeffler01", "_blank")} />
            </Box>

            <Box sx={{
                "*": {
                    cursor: "pointer",
                    margin: "10px",
                    color: "white"
                }
            }}>
                <Box sx={{
                    "*:hover": {
                        color: "#646cff"
                    }
                }}>
                    <MailOutlineIcon onClick={() => window.open("mailto:markus.loeffler01@gmail.com")} />
                    <a href="mailto:markus.loeffler01@gmail.com">markus.loeffler01@gmail.com</a>
                </Box>
                <Box>
                    <a href="/impressum" target="_blank" >Impressum</a>
                    <a href="/datenschutz" target="_blank" >Datenschutzerklärung</a>
                </Box>
            </Box>
        </Box>
    </>
}