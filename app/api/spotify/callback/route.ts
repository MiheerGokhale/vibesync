import { exchangeSpotifyToken, fetchSpotifyProfile } from "@/app/actions/spotify/spotifyAuthAction";
import authOptions from "@/lib/authOptions";
import { accountDb } from "@/lib/db/accountDb";
import { userDb } from "@/lib/db/userDb";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req:NextRequest) => {
    const session = await getServerSession(authOptions);
    if (!session?.user.id) {
        throw new Error("User not authenticated");
    }

    const params = req.nextUrl.searchParams;
    const code = params.get("code");

    if (!code) {
        throw new Error("no code found");
    }

    const response = await exchangeSpotifyToken(code);
    console.log(JSON.stringify(response));
    if (!response.access_token) return NextResponse.json({ error: "Failed to fetch token" }, { status: 400 });


    const user = await userDb.getUser(session.user.email);
    if (!user) {
        throw new Error("User not found");
    }

    const spotifyProfile = await fetchSpotifyProfile(response.token_type,response.access_token);    

    try {
        await accountDb.createAccount({
            id:spotifyProfile.id,
            image:spotifyProfile.images[0].url,
            provider:"spotify",
            emailAddress:spotifyProfile.email,
            userId:user.id,
            access_token:response.access_token,
            refresh_token:response.refresh_token,
            token_type:response.token_type,
        })
    } catch (error) {
        const err = new Error("Spotify Premium Account Needed");
        err.cause = error;
        throw err;
    }
    return NextResponse.redirect(new URL("/dashboard",req.url));
}