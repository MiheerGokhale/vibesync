"use client";

import { useCurrentAccount } from "@/store/UserStore";

const Playlist = () => {
    const emailAddress = useCurrentAccount((state) => state.emailAddress);
    return <div className="text-white">{emailAddress}</div>
}

export default Playlist;
