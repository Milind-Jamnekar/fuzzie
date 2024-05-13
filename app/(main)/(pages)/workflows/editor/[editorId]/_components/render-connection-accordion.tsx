"use client";
import MultipleSelector from "@/components/ui/multiple-selector";
import { useFuzzieStore } from "@/lib/store";
import { Connection } from "@/lib/types";
import { useNodeConnections } from "@/providers/connections-provider";
import { EditorState } from "@/providers/editor-provider";
import ConnectionCard from "main/connections/_components/connections-card";
import React from "react";

const RenderConnectionAccordion = ({
  connection,
  state,
}: {
  connection: Connection;
  state: EditorState;
}) => {
  const {
    title,
    image,
    description,
    connectionKey,
    accessTokenKey,
    alwaysTrue,
    slackSpecial,
  } = connection;

  const { nodeConnection } = useNodeConnections();
  const { slackChannels, selectedSlackChannels, setSelectedSlackChannels } =
    useFuzzieStore();

  const connectionData = (nodeConnection as any)[connectionKey];

  const isConnected =
    alwaysTrue ||
    (nodeConnection[connectionKey] &&
      accessTokenKey &&
      connectionData[accessTokenKey!]);

  return (
    <>
      <ConnectionCard
        callback={() => {}}
        title={title}
        icon={image}
        description={description}
        type={title}
        connected={{ [title]: isConnected }}
      />
      {slackSpecial && isConnected && (
        <div className="p-6">
          {slackChannels?.length ? (
            <>
              <div className="mb-4 ml-1">
                Select the slack channels to send notification and messages:
              </div>
              <MultipleSelector
                value={selectedSlackChannels}
                onChange={setSelectedSlackChannels}
                defaultOptions={slackChannels}
                placeholder="Select channels"
                emptyIndicator={
                  <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                    no results found.
                  </p>
                }
              />
            </>
          ) : (
            "No Slack channels found. Please add your Slack bot to your Slack channel"
          )}
        </div>
      )}
    </>
  );
};

export default RenderConnectionAccordion;
