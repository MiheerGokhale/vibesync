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
