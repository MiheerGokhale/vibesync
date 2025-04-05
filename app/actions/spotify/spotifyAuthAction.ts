"use server";

import { getServerSession } from "next-auth";
import authOptions from "../../../lib/authOptions";
import axios from "axios";

export const spotifyAuthorizationUrl = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    throw new Error("User not found");
  }

  const state = Math.random().toString(36).substring(7); //Generate a random state for CSRF protection
  const params = new URLSearchParams({
    client_id: process.env.SPOTIFY_CLIENT_ID as string,
    response_type: "code",
    scope:
      "user-read-email user-read-private playlist-modify-public playlist-modify-private user-top-read user-library-read user-read-playback-state user-modify-playback-state streaming",
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI as string,
    state,
  });
  // SPotify Authorization URL
  return `https://accounts.spotify.com/authorize?${params.toString()}`;
};

export const exchangeSpotifyToken = async (code: string) => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    throw new Error("User not found");
  }

  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      {
        code,
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI as string,
        grant_type: "authorization_code",
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            Buffer.from(
              `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
            ).toString("base64"),
        },
      }
    );

    return response.data;
  } catch (error) {
    const err = new Error("token fetcing problem");
    err.cause = error;
    throw err;
  }
};

export const fetchSpotifyProfile = async (token_type:string,token: string) => {
  const session = await getServerSession(authOptions);

  if (!session?.user.id) {
    throw new Error("User not found");
  }

  try {
    const response = await axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `${token_type} ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    const err = new Error("profile fetcing problem");
    err.cause = error;
    throw err;
  }
  return;
};
