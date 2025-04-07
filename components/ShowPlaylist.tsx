import { getAllPlaylist } from "@/app/actions/spotify/spotifyPlaylistAction";
import { Playlist, useSpotifyPlaylists } from "@/store/SpotifyStore";
import { useCurrentAccount } from "@/store/UserStore";
import { useEffect } from "react";
import SinglePlaylist from "./SinglePlaylist";

const ShowPlaylist = () => {
    const accountId = useCurrentAccount((state) => state.accountId);
    const playlists = useSpotifyPlaylists((state) => state.playlists);
    const setPlaylists = useSpotifyPlaylists((state) => state.setPlaylists);

    useEffect(() => {
        const fetchAndSetPlaylists = async () => {
            const data = await getAllPlaylist(accountId);
            setPlaylists(
                data?.playlists.map((playlist) => ({
                    ...playlist,
                    tracks: playlist.tracks.map((track) => ({
                        ...track,
                        id: track.uri,
                    })),
                })) || []
            );
        };

        fetchAndSetPlaylists();
    },[accountId])

    if (playlists.length == 0) {
        return;
    }

    return <div className="flex flex-col pr-4 bg-green-500/50 rounded-sm w-full h-fit overflow-x-hidden overflow-y-auto custom-scrollbar">
        {playlists.map((playlist:Playlist) => <SinglePlaylist key={playlist.id} id={playlist.id} date={playlist.date} name={playlist.name} publicId={playlist.publicId} tracks={playlist.tracks} />)}
    </div>
}

export default ShowPlaylist;