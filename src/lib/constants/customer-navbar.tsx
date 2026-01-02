import {
  Handshake,
  MapPinHouse,
  MessageSquare,
  ShoppingBag,
  UserRoundCog,
} from "lucide-react";
import { v4 as uuidv4 } from "uuid";

export const customerNavbar = [
  { id: uuidv4(), icon: <UserRoundCog />, href: "#", title: "اطلاعات کاربری" },
  { id: uuidv4(), icon: <ShoppingBag />, href: "#", title: "لیست سفارشات" },
  { id: uuidv4(), icon: <MapPinHouse />, href: "#", title: "آدرس ها" },
  { id: uuidv4(), icon: <Handshake />, href: "#", title: "همکاری" },
  { id: uuidv4(), icon: <MessageSquare />, href: "#", title: "تیکت" },
];
