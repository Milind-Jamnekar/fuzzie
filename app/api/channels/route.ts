import { db } from "@/lib/db";
import { auth, clerkClient } from "@clerk/nextjs";
import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function GET() {
  const oauth2Client = new google.auth.OAuth2({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirectUri: process.env.OAUTH2_REDIRECT_URI,
  });

  const { userId } = auth();
  const channelId = await db.user.findFirst({
    where: { clerkId: userId! },
    select: { pageToken: true },
  });

  if (!userId) return NextResponse.json({ message: "User not found" });

  const clerkResponse = await clerkClient.users.getUserOauthAccessToken(
    userId,
    "oauth_google"
  );

  const accessToken = clerkResponse[0].token;

  oauth2Client.setCredentials({
    access_token: accessToken,
  });

  const drive = google.drive({
    version: "v3",
    auth: oauth2Client,
  });

  //   drive.channels.stop();
  const list = await drive.changes.list({ pageToken: channelId?.pageToken! });
  return NextResponse.json(list.data);
}
