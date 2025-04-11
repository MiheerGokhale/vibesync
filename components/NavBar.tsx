"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Icon from "@/components/Icon";
import Button from "./Button";
import { signOut } from "next-auth/react";
import { useState } from "react";

const NavBar = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

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
            <div className=" hidden md:flex md:justify-center md:items-center">
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
            <div className="md:hidden text-green-500 flex justify-center items-center">
                <Hamburger onClick={() => setIsOpen(!isOpen)} />
                
                {isOpen && (
                    <div className="absolute top-16 bg-green-500/50 rounded-xl p-2">
                    {/* Authentication Buttons */}
                        {!session ? (
                            <>
                                <Button className="border-b last:border-none text-black  m-0 mb-2 w-full border-green-600 bg-green-100/50 hover:bg-green-200 transition-all duration-200 rounded-md shadow-sm" text="Signin" onClick={handleSignIn} />
                                <Button className="border-b last:border-none text-black  m-0 w-full border-green-600 bg-green-100/50 hover:bg-green-200 transition-all duration-200 rounded-md shadow-sm" text="Login" onClick={handleLogin} />
                            </>
                        ) : (
                            <>
                                <Button className="border-b last:border-none text-black  m-0 mb-2 w-full border-green-600 bg-green-100/50 hover:bg-green-200 transition-all duration-200 rounded-md shadow-sm" text="Dashboard" onClick={() => router.push("/dashboard")} />
                                <Button className="border-b last:border-none text-black  m-0 w-full border-green-600 bg-green-100/50 hover:bg-green-200 transition-all duration-200 rounded-md shadow-sm" text="Logout" onClick={() => signOut()} />
                            </>
                        )}
                </div>
                )}
            </div>
        </div>
    );
};


const Hamburger = ({onClick}:{onClick: () => void}) => {
    return <button onClick={onClick} className="flex justify-center items-center focus:outline-none">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
</button>
}

export default NavBar;
