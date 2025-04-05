import { fetchBackgroundImage } from "@/app/actions/Unsplash/unsplashAction";
import { NextRequest, NextResponse } from "next/server"

export const GET = async (req:NextRequest) => {
    const data = await req.json();

    return NextResponse.json({
        img:fetchBackgroundImage(data.condition,data.mood)
    })
}