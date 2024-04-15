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
import { ScrollArea } from "@/components/ui/scroll-area";
import EditorCanvasIconHelper from "./editor-canvas-icon-helper";
import RenderConnectionAccordion from "./render-connection-accordion";

type Props = {
  nodes: EditorNodeType[];
};

const EditorCanvasSidebar = ({ nodes }: Props) => {
  const { state } = useEditor();
  const { nodeConnection } = useNodeConnections();
  const selectedNode = CONNECTIONS.filter(
    (connection) => connection.title === state.editor.selectedNode.data.title
  );

  //   const { googleFile, setSlackChannels } = useFuzzieStore();
  //   useEffect(() => {
  //     if (state) {
  //       onConnections(nodeConnection, state, googleFile);
  //     }
  //   }, [state]);

  // useEffect(() => {
  //   if (nodeConnection.slackNode.slackAccessToken) {
  //     fetchBotSlackChannels(
  //       nodeConnection.slackNode.slackAccessToken,
  //       setSlackChannels
  //     );
  //   }
  // }, [nodeConnection]);

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
                  key={cardKey}
                  draggable
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
          <TabsContent value="settings" className="">
            <div className="px-2 py-4 text-center text-xl font-bold ">
              {state.editor.selectedNode.data.title}
            </div>

            {selectedNode[0] && (
              <Accordion type="multiple">
                <AccordionItem value="Options" className="border-y-[1px] px-2">
                  <AccordionTrigger className="!no-underline">
                    Account
                  </AccordionTrigger>
                  <AccordionContent>
                    <RenderConnectionAccordion
                      state={state}
                      connection={selectedNode[0]}
                    />
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
