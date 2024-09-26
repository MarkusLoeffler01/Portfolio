import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";

function profilePicture({src, className = ""}: {src: string, className?: string}) {
    return <Box sx={{borderRadius: "50%"}} className={`flex justify-center items-center rounded-full border-4 border-gray-300 ${className}` }>
                <Avatar src={src} sx={{width: "100%", height: "100%", objectFit: "cover"}} />
            </Box>
}

export default profilePicture;
