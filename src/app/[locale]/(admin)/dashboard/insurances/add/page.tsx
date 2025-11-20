import CreateInsuranceForm from "@/pages/dashboard/insurances/CreateInsuranceForm";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "افزودن بیمه جدید",
  description: "افزودن بیمه جدید",
};

export default async function Page() {
  return (
    <>
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full mb-6 border-b border-gray-200 pb-3">
        <h1 className="text-sm font-bold text-tint-blue-600 tracking-tight">
          افزودن بیمه جدید
        </h1>
        <Link
          href="/dashboard/insurances"
          className="text-sm text-tint-blue-500 hover:text-tint-blue-600 font-medium mt-2 sm:mt-0"
        >
          ← بازگشت
        </Link>
      </header>
      <CreateInsuranceForm />
    </>
  );
}
