import { cn } from "@components/lib/utils";

export default function CustomerHeader() {
  return (
    <header className={cn("customer-header")}>
      {/* Mobile mode */}
      <div className={cn("w-full  py-4 px-5 border-b", "md:hidden")}>
        Mobile mode
      </div>
      <div className={cn("hidden", "md:block bg-tint-blue-500 py-6")}></div>
    </header>
  );
}
