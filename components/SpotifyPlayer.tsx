"use client";

import { cn } from "@/lib/utility/utils";
import { useUnsplashImage } from "@/store/UnsplashStore";
import Playlist from "./Playlist";

const SpotifyPlayer = () => {
  const bgImage = useUnsplashImage((state) => state.bgImage);

  return (
    <div
      className={cn("w-full h-full bg-cover bg-center bg-no-repeat")}
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <Playlist />
    </div>
  );
};

export default SpotifyPlayer;
