"use client";

import Icon from "@/components/Icon";
import Button from "./Button";
import { signOut } from "next-auth/react";
import SpotifyButton from "./SpotifyButton";

const DashNavBar = () => {
    return (
        <div className="z-10 absolute top-0 left-0 w-full px-8 py-6 flex justify-center items-center">
            <div className="flex flex-row justify-between w-2/3 px-4 py-2 border-1 border-gray-600 bg-green-400/10  rounded-xl">
                {/* Logo and Branding */}
                <div className="flex justify-center items-center">
                    <Icon />
                    <div className="pl-3 text-2xl font-semibold text-green-500">VibeSync</div>
                </div>

                <div className="flex flex-row justify-center items-center text-green-500 gap-x-4 text-xl">
                    <div>hello1</div>
                    <div>hello2</div>
                    <div>hello3</div>
                </div>

                {/* Authentication Buttons */}
                <div className="flex justify-center items-center">
                    <>
                        <Button className="bg-green-500" text="Logout" onClick={() => signOut({ callbackUrl: "/" })} />
                        <SpotifyButton />
                    </>
                </div>

            </div>

        </div>
    );
};

export default DashNavBar;
