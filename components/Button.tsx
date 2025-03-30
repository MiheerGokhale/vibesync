import { cn } from "@/lib/utility/utils";

type Props = {
    text: string,
    onClick : () => void,
    className?:string,
    disabled?:boolean
}

const Button = ({ text,onClick,className,disabled }: Props) => {
    return <button 
    onClick={onClick} 
    className={cn("px-5 py-1.5 mx-2 rounded-xl border-2 hover:cursor-pointer font-semibold",className)}
    disabled={disabled}>{text}</button>
}

export default Button;