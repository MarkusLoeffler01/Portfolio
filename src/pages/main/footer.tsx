import Box from "@mui/material/Box";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import GithubLogo from "@assets/github.svg?react";
import LinkedInLogo from "@assets/linkedin.svg?react";

export default function Footer({
  color: _,
}: {
  color?: string;
  viewHeight?: number;
  height?: number | string;
  noWave?: boolean;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: "space-around",
        alignItems: "center",
        padding: "20px",
        backgroundColor: _ || "inherit",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          "> *": {
            cursor: "pointer",
            margin: "10px",
            height: { xs: "60px", sm: "80px" },
            width: { xs: "60px", sm: "80px" },
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              transform: "scale(1.1)",
            },
          },
        }}
      >
        <LinkedInLogo
          onClick={() =>
            window.open(
              "https://www.linkedin.com/in/markus-l%C3%B6ffler-859559318/",
              "_blank"
            )
          }
        />
        <GithubLogo
          onClick={() =>
            window.open("https://github.com/MarkusLoeffler01", "_blank")
          }
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: { xs: "center", sm: "flex-start" },
          marginTop: { xs: "20px", sm: "0" },
          "*": {
            cursor: "pointer",
            margin: "5px",
            color: "white",
            textDecoration: "none",
          },
          a: {
            "&:hover": {
              color: "#646cff",
            },
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
            color: "white",
            "&:hover": {
              color: "#646cff",
            },
          }}
          onClick={() =>
            window.open("mailto:markus.loeffler01@gmail.com", "_blank")
          }
        >
          <MailOutlineIcon />
          <Box sx={{ marginLeft: "5px" }}>
            markus.loeffler01@gmail.com
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "center", sm: "flex-start" },
          }}
        >
          <a href="/impressum" target="_blank">
            Impressum
          </a>
          <a href="/datenschutz" target="_blank">
            Datenschutzerklärung
          </a>
        </Box>
      </Box>
    </Box>
  );
}
