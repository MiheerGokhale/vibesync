import { create } from "zustand"

type UnsplashImage = {
    // weatherCondition:string,
    // mood:string,
    bgImage:string,
    
    // setWeatherCondition: (condition:string) => void,
    // setMood: (mood:string) => void,
    setBgImage: (image:string) => void
}

export const useUnsplashImage = create<UnsplashImage>((set) => ({
    weatherCondition:"",
    mood:"",
    bgImage:"",

    // setWeatherCondition: (weatherCondition) => set(() => ({weatherCondition})),
    // setMood: (mood) => set(() => ({mood})),
    setBgImage: (bgImage) => set(() => ({bgImage}))
}))