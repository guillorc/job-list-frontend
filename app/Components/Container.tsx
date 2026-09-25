import type { HTMLAttributes } from "react";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {}

export default function Container({ children, className, ...props }: ContainerProps) {
  return (
    <div
      className={["container mx-auto px-4", className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}
