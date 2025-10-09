import { HTMLAttributes, ReactNode } from "react";
import { cn } from "./lib/utils";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export default function Container({ children, className, ...props }: Props) {
  return (
    <div
      className={cn("mx-auto w-[97%] md:w-[95%] lg:w-[93%] ", className)}
      {...props}
    >
      {children}
    </div>
  );
}
