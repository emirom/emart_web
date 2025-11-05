import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
export default function MainSearchContext({ children }: Props) {
  return (
    <form id="primary-search" className="w-full  gap-2">
      {children}
    </form>
  );
}
