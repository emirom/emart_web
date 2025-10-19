"use client";

import { useMediaQuery } from "@lib/hooks/useMediaQuery";
import { useAppStore } from "@lib/stores/store";
import { XIcon } from "lucide-react";
import { useState } from "react";
import OtpStepForm from "./OtpStepForm";
import PhoneStepForm from "./PhoneStepForm";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";

export function LoginModal() {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  // Desktop size
  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            type="button"
            className="bg-white text-tint-blue-500 border border-tint-blue-100 text-sm py-2 "
            aria-label="ورود یا عضویت"
            title="ورود یا عضویت"
          >
            ورود‌/‌عضویت
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-sm   text-orange-700">
                ورود‌/عضویت
              </DialogTitle>
              <Button
                onClick={() => setOpen((open) => !open)}
                className="bg-transparent cursor-pointer  block"
              >
                <XIcon stroke="#aaa" />
              </Button>
            </div>
          </DialogHeader>
          <ProfileForm />
          <p
            aria-label="پذیرش قوانین"
            className="text-xs text-center text-tint-blue-500 mt-2 "
          >
            ورود شمابه معنای پذیرش شرایط و قوانین ماهورهمراه است.
          </p>
        </DialogContent>
      </Dialog>
    );
  }
  // Mobile size
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">ورود‌/‌عضویت</Button>
      </DrawerTrigger>
      <DrawerContent className="px-5">
        <DrawerHeader className="text-left  px-0">
          <DrawerTitle className="text-start">ورود / عضویت</DrawerTitle>
        </DrawerHeader>
        <ProfileForm />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">انصراف</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function ProfileForm() {
  const loginStep = useAppStore((state) => state.loginStep);

  return (
    <>
      {loginStep === "phone" && <PhoneStepForm />}
      {loginStep === "otp" && <OtpStepForm />}
    </>
  );
}
