import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useBilling } from "@/providers/billing-provider";
import axios from "axios";

function formatPriceIntl(price: number, currency: string) {
  const unitAmount = price / 100; // Convert paise to rupees

  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currency,
  });

  return formatter.format(unitAmount);
}

type Props = {
  products: any[];
};

export const SubscriptionCard = ({ products }: Props) => {
  const { tier } = useBilling();

  const onPayment = async (id: string) => {
    const { data } = await axios.post(
      "/api/payment",
      {
        priceId: id,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    window.location.assign(data);
  };

  return (
    <section className="flex w-full justify-center md:flex-row flex-col gap-6">
      {products &&
        products.map((product: any) => (
          <Card className="p-3" key={product.id}>
            <CardHeader>
              <CardTitle>{product.nickname}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              <CardDescription>
                {product.nickname == "Unlimited"
                  ? "Enjoy a monthly torrent of credits flooding your account, empowering you to tackle even the most ambitious automation tasks effortlessly."
                  : product.nickname == "Pro"
                  ? "Experience a monthly surge of credits to supercharge your automation efforts. Ideal for small to medium-sized projects seeking consistent support."
                  : product.nickname == "Free" &&
                    "Get a monthly wave of credits to automate your tasks with ease. Perfect for starters looking to dip their toes into Fuzzie's automation capabilities."}
              </CardDescription>
              <div className="flex justify-between">
                <p>
                  {product.nickname == "Free"
                    ? "10"
                    : product.nickname == "Pro"
                    ? "100"
                    : product.nickname == "Unlimited" && "unlimited"}{" "}
                  credits
                </p>
                <p className="font-bold">
                  {product.nickname == "Free"
                    ? "Free"
                    : product.nickname == "Pro"
                    ? formatPriceIntl(product.unit_amount, product.currency)
                    : product.nickname == "Unlimited" &&
                      formatPriceIntl(product.unit_amount, product.currency)}
                  /mo
                </p>
              </div>
              {product.nickname == tier ? (
                <Button disabled variant="outline">
                  Active
                </Button>
              ) : (
                <Button onClick={() => onPayment(product.id)} variant="outline">
                  Purchase
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
    </section>
  );
};
