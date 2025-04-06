"use client";

import { cn } from "@/lib/utility/utils";
// import { useUnsplashImage } from "@/store/UnsplashStore";
import Playlist from "./Playlist";

const SpotifyPlayer = () => {
  // const bgImage = useUnsplashImage((state) => state.bgImage);

  return (
    <div
      className={cn("w-full h-full bg-cover bg-center bg-green-400/40 bg-no-repeat rounded-sm")}
      // style={{
      //   backgroundImage: `url(${bgImage})`,
      // }}
    >
      <Playlist />
    </div>
  );
};

export default SpotifyPlayer;
