"use server";

import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import { Client } from "@notionhq/client";
import { Prisma } from "@prisma/client";

export const onNotionConnect = async (
  access_token: string,
  workspace_id: string,
  workspace_icon: string,
  workspace_name: string,
  database_id: string,
  id: string
) => {
  if (access_token) {
    //check if notion is connected
    const notion_connected = await db.notion.findFirst({
      where: {
        accessToken: access_token,
      },
      include: {
        connections: {
          select: {
            type: true,
          },
        },
      },
    });

    if (!notion_connected) {
      //create connection
      await db.notion.create({
        data: {
          userId: id,
          workspaceIcon: workspace_icon!,
          accessToken: access_token,
          workspaceId: workspace_id!,
          workspaceName: workspace_name!,
          databaseId: database_id,
          connections: {
            create: {
              userId: id,
              type: "Notion",
            },
          },
        },
      });
    }
  }
};

export const getNotionConnection = async () => {
  const user = await currentUser();
  try {
    if (user) {
      const connection = await db.notion.findFirst({
        where: {
          userId: user.id,
        },
      });
      if (connection) {
        return connection;
      }
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        console.log(
          "There is a unique constraint violation, a new user cannot be created with this email"
        );
      } else {
        console.error("Prisma request error:", error.code, error.message);
        throw new Error("Failed to get Discord connection URL");
      }
    } else {
      throw new Error("Unknown error from getNotionConenction");
    }
  }
};

export const getNotionDatabase = async (
  databaseId: string,
  accessToken: string
) => {
  const notion = new Client({
    auth: accessToken,
  });
  const response = await notion.databases.retrieve({ database_id: databaseId });
  return response;
};

export const onCreateNewPageInDatabase = async (
  databaseId: string,
  accessToken: string,
  content: string
) => {
  const notion = new Client({
    auth: accessToken,
  });

  const response = await notion.pages.create({
    parent: {
      type: "database_id",
      database_id: databaseId,
    },
    properties: {
      name: [
        {
          text: {
            content: content,
          },
        },
      ],
    },
  });

  if (response) {
    return response;
  }
};
