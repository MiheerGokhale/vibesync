"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Icon from "@/components/Icon";
import Button from "./Button";

const NavBar = () => {
    const { data: session } = useSession();
    const router = useRouter();

    // Handle login and sign-in actions
    const handleSignIn = () => router.push("/signin");
    const handleLogin = () => router.push("/login");

    return (
        <div className="flex flex-row justify-between px-8 py-6 z-10 absolute top-0 left-0 w-full">
            {/* Logo and Branding */}
            <div className="flex justify-center items-center">
                <Icon />
                <div className="pl-3 text-2xl font-semibold text-green-500">VibeSync</div>
            </div>

            {/* Authentication Buttons */}
            <div className="flex justify-center items-center">
                {!session ? (
                    <>
                        <Button text="Signin" onClick={handleSignIn} />
                        <Button text="Login" onClick={handleLogin} />
                    </>
                ) : (
                    <Button text="Dashboard" onClick={() => router.push("/dashboard")} />
                )}
            </div>
            
        </div>
    );
};

export default NavBar;
