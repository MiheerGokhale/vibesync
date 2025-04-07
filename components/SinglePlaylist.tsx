import { Track, useSpotifyTracks, type Playlist } from "@/store/SpotifyStore";
import Button from "./Button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const SinglePlaylist = ({ id, name, date, publicId,tracks }: Playlist) => {
    const router = useRouter();
    const setTracks = useSpotifyTracks((state) => state.setTracks);

    return <div key={id} className="flex flex-row justify-between items-center w-full m-2 p-2 border rounded-lg last:border-none border-green-600 bg-green-100/50 hover:bg-green-200 transition-all duration-200 shadow-sm">
        <div className="flex flex-row gap-x-4 text-green-900 font-semibold tracking-wide w-2/6 break-words">
            <p className="text-lg font-semibold">Date: {date === undefined ? "" : date.toLocaleDateString()}</p>
            <p className="text-lg font-semibold truncate max-w-">Name: {name}</p>
        </div>
        <div className="flex flex-row gap-x-3 overflow-x-auto  w-4/6 max-w-4/6 custom-scrollbar">
            {tracks.map((track: Track) =>
                <Playlist key={track.id} track={track} />
            )}
        </div>
        <div className="flex flex-row justify-center items-center">
            <Button className="px-8 mx-4 text-black focus:ring-black focus:border-black border-2 border-black bg-green-500 hover:border-2 hover:border-green-800 hover:right-2 font-medium transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105"
                text="Select" onClick={() => {
                    setTracks(tracks);
                    router.push("/dashboard/play");
                }} />
            <Button className="px-8 mx-4 text-black focus:ring-black focus:border-black border-2 border-black 	bg-gradient-to-r from-green-300 to-green-600 hover:border-2 hover:border-green-800 hover:right-2 font-medium transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105"
                text="Share" onClick={() => {
                    const shareUrl = `${typeof window != undefined ? window.location.origin : " "}/api/spotify/share/${publicId}`;
                    navigator.clipboard.writeText(shareUrl);
                    toast.success("Link copied!");
                }} />
        </div>
    </div>
}

function Playlist({ track }: { track: Track }) {
    return (
        <div className="flex flex-col items-center max-w-16 gap-y-1 text-center">
            <img className="h-12 w-12 object-cover rounded" src={track.image} alt={track.name} />
            <p className="text-green-900 font-semibold text-xs truncate w-full">{track.name}</p>
        </div>
    );
}


export default SinglePlaylist;