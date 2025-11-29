"use client";

import { DashboardCustomModal } from "@components/DashboardCustomModal";
import { Button } from "@components/ui/button";
import CreateStoreForm from "./CreateStoreForm";

export default function CreateStore() {
  return (
    <DashboardCustomModal
      button={
        <Button className="bg-green-200" aria-label="افزودن فروشگاه">
          افزودن فروشگاه
        </Button>
      }
      element={<CreateStoreForm />}
      title="افزودن فروشگاه"
    />
  );
}
