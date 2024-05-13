import { db } from "@/lib/db";
import { WebhookEvent } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { type, data }: WebhookEvent = await req.json();

    switch (type) {
      case "user.created": {
        const { first_name, image_url, id, email_addresses } = data;
        const email = email_addresses[0].email_address;

        await db.user.create({
          data: {
            clerkId: id,
            email,
            name: first_name || "",
            profileImage: image_url || "",
          },
        });

        console.log("done saving ");

        return new NextResponse("User created in database successfully", {
          status: 200,
        });
      }

      case "user.updated": {
        const { first_name, image_url, id, email_addresses } = data;
        const email = email_addresses[0].email_address;

        await db.user.update({
          where: { clerkId: id },
          data: {
            email,
            name: first_name || "",
            profileImage: image_url || "",
          },
        });

        return new NextResponse("User updated in database successfully", {
          status: 200,
        });
      }
    }
  } catch (error) {
    console.log("error in updating user in database successfully");
    return NextResponse.json(
      {
        message: "error in updating user in database successfully",
        error: error,
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET() {
  return Response.json({ message: "Hello World!" });
}
