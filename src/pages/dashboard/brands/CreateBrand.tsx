import { DashboardCustomModal } from "@components/DashboardCustomModal";
import { Button } from "@components/ui/button";
import CreateBrandForm from "./CreateBrandForm";

export default function CreateBrand() {
  return (
    <DashboardCustomModal
      button={
        <Button className="bg-green-200" aria-label="افزودن کمیت">
          افزودن کمیت
        </Button>
      }
      element={<CreateBrandForm />}
      title="افزودن برند"
    />
  );
}
