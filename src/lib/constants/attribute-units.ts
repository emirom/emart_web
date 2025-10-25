import { v4 as uuidv4 } from "uuid";

type AttributeUnitsType = {
  id: string;
  value: "text" | "number" | "boolean" | "date";
  name: string;
};

export const attributeUnits: AttributeUnitsType[] = [
  {
    id: uuidv4(),
    value: "text",
    name: "متن",
  },
  {
    id: uuidv4(),
    value: "number",
    name: "عدد",
  },
  {
    id: uuidv4(),
    value: "boolean",
    name: "بولین",
  },
  {
    id: uuidv4(),
    value: "date",
    name: "تاریخ",
  },
];
