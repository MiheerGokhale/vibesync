import axios from "axios";

export const fetchBackgroundImage = async (
  weatherCondition: string,
  mood: string
) => {
  try {
    const response = await axios.get("https://api.unsplash.com/search/photos", {
      params: {
        query: `${weatherCondition} ${mood}`,
        client_id: process.env.UNSPLASH_ACCESS_KEY as string,
        orientation: "landscape",
        per_page: 10,
        order_by: "relevant",
      },
    });

    console.log("===========================================")
    const results = response.data.results;
    let img;
    if (results && results.length > 0) {
      // Pick a random image from the results
      const randomIndex = Math.floor(Math.random()*results.length);
      console.log(results[randomIndex].urls.regular);
      img = results[randomIndex].urls.regular;
    }

    return img;
  } catch (error) {
    const err = new Error("Error fetching image");
    err.cause = error;
    throw err;
  }
};
