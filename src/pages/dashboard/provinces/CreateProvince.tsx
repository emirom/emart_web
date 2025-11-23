"use client";

import { DashboardCustomModal } from "@components/DashboardCustomModal";
import { Button } from "@components/ui/button";
import { useEffect, useState } from "react";
import CreateProvinceForm from "./CreateProvinceForm";

export default function CreateProvince() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

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
