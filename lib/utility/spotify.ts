import { refreshSpotifyToken } from "@/app/actions/spotify/spotifyPlaylistAction";
import axios from "axios";
import { prisma } from "../Prisma-Config";

export default class Spotify {
  access_token: string;
  refresh_token: string;

  constructor(access_token: string, refresh_token: string) {
    this.access_token = access_token;
    this.refresh_token = refresh_token;
  }

  getSpotifyQuery(weather: string, mood: string) {
    console.log(weather,mood);
    const moodGenreMap: Record<string, string> = {
      Happy: "bollywood party ", 
      Chill: "lofi hindi ", 
      Energetic: "bollywood dance ",
      Sad: "bollywood sad ",
      Romantic: "bollywood romantic ",
      Sleepy: "indian instrumental ", 
      Focus: "lofi bollywood ", 
      Motivated: "motivational bollywood ", 
    };

    const weatherGenreMap: Record<string, string> = {
      Rain: " bollywood rain", 
      Clouds: " indie india", 
      Sunny: " bollywood pop", 
      Snow: " indian instrumental", 
      Thunderstorm: " motivational bollywood", 
      Clear: " happy bollywood", 
    };
    const moodKeywords = moodGenreMap[mood] || "";
    const weatherKeywords = weatherGenreMap[weather] || "";

    const allGenres = moodKeywords+"OR"+weatherKeywords;
    return allGenres;
  }

  fetchSongs = async (
    query: string
  ): Promise<
    {
      id: string;
      name: string;
      image: string;
    }[]
  > => {
    console.log(query);

    try {
      const response = await axios.get("https://api.spotify.com/v1/search", {
        headers: {
          Authorization: `Bearer ${this.access_token}`,
        },
        params: {
          q: query,
          type: "track",
          limit: 20,
          market: "IN",
        },
      });

      const tracks = response.data.tracks.items.map(
        (item: {
          id: string;
          name: string;
          album: {
            images: { url: string }[];
          };
        }) => {
          return {
            id: item.id,
            name: item.name,
            image: item.album.images[0].url,
          };
        }
      );

      return tracks;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        try {
          const data = await refreshSpotifyToken(this.refresh_token);
          if (data.access_token) {
            await prisma.spotifyAccount.update({
              where: {
                access_token: this.access_token,
              },
              data: {
                access_token: data.access_token,
              },
            });
            this.access_token = data.access_token;
          }
          return await this.fetchSongs(query);
        } catch (refreshError) {
          console.error("Error refreshing access token:", refreshError);
        }
      }
      const err = new Error("Error while fetcing song");
      err.cause = error;
      throw err;
    }
  };

  createPlaylist = async (
    userId: string,
    accessToken: string,
    name: string
  ) => {
    try {
      const response = await axios.post(
        `https://api.spotify.com/v1/users/${userId}/playlists`,
        {
          name,
          description: "Auto-generated playlist based on weather & mood",
          public: false,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data.id;
    } catch (error) {
      const err = new Error("Error while fetcing song");
      err.cause = error;
      throw err;
    }
  };

  addSongsToPlaylist = async (
    playlistId: string,
    trackUris: string[],
    accessToken: string
  ) => {
    try {
      await axios.post(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        { uris: trackUris },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Songs added successfully!");
    } catch (error) {
      console.error("Error adding songs:", error);
    }
  };

  // generatePlaylist = async (weather: string, mood: string, accessToken: string, userId: string) => {
  //     const query = this.getSpotifyQuery(weather, mood);
  //     const songs = await this.fetchSongs(query, accessToken);

  //     if (songs.length === 0) {
  //         console.error("No songs found!");
  //         return;
  //     }

  //     const playlistId = await this.createPlaylist(userId, accessToken, `Weather: ${weather}, Mood: ${mood}`);
  //     if (!playlistId) return;

  //     //@ts-ignore
  //     const trackUris = songs.map(song:any => song.uri);
  //     await addSongsToPlaylist(playlistId, trackUris, accessToken);
  // };
}
