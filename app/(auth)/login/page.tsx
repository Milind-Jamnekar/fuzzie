"use client";
import { createClient } from "@/utils/supabase/client";
import { Auth } from "@supabase/auth-ui-react";
import {
  // Import predefined theme
  ThemeSupa,
} from "@supabase/auth-ui-shared";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const supabase = createClient();

const LoginPage = () => {
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        redirect("/dashboard");
      }
    };

    getUser();
  }, []);
  return (
    <div>
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={["google"]}
      />
    </div>
  );
};

export default LoginPage;
