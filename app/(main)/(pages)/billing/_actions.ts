"use server";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";

export const userCurrentTierAndCredits = async () => {
  const user = await currentUser();
  const data = await db.user.findFirst({
    where: { clerkId: user?.id },
    select: { tier: true, credits: true },
  });

  if (data) {
    return data;
  } else {
    return { tier: "Free", credits: 0 };
  }
};
