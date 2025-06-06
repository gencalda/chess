import type { ReactNode } from "react";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="m-0 px-4 py-6 min-w-screen flex flex-col items-center">
      <div className="min-w-full md:max-w-[700px] md:min-w-[700px]">
        {children}
      </div>
    </div>
  );
}
