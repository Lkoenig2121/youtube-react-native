import axios from "axios";
import { rapidApiKey } from "../constants";

export const fetchTrendingVideos = async (params) => {
  const options = {
    method: "GET",
    url: "https://youtube-v3-alternative.p.rapidapi.com/trending",
    params: { geo: "US", type: "now", lang: "en", ...params },
    headers: {
      "X-RapidAPI-Key": rapidApiKey,
      "X-RapidAPI-Host": "youtube-v3-alternative.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return response.data.data;
  } catch (error) {
    console.log("error: ", error.message);
    return [];
  }
};
