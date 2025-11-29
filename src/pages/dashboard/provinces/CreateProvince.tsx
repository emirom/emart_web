"use client";

import { DashboardCustomModal } from "@components/DashboardCustomModal";
import { Button } from "@components/ui/button";
import CreateProvinceForm from "./CreateProvinceForm";

export default function CreateProvince() {
  return (
    <DashboardCustomModal
      button={
        <Button className="bg-green-200" aria-label="افزودن استان">
          افزودن استان
        </Button>
      }
      element={<CreateProvinceForm />}
      title="افزودن استان"
    />
  );
}
