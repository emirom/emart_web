"use client";

import { DashboardCustomModal } from "@components/DashboardCustomModal";
import { Button } from "@components/ui/button";
import { useState, useEffect } from "react";
import CreateLabelForm from "./CreateLabelForm";

export default function CreateLabel() {
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
        <Button className="bg-green-200" aria-label="افزودن برچسب">
          افزودن برچسب
        </Button>
      }
      element={<CreateLabelForm />}
      title="افزودن برچسب"
    />
  );
}
