import { create } from "zustand";

interface WeatherState {
  temperature: string;
  condition: string;
  description: string;
  country: string;
  city: string;
  windSpeed: string;
  tempFeeling: string;
  weatherStatus: string;
  mood: string;

  setTemperature: (temperature: string) => void;
  setCondition: (condition: string) => void;
  setDescription: (condition: string) => void;
  setCountry: (country: string) => void;
  setCity: (city: string) => void;
  setWindSpeed: (windSpeed: string) => void;
  setTempFeeling: (tempFeeling: string) => void;
  setWeatherStatus: (weatherStatus: string) => void;
  setMood: (mood: string) => void;
}

export const useWeatherStore = create<WeatherState>((set) => ({
  temperature: "",
  condition: "",
  description: "",
  country: "",
  city: "",
  windSpeed: "",
  tempFeeling: "",
  weatherStatus: "",
  mood: "",

  setTemperature: (temperature) => set(() => ({ temperature })),
  setCondition: (condition) => set(() => ({ condition })),
  setDescription: (description) => set(() => ({ description })),
  setCountry: (country) => set(() => ({ country })),
  setCity: (city) => set(() => ({ city })),
  setWindSpeed: (windSpeed) => set(() => ({ windSpeed })),
  setTempFeeling: (tempFeeling) => set(() => ({ tempFeeling })),
  setWeatherStatus: (weatherStatus) => set(() => ({ weatherStatus })),
  setMood: (mood) => set(() => ({ mood })),
}));



