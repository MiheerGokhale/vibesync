"use client"

import Button from "@/components/Button";
import Input from "@/components/Input";
import SharePlaylist from "@/components/SharePlaylist";
import { useSharePlaylist } from "@/store/SpotifyStore";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

const Share = () => {
    const [url,setUrl] = useState("");
    const { name,tracks,setName,setTracks } = useSharePlaylist();

    return <div className="h-screen w-screen px-10 pb-32">
        <div className="flex flex-col gap-x-2 gap-y-4 w-full h-full">
            <div className="flex flex-row gap-x-4 justify-center items-center w-full h-fit">
                <Input className="py-2 w-1/2 bg-green-500 text-gray-800 border-2 border-black rounded-lg shadow-md cursor-pointer flex items-center placeholder:text-black" placeholder="Paste share playlist url" type="text"
                    onChange={(e) => {
                        setUrl(e.target.value);
                    }} />
                <Button onClick={async () => { 
                    try {
                        if (url != "") {
                            const {data} = await axios.get(url);
                            setName(data.playlist.name);
                            setTracks(data.playlist.tracks);
                        }
                    } catch (error) {
                        toast.error("Wrong Url");
                        const err = new Error("Wrong Url");
                        err.cause = error;
                        throw err
                    }
                }} text="Search" className="mx-0 focus:ring-black focus:border-black border-2 border-black bg-green-500 hover:border-2 hover:border-green-800 hover:right-2 font-medium transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105" />
            </div>
            <SharePlaylist name={name} tracks={tracks} />
        </div>
    </div>
}

export default Share;
