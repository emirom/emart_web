"use client";

import { DashboardCustomModal } from "@components/DashboardCustomModal";
import { Button } from "@components/ui/button";
import CreateLocationForm from "./CreateLocationForm";

export default function CreateLocation() {
  return (
    <DashboardCustomModal
      button={
        <Button className="bg-green-200" aria-label="افزودن آدرس">
          افزودن آدرس
        </Button>
      }
      element={<CreateLocationForm />}
      title="افزودن آدرس"
    />
  );
}
