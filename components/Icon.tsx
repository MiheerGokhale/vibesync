import Image from "next/image";


const Icon = () => {
    return <div className="flex justify-center items-center h-12 w-12 rounded-full bg-green-500 border-2">
        <Image src={"/music.svg"} width={30} height={30} alt=""></Image>
    </div>
}

export default Icon;