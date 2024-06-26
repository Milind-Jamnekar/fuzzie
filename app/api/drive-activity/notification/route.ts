import { postContentToWebHook } from "main/connections/_actions/discord-connection";
import { onCreateNewPageInDatabase } from "main/connections/_actions/notion-connection";
import { postMessageToSlack } from "main/connections/_actions/slack-connection";

import { db } from "@/lib/db";

import { headers } from "next/headers";
import { NextRequest } from "next/server";
import axios from "axios";

const url =
  process.env.NODE_ENV === "development"
    ? process.env.NGROK_URI
    : "https://fuzzie.milindjamnekar.dev";

export async function POST(req: NextRequest) {
  console.log("🔴 Changed");
  const headersList = headers();
  let channelResourceId;
  headersList.forEach((value, key) => {
    if (key == "x-goog-resource-id") {
      channelResourceId = value;
    }
  });

  if (channelResourceId) {
    const user = await db.user.findFirst({
      where: {
        googleResourceId: channelResourceId,
      },
      select: { clerkId: true, credits: true },
    });
    if ((user && user.credits > 0) || (user && user?.credits == -1)) {
      const workflow = await db.workflows.findMany({
        where: {
          userId: user.clerkId,
        },
      });
      if (workflow) {
        workflow.map(async (flow) => {
          const flowPath = flow.flowPath;
          let current = 0;
          while (current < flowPath.length) {
            if (flowPath[current] == "Discord") {
              const discordMessage = await db.discordWebhook.findFirst({
                where: {
                  userId: flow.userId,
                },
                select: {
                  url: true,
                },
              });
              console.log("discord template ", flow.discordTemplate);

              if (discordMessage?.url) {
                await postContentToWebHook(
                  flow.discordTemplate!,
                  discordMessage.url
                );
                flowPath.shift();
              }
            }
            if (flowPath[current] == "Slack") {
              const channels = flow.slackChannels.map((channel) => {
                return {
                  label: "",
                  value: channel,
                };
              });
              await postMessageToSlack(
                flow.slackAccessToken!,
                channels,
                flow.slackTemplate!
              );
              flowPath.shift();
            }
            if (flowPath[current] == "Notion") {
              await onCreateNewPageInDatabase(
                flow.notionDbId!,
                flow.notionAccessToken!,
                JSON.parse(flow.notionTemplate!)
              );
              flowPath.shift();
            }
            if (flowPath[current] == "Wait") {
              const res = await axios.put(
                "https://api.cron-job.org/jobs",
                {
                  job: {
                    url: `${url}?flow_id=${flow.id}`,
                    enabled: "true",
                    schedule: {
                      timezone: "Europe/Istanbul",
                      expiresAt: 0,
                      hours: [-1],
                      mdays: [-1],
                      minutes: ["*****"],
                      months: [-1],
                      wdays: [-1],
                    },
                  },
                },
                {
                  headers: {
                    Authorization: `Bearer ${process.env.CRON_JOB_KEY!}`,
                    "Content-Type": "application/json",
                  },
                }
              );
              if (res) {
                flowPath.shift();
                const cronPath = await db.workflows.update({
                  where: {
                    id: flow.id,
                  },
                  data: {
                    cronPath: JSON.stringify(flowPath),
                  },
                });
                if (cronPath) break;
              }
              break;
            }
            current++;
          }

          await db.user.update({
            where: {
              clerkId: user.clerkId,
            },
            data: {
              credits: user.credits - 1,
            },
          });
        });
        return Response.json(
          {
            message: "flow completed",
          },
          {
            status: 200,
          }
        );
      }
    }
  }
  return Response.json(
    {
      message: "success",
    },
    {
      status: 200,
    }
  );
}
