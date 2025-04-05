import { useState } from "react";

type Props = {
    label: string,
    options: { value: string, content: string,icon:React.ReactNode }[],
    placeholder: string,
    className?:string,
    labelClassName?:string,
    selectClassName?:string,
    selectedValue?:string,
    setMood:(mood:string) => void
}

const CustomDropdown = ({ label, options, placeholder,setMood }:Props) => {
    const [selected, setSelected] = useState<{ value: string; content: string; icon: React.ReactNode } | null>(null);
    const [open, setOpen] = useState(false);

    return (
        <div className="relative w-1/2">
            <label className="font-bold text-xl block text-green-800 text-left pb-2">{label}</label>
            <div 
                className="px-6 py-2 bg-green-500 text-black border-2 border-black rounded-lg shadow-md cursor-pointer flex items-center"
                onClick={() => setOpen(!open)}
            >
                {selected === null ? (
                    <>{placeholder}</>
                ) : (
                    <>
                        {selected.icon}
                        {selected.content}
                    </>
                )}
            </div>
            {open && (
                <ul className="absolute max-h-30 overflow-y-auto w-full bg-green-200 border border-black shadow-lg rounded-lg mt-1">
                    {options.map((option) => (
                        <li 
                            key={option.value}
                            className="px-4 py-2 hover:bg-green-300 flex items-center cursor-pointer"
                            onClick={() => {
                                setSelected(option);
                                setMood(option.content);
                                setOpen(false);
                            }}
                        >
                            {option.icon}
                            {option.content}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CustomDropdown;
