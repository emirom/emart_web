import { DashboardCustomModal } from "@components/DashboardCustomModal";
import { Button } from "@components/ui/button";
import CreateLabelForm from "./CreateLabelForm";

export default function CreateLabel() {
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
