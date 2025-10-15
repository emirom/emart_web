import { useAppStore } from "@lib/stores/store";
import { FormErrorMessage } from "./FormErrorMessage";
import { cn } from "./lib/utils";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function PhoneStepForm() {
  const setStep = useAppStore((state) => state.setStep);
  return (
    <form className={cn("grid items-start gap-6")}>
      <div className="grid gap-1">
        <div className="flex items-center gap-1">
          <Label htmlFor="phone" className="text-tint-blue-500 text-xs">
            شماره موبایل
          </Label>
          <span className="text-red-400 leading-none">*</span>
        </div>

        <Input
          id="phone"
          defaultValue=""
          className="block text-sm  font-medium border border-tint-blue-700 rounded-lg placeholder:text-xs placeholder:text-gray-[#c2c2c2] outline-0 ring-0"
          placeholder="رمز ورود خود را وارد نمایید"
        />
        <FormErrorMessage
          className="mt-0 text-xs my-1"
          message={"شماره تلفن نامعتبر"}
        />
      </div>
      <Button
        title="ورود"
        aria-label="ورود"
        type="submit"
        className="bg-orange-700 text-white"
        onClick={() => setStep("otp")}
      >
        تایید
      </Button>
    </form>
  );
}
