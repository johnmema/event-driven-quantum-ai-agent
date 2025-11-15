"use server";

import { getSupabaseServerClient } from "@/lib/supabase";
import { type AuthActionState } from "./action-state";

const INVALID_CONFIGURATION_MESSAGE =
  "Supabase credentials are missing. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.";

function buildError(message: string): AuthActionState {
  return {
    status: "error",
    message,
    redirectTo: null,
  };
}

export async function loginAction(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const email = formData.get("email");
  const password = formData.get("password");

  if (typeof email !== "string" || typeof password !== "string") {
    return buildError("Email and password are required.");
  }

  const supabase = await getSupabaseServerClient();

  if (!supabase) {
    return buildError(INVALID_CONFIGURATION_MESSAGE);
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return buildError(error.message);
  }

  return {
    status: "success",
    message: "Welcome back! Redirecting you to your account…",
    redirectTo: "/",
  };
}

export async function signupAction(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const fullName = formData.get("fullName");
  const email = formData.get("email");
  const password = formData.get("password");

  if (
    typeof fullName !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string"
  ) {
    return buildError("Full name, email, and password are required.");
  }

  if (fullName.trim().length < 2) {
    return buildError("Please enter your full name.");
  }

  if (password.length < 8) {
    return buildError("Passwords need to be at least 8 characters.");
  }

  const supabase = await getSupabaseServerClient();

  if (!supabase) {
    return buildError(INVALID_CONFIGURATION_MESSAGE);
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName.trim(),
      },
    },
  });

  if (error) {
    return buildError(error.message);
  }

  const hasSession = Boolean(data.session);

  return {
    status: "success",
    message: hasSession
      ? "Account created! Redirecting you to your dashboard…"
      : "Account created! Please confirm your email to finish signing in.",
    redirectTo: hasSession ? "/" : null,
  };
}
