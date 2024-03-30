"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { useEffect } from "react";

function ProfileForm() {
  const form = useForm<z.infer<typeof EditUserProfileSchema>>({
    resolver: zodResolver(EditUserProfileSchema),
    defaultValues: {
      name: "sjdfklsjfklslk",
      email: "jkalf@gamil.com",
    },
  });

  async function onSubmit(values: z.infer<typeof EditUserProfileSchema>) {
    form.reset();
  }

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      alert("form submitted successfull");
    }
  }, [form.formState.isSubmitSuccessful]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
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
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@fuzzie.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={form.formState.isSubmitting} type="submit">
          {form.formState.isSubmitting
            ? "Saving user settings"
            : "Save user settings"}
        </Button>
      </form>
    </Form>
  );
}

export default ProfileForm;
