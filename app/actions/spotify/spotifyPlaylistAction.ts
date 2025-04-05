"use server";

import authOptions from "@/lib/authOptions";
import { accountDb } from "@/lib/db/accountDb";
import { prisma } from "@/lib/Prisma-Config";
import Spotify from "@/lib/utility/spotify";
import axios from "axios";
import { getServerSession } from "next-auth";

export const getPlaylist = async (
  weather: string,
  mood: string,
  emailAddress: string
) => {
  const session = await getServerSession(authOptions);
  if (!session?.user.id) {
    throw new Error("Unauthenticated");
  }

  const account = await accountDb.getAccount(session.user.id, emailAddress);
  if (!account) {
    throw new Error("account not found");
  }

  try {
    const spotify = new Spotify(account?.access_token, account?.refresh_token);
    const query = spotify.getSpotifyQuery(weather, mood);
    const playlist = await spotify.fetchSongs(query);

    return playlist;
  } catch (error) {
    const err = new Error("Error while fetching playlist");
    err.cause = error;
    throw err;
  }
};

export const getToken = async (emailAddress: string) => {
    const session = await getServerSession(authOptions);
  
    if (!session?.user.id) {
      throw new Error("Unauthenticated");
    }
  
    const account = await accountDb.getAccount(session.user.id, emailAddress);
    if (!account) {
      throw new Error("Spotify account not found for user.");
    }
  
    // If token is still valid, return it
    if (await isTokenValid(account.access_token)) {
      return account.access_token;
    }
  
    // Refresh the token
    const data = await refreshSpotifyToken(account.refresh_token);
  
    if (!data?.access_token) {
      throw new Error("Failed to refresh access token.");
    }
  
    // Update access_token and possibly refresh_token
    await prisma.spotifyAccount.update({
      where: {
        access_token: account.access_token,
      },
      data: {
        access_token: data.access_token,
        refresh_token: data.refresh_token || account.refresh_token, // keep old if new not returned
      },
    });
  
    return data.access_token;
  };
  

export const isTokenValid = async (token: string): Promise<boolean> => {
  try {
    const res = await axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.status === 200;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      // Token is invalid or expired
      return false;
    }
    console.error("Token check failed:", error);
    return false;
  }
};

export const refreshSpotifyToken = async (refreshToken: string) => {
  try {
    if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_CLIENT_SECRET) {
      throw new Error("Not configured");
    }

    const params = {
      client_id: process.env.SPOTIFY_CLIENT_ID,
      client_secret: process.env.SPOTIFY_CLIENT_SECRET,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    };

    const { data } = await axios.post(
      "https://accounts.spotify.com/api/token",
      null,
      { params }
    );

    return data;
  } catch (error) {
    console.error("Error refreshing Spotify token:", error);
    throw new Error("Can't refresh token");
  }
};
