import { ReactNode } from "react";

type FloatingMenuShowRootProps = {
  children: ReactNode;
};

export function FloatingMenuShowRoot({ children }: FloatingMenuShowRootProps) {
  return (
    <button className="flex items-center gap-2 p-1 rounded min-w-[280px] hover:bg-zinc-200 md:bg-zinc-100 md:dark:bg-zinc-800 md:dark:hover:bg-zinc-900 text-white">
      {children}
    </button>
  );
}
