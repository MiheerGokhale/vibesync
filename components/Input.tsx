import { cn } from "@/lib/utility/utils";

type Props = {
    className:string,
    placeholder:string,
    type:string,
    onChange: (e:React.ChangeEvent<HTMLInputElement>) => void
}

const Input = ({className,placeholder,type,onChange}:Props) => {
    return <input onChange={onChange} className={cn("text-black px-2  md:py-3 rounded-sm focus:outline-none",className)} type={type} placeholder={placeholder} />
}

export default Input;