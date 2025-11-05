import { Checkbox } from "@components/ui/checkbox";
import { useState } from "react";

export default function UserReceptionTime() {
  const [selected, setSelected] = useState<number>(0);

  return (
    <ul className="grid grid-cols-2 gap-2 mt-8 col-span-5">
      {Array.from({ length: 4 }, (_, indx) => (
        <li key={indx}>
          <label
            className="p-4 flex items-center gap-2 w-full shadow-md rounded-lg cursor-pointer"
            htmlFor={`time-${indx}`}
          >
            <Checkbox
              id={`time-${indx}`}
              checked={selected === indx}
              defaultChecked={indx === 0}
              onCheckedChange={() => setSelected(indx)}
              className={selected === indx ? "accent-green-500" : ""}
              style={{ accentColor: "blue" }}
            />
            <span className="text-tint-blue-500 font-medium block w-full text-nowrap">
              12:00 - 09:00
            </span>
          </label>
        </li>
      ))}
    </ul>
  );
}
