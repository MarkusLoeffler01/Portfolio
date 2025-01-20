import ProfilePicture from "../shapes/profilePicture";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import useTheme from "@mui/material/styles/useTheme";
import { useTranslation } from "react-i18next";

const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
};

type GuestBookCommentProps = {
  author: string;
  profilePicture?: string;
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

    const { t } = useTranslation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const mobileOptions: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    };

    const mobileLocale = new Intl.DateTimeFormat(navigator.language, mobileOptions);

  return (
    <Paper
      elevation={1}
      className="p-4 mb-4 flex justify-center max-h-full overflow-y-auto w-full"
    >
      <Box className="flex flex-col md:flex-row items-center md:items-start w-full">
        <ProfilePicture
          src={profilePicture ?? ""}
          className="w-20 h-20 md:w-24 md:h-24 mb-2 md:mb-0 md:mr-4 flex-shrink-0"
        />
        <Box className="flex-1 text-center md:text-left">
          <Box className="flex flex-col md:flex-row items-center md:items-baseline justify-center md:justify-start flex-wrap">
            <Typography variant="subtitle1" className="font-bold">
              {author} &nbsp;
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              className="md:ml-2 mt-1 md:mt-0"
            >
              { isMobile || <>{t("schrieb am")} &nbsp;</> }
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              className="md:ml-1 mt-1 md:mt-0"
            >
              {isMobile ? mobileLocale.format(timestamp) : timestampLocale.format(timestamp)}
            </Typography>
          </Box>
          <Typography
            variant="body1"
            className="mt-2 whitespace-pre-line break-words"
          >
            {content}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}

export default GuestBookComment;
