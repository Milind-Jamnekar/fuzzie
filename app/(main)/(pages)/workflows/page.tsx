import { Plus } from "lucide-react";
import { MainPageTitle } from "@/components/reusable";
import { Button } from "@/components/ui/button";
import { WorkflowDialog } from "@/components/modals/workflow-modal";
import { WorkflowForm } from "@/components/forms";

function WorkflowsPage() {
  return (
    <div>
      <MainPageTitle title="Workflow">
        <div className="ml-auto">
          <WorkflowDialog
            title="Create a Workflow Automation"
            description="Workflows are powerfull that helps you to automate tasks"
          >
            <Button size="icon">
              <Plus className="h-5 w-5" />
            </Button>
          </WorkflowDialog>
        </div>
      </MainPageTitle>
    </div>
  );
}

export default WorkflowsPage;
