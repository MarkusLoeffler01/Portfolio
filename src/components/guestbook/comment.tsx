import ProfilePicture from "../shapes/profilePicture";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// eslint-disable-next-line no-restricted-imports
import { useMediaQuery, useTheme } from "@mui/material";

const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
};

type GuestBookCommentProps = {
  author: string;
  profilePicture: string;
  content: string;
  timestamp: Date;
  timestampLocale?: Intl.DateTimeFormat;
};

function GuestBookComment({
  author,
  profilePicture,
  content,
  timestamp,
  timestampLocale = new Intl.DateTimeFormat(navigator.language, options),
}: GuestBookCommentProps) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Paper
      elevation={1}
      sx={{
        padding: 2,
        marginBottom: 2,
        display: "flex",
        justifyContent: "center",
        maxHeight: "100%",
        overflowY: "auto",
        width: "100%",
      }}
    >
      <Box
        display="flex"
        flexDirection={isSmallScreen ? "column" : "row"}
        alignItems={isSmallScreen ? "center" : "flex-start"}
        width="100%"
      >
        <ProfilePicture
          src={profilePicture}
          px={isSmallScreen ? 80 : 100}
          className={isSmallScreen ? "mb-2" : "mr-2"}
        />
        <Box flex="1" ml={isSmallScreen ? 0 : 2} textAlign={isSmallScreen ? "center" : "left"}>
          <Box
            display="flex"
            flexDirection={isSmallScreen ? "column" : "row"}
            alignItems={isSmallScreen ? "center" : "flex-start"}
            justifyContent={isSmallScreen ? "center" : "flex-start"}
          >
            <Typography variant="subtitle1" fontWeight="bold">
              {author}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ ml: isSmallScreen ? 0 : 1, mt: isSmallScreen ? 0.5 : 0 }}
            >
              schrieb am
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ ml: isSmallScreen ? 0 : 1, mt: isSmallScreen ? 0.5 : 0 }}
            >
              {timestampLocale.format(timestamp)}
            </Typography>
          </Box>
          <Typography
            variant="body1"
            sx={{ marginTop: 1, whiteSpace: "pre-line", wordBreak: "break-word" }}
          >
            {content}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}

export default GuestBookComment;
