"use client";

import { getToken } from "@/app/actions/spotify/spotifyPlaylistAction";
import { useCurrentAccount } from "@/store/UserStore";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";
import Button from "./Button";

type Props = {
  track: { id: string; name: string; image: string } | null;
};

declare global {
  interface Window {
    Spotify: typeof Spotify;
    onSpotifyWebPlaybackSDKReady: () => void;
  }
}

const Player = ({ track }: Props) => {
  const playerRef = useRef<Spotify.Player | null>(null);
  const sdkLoaded = useRef(false);
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const emailAddress = useCurrentAccount((state) => state.emailAddress);

  useEffect(() => {
    if (sdkLoaded.current) return;

    sdkLoaded.current = true;

    const existingScript = document.getElementById("spotify-player");
    if (!existingScript) {
      const script = document.createElement("script");
      script.id = "spotify-player";
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.async = true;
      document.body.appendChild(script);
    }

    window.onSpotifyWebPlaybackSDKReady = () => {
      if (playerRef.current) return;

      const player = new window.Spotify.Player({
        name: "Web Playback SDK Player",
        getOAuthToken: async (cb) => {
          const token = await getToken(emailAddress);
          cb(token);
        },
        volume: 0.5,
      });

      player.addListener("ready", ({ device_id }) => {
        console.log("✅ Ready with Device ID", device_id);
        setDeviceId(device_id);
      });

      player.addListener("player_state_changed", (state) => {
        if (!state) return;
        setIsPlaying(!state.paused);
      });

      player.connect();
      playerRef.current = player;
    };
  }, [emailAddress]);

  const transferPlayback = async (token: string, deviceId: string) => {
    await axios.put(
      "https://api.spotify.com/v1/me/player",
      {
        device_ids: [deviceId],
        play: true,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  };

  const playSong = async (uri: string) => {
    const freshToken = await getToken(emailAddress);
    if (!playerRef.current || !deviceId) return;

    await transferPlayback(freshToken, deviceId);
    await new Promise((res) => setTimeout(res, 500));

    await axios.put(
      "https://api.spotify.com/v1/me/player/play",
      { uris: [uri] },
      {
        headers: {
          Authorization: `Bearer ${freshToken}`,
          "Content-Type": "application/json",
        },
      }
    );
  };

  const togglePlayback = () => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pause();
    } else {
      playerRef.current.resume();
    }
  };

  if (!track) return null;

  return (
    <div className="flex items-center gap-4 p-4 bg-zinc-900 text-white rounded-xl shadow-lg mt-4 mx-2">
      <img src={track.image} alt={track.name} className="w-16 h-16 rounded-md" />
      <div className="flex flex-col flex-1 justify-center items-center">
        <p className="text-lg font-semibold">{track.name}</p>
        <Button
          text="Play"
          onClick={() => playSong(`spotify:track:${track.id}`)}
          className="text-sm text-black w-1/2  font-semibold bg-green-500 px-6 py-2 rounded-sm hover:ring-2 hover:ring-green-300  focus:ring-black focus:border-black border-2 border-black hover:border-2 hover:border-green-800 hover:right-2 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105"
        >
        </Button>
      </div>
      <button
        onClick={togglePlayback}
        className="bg-green-600 hover:bg-green-700 p-2 rounded-full transition"
      >
        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
      </button>
    </div>
  );
};

export default Player;
