import { MainPageTitle } from "@/components/reusable";
import { CONNECTIONS } from "@/lib/constant";
import ConnectionCard, {
  ConnectionSkeleton,
} from "./_components/connections-card";
import { currentUser } from "@clerk/nextjs/server";
import { onDiscordConnect } from "./_actions/discord-connection";
import { onNotionConnect } from "./_actions/notion-connection";
import { onSlackConnect } from "./_actions/slack-connection";
import { getUserData } from "./_actions/get-user";
import { Suspense } from "react";
import Connection from "./_components/connections";

type Props = {
  searchParams?: { [key: string]: string | undefined };
};

const ConnectionsPage = async (props: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <MainPageTitle title="Connections" />
      <div className="p-6">
        <p className="leading-7 [&:not(:first-child)]:mt-6 mb-4">
          Connect all your apps directly from here. You may need to connect
          these apps regularly to refresh verification
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <Suspense fallback={<ConnectionSkeleton />}>
            <Connection searchParams={props.searchParams} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default ConnectionsPage;
