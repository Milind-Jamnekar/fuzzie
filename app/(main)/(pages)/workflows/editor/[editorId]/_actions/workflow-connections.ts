"use server";

import { db } from "@/lib/db";

export const onCreateNodesEdges = async (
  flowId: string,
  nodes: string,
  edges: string,
  flowPath: string
) => {
  try {
    const flow = await db.workflows.update({
      where: {
        id: flowId,
      },
      data: {
        nodes,
        edges,
        flowPath: flowPath,
      },
    });

    if (flow) return { message: "Flow is saved" };
    else return { message: "Flow is not created " };
  } catch (error) {
    return { message: "Failed to save flow!...Error from db" };
  }
};

export const onFlowPublish = async (workflowId: string, state: boolean) => {
  const published = await db.workflows.update({
    where: {
      id: workflowId,
    },
    data: {
      publish: state,
    },
  });

  if (published.publish) return "Workflow published";
  return "Workflow unpublished";
};
