import { create } from "zustand";

export type Track = {
    id: string;
    name: string;
    image: string;
};

type SpotifyState = {
    tracks: Track[];
    track: Track | null;
    setTracks: (tracks: Track[]) => void;
    setTrack: (track: Track) => void;
};

export const useSpotifyTracks = create<SpotifyState>((set) => ({
    tracks: [],
    track: null,
    setTracks: (tracks) => set({ tracks }),
    setTrack: (track) => set({ track }),
}));

export type Playlist = {
    id:string,
    name:string,
    date:Date,
    publicId:string,
    tracks:Track[]
}

type PlaylistsState = {
    playlists:Playlist[]

    setPlaylists: (playlists:Playlist[]) => void
}

export const useSpotifyPlaylists = create<PlaylistsState>((set) => ({
    playlists:[],

    setPlaylists: (playlists) => set(() => ({playlists}))
}))


type SharePlaylist = {
    name:string,
    tracks:Track[]

    setName: (name:string) => void,
    setTracks: (tracks:Track[]) => void
}

export const useSharePlaylist = create<SharePlaylist>((set) => ({
    name:"",
    tracks:[],

    setName: (name) => set(() => ({name})),
    setTracks: (tracks) => set(() => ({ tracks }))
}))