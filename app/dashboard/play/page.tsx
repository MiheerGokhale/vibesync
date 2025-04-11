import GeneratePlaylist from "@/components/GeneratePlayList";
import SpotifyPlayer from "@/components/SpotifyPlayer";

const Play = () => {
    return <div className="flex flex-col gap-y-4 overflow-y-auto md:gap-y-0 md:flex-row h-screen w-screen md:px-10 pb-32">
        <div className="w-full md:w-1/2 md:mr-10">
            <GeneratePlaylist />
        </div>
        <div className="w-full md:w-1/2 md:ml-10">
            <SpotifyPlayer />
        </div>
    </div>
}

export default Play;
