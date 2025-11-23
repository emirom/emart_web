"use client";

import { DashboardCustomModal } from "@components/DashboardCustomModal";
import { Button } from "@components/ui/button";
import CreateCityForm from "./CreateCityForm";

export default function CreateCity() {
  return (
    <DashboardCustomModal
      button={
        <Button className="bg-green-200" aria-label="افزودن شهر">
          افزودن شهر
        </Button>
      }
      element={<CreateCityForm />}
      title="افزودن شهر"
    />
  );
}
