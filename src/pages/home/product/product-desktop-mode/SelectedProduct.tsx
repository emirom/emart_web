import CustomImage from "@components/CustomImage";
import { Button } from "@components/ui/button";
import { Checkbox } from "@components/ui/checkbox";
import { Label } from "@components/ui/label";

export default function SelectedProduct({ tabActive }: { tabActive: string }) {
  return (
    <>
      {tabActive !== "specification" && (
        <div className="relative rounded-lg  w-[35%] bg-tint-blue-500">
          <div className="absolute right-0 left-0 mx-auto top-3 p-3 w-[95%]  bg-tint-blue-500 rounded-lg shadow-lg">
            <div className="flex items-center gap-3 ">
              <figure className="w-[6.25rem] h-[6.25rem] flex items-center justify-center  bg-white rounded-md ">
                <CustomImage
                  className="w-full h-full flex items-center justify-center"
                  src="/images/mobile-ex.png"
                  alt="گوشی موبايل آیفون 13 پرو مکس"
                  width={60}
                  height={60}
                />
              </figure>
              <div>
                <span className="text-xs text-white font-medium">
                  گوشی موبايل آیفون 13 پرو مکس
                </span>
                <div className="w-fit mt-2 p-2 flex items-center gap-2 rounded-lg bg-white">
                  <span className="h-3 w-3 rounded-full bg-yellow-400"></span>
                  <span className="text-xs font-medium text-yellow-400">
                    طلایی
                  </span>
                </div>
              </div>
            </div>
            <form className="flex gap-2 flex-col my-3 text-white">
              <div className="flex items-center gap-2">
                <Checkbox id="x" className="accent-white" />
                <Label className=" text-xs font-medium" htmlFor="x">
                  سیروان پیشرو همراه
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="y" />
                <Label className=" text-xs font-medium" htmlFor="y">
                  سیروان پیشرو همراه
                </Label>
              </div>
            </form>
            <span className="block bg-white h-[1px] my-3"></span>
            <small className="line-through text-white text-xs font-medium">
              90,000,000 تومان
            </small>
            <span className="text-sm font-bold my-3 block text-white">
              88,500,000 تومان
            </span>
            <Button className="w-full bg-white text-tint-blue-500">
              افزودن به سبد خرید
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
