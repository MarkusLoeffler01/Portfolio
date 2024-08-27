import ProfilePicture from "../shapes/profilePicture";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";


const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
};

function GuestBookComment({ author, profilePicture, content, timestamp, timestampLocale = new Intl.DateTimeFormat(navigator.language, options)}: { author: string, profilePicture: string, content: string, timestamp: Date, timestampLocale?: Intl.DateTimeFormat }) {
    return (
        <Paper elevation={1} style={{ padding: '16px', marginBottom: '16px'}} sx={{ display: "flex", justifyContent: "center", justifySelf: "center", maxHeight: "100%", overflowY: "auto" }}>
            <Box display="flex" alignItems="flex-start" sx={{minWidth: "100%"}}>
                <ProfilePicture src={profilePicture} px={100} />
                <Box flex="1">
                    <Box display="flex" alignItems="center" justifyContent="start">
                        <Typography variant="subtitle1" fontWeight="bold">
                            {author}&nbsp;
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            schrieb am &nbsp;
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {timestampLocale.format(timestamp)}
                        </Typography>
                    </Box>
                    <Typography variant="body1" style={{ marginTop: '8px', whiteSpace: "pre-line", textAlign: "left" }}>
                        {content}
                    </Typography>
                </Box>
            </Box>
        </Paper>
    )
}

export default GuestBookComment;