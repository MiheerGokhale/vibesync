"use client"

import { cn } from "@/lib/utility/utils";
import React from "react";

type Props = {
    label: string,
    options: { value: string, content: string,icon:React.ReactNode }[],
    placeholder: string,
    className?:string,
    labelClassName?:string,
    selectClassName?:string,
    selectedValue?:string,
    handleChange?:(e:React.ChangeEvent<HTMLSelectElement>) => void
}

const Select = ({ label, options, placeholder, className ,labelClassName , selectClassName,selectedValue,handleChange }: Props) => {
    return (
        <div className={cn("w-full flex flex-col justify-center items-center",className)}>
            <label className={cn("font-bold w-1/2 text-xl block text-green-800 text-left pb-2",labelClassName)}>{label}</label>
            <select className={cn("px-6 py-2 w-1/2 bg-green-500 text-gray-800 focus:outline-none focus:ring-1 focus:ring-black focus:border-black border-2 border-black rounded-lg shadow-md hover:bg-green-200 transition duration-200",selectClassName)} 
            id="my-select" 
            name="values"
            value={selectedValue}
            onChange={handleChange}>
                <option className="bg-green-200 text-black font-medium" value="" disabled selected>{placeholder}</option> {/* Placeholder option */}
                {options.map((option) => {
                    return <option className="bg-green-200 text-black font-medium" key={option.value} value={option.value}>{option.icon} <span className="pl-2">{option.content}</span></option>
                })}
            </select>
        </div>
    );
}

export default Select;
