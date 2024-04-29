import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ConnectionTypes } from "@/lib/types";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
type Props = {
  type: ConnectionTypes;
  icon: string;
  title: ConnectionTypes;
  description: string;
  callback: () => void;
  connected: {} | any;
};

function ConnectionCard({
  callback,
  connected,
  description,
  icon,
  title,
  type,
}: Props) {
  return (
    <Card className="@container">
      <CardHeader>
        <div className="flex justify-between gap-4 items-start flex-col @sm:flex-row @sm:gap-4">
          <Image
            src={icon}
            alt={title}
            className="object-contain bg-secondary p-2 rounded-lg border border-foreground/20"
            width={50}
            height={50}
          />
          <div>
            <CardTitle className="mb-3 @sm:mb-0">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>

          <div className="flex flex-col items-center gap-2">
            {connected[type] ? (
              <Button variant="outline" disabled>
                Connected
              </Button>
            ) : (
              <Link
                href={
                  title === "Discord"
                    ? process.env.NEXT_PUBLIC_DISCORD_REDIRECT!
                    : title === "Notion"
                    ? process.env.NEXT_PUBLIC_NOTION_AUTH_URL!
                    : title === "Slack"
                    ? process.env.NEXT_PUBLIC_SLACK_REDIRECT!
                    : "#"
                }
                className={buttonVariants({ variant: "secondary" })}
              >
                Connect
              </Link>
            )}
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}

export default ConnectionCard;
