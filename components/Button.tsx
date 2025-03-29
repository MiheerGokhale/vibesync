type Props = {
    text: string,
    onClick : () => void
}

const Button = ({ text,onClick }: Props) => {
    return <button onClick={onClick} className="px-5 py-1.5 mx-2 bg-green-500 rounded-xl border-2 hover:cursor-pointer font-semibold">{text}</button>

}

export default Button;