"use client";

import { DashboardCustomModal } from "@components/DashboardCustomModal";
import { Button } from "@components/ui/button";
import { useState, useEffect } from "react";
import CreateBrandForm from "./CreateBrandForm";

export default function CreateBrand() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Render nothing on the server to prevent hydration mismatch
  }

  return (
    <DashboardCustomModal
      button={
        <Button className="bg-green-200" aria-label="افزودن برند">
          افزودن برند
        </Button>
      }
      element={<CreateBrandForm />}
      title="افزودن برند"
    />
  );
}
