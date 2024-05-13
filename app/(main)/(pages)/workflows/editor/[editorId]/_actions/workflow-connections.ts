"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

/**
 * Saving nodes,edges and flow to the db
 * @param flowId
 * @param nodes
 * @param edges
 * @param flowPath
 * @returns
 */
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

/**
 * Of course this set pubish to true
 */
export const onFlowPublish = async (workflowId: string, state: boolean) => {
  try {
    const published = await db.workflows.update({
      where: {
        id: workflowId,
      },
      data: {
        publish: state,
      },
    });

    if (published.publish) return "Workflow published";
    return "Workflow un-published";
  } catch (error) {
    return JSON.stringify(error);
  } finally {
    revalidatePath("/workflows"); //whatever path you are calling it from
  }
};
