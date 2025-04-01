import GeneratePlaylist from "@/components/GeneratePlayList";
import SpotifyPlayer from "@/components/SpotifyPlayer";

const Play = () => {
    return <div className="flex flex-row h-screen w-screen px-10 pt-30 py-5">
        <div className="w-1/2 mr-10">
            <GeneratePlaylist />
        </div>
        <div className="w-1/2 ml-10">
            <SpotifyPlayer />
        </div>
    </div>
}

export default Play;
