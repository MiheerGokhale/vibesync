import { signIn, useSession } from "next-auth/react";

const SpotifyAuth = () => {
    const { data:session } = useSession();

    return (
        <button
          onClick={() => signIn("spotify",{ callbackUrl: "/dashboard" })}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          {session?.user ? "Connected to Spotify 🎵" : "Connect to Spotify"}
        </button>
      );
}

export default SpotifyAuth;