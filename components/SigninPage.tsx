"use client"

import Link from "next/link";
import Input from "./Input";
import Button from "./Button";
import Image from "next/image";
import Icon from "./Icon";
import useSigninStore from "@/store/useSigninStore";
import { signUpUser } from "@/app/actions/authAction";
import { useRouter } from "next/navigation";

const SigninPage = () => {
    const {firstName,lastName,email,password,setFirstName,setLastName,setEmail,setPassword} = useSigninStore();
    const router = useRouter();

    return <div className="flex justify-center items-center h-screen w-screen p-10 bg-black">
        <div className="h-full w-full flex bg-green-500 rounded-xl">
            <div className="w-1/2">
                <Image src={"/login.png"} width={600} height={800} alt="Music & Weather Background" className="object-cover w-full h-full" />
            </div>
            <div className="w-1/2 flex flex-col justify-center items-center gap-4 p-8 text-green-900">
                <div className="flex justify-center items-center">
                    <Icon />
                    <div className="pl-3 text-2xl font-semibold">VibeSync</div>
                </div>
                <h1 className="text-5xl font-semibold">{"Create an account"}</h1>
                <p className="text-xl pb-10">Already have an account?<Link className="underline pl-2" href={"/login"}>Login</Link></p>
                <div className="flex flex-col gap-8">
                    <div className="flex gap-4 justify-center">
                        <Input onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                            setFirstName(e.target.value);
                        }} className="bg-green-300 text-black placeholder-black focus:ring-2 focus:ring-green-700 focus:border-green-700 transition" placeholder="First Name" type="text" />
                        <Input onChange={(e) => {
                            setLastName(e.target.value);
                        }} className="bg-green-300 text-black placeholder-black focus:ring-2 focus:ring-green-700 focus:border-green-700 transition" placeholder="Last Name" type="text" />
                    </div>

                    <Input onChange={(e) => {
                            setEmail(e.target.value);
                        }} className="bg-green-300 text-black placeholder-black focus:ring-2 focus:ring-green-700 focus:border-green-700 transition" placeholder="Email" type="text" />
                    <Input onChange={(e) => {
                            setPassword(e.target.value);
                        }} className="bg-green-300 text-black placeholder-black focus:ring-2 focus:ring-green-700 focus:border-green-700 transition" placeholder="Password" type="password" />
                    <Button onClick={async () => {
                        try {
                            await signUpUser({firstName,lastName,email,password});
                            router.push("/dashboard");
                        } catch (error) {
                            console.log(error);
                        }
                    }} className="text-black rounded-md w-full bg-green-700 py-3 hover:bg-green-900 transition mx-0 focus:ring-2 focus:ring-green-700 focus:border-green-700" text={"Create account"} />
                </div>
            </div>
        </div>
    </div>
}

export default SigninPage;