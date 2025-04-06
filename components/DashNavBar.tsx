"use client";

import Icon from "@/components/Icon";
import Button from "./Button";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import SpotifyButton from "./SpotifyButton";
import { spotifyAuthorizationUrl } from "@/app/actions/spotify/spotifyAuthAction";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useCurrentAccount, useUserAccount } from "@/store/UserStore";
// import Image from "next/image";

const DashNavBar = () => {
    const session = useSession();

    const { accounts, fetchAccounts } = useUserAccount();
    const {emailAddress,setAccountId,setEmailAddress,setImage} = useCurrentAccount();
    const router = useRouter();
    

    useEffect(() => {
        if (session.status === "authenticated" && session.data?.user?.id) {
            fetchAccounts(session.data.user.id); // Only fetch accounts once when the user logs in
        }
    }, [session.status, session.data]); // Only re-run when session updates
    
    useEffect(() => {
        if (accounts.length > 0 && emailAddress === "") {
            setAccountId(accounts[0].accountId);
            setEmailAddress(accounts[0].emailAddress);
            setImage(accounts[0].image);
        }
    }, [accounts]); // Only run when `accounts` update

    return (
        <div className="z-10 w-full px-8 py-6 flex justify-center items-center">
            <div className="flex flex-row justify-between w-2/3 px-4 py-2 border-1 border-gray-600 bg-green-400/10  rounded-xl">
                {/* Logo and Branding */}
                <div className="flex justify-center items-center">
                    <Icon />
                    <div className="pl-3 text-2xl font-semibold text-green-500">VibeSync</div>
                </div>

                <div className="flex flex-row justify-center items-center text-green-500 font-semibold gap-x-4 text-xl">
                    <Link href={"/dashboard/play"}>Play</Link>
                    <Link href={"/dashboard/playlist"}>Playlist</Link>
                    <Link href={"/dashboard/share"}>Share</Link>
                </div>

                {/* Authentication Buttons */}
                {emailAddress === "" ? <div className="flex justify-center items-center">
                    <>
                        <Button className="bg-green-500" text="Logout" onClick={() => {
                            signOut({ callbackUrl: "/" })
                            setEmailAddress("");
                            setImage("");
                            }} />
                    </>
                    <SpotifyButton content="Connect" onClick={async () => {
                        const url = await spotifyAuthorizationUrl();
                        router.push(url);
                    }} />
                </div> : <div className="flex justify-center items-center">
                    <>
                        <Button className="bg-green-500" text="Logout" onClick={() => {
                            signOut({ callbackUrl: "/" })
                            setEmailAddress("");
                            setImage("");
                            }} />
                    </>
                    <div className="flex justify-center items-center">
                        <div className="flex flex-row justify-center items-center bg-green-500 px-6 py-2 rounded-xl">
                            <div className="w-1/2 text-black font-semibold">
                                {emailAddress}
                            </div>
                            <div className="w-1/2 ">
                                {/* <Image  src={`${image}`} width={6} height={8} alt="Spotify" /> */}
                            </div>
                        </div>
                    </div>
                </div>}
            </div>

        </div>
    );
};

export default DashNavBar;
