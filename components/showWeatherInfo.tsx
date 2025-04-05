import { cn } from "@/lib/utility/utils";

type Props = {
    className?:string,
    temperature:string,
    condition:string,
    description:string,
    country:string,
    city:string,
    windSpeed:string,
    tempFeeling:string,
    weatherStatus:string,
    mood:string
}

const ShowWeatherInfo = ({className,temperature,condition,city,country,description,windSpeed,weatherStatus,mood}:Props) => {
     return <div className={cn("flex justify-center py-2 gap-y-2  bg-green-500/50 w-5/6 h-2/3 rounded-xl my-4",className)}>
            <ul className="w-full px-4">
                <li className="px-6 py-2 border-b last:border-none border-green-600 bg-green-100/50 hover:bg-green-200 transition-all duration-200 rounded-md flex justify-between items-center shadow-sm">
                    <p className="text-green-900 font-semibold tracking-wide">Temperature</p>
                    <p className="text-green-700 font-bold">{temperature}</p>
                </li>
                <li className="px-6 py-2 border-b last:border-none border-green-600 bg-green-100/50 hover:bg-green-200 transition-all duration-200 rounded-md flex justify-between items-center shadow-sm">
                    <p className="text-green-900 font-semibold tracking-wide">Condition</p>
                    <p className="text-green-700 font-bold">{condition}</p>
                </li>
                <li className="px-6 py-2 border-b last:border-none border-green-600 bg-green-100/50 hover:bg-green-200 transition-all duration-200 rounded-md flex justify-between items-center shadow-sm">
                    <p className="text-green-900 font-semibold tracking-wide">Country</p>
                    <p className="text-green-700 font-bold">{country}</p>
                </li>
                <li className="px-6 py-2 border-b last:border-none border-green-600 bg-green-100/50 hover:bg-green-200 transition-all duration-200 rounded-md flex justify-between items-center shadow-sm">
                    <p className="text-green-900 font-semibold tracking-wide">City</p>
                    <p className="text-green-700 font-bold">{city}</p>
                </li>
                <li className="px-6 py-2 border-b last:border-none border-green-600 bg-green-100/50 hover:bg-green-200 transition-all duration-200 rounded-md flex justify-between items-center shadow-sm">
                    <p className="text-green-900 font-semibold tracking-wide">Description</p>
                    <p className="text-green-700 font-bold">{description}</p>
                </li>
                <li className="px-6 py-2 border-b last:border-none border-green-600 bg-green-100/50 hover:bg-green-200 transition-all duration-200 rounded-md flex justify-between items-center shadow-sm">
                    <p className="text-green-900 font-semibold tracking-wide">WindSpeed</p>
                    <p className="text-green-700 font-bold">{windSpeed}</p>
                </li>
                {mood != "" && <li className="px-6 py-2 border-b last:border-none border-green-600 bg-green-100/50 hover:bg-green-200 transition-all duration-200 rounded-md flex justify-between items-center shadow-sm">
                    <p className="text-green-900 font-semibold tracking-wide">Mood</p>
                    <p className="text-green-700 font-bold">{mood}</p>
                </li>}
                
                {weatherStatus != "" && <li className="px-6 py-2 border-b last:border-none border-green-600 bg-green-100/50 hover:bg-green-200 transition-all duration-200 rounded-md flex justify-center items-center shadow-sm">
                    <p className="text-green-900 font-semibold tracking-wide">{weatherStatus}</p>
                </li>}
            </ul>
     </div>
} 

export default ShowWeatherInfo;