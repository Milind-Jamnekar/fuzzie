import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET!, {
  typescript: true,
});

export async function GET(req: NextRequest) {
  const products = await stripe.prices.list({
    limit: 3,
  });

  return NextResponse.json(products.data);
}

export async function POST(req: NextRequest) {
  const data = await req.json();

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: data.priceId,
        quantity: 1,
      },
    ],
    billing_address_collection: "required",
    mode: "subscription",
    success_url:
      "http://localhost:3000/billing?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: "http://localhost:3000/billing",
  });

  return NextResponse.json(session.url);
}
