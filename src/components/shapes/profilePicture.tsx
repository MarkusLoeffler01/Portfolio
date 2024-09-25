import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";

function profilePicture({src, px, className = ""}: {src: string, px?: number, className?: string}) {
    return <Box sx={{height: px, width: px}} className={` w-[${px}px] h-[${px}px] rounded-full border-4 border-gray-300 mr-5 mt-5` }>
                <Avatar src={src} sx={{width: "100%", height: "100%"}} className={className+ " object-cover w-full h-full"} />
            </Box>
}

export default profilePicture;