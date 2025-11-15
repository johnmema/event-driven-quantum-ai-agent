import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type AuthShellProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
};

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
  className,
}: AuthShellProps) {
  return (
    <section className={cn("w-full px-4", className)}>
      <div className="mx-auto max-w-2xl rounded-[28px] border-[3px] border-[#4b8afe] bg-white shadow-[10px_10px_0_rgba(66,133,244,0.45)]">
        <div className="border-b border-[#4b8afe]/20 px-8 py-8">
          <h1 className="font-instrument-serif text-4xl md:text-5xl font-bold text-black">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-2 text-lg text-black/80 font-instrument-serif">
              {subtitle}
            </p>
          ) : null}
        </div>

        <div className="px-8 py-8">{children}</div>

        {footer ? (
          <div className="border-t border-[#4b8afe]/20 bg-[#f6f9ff] px-8 py-6 text-center">
            {footer}
          </div>
        ) : null}
      </div>
    </section>
  );
}
