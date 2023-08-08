import { ComponentProps } from "react";
type TextsProps = ComponentProps<"span">;

export function Texts({ className, title }: TextsProps) {
  return <span className={className}>{title}</span>;
}
