"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormState } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EditUserProfileSchema } from "@/lib/types";
import { useEffect, useState } from "react";
import { User } from "@prisma/client";
import { LoaderIcon } from "lucide-react";
import { toast } from "sonner";

function ProfileForm({
  user,
  onUpload,
}: {
  user: User;
  onUpload: (name: string) => Promise<void>;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof EditUserProfileSchema>>({
    resolver: zodResolver(EditUserProfileSchema),
    defaultValues: {
      //@ts-ignore
      name: user.name,
      email: user.email,
    },
  });

  async function onSubmit(values: z.infer<typeof EditUserProfileSchema>) {
    setIsLoading(true);
    const profilePromise = onUpload(values.name);
    toast.promise(profilePromise, {
      success: "Name updated successfully",
      error: "Error on updating name",
      loading: "Updating name....",
    });
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          disabled={isLoading}
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User full name</FormLabel>
              <FormControl>
                <Input placeholder="Johny depp" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={true}
                  placeholder="Email"
                  type="email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading} type="submit">
          {isLoading ? (
            <div className="flex gap-3">
              <LoaderIcon className="h-4 w-4 animate-spin" />
              <p>Saving User Settings...</p>
            </div>
          ) : (
            "Save User Settings"
          )}
        </Button>
      </form>
    </Form>
  );
}

export default ProfileForm;
