"use client";

import Icon from "@/components/Icon";
import Button from "./Button";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import SpotifyButton from "./SpotifyButton";
import { spotifyAuthorizationUrl } from "@/app/actions/spotify/spotifyAuthAction";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCurrentAccount, useUserAccount } from "@/store/UserStore";
// import Image from "next/image";

const DashNavBar = () => {
    const session = useSession();
    const [isOpen, setIsOpen] = useState(false);


    const { accounts, fetchAccounts } = useUserAccount();
    const { emailAddress, setAccountId, setEmailAddress, setImage } = useCurrentAccount();
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
        <div className="z-10 w-screen md:w-full px-8 py-6 flex md:justify-center md:items-center">
            <div className="flex flex-row justify-between md:w-2/3 px-4 py-2 border-1 border-gray-600 bg-green-400/10  rounded-xl">
                {/* Logo and Branding */}
                <div className="hidden md:flex justify-center items-center">
                    <Icon className="h-6 w-6 md:h-12 md:w-12" />
                    <div className="pl-3 text-2xl font-semibold text-green-500"><span className="hidden md:flex">VibeSync</span></div>
                </div>

                <div className="flex flex-row justify-center items-center text-green-500 font-semibold gap-x-8 text-xl">
                    <Link className="flex  justify-center items-center text-sm" href={"/dashboard/play"}>
                        <Play />
                        play
                    </Link>
                    <Link className="flex  justify-center items-center text-sm" href={"/dashboard/playlist"}>
                        <Playlist />
                        playlist
                    </Link>
                    <Link className="flex justify-center items-center text-sm" href={"/dashboard/share"}>
                        <Share />
                        share
                    </Link>
                </div>

                {/* Authentication Buttons */}
                {emailAddress === "" ? <div className="hidden md:flex justify-center items-center">
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
                </div> : <div className="hidden md:flex justify-center items-center">
                    <>
                        <Button className="bg-green-500 w-full" text="Logout" onClick={() => {
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

                <div className="md:hidden pl-2 text-green-500">
                    <Hamburger onClick={() => {
                        setIsOpen(!isOpen);
                    }} />

                    {isOpen && (
                        <div className="absolute top-16 right-12 bg-green-500/50 rounded-xl p-2">
                            {/* Authentication Buttons */}
                            {emailAddress === "" ? (
                                <>
                                    <div className="md:flex justify-center items-center">
                                        <>
                                            <Button className="border-b last:border-none text-black  m-0 mb-2 w-full border-green-600 bg-green-100/50 hover:bg-green-200 transition-all duration-200 rounded-md shadow-sm" text="Logout" onClick={() => {
                                                signOut({ callbackUrl: "/" })
                                                setEmailAddress("");
                                                setImage("");
                                            }} />
                                        </>
                                        <SpotifyButton content="Connect" onClick={async () => {
                                            const url = await spotifyAuthorizationUrl();
                                            router.push(url);
                                        }} />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Button className="border-b last:border-none text-black  m-0 mb-2 w-full border-green-600 bg-green-100/50 hover:bg-green-200 transition-all duration-200 rounded-md shadow-sm" text="Logout" onClick={() => {
                                        signOut({ callbackUrl: "/" })
                                        setEmailAddress("");
                                        setImage("");
                                    }} />
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
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
};

const Hamburger = ({ onClick }: { onClick: () => void }) => {
    return <button onClick={onClick} className="flex justify-center items-center focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
    </button>
}

function Play() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 md:h-12 md:w-12 size-12">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
        </svg>
    );
}

function Playlist() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 md:h-12 md:w-12 size-12">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
    );
}

function Share() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 md:h-12 md:w-12 size-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
        </svg>
    );
}

export default DashNavBar;
