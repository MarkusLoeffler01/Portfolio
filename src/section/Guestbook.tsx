import {useFetch} from "react-async";
import { useState } from "react";
import { Comment } from "../types/guestbook";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Typography } from "@mui/material";
import ClipIcon from "../assets/icons/clip_24px.svg?react";

function GästeBuch() {

    const [guestbookEntries, setGuestbookEntries] = useState([]);

    const headers = { Accept: "application/json" };
    const { data, error, isLoading, isRejected, isFulfilled } = useFetch<Comment[]>('https://66362278415f4e1a5e2663ec.mockapi.io/api/entry', { headers });
    if (isLoading) return <div>Loading...</div>;
    if (isRejected) return <div>Error: {error.message}</div>;

    if(!data && !isFulfilled) return <div>Unexpected data</div>;

    return <div className="guestbook-entries">
            {data.map((entry) => <div key={entry.id} className="guestbook-entry">
                <GuestBookEntry {...entry} />
            </div>)}
        </div>;
}

class NetworkError extends Error {
    public response: Response;
    constructor(message: string, response: Response) {
        super(message);
        this.response = response;
        this.name = "NetworkError";
    }
}

function GuestBookForm() {
    const [name, setName] = useState('');
    const [organisation, setOrganisation] = useState('');
    const [body, setBody] = useState('');
    const [link, setLink] = useState('');
    const [avatar, setAvatar] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
          const response = await fetch('https://66362278415f4e1a5e2663ec.mockapi.io/api/entry', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, organisation, body, link, avatar })
          });
          if(!response.ok) throw new NetworkError("Network response was not ok", response);
        }
        catch(error) {
            if(error instanceof NetworkError) {
            console.error('Network error:', error.message, error.response.status);
          } else {
            console.error('Unexpected error:', error);
          }
        }
    }
}

function GuestBookEntry({avatar, body, createdAt, id, name, organisation, link}: Comment) {
    console.log(avatar)
    return (<Card sx={{minWidth: 275, my: 2 }}>
        <CardContent>
            <div className="flex">
                <div key="profilePic" className="mr-6">
                    <img src={avatar} className="rounded-full" style={{width: "100%"}}></img>
                </div>
                <div className="flex-[5] flex w-full">
                    <div className="flex-col w-full text-justify px-4">
                        <div className="w-full mb-0 pb-0" key="name">
                            <Typography fontSize={24} color="text.secondary">
                                {name}
                            </Typography>
                        </div>
                        <div className="w-full text-slate-400 flex">
                            <Typography gutterBottom sx={{width: "100%"}}>
                                <div className="w-row flex w-full">
                                    <div className="self-start flex">
                                        {organisation ?? ""}
                                        {link &&
                                        <a className="ml-3" href={link} target="_blank" rel="noopener noreferrer">
                                            <ClipIcon style={{ cursor: "pointer" }} title={link} />
                                        </a>
                                    }
                                    </div>
                                </div>
                                <div className="flex">
                                    {new Date(createdAt).toLocaleString(undefined, {day: "2-digit", month: "2-digit", year: "2-digit",  hour: "2-digit", minute: "2-digit"})}
                                </div>
                            </Typography>
                        </div>
                        <div className="flex-[6] w-full max-w-80 break-words">
                        <Typography variant="body2">
                            {body}
                        </Typography>
                        </div>
                    </div>
                </div>
            </div>
            
            
        </CardContent>
    </Card>)
}

export default GästeBuch;