import Link from "next/link";

import { AuthShell } from "@/components/auth/AuthShell";
import { LoginForm } from "@/components/auth/LoginForm";
import { Button } from "@/components/ui/button";

export default function AuthLogin() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex flex-1 flex-col w-full py-12">
        <div className="max-w-6xl mx-auto w-full px-8">
        <AuthShell
          title="Log in"
          subtitle="Sign in to manage every Broadway lottery entry in one place."
          footer={
            <Link href="/auth/register" className="btn-primary">
              Not registered? Sign up here
            </Link>
          }
        >
          <LoginForm />
        </AuthShell>
        </div>
      </main>
    </div>
  );
}
