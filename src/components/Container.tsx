import { HTMLAttributes, ReactNode } from "react";

type Props = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  className?: string;
};

export default function Container({
  children,
  className = "",
  ...props
}: Props) {
  return (
    <div
      className={`mx-auto w-[97%] md:w-[95%] lg:w-[93%] ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
