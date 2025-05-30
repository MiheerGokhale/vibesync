import Image from "next/image";
import Icon from "./Icon";
import Input from "./Input";
import Button from "./Button";
import Link from "next/link";
import useLoginStore from "@/store/useLoginStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

const LoginPage = () => {
    const email = useLoginStore((state) => state.email);
    const setEmail = useLoginStore((state) => state.setEmail);
    const password = useLoginStore((state) => state.password);
    const setPassword = useLoginStore((state) => state.setPassword);
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        console.log("inside handle--------------");
        if (!email || !password) {
            toast.error("Please enter email and password");
            return;
        }

        setLoading(true);
        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false // prevent  auto redirect
            })

            if (result?.error) {
                throw new Error(result.error);
            }

            toast.success("Login successful!");
            router.push("/dashboard"); // Redirect after login
        } catch (error) {
            console.log(error);
            toast.error((error instanceof Error ? error.message : "Login failed"));
        } finally {
            setLoading(false);
        }
    }

    return <div className="flex justify-center items-center h-screen w-screen p-10 bg-black">
        <div className="h-full w-full flex bg-green-500 rounded-xl">
            <div className="hidden md:flex w-1/2">
                <Image src={"/login.png"} width={600} height={800} alt="Music & Weather Background" className="object-cover w-full h-full" />
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center gap-4 p-8 text-green-900">
                <div className=" pb-6  md:pb-0 flex justify-center items-center">
                    <Icon />
                    <div className="pl-3 text-2xl font-semibold">VibeSync</div>
                </div>
                {/* <h1 className="text-5xl font-semibold">{"Create an account"}</h1> */}
                <p className="md:text-xl pb-10">{"Don't"} have an account?<Link className="underline pl-2" href={"/signin"}>Signin</Link></p>
                <div className="flex flex-col gap-8 w-1/2">
                    <Input onChange={(e) => {
                        setEmail(e.target.value);
                    }} className="bg-green-300 w-full py-1 text-black placeholder-black focus:ring-2 focus:ring-green-700 focus:border-green-700 transition" placeholder="Email" type="text" />
                    <Input onChange={(e) => {
                        setPassword(e.target.value);
                    }} className="bg-green-300 w-full py-1 text-black placeholder-black focus:ring-2 focus:ring-green-700 focus:border-green-700 transition" placeholder="Password" type="password" />
                    <Button
                        onClick={handleLogin}
                        className="text-black rounded-md w-full bg-green-700 py-3 hover:bg-green-900 transition mx-0 focus:ring-2 focus:ring-green-700 focus:border-green-700" text={"login"}
                        disabled={loading}
                    />
                </div>
            </div>
        </div>
    </div>
}

export default LoginPage;