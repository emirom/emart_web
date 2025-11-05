import { DashboardCustomModal } from "@components/DashboardCustomModal";
import { Button } from "@components/ui/button";
import CreateColorForm from "./CreateColorForm";

export default function CreateColor() {
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
