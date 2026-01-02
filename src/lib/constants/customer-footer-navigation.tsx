import { HomeIcon, ShoppingBasket, SquarePercent, User } from "lucide-react";
import { ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";
type CustomerFooter = {
  id: string;
  icon: ReactNode;
  href: string;
  title: string;
};

export const customerFooterItem: CustomerFooter[] = [
  { id: uuidv4(), icon: <HomeIcon />, href: "#", title: "خانه " },
  { id: uuidv4(), icon: <ShoppingBasket />, href: "#", title: "سبد خرید" },
  { id: uuidv4(), icon: <SquarePercent />, href: "#", title: "تخفیف ها" },
  { id: uuidv4(), icon: <User />, href: "#", title: "کاربر" },
];
