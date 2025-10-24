import { v4 as uuidv4 } from "uuid";

type AttributeUnitsType = {
  id: string;
  value: "TEXT" | "NUMBER" | "BOOLEAN" | "DATE";
  name: string;
};

export const attributeUnits: AttributeUnitsType[] = [
  {
    id: uuidv4(),
    value: "TEXT",
    name: "متن",
  },
  {
    id: uuidv4(),
    value: "NUMBER",
    name: "عدد",
  },
  {
    id: uuidv4(),
    value: "BOOLEAN",
    name: "بولین",
  },
  {
    id: uuidv4(),
    value: "DATE",
    name: "تاریخ",
  },
];
