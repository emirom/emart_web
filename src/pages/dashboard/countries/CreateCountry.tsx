"use client";

import { DashboardCustomModal } from "@components/DashboardCustomModal";
import { Button } from "@components/ui/button";
import { useEffect, useState } from "react";
import CreateCountryForm from "./CreateCountryFom";

export default function CreateCountry() {
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
        <Button className="bg-green-200" aria-label="افزودن کشور">
          افزودن کشور
        </Button>
      }
      element={<CreateCountryForm />}
      title="افزودن کشور"
    />
  );
}
