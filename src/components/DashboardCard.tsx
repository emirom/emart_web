import { ReactNode } from "react";

export default function DashboardCard({ children }: { children: ReactNode }) {
  return (
    <div className="border border-tint-blue-300 p-2  rounded-lg ">
      {children}
    </div>
  );
}
