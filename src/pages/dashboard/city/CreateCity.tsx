"use client";

"use client";

import { DashboardCustomModal } from "@components/DashboardCustomModal";
import { Button } from "@components/ui/button";
import { useState, useEffect } from "react";
import CreateCityForm from "./CreateCityForm";

export default function CreateCity() {
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
        <Button className="bg-green-200" aria-label="افزودن شهر">
          افزودن شهر
        </Button>
      }
      element={<CreateCityForm />}
      title="افزودن شهر"
    />
  );
}
