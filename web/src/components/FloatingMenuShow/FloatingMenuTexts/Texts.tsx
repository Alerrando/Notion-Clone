import { ComponentProps } from "react";
type TextsProps = ComponentProps<"span">;

export function Texts({ title }: TextsProps) {
  return (
    <span className="text-xs text-zinc-400 group-hover:text-zinc-200 dark:text-zinc-200 dark:group-hover:text-zinc-50">
      {title}
    </span>
  );
}
