import { WorkflowForm } from "@/components/forms";
import { CustomDialog } from "@/components/modals/custom-dialog";
import { MainPageTitle } from "@/components/reusable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { WorkflowSkeleton, Workflows } from "./_comonents/workflows";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";

function WorkflowsPage() {
  return (
    <div className="flex flex-col gap-4">
      <MainPageTitle title="Workflow">
        <div className="ml-auto">
          <CustomDialog
            title="Create a Workflow Automation"
            description="Workflows are powerfull that helps you to automate tasks"
            formElement={<WorkflowForm />}
          >
            <Button size="icon">
              <Plus className="h-5 w-5" aria-hidden="true" />
              <span className="sr-only">Create new workflow</span>
            </Button>
          </CustomDialog>
        </div>
      </MainPageTitle>

      <section className="flex flex-col p-6 gap-4">
        <div>
          <h2 className="text-2xl">Workflow list</h2>
          <p className="text-white/50">Manage your workflow list</p>
        </div>
        <Separator />
        <Suspense fallback={<WorkflowSkeleton />}>
          <Workflows />
        </Suspense>
      </section>
    </div>
  );
}

export default WorkflowsPage;
