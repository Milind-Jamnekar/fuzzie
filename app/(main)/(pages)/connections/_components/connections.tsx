import { currentUser } from "@clerk/nextjs/server";
import { onDiscordConnect } from "../_actions/discord-connection";
import { MainPageTitle } from "@/components/reusable";
import { CONNECTIONS } from "@/lib/constant";
import { getUserData } from "../_actions/get-user";
import { onNotionConnect } from "../_actions/notion-connection";
import { onSlackConnect } from "../_actions/slack-connection";
import ConnectionCard from "./connections-card";

type Props = {
  searchParams?: { [key: string]: string | undefined };
};

async function Connection(props: Props) {
  const {
    webhook_id,
    webhook_name,
    webhook_url,
    guild_id,
    guild_name,
    channel_id,
    access_token,
    workspace_name,
    workspace_icon,
    workspace_id,
    database_id,
    app_id,
    authed_user_id,
    authed_user_token,
    slack_access_token,
    bot_user_id,
    team_id,
    team_name,
  } = props.searchParams ?? {
    webhook_id: "",
    webhook_name: "",
    webhook_url: "",
    guild_id: "",
    guild_name: "",
    channel_id: "",
    access_token: "",
    workspace_name: "",
    workspace_icon: "",
    workspace_id: "",
    database_id: "",
    app_id: "",
    authed_user_id: "",
    authed_user_token: "",
    slack_access_token: "",
    bot_user_id: "",
    team_id: "",
    team_name: "",
  };

  const user = await currentUser();
  if (!user) return null;

  const onUserConnections = async () => {
    await onDiscordConnect(
      channel_id!,
      webhook_id!,
      webhook_name!,
      webhook_url!,
      user.id,
      guild_name!,
      guild_id!
    );
    await onNotionConnect(
      access_token!,
      workspace_id!,
      workspace_icon!,
      workspace_name!,
      database_id!,
      user.id
    );

    await onSlackConnect(
      app_id!,
      authed_user_id!,
      authed_user_token!,
      slack_access_token!,
      bot_user_id!,
      team_id!,
      team_name!,
      user.id
    );

    const connections: any = {};

    const user_info = await getUserData(user.id);

    //get user info with all connections
    user_info?.connections.map((connection) => {
      connections[connection.type] = true;
      return (connections[connection.type] = true);
    });

    // Google Drive connection will always be true
    // as it is given access during the login process
    return { ...connections, "Google Drive": true };
  };

  const connections = await onUserConnections();
  return CONNECTIONS.map((connection) => (
    <ConnectionCard
      key={connection.title}
      callback={() => {}}
      connected={connections}
      description={connection.description}
      icon={connection.image}
      title={connection.title}
      type={connection.title}
    />
  ));
}

export default Connection;
