"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Icon from "@/components/Icon";
import Button from "./Button";
import { signOut } from "next-auth/react";

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
                        <Button className="bg-green-500" text="Signin" onClick={handleSignIn} />
                        <Button className="bg-green-500" text="Login" onClick={handleLogin} />
                    </>
                ) : (
                    <>
                        <Button className="bg-green-500" text="Dashboard" onClick={() => router.push("/dashboard")} />
                        <Button className="bg-green-500" text="Logout" onClick={() => signOut()} />
                    </>
                )}
            </div>

        </div>
    );
};

export default NavBar;
