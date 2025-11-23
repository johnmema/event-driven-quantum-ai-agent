import Link from "next/link";

import { AuthShell } from "@/components/auth/AuthShell";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { Button } from "@/components/ui/button";

export default function AuthRegister() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex flex-1 flex-col w-full py-12">
        <div className="max-w-6xl mx-auto w-full px-8">
        <AuthShell
          title="Create your account"
          subtitle="One login, automatic entries into every Broadway lottery."
          footer={
            <Link href="/auth/login" className="btn-primary">
              Already have an account? Log in
            </Link>
          }
        >
          <RegisterForm />
        </AuthShell>
        </div>
      </main>
    </div>
  );
}
