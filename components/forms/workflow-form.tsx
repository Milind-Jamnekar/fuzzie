"use client";
import { WorkflowFormSchema } from "@/lib/types";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm, Form } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

function WorkflowForm({ className }: React.ComponentProps<"form">) {
  const form = useForm<z.infer<typeof WorkflowFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(WorkflowFormSchema),
    defaultValues: { name: "", description: "" },
  });

  const isLoading = form.formState.isLoading;
  const router = useRouter();

  const handleSubmit = (values: z.infer<typeof WorkflowFormSchema>) => {
    console.log(handleSubmit);
  };

  return (
    <Form {...form}>
      <form
        className={cn("grid items-start gap-4", className)}
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter workflow name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Enter workflow name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="mt-4" disabled={isLoading} type="submit">
          {isLoading ? (
            <div className="flex gap-3">
              <LoaderIcon className="h-4 w-4 animate-spin" />
              <p>Saving Workflow Settings...</p>
            </div>
          ) : (
            "Save Workflow Settings"
          )}
        </Button>
      </form>
    </Form>
  );
}

export default WorkflowForm;
