import Link from "next/link";

import { AuthShell } from "@/components/auth/AuthShell";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { Button } from "@/components/ui/button";

export default function AuthRegister() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex flex-1 flex-col items-center justify-center w-full py-12">
        <AuthShell
          title="Create your account"
          subtitle="One login, automatic entries into every Broadway lottery."
          footer={
            <Button
              asChild
              variant="ghost"
              className="font-instrument-serif text-2xl text-black hover:bg-transparent"
            >
              <Link href="/auth/login">Already have an account? Log in</Link>
            </Button>
          }
        >
          <RegisterForm />
        </AuthShell>
      </main>
    </div>
  );
}
