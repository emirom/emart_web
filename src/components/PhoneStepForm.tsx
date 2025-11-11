"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { otpAction } from "@lib/actions/login-action";
import { useSmartLocalizedInput } from "@lib/hooks/useLocalizedNumberInput";
import { useAppStore } from "@lib/stores/store";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { FormErrorMessage } from "./FormErrorMessage";
import { cn } from "./lib/utils";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const phoneSchema = z.object({
  phone: z
    .string()
    .nonempty("لطفا شماره موبایل را وارد کنید")
    .max(11, "شماره موبایل باید 11 رقم باشد")
    .regex(/^09\d{9}$/, "شماره موبایل معتبر نیست"),
});

export type PhoneFormValues = z.infer<typeof phoneSchema>;

export default function PhoneStepForm() {
  const { setStep, setPhone } = useAppStore();
  const { register, handleSubmit, setValue, formState } =
    useForm<PhoneFormValues>({
      resolver: zodResolver(phoneSchema),
      mode: "onChange",
    });

  const { displayValue, handleChange } = useSmartLocalizedInput();

  const onSubmit = async (data: PhoneFormValues) => {
    try {
      await otpAction({ phone: data.phone });
      setPhone(data.phone);
      setStep("otp");
      toast.success("شماره موبایل شما با موفقیت ثبت شد");
    } catch (err: unknown) {
      if (err instanceof Error) toast.error(err.message);
      else toast.error("خطایی رخ داده است");
    }
  };

  return (
    <form className="grid items-start gap-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-1">
        <div className="flex items-center gap-1">
          <Label htmlFor="phone" className="text-tint-blue-500 text-xs">
            شماره موبایل
          </Label>
          <span className="text-red-400 leading-none">*</span>
        </div>

        <Input
          id="phone"
          inputMode="numeric"
          {...register("phone")}
          value={displayValue}
          onChange={(e) => {
            const englishValue = handleChange(e);
            setValue("phone", englishValue, { shouldValidate: true });
          }}
          className={cn(
            "block text-sm font-medium border border-tint-blue-700 rounded-lg placeholder:text-xs placeholder:text-gray-[#c2c2c2] outline-0 ring-0",
            formState.errors.phone ? "border-destructive" : "border-gray-300",
          )}
          placeholder="شماره موبایل خود را وارد نمایید"
        />

        <FormErrorMessage
          className="mt-0 text-xs my-1"
          message={formState.errors.phone?.message}
        />
      </div>

      <Button
        type="submit"
        className={cn(
          "bg-orange-700 text-white select-none",
          !formState.isValid && "cursor-not-allowed",
        )}
      >
        تایید
      </Button>
    </form>
  );
}
