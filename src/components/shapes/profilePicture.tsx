function profilePicture({src, className = ""}: {src: string, className?: string}) {
    return (
        <div className={`flex justify-center items-center rounded-full border-4 border-gray-300 overflow-hidden ${className}`}>
            <img src={src} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
    );
}

export default profilePicture;
