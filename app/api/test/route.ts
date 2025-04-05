import { fetchBackgroundImage } from "@/app/actions/Unsplash/unsplashAction";
import { NextResponse } from "next/server";

export const GET = async () => {
const response = await fetchBackgroundImage("Clear","Happy")  ;    
    return NextResponse.json({data:response},{status:200});
}

