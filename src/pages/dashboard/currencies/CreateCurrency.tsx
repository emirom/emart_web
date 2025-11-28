"use client";

import { DashboardCustomModal } from "@components/DashboardCustomModal";
import { Button } from "@components/ui/button";
import CreateCurrencyForm from "./CreateCurrencyForm";

export default function CreateCurrency() {
  return (
    <DashboardCustomModal
      button={
        <Button className="bg-green-200" aria-label="افزودن ارز">
          افزودن ارز
        </Button>
      }
      element={<CreateCurrencyForm />}
      title="افزودن ارز"
    />
  );
}
