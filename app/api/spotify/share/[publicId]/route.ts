import authOptions from "@/lib/authOptions";
import { playlistDb } from "@/lib/db/playlistDb";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{publicId:string}>}
) => {
  const { publicId } = await params;

  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("User not authenticated");
  }

  try {
    const response = await playlistDb.getSharePlaylist(publicId);
    return NextResponse.json({
      playlist: response,
    });
  } catch (error) {
    const err = new Error("Error while fetching playlist");
    err.cause = error;
    throw err;
  }
};
