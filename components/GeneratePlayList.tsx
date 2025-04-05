"use client"

import Image from "next/image";
import Button from "./Button";
import CustomDropdown from "./CustomDropDown";
import Input from "./Input";
import ShowWeatherInfo from "./showWeatherInfo";
import { useCallback, useState } from "react";
import { fetchWeather } from "@/app/actions/weatherAction/weatherAction";
import { useWeatherStore } from "@/store/WeatherStore";
// import { fetchBackgroundImage } from "@/app/actions/Unsplash/unsplashAction";
import { useUnsplashImage } from "@/store/UnsplashStore";
import { getPlaylist } from "@/app/actions/spotify/spotifyPlaylistAction";
import { useCurrentAccount } from "@/store/UserStore";
import { useSpotifyTracks } from "@/store/SpotifyStore";

const happy = <Image src={"/sun.png"} height={20} width={20} className="inline-block mr-2" alt=""  />;
const chill = <Image src={"/clouds.png"} height={20} width={20} className="inline-block mr-2" alt=""  />;
const energetic = <Image src={"/fire.png"} height={20} width={20} className="inline-block mr-2" alt=""  />;
const sad = <Image src={"/sad.png"} height={20} width={20} className="inline-block mr-2" alt=""  />;
const romantic = <Image src={"/hearts.png"} height={20} width={20} className="inline-block mr-2" alt=""  />;
const sleepy = <Image src={"/sleep.png"} height={20} width={20} className="inline-block mr-2" alt=""  />;
const focus = <Image src={"/target.png"} height={20} width={20} className="inline-block mr-2" alt=""  />;
const motivated = <Image src={"/motivation.png"} height={20} width={20} className="inline-block mr-2"  alt=""  />;

const options = [
       {content:"Happy",value:"Happy",icon:happy},
       {content:"Chill",value:"Chill",icon:chill},
       {content:"Energetic",value:"Eneregetic",icon:energetic},
       {content:"Sad",value:"Sad",icon:sad},
       {content:"Romantic",value:"Romantic",icon:romantic},
       {content:"Sleepy",value:"Sleepy",icon:sleepy},
       {content:"Focus",value:"Focus",icon:focus},
       {content:"Motivated",value:"Motivated",icon:motivated}
]

const GeneratePlaylist = () => {
       const [cityName,setCityName] = useState("");
       const {temperature,condition,description,country,city,windSpeed,tempFeeling,weatherStatus,mood,setTemperature,setCondition,setCity,setCountry,setDescription,setMood,setTempFeeling,setWeatherStatus,setWindSpeed} = useWeatherStore();
       const setBgImage = useUnsplashImage((state)=>state.setBgImage);
       const emailAddress = useCurrentAccount((state) => state.emailAddress);
       const setTracks = useSpotifyTracks((state) => state.setTracks);

       const getWeather = useCallback(async (name:string) => {
              const data = await fetchWeather(name);

              setTemperature(data.temperature);
              setCondition(data.condition);
              setCountry(data.country);
              setDescription(data.description);
              setCity(data.city);
              setTempFeeling(data.tempFeeling);
              setWeatherStatus(data.weatherStatus);
              setWindSpeed(data.windSpeed);

       },[]);

       const playlist = useCallback(async () => {
              const tracks= await getPlaylist(condition, mood, emailAddress);
              setTracks(tracks);
              // setBgImage(await fetchBackgroundImage(condition,mood));   
              setBgImage("https://images.unsplash.com/photo-1541215571283-a4973d4e2c68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MzIzODR8MHwxfHNlYXJjaHwzfHxDbG91ZHMlMjBSb21hbnRpY3xlbnwwfDB8fHwxNzQzNjY4MzU2fDA&ixlib=rb-4.0.3&q=80&w=1080");
              
       },[emailAddress,condition,mood])

       return <div className="h-full  bg-[url(/login.png)]  bg-cover bg-[center_10%]  flex flex-col justify-between items-center">
              <ShowWeatherInfo temperature={temperature} condition={condition} description={description} windSpeed={windSpeed} weatherStatus={weatherStatus} country={country} city={city} tempFeeling={tempFeeling} mood={mood} />
              <div className="flex flex-col justify-center items-center  w-full gap-4 pb-12">
                     <div className="flex flex-row gap-x-2 w-1/2">
                            <Input className="py-2  bg-green-500 text-gray-800 border-2 border-black rounded-lg shadow-md cursor-pointer flex items-center placeholder:text-black" placeholder="Enter your city" type="text" 
                            onChange={(e)=>{
                                   setCityName(e.target.value);
                            }} /> 
                            <Button onClick={() => {getWeather(cityName);}} text="Select" className="w-1/2 mx-0 focus:ring-black focus:border-black border-2 border-black bg-green-500 hover:border-2 hover:border-green-800 hover:right-2 font-medium transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105" />
                     </div>
                     <CustomDropdown label={"Select Your mood"} placeholder="DropDown" options={options} 
                     setMood={setMood}
                     />
                     {condition != "" && mood != "" ? <Button className="w-1/2 focus:ring-black focus:border-black border-2 border-black bg-green-500 hover:border-2 hover:border-green-800 hover:right-2 font-medium transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105" text="Generate Playlist" 
                     onClick={playlist} /> : <Button className="w-1/2 focus:ring-black focus:border-black border-2 border-black bg-green-500 hover:border-2 hover:border-green-800 hover:right-2 font-medium transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105" text="Generate Playlist" 
                     onClick={playlist} disabled={true} /> }
                     
              </div>
       </div>
}





export default GeneratePlaylist;