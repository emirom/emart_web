import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@components/ui/accordion";
import { MapPin } from "lucide-react";

export default function ProductAccordion() {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue="item-1"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger className="bg-sky-blue-400 text-tint-blue-500 px-2">
          <div className="flex items-center">خانه</div>
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance p-4">
          <p className="flex items-center gap-2 w-full">
            <MapPin className="w-4 h-4 text-tint-blue-500" />
            <span className="w-full block text-xs font-medium text-tint-blue-600 break-words">
              تهران، بزرگراه آیت‌الله هاشمی رفسنجانی (نیایش)، خیابان علامه جعفری
              شمالی، خیابان سیمای ایران، کوچه گلستان چهارم
            </span>
          </p>
          <div className="flex items-center justify-between text-tint-blue-500 mt-2 text-xs">
            <span>پلاک : 61</span>
            <span>کدپستی : 6573810293</span>
            <span>گیرنده : محمدحسین یاری</span>
            <span>شماره موبایل : 09121234567</span>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
