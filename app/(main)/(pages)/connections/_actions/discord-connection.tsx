"use server";

import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import { Prisma } from "@prisma/client";
import axios from "axios";

export const onDiscordConnect = async (
  channel_id: string,
  webhook_id: string,
  webhook_name: string,
  webhook_url: string,
  id: string,
  guild_name: string,
  guild_id: string
) => {
  //check if webhook id params set
  if (webhook_id) {
    //check if webhook exists in database with userid
    const webhook = await db.discordWebhook.findFirst({
      where: {
        userId: id,
      },
      include: {
        connections: {
          select: {
            type: true,
          },
        },
      },
    });

    //if webhook does not exist for this user
    if (!webhook) {
      //create new webhook
      await db.discordWebhook.create({
        data: {
          userId: id,
          webhookId: webhook_id,
          channelId: channel_id!,
          guildId: guild_id!,
          name: webhook_name!,
          url: webhook_url!,
          guildName: guild_name!,
          connections: {
            create: {
              userId: id,
              type: "Discord",
            },
          },
        },
      });
    }

    //if webhook exists return check for duplicate
    if (webhook) {
      //check if webhook exists for target channel id
      const webhook_channel = await db.discordWebhook.findUnique({
        where: {
          channelId: channel_id,
        },
        include: {
          connections: {
            select: {
              type: true,
            },
          },
        },
      });

      //if no webhook for channel create new webhook
      if (!webhook_channel) {
        await db.discordWebhook.create({
          data: {
            userId: id,
            webhookId: webhook_id,
            channelId: channel_id!,
            guildId: guild_id!,
            name: webhook_name!,
            url: webhook_url!,
            guildName: guild_name!,
            connections: {
              create: {
                userId: id,
                type: "Discord",
              },
            },
          },
        });
      }
    }
  }
};

export const getDiscordConnectionUrl = async () => {
  const user = await currentUser();
  if (user) {
    try {
      const webhook = await db.discordWebhook.findFirst({
        where: { userId: user.id },
        select: { url: true, name: true, guildName: true },
      });

      if (webhook) {
        return webhook;
      } else {
        // Handle the case where no webhook is found gracefully
        console.warn("No Discord webhook found for user", user.id);
        return null; // Or return a default value as needed
      }
    } catch (error) {
      // Catch specific Prisma errors
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          // Handle "Record not found" error
          console.warn("No Discord webhook found for user", user.id);
          return null; // Or return a default value as needed
        } else {
          console.error("Prisma request error:", error.code, error.message);
          throw new Error("Failed to get Discord connection URL");
        }
      } else {
        // Handle unexpected errors
        console.error("Unexpected error in getDiscordConnectionUrl:", error);
        throw new Error("An unknown error occurred");
      }
    }
  }
};

export const postContentToWebHook = async (content: string, url: string) => {
  if (content != "") {
    const posted = await axios.post(url, { content });
    if (posted) {
      return { message: "success" };
    }
    return { message: "failed request" };
  }
  return { message: "String empty" };
};
