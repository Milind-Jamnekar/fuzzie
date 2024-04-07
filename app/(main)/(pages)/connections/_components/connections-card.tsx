import { buttonVariants } from "@/components/ui/button";
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
    <Card>
      <CardHeader>
        <div className="flex justify-between gap-4 items-start">
          <Image
            src={icon}
            alt={title}
            className="object-contain bg-secondary p-2 rounded-xl border border-foreground/20"
            width={50}
            height={50}
          />
          <div>
            <CardTitle className="xl:mb-3">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <Link
            href={
              title === "Discord"
                ? process.env.NEXT_PUBLIC_DISCORD_REDIRECT!
                : title === "Notion"
                ? process.env.NOTION_REDIRECT_URI!
                : title === "Slack"
                ? process.env.SLACK_REDIRECT_URI!
                : "#"
            }
            className={buttonVariants({ variant: "secondary" })}
          >
            Connect
          </Link>
        </div>
      </CardHeader>
    </Card>
  );
}

export default ConnectionCard;
