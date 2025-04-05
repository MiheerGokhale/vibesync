"use server";

import axios from "axios";

export const fetchWeather = async (city: string) => {
  try {
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather?",
      {
        params: {
          q: city,
          units: "metric",
          appid: process.env.OPENWEATHER_SECRET as string,
        },
      }
    );

    if (!response) {
      throw new Error("City not found");
    }

    //Extract Relevant fields
    const temperature = response.data.main.temp;
    const condition = response.data.weather[0].main;
    const description = response.data.weather[0].description;
    const country = response.data.sys.country;
    const windSpeed = response.data.wind.speed;
    const humidity = response.data.main.humidity;

    // Determine heat level
    let tempFeeling = "";
    if (temperature > 40) tempFeeling = "extremely hot 🥵";
    else if (temperature > 35) tempFeeling = "very hot 🔥";
    else if (temperature > 30) tempFeeling = "hot 🌞";
    else if (temperature > 25) tempFeeling = "warm ☀️";
    else if (temperature > 20) tempFeeling = "pleasant 😊";
    else if (temperature > 15) tempFeeling = "cool 🌿";
    else if (temperature > 10) tempFeeling = "cold 🧥";
    else tempFeeling = "very cold ❄️";

    if (humidity > 70 && temperature > 30) tempFeeling = "humid and hot 🌡️";
    if (humidity > 80 && temperature > 35)
      tempFeeling = "extremely humid and sweaty 🥵💦";

    // Construct human-readable weather status
    let weatherStatus = `The weather in ${city} is ${tempFeeling} with ${description}.`;
    if (windSpeed > 10) {
      weatherStatus += " It's also quite windy.";
    }

    
    return {
      temperature,
      condition,
      description,
      country,
      city,
      windSpeed,
      tempFeeling,
      weatherStatus,
    };
  } catch (error) {
    const err = new Error("error while fetching weather");
    err.cause = error;
    console.error(error);
    throw err;
  }
};

