import Image from "next/image";

type Props = {
    content:string,
    onClick: () => void
}

const SpotifyButton = ({content,onClick}:Props) => {
    return <div onClick={onClick} className="flex flex-row justify-center items-center bg-green-500 px-6 py-2 rounded-xl">
        <div className="w-1/2 text-black font-semibold">
        {content}
        </div>
        <div className="w-1/2 ">
            <Image className="w-24" src={"/spotify.svg"}  width={6} height={8} alt="Spotify" />
        </div>
    </div>
}

export default SpotifyButton;