"use client";

import { DashboardCustomModal } from "@components/DashboardCustomModal";
import { Button } from "@components/ui/button";
import { useState, useEffect } from "react";
import CreateColorForm from "./CreateColorForm";

export default function CreateColor() {
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
        <Button className="bg-green-200" aria-label="افزودن رنگ">
          افزودن رنگ
        </Button>
      }
      element={<CreateColorForm />}
      title="افزودن رنگ"
    />
  );
}
