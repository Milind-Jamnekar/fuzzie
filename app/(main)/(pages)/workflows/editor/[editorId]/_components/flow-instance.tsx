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

type Props = {
  children: ReactNode;
  edges: any[];
  nodes: any[];
};

const FlowInstance = ({ children, edges, nodes }: Props) => {
  const { editorId } = useParams<{ editorId: string }>();
  const [isFlow, setIsFlow] = useState<string[]>([]);
  const { nodeConnection } = useNodeConnections();

  const onAutomateFlow = useCallback(() => {
    const flows: any = [];
    const connectedEdges = edges.map((edge) => edge.target);

    connectedEdges.map((target) => {
      nodes.map((node) => {
        if (node.id === target) {
          flows.push(node.type);
        }
      });
    });

    return flows as string[];
  }, [edges, nodes]);

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
        <Button onClick={onFlowAutomation} disabled={isFlow.length < 1}>
          Save
        </Button>
        <Button disabled={isFlow.length < 1} onClick={onPublishWorkflow}>
          Publish
        </Button>
      </div>
      {children}
    </div>
  );
};

export default FlowInstance;
