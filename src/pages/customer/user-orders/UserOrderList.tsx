import CustomImage from "@components/CustomImage";
import { DashboardCustomModal } from "@components/DashboardCustomModal";
import { Button } from "@components/ui/button";
import OrderListDetails from "./OrderListDetails";

export default function UserOrderList() {
  return (
    <ul className="flex flex-col gap-2">
      {Array.from({ length: 3 }, (_, i) => (
        <li key={i} className="border border-tint-blue-500 rounded-md p-4">
          <header className="flex justify-between items-center text-tint-blue-500 text-sm font-medium border-b border-b-tint-blue-500 pb-3">
            <span>کد سفارش : MH-12039481</span>
            <div className="flex items-center gap-2">
              <span>تاریخ ثبت : 1404/09/19</span>
              <DashboardCustomModal
                title={
                  <span className="text-tint-blue-500 text-sm font-medium pb-2 border-b border-b-tint-blue-500 w-full block ">
                    جزئیات سفارش | 3 کالا
                  </span>
                }
                button={
                  <Button className="bg-tint-blue-100 text-tint-blue-500 text-xs">
                    مشاهده جزئیات
                  </Button>
                }
                element={<OrderListDetails />}
              />
            </div>
          </header>
          <div className="grid grid-cols-5 gap-3 mt-2 md:grid-cols-10 lg:grid-cols-12">
            {Array.from({ length: 8 }, (_, i) => (
              <figure
                key={i}
                className="aspect-[16/20] border border-tint-blue-500 p-1 rounded-md relative"
              >
                <CustomImage
                  src="/images/mobile-ex.png"
                  alt="order-images"
                  className=" flex items-center justify-center  object-cover w-full h-full py-2"
                  fill
                />
                <span className="w-4 h-4 text-[0.625rem] absolute -left-2 -bottom-2 text-white font-medium rounded-full bg-tint-blue-500 flex items-center justify-center p-2">
                  ۲
                </span>
              </figure>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}
