"use client";
import { EditorCanvasTypes, EditorNodeType } from "@/lib/types";
import { useNodeConnections } from "@/providers/connections-provider";
import { useEditor } from "@/providers/editor-provider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import React, { useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { CONNECTIONS, EditorCanvasDefaultCardTypes } from "@/lib/constant";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { onDragStart } from "@/lib/editor-utils";
import { ScrollArea } from "@/components/ui/scroll-area";
// import RenderConnectionAccordion from "./render-connection-accordion";
// import RenderOutputAccordion from "./render-output-accordian";
// import { useFuzzieStore } from "@/store";

type Props = {
  nodes: EditorNodeType[];
};

const EditorCanvasSidebar = ({ nodes }: Props) => {
  const { state } = useEditor();
  const { nodeConnection } = useNodeConnections();
  //   const { googleFile, setSlackChannels } = useFuzzieStore();
  //   useEffect(() => {
  //     if (state) {
  //       onConnections(nodeConnection, state, googleFile);
  //     }
  //   }, [state]);

  //   useEffect(() => {
  //     if (nodeConnection.slackNode.slackAccessToken) {
  //       fetchBotSlackChannels(
  //         nodeConnection.slackNode.slackAccessToken,
  //         setSlackChannels
  //       );
  //     }
  //   }, [nodeConnection]);

  return (
    <aside className="@container">
      <ScrollArea className="rounded-md h-screen border m-4 p-3">
        <Tabs defaultValue="actions">
          <TabsList className="grid w-full grid-cols-2 sticky top-0">
            <TabsTrigger value="actions">Actions</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent
            value="actions"
            className="grid grid-cols-1 @xl:grid-cols-2 @3xl:grid-cols-3 gap-4 pb-44"
          >
            {Object.entries(EditorCanvasDefaultCardTypes)
              .filter(
                ([_, cardType]) =>
                  (!nodes.length && cardType.type === "Trigger") ||
                  (nodes.length && cardType.type === "Action")
              )
              .map(([cardKey, cardValue]) => (
                <Card
                  key={cardKey}
                  draggable
                  // className="w-full cursor-grab border-black bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900"
                  onDragStart={(event) => {
                    //   onDragStart(event, cardKey as EditorCanvasTypes)
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
          <TabsContent value="settings" className="-mt-6">
            <div className="px-2 py-4 text-center text-xl font-bold">
              {state.editor.selectedNode.data.title}
            </div>

            {/* <Accordion type="multiple">
              <AccordionItem value="Options" className="border-y-[1px] px-2">
                <AccordionTrigger className="!no-underline">
                  Account
                </AccordionTrigger>
                <AccordionContent>
                  {CONNECTIONS.map((connection) => (
                    <RenderConnectionAccordion
                      key={connection.title}
                      state={state}
                      connection={connection}
                    />
                  ))}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="Expected Output" className="px-2">
                <AccordionTrigger className="!no-underline">
                  Action
                </AccordionTrigger>
                <RenderOutputAccordion
                  state={state}
                  nodeConnection={nodeConnection}
                />
              </AccordionItem>
            </Accordion> */}
          </TabsContent>
        </Tabs>
      </ScrollArea>
    </aside>
  );

  //   const tags = Array.from({ length: 50 }).map(
  //     (_, i, a) => `v1.2.0-beta.${a.length - i}`
  //   );
  //   return (
  //     <ScrollArea className="w-full h-screen rounded-md border">
  //       <div className="p-4">
  //         <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
  //         {tags.map((tag) => (
  //           <>
  //             <div key={tag} className="text-sm">
  //               {tag}
  //             </div>
  //             <Separator className="my-2" />
  //           </>
  //         ))}
  //       </div>
  //     </ScrollArea>
  //   );
};

export default EditorCanvasSidebar;
