import { WorkflowForm } from "@/components/forms";
import { CustomDialog } from "@/components/modals/custom-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Workflows() {
  return (
    <div className="relative flex flex-col gap-4">
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <Workflow
          name="Test workflow "
          description="Test workflow component name"
          id="123123"
          publish={true}
        />
        <Workflow
          name="Test workflow "
          description="Test workflow component name"
          id="123123"
          publish={false}
        />
      </section>
    </div>
  );
}

type WorkflowProps = {
  name: string;
  description: string;
  id: string;
  publish: boolean;
};

export function Workflow({ name, description, id, publish }: WorkflowProps) {
  return (
    <Card className="flex w-full items-center justify-between">
      <CardHeader className="flex flex-col gap-4">
        <Link href={`/workflows/editor/${id}`}>
          <div className="flex flex-row gap-2">
            <Image
              src="/googleDrive.png"
              alt="Google Drive"
              height={30}
              width={30}
              className="object-contain"
            />
            <Image
              src="/notion.png"
              alt="Google Drive"
              height={30}
              width={30}
              className="object-contain"
            />
            <Image
              src="/discord.png"
              alt="Google Drive"
              height={30}
              width={30}
              className="object-contain"
            />
          </div>
          <div className="">
            <CardTitle className="text-lg">{name}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </Link>
      </CardHeader>
      <div className="flex flex-col items-center gap-2 p-4">
        <Label htmlFor="airplane-mode" className="text-muted-foreground">
          {publish! ? "On" : "Off"}
        </Label>
        <Switch
          id="airplane-mode"
          // onClick={onPublishFlow}
          defaultChecked={publish!}
        />
      </div>
    </Card>
  );
}

function EmptyWorkflowComp() {
  return (
    <div className="mt-28 flex text-muted-foreground items-center justify-center">
      <div className="flex flex-col gap-4 items-center">
        <h2 className="text-2xl text-white">
          Start creating your first Workflows
        </h2>
        <CustomDialog
          title="Create a Workflow Automation"
          description="Workflows are powerfull that helps you to automate tasks"
          form={<WorkflowForm />}
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
