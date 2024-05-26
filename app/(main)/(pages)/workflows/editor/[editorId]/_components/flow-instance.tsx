"use client";
import { Button } from "@/components/ui/button";
import { useNodeConnections } from "@/providers/connections-provider";
import { useParams } from "next/navigation";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  onCreateNodesEdges,
  onFlowPublish,
} from "../_actions/workflow-connections";
import { useEdges } from "reactflow";
import { EditorNodeType } from "@/lib/types";

type Props = {
  children: ReactNode;
  edges: any[];
  nodes: EditorNodeType[];
};

const FlowInstance = ({ children, edges, nodes }: Props) => {
  const { editorId } = useParams<{ editorId: string }>();
  const [flow, setFlow] = useState<string[]>([]);
  const { nodeConnection } = useNodeConnections();

  const onAutomateFlow = useCallback(() => {
    let flows = nodes.map((node) => node.type as string);
    setFlow(flows);
    return flows;
  }, [nodes]);

  const onFlowAutomation = useCallback(() => {
    const flowPath = onAutomateFlow();

    const flowPromise = onCreateNodesEdges(
      editorId,
      JSON.stringify(nodes),
      JSON.stringify(edges),
      flowPath
    );

    toast.promise(flowPromise, {
      loading: "Saving flow...",
      success: (data) => `${data.message}`,
      error: "Error",
    });
  }, [edges, editorId, nodes, onAutomateFlow]);

  const onPublishWorkflow = useCallback(async () => {
    const publishPromise = onFlowPublish(editorId, true);
    toast.promise(publishPromise, {
      loading: "Publishing flow...",
      success: (data) => `${data}`,
      error: "Error",
    });
  }, [editorId]);

  return (
    <div className="flex flex-col ">
      <div className="flex gap-3 p-4">
        <Button onClick={onFlowAutomation} disabled={flow.length < 1}>
          Save
        </Button>
        <Button disabled={flow.length < 1} onClick={onPublishWorkflow}>
          Publish
        </Button>
      </div>
      {children}
    </div>
  );
};

export default FlowInstance;
