import { DashboardCustomModal } from "@components/DashboardCustomModal";
import { Button } from "@components/ui/button";
import CreateAttributeForm from "./CreateAttributeForm";

export default function CreateAttribute() {
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
