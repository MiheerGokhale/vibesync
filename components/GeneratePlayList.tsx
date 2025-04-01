"use client"

import Button from "./Button";
import Select from "./Select";

const GeneratePlaylist = () => {
       return <div className="h-full bg-green-500/50 bg-[url(/login.png)] bg-cover bg-[center_10%] flex flex-col justify-end">
              <div className="flex flex-col justify-center items-center w-full gap-4 pb-12">
                     <Select className="" label={"Enter your city"} placeholder="Dropdown" options={[{ value: "sad", content: "Sad" }]} />
                     <Select className="" label={"Select your mood"} placeholder="Dropdown" options={[{ value: "sad", content: "Sad" }]} />
                     <Button className="w-1/2 focus:ring-black focus:border-black border-2 border-black bg-green-500 hover:border-2 hover:border-green-800 hover:right-2 font-medium transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105" text="Generate Playlist" onClick={() => { }} />
              </div>
       </div>
}

export default GeneratePlaylist;