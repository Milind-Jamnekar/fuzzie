"use client";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { onFlowPublish } from "../editor/[editorId]/_actions/workflow-connections";

type WorkflowProps = {
  name: string;
  description: string;
  id: string;
  publish: boolean;
};

export function WorkflowCard({
  name,
  description,
  id,
  publish,
}: WorkflowProps) {
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
          {publish! ? "Published" : "Publish"}
        </Label>
        <Switch
          id="airplane-mode"
          onCheckedChange={async (state) => {
            const promise = onFlowPublish(id, state);
            toast.promise(promise, {
              loading: "Publishing workflow...",
              success: (data) => data,
              error: (data) => data || "Failed to publishing workflow",
            });
          }}
          aria-label="Publish workflow switch"
          defaultChecked={publish!}
        />
      </div>
    </Card>
  );
}
