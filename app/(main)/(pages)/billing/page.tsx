import React from "react";
import Stripe from "stripe";
import { currentUser } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { MainPageTitle } from "@/components/reusable";
import BillingDashboard from "./_components/billboard-dashboard";
// import BillingDashboard from './_components/billing-dashboard'

type Props = {
  searchParams?: { [key: string]: string | undefined };
};

const Billing = async (props: Props) => {
  const { session_id } = props.searchParams ?? {
    session_id: "",
  };
  if (session_id) {
    const stripe = new Stripe(process.env.STRIPE_SECRET!, {
      typescript: true,
    });

    const session = await stripe.checkout.sessions.listLineItems(session_id);

    const user = await currentUser();
    if (user) {
      await db.user.update({
        where: {
          clerkId: user.id,
        },
        data: {
          tier: session.data[0].description,
          credits:
            session.data[0].description == "Unlimited"
              ? -1
              : session.data[0].description == "Pro"
              ? 100
              : 10,
        },
      });
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <MainPageTitle title="Billing" />
      <BillingDashboard />
    </div>
  );
};

export default Billing;
