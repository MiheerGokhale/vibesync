import { Track, useSpotifyTracks } from "@/store/SpotifyStore";
import Button from "./Button";
import { useRouter } from "next/navigation";


const SharePlaylist = ({ name, tracks }: { name: string, tracks: Track[] }) => {
    const router = useRouter();
    const setTracks = useSpotifyTracks((state) => state.setTracks);

    if (name === "") return;


    return <div key={name} className="w-full h-fit bg-green-500/50 pr-4 ">
        <div className="flex flex-col md:flex-row gap-y-4 md:gap-y-0 justify-between items-center w-full m-2 mr-4 p-2 border rounded-lg last:border-none border-green-600 bg-green-100/50 hover:bg-green-200 transition-all duration-200 shadow-sm">
            <div className="flex flex-row gap-x-4 text-green-900 font-semibold tracking-wide w-full md:w-2/6 break-words">
                <p className="text-sm md:text-lg font-semibold truncate max-w-">Date: {new Date().toLocaleDateString()}</p>
                <p className="text-sm md:text-lg font-semibold">Name: {name}</p>
            </div>
            <div className="flex flex-row gap-x-3 overflow-x-auto w-full  md:w-4/6 md:max-w-4/6 custom-scrollbar">
                {tracks?.map((track: Track) =>
                    <Playlist key={track.id} track={track} />
                )}
            </div>
            <div className="flex flex-row justify-center items-center">
                <Button className="px-8 mx-4 text-black focus:ring-black focus:border-black border-2 border-black bg-green-500 hover:border-2 hover:border-green-800 hover:right-2 font-medium transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105"
                    text="Select" onClick={() => {
                        setTracks(tracks);
                        router.push("/dashboard/play");
                    }} />
            </div>
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

export default SharePlaylist;