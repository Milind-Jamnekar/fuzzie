"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EditorCanvasTypes, EditorNodeType } from "@/lib/types";
import { useNodeConnections } from "@/providers/connections-provider";
import { useEditor } from "@/providers/editor-provider";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CONNECTIONS, EditorCanvasDefaultCardTypes } from "@/lib/constant";
// import {
//   fetchBotSlackChannels,
//   onConnections,
//   onDragStart,
// } from '@/lib/editor-utils'
// import EditorCanvasIconHelper from "./editor-canvas-card-icon-hepler";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import EditorCanvasIconHelper from "./editor-canvas-icon-helper";
import RenderConnectionAccordion from "./render-connection-accordion";
import RenderOutputAccordion from "./render-output-accordion";
import { useFuzzieStore } from "@/lib/store";
import {
  fetchBotSlackChannels,
  onConnections,
  onDragStart,
} from "@/lib/editor-utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useMemo } from "react";

type Props = {
  nodes: EditorNodeType[];
};

const EditorCanvasSidebar = ({ nodes }: Props) => {
  const { state } = useEditor();
  const { nodeConnection } = useNodeConnections();
  const selectedNode = CONNECTIONS.filter(
    (connection) => connection.title === state.editor.selectedNode.data.title
  );

  const { googleFile, setSlackChannels } = useFuzzieStore();

  useEffect(() => {
    if (state) {
      onConnections(nodeConnection, state, googleFile);
    }

    // I am not putting nodeConnection object as a dep cause each tiem
    // onConnection change value in change nodeConnection and this
    // useEffect getting stuck at infinite loop

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  useEffect(() => {
    if (nodeConnection.slackNode.slackAccessToken) {
      fetchBotSlackChannels(
        nodeConnection.slackNode.slackAccessToken,
        setSlackChannels
      );
    }
  }, [nodeConnection.slackNode.slackAccessToken, setSlackChannels]);

  return (
    <aside className="@container">
      <ScrollArea className="rounded-xl h-screen border m-4 p-4 pb-44">
        <Tabs defaultValue="actions" className="rounded-lg">
          <TabsList className="grid w-full grid-cols-2 sticky top-0 rounded-xl">
            <TabsTrigger value="actions" className="rounded-lg">
              Actions
            </TabsTrigger>
            <TabsTrigger value="settings" className="rounded-lg">
              Settings
            </TabsTrigger>
          </TabsList>
          {/* Actions tab content  */}
          <TabsContent
            value="actions"
            className="grid grid-cols-1 @xl:grid-cols-2 @3xl:grid-cols-3 gap-4 "
          >
            {Object.entries(EditorCanvasDefaultCardTypes)
              .filter(
                ([_, cardType]) =>
                  (!nodes.length && cardType.type === "Trigger") ||
                  (nodes.length && cardType.type === "Action")
              )
              .map(([cardKey, cardValue]) => (
                <Card
                  className="cursor-move hover:border-white/40"
                  key={cardKey}
                  draggable
                  onDragStart={(event) => {
                    event.dataTransfer.setData(
                      "application/reactflow",
                      cardKey as EditorCanvasTypes
                    );
                    event.dataTransfer.effectAllowed = "move";
                  }}
                >
                  <CardHeader className="flex flex-row items-center gap-4">
                    <EditorCanvasIconHelper
                      type={cardKey as EditorCanvasTypes}
                    />
                    <div>
                      <CardTitle className="text-lg">{cardKey}</CardTitle>
                      <CardDescription>{cardValue.description}</CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              ))}
          </TabsContent>
          {/* Settings tab content  */}
          <TabsContent value="settings" className="">
            <div className="px-2 py-4 text-center text-xl font-bold ">
              {state.editor.selectedNode.data.title}
            </div>

            {selectedNode[0] && (
              <Accordion type="multiple">
                <AccordionItem value="account" className="border-y-[1px]">
                  <AccordionTrigger className="!no-underline">
                    Account
                  </AccordionTrigger>
                  <AccordionContent>
                    <RenderConnectionAccordion
                      connection={selectedNode[0]}
                      state={state}
                    />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="options" className="border-y-[1px]">
                  <AccordionTrigger className="!no-underline">
                    Options
                  </AccordionTrigger>
                  <AccordionContent>
                    <RenderOutputAccordion />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}
          </TabsContent>
        </Tabs>
      </ScrollArea>
    </aside>
  );
};

export default EditorCanvasSidebar;
