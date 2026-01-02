import { Car, Check, PackageOpen } from "lucide-react";
import { ReactNode } from "react";

type Props = {
  state: "PREPARATION" | "SENDING" | "SENT";
};
export default function OrderState({ state }: Props) {
  let orderState: ReactNode;
  switch (state) {
    case "PREPARATION":
      orderState = (
        <div className="p-2 bg-[#FABA74] rounded-md flex flex-col gap-2">
          <span className="text-[0.625rem]">درحال آماده سازی</span>
          <div className="h-1 w-full rounded-md bg-white relative">
            <div className="w-[33.333%] h-full bg-[#EC9C00] block relative rounded-md">
              <span className="absolute -left-1 -top-3">
                <PackageOpen size={10} />
              </span>
            </div>
          </div>
          <span className="text-[0.625rem]">شناسه تحویل مرسوله</span>
          <p className="text-[0.5rem]">
            در هنگام دریافت مرسوله از مامور ارسال، این کد را در اختیار قرار
            دهید.
          </p>
        </div>
      );
      break;
    case "SENDING":
      orderState = (
        <div className="p-2 bg-[#32ADE6] rounded-md flex flex-col gap-2">
          <span className="text-[0.625rem]">درحال آماده سازی</span>
          <div className="h-1 w-full rounded-md bg-white relative  rounded-md">
            <div className="w-[50%] h-full bg-[#008DCF] block relative">
              <span className="absolute -left-1 -top-3">
                <Car size={10} />
              </span>
            </div>
          </div>
          <span className="text-[0.625rem]">شناسه تحویل مرسوله</span>
          <p className="text-[0.5rem]">
            در هنگام دریافت مرسوله از مامور ارسال، این کد را در اختیار قرار
            دهید.
          </p>
        </div>
      );
      break;
    case "SENT":
      orderState = (
        <div className="p-2 bg-[#00BA88] rounded-md flex flex-col gap-2">
          <span className="text-[0.625rem]">درحال آماده سازی</span>
          <div className="h-1 w-full rounded-md bg-white relative ">
            <div className="w-[100%] h-full bg-[#00966D] block rounded-md">
              <span className="absolute left-0 -top-3 ">
                <Check size={10} />
              </span>
            </div>
          </div>
          <span className="text-[0.625rem]">شناسه تحویل مرسوله</span>
          <p className="text-[0.5rem]">
            در هنگام دریافت مرسوله از مامور ارسال، این کد را در اختیار قرار
            دهید.
          </p>
        </div>
      );
      break;
  }
  return orderState;
}
