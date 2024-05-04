import { WorkflowForm } from "@/components/forms";
import { CustomDialog } from "@/components/modals/custom-dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { onGetWorkflows } from "../_actions/workflow-connections";
import { WorkflowCard } from "./workflow-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export async function Workflows() {
  const workflows = await onGetWorkflows();

  return (
    <div className="relative flex flex-col gap-4">
      {workflows?.length === 0 && <EmptyWorkflowComp />}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {workflows?.map((workflow) => (
          <WorkflowCard
            name={workflow.name}
            description={workflow.description}
            id={workflow.id}
            publish={workflow.publish}
            key={workflow.id}
          />
        ))}
      </section>
    </div>
  );
}

function EmptyWorkflowComp() {
  return (
    <div className="mt-28 w-full flex text-muted-foreground items-center justify-center">
      <div className="flex flex-col gap-4 items-center">
        <h2 className="text-2xl text-white">
          Start creating your first Workflows
        </h2>
        <CustomDialog
          title="Create a Workflow Automation"
          description="Workflows are powerfull that helps you to automate tasks"
          formElement={<WorkflowForm />}
        >
          <Button>
            <Plus className="h-5 w-5 mr-2" />
            Create New Workflow
          </Button>
        </CustomDialog>
      </div>
    </div>
  );
}

export function WorkflowSkeleton() {
  let nums = [1, 2, 3];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {nums.map((num) => (
        <Card key={num} className="flex items-center justify-between">
          <CardHeader className="flex flex-col">
            <div className="flex gap-2">
              <Skeleton className="h-[30px] w-[30px] rounded-full" />
              <Skeleton className="h-[30px] w-[30px] rounded-full" />
              <Skeleton className="h-[30px] w-[30px] rounded-full" />
            </div>
            <div className="flex flex-col gap-3"></div>
            <Skeleton className="h-[10px] w-full rounded-full" />
            <Skeleton className="h-[10px] w-3/5 rounded-full" />
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
