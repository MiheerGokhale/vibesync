import { cn } from "@/lib/utility/utils";

type Props = {
    icon:React.ReactNode,
    content:string,
    className:string
}

const Label = ({icon,content,className}:Props) => {
    return <div className={cn("flex justify-center items-center px-2 py-1  md:px-4 md:py-3 rounded-xl m-2",className)}>
            <div>{icon}</div>
            <div className="text-sm md:text-xl pl-1">{content}</div>
    </div>
}

export default Label;

