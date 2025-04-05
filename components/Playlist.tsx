"use client";

import { useSpotifyTracks } from "@/store/SpotifyStore";
import dynamic from "next/dynamic";

const DynamicPlayer = dynamic(() => import("./Player"), {
  ssr: false,
});

const Playlist = () => {
  const { tracks, track, setTrack } = useSpotifyTracks();

  return (
    <div className="relative h-screen flex flex-col">
      <h2 className="text-xl font-bold p-4">Generated Playlist</h2>

      <div className="h-2/3 overflow-y-auto px-4 space-y-4">
        {tracks.map((t) => (
          <div key={t.id} className="flex items-center gap-4 p-2 border rounded-lg">
            <img
              src={t.image || "/placeholder.jpg"}
              alt={t.name}
              className="w-16 h-16 rounded-md"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{t.name}</h3>
            </div>
            <button
              onClick={() => setTrack(t)}
              className="p-2 bg-green-500 text-white rounded-lg"
            >
              Play
            </button>
          </div>
        ))}
      </div>

      {/* Fixed player at bottom */}
      {track && (
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <DynamicPlayer track={track} />
        </div>
      )}
    </div>
  );
};

export default Playlist;
