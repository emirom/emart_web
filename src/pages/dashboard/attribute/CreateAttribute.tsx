"use client";

import { DashboardCustomModal } from "@components/DashboardCustomModal";
import { Button } from "@components/ui/button";
import { useEffect, useState } from "react";
import CreateAttributeForm from "./CreateAttributeForm";

export default function CreateAttribute() {
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
        <Button className="bg-green-200" aria-label="افزودن ویژگی">
          افزودن ویژگی
        </Button>
      }
      element={<CreateAttributeForm />}
      title="افزودن ویژگی"
    />
  );
}
