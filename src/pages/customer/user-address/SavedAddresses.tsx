import { DeleteButton } from "@components/BtnWithIcon";
import { cn } from "@components/lib/utils";

export default function SavedAddresses() {
  return (
    <section>
      <h1 className="text-sm font-medium mb-1">آدرس های ذخیره شده</h1>
      <div className="flex flex-col gap-1 border border-gray-100 rounded-md py-5 px-10">
        <ul className="flex flex-col gap-1">
          {Array.from({ length: 3 }, (_, i) => (
            <li
              key={i}
              className="flex items-center gap-1 justify-between p-3 py-2 pr-0 border border-gray-100 rounded-md font-bold text-tint-blue-500 odd:bg-white even:bg-[#F5F5F5]"
            >
              <span
                className={cn(
                  "flex items-center justify-between rounded-tl-lg rounded-bl-lg  px-4 py-1 odd:bg-[#F5F5F5] even:bg-white",
                )}
              >
                {i + 1}
              </span>
              <p className="text-xs ">
                همدان، چهارراه خواجه رشید، جنب هتل مرمر
              </p>
              <span className="flex px-4 border-l border-r border-tint-blue-500">
                پلاک : 14
              </span>
              <span>کدپستی : 6223810102</span>
              <DeleteButton />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
