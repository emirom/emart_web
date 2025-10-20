"use client";

import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useState } from "react";
import { FormErrorMessage } from "./FormErrorMessage";
import { cn } from "./lib/utils";
import { Button } from "./ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";
import { Label } from "./ui/label";

export default function OtpStepForm() {
  const [error] = useState("");

  return (
    <form
      aria-labelledby="otp-form-title"
      className={cn("grid items-start gap-6")}
      role="form"
      noValidate
    >
      <h2 id="otp-form-title" className="sr-only">
        فرم ورود با کد پیامکی
      </h2>

      <div className="grid gap-1">
        <div className="flex items-center gap-1 mb-2">
          <Label htmlFor="otp" className="text-tint-blue-500 text-xs">
            پیامک ورود
          </Label>
          <span className="text-red-400 leading-none" aria-hidden="true">
            *
          </span>
        </div>

        <InputOTP
          id="otp"
          inputMode="numeric"
          autoComplete="one-time-code"
          aria-label="کد پیامکی ۶ رقمی"
          aria-required="true"
          aria-invalid={!!error}
          aria-describedby={error ? "otp-error" : undefined}
          dir="ltr"
          maxLength={6}
          pattern={REGEXP_ONLY_DIGITS}
          className="w-full flex justify-center"
        >
          <InputOTPGroup
            className="grid grid-cols-6 gap-2 w-full max-w-sm sm:max-w-md md:max-w-lg [direction:ltr]"
            role="group"
            aria-label="ورودی اعداد کد پیامکی"
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <InputOTPSlot
                key={i}
                index={i}
                aria-label={`عدد ${i + 1} از ۶`}
                className="w-full aspect-square h-12 sm:h-10 text-center text-lg rounded-md border border-gray-300 focus:border-tint-blue-500 focus:ring-2 focus:ring-tint-blue-500 outline-none transition-all"
              />
            ))}
          </InputOTPGroup>
        </InputOTP>

        <FormErrorMessage
          id="otp-error"
          className="mt-0 text-xs my-1"
          message={error}
        />
      </div>

      <Button
        title="ورود به حساب کاربری"
        aria-label="تایید و ورود"
        type="submit"
        className="bg-orange-700 text-white hover:bg-orange-800 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-500 transition-colors"
      >
        تایید
      </Button>
    </form>
  );
}
