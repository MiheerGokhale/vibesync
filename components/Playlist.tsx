"use client";

import { useSpotifyTracks } from "@/store/SpotifyStore";
import dynamic from "next/dynamic";
import Button from "./Button";
import Input from "./Input";
import { useState } from "react";
import { savePlaylist } from "@/app/actions/spotify/spotifyPlaylistAction";
import { useCurrentAccount } from "@/store/UserStore";
import { toast } from "sonner";

const DynamicPlayer = dynamic(() => import("./Player"), {
  ssr: false,
});

const Playlist = () => {
  const [playlistName,setPlaylistName] = useState("");
  const { tracks, track, setTrack } = useSpotifyTracks();
  const accountId = useCurrentAccount((state) => state.accountId);

  return (
    <div className="relative h-screen flex flex-col">
      <div className="text-xl font-bold p-4 flex flex-row justify-between items-center  border rounded-lg last:border-none border-green-600 bg-green-100/50 hover:bg-green-200 transition-all duration-200  shadow-sm">
        <h1 className=" text-green-900 font-semibold tracking-wide">
          Generated Playlist
        </h1>
        <div className="flex flex-row gap-x-2 justify-center items-center">
          <Input className="py-2 bg-green-500 text-gray-800 border-2 border-black rounded-lg shadow-md cursor-pointer flex items-center placeholder:text-black" placeholder="Enter Playlist Name" type="text"
            onChange={(e) => {
              setPlaylistName(e.target.value);
            }} />
          <Button onClick={async () => {
            if (playlistName != "") {              
              const response = await savePlaylist(accountId,playlistName,tracks);
              toast.success(response);
            }
           }} text="Save" className="w-1/2 mx-0 focus:ring-black focus:border-black border-2 border-black bg-green-500 hover:border-2 hover:border-green-800 hover:right-2 font-medium transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105" />
        </div>
      </div>
      <div className="h-1/2 overflow-y-auto px-4 space-y-4 mt-2">
        {tracks.map((t) => (
          <div key={t.id} className="flex items-center gap-4 p-2 border rounded-lg last:border-none border-green-600 bg-green-100/50 hover:bg-green-200 transition-all duration-200 justify-between shadow-sm">
            <img
              src={t.image || "/placeholder.jpg"}
              alt={t.name}
              className="w-16 h-16 rounded-md"
            />
            <div className="flex-1 text-green-900 font-semibold tracking-wide">
              <h3 className="text-lg font-semibold ">{t.name}</h3>
            </div>
            <Button
              text="Play"
              onClick={() => setTrack(t)}
              className="p-2 bg-green-500  rounded-lg text-sm text-black w-1/5  border-green-600  font-semibold  px-6 py-2  hover:ring-2 hover:ring-green-300  focus:ring-black focus:border-black border-2 hover:border-2 hover:border-green-800 hover:right-2 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105"
            >
            </Button>
          </div>
        ))}
      </div>

      {/* Fixed player at bottom */}
      {track && (
          <DynamicPlayer track={track} />
      )}
    </div>
  );
};

export default Playlist;
