import { cn } from "@/lib/utility/utils";
import Image from "next/image";

type Props = {
    className?: string;
}

const Icon = ({className}:Props) => {
    return <div className={cn("flex justify-center items-center h-12 w-12 rounded-full bg-green-500 border-2",className)}>
        <Image src={"/music.svg"} width={30} height={30} alt=""></Image>
    </div>
}

export default Icon;