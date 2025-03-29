import { cn } from "@/lib/utility/utils";

type Props = {
    icon:React.ReactNode,
    content:string,
    className:string
}

const Label = ({icon,content,className}:Props) => {
    return <div className={cn("flex justify-center items-center px-4 py-3 rounded-xl m-2",className)}>
            <div>{icon}</div>
            <div className="text-xl pl-1">{content}</div>
    </div>
}

export default Label;

