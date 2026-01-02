import { ReactNode } from "react";
import BeRand from "./BeRand";
import FirstPurchase from "./FirstPurchase";
import MobileMafia from "./MobileMafia";

type Props = {
  state: "FIRSTPURCHASE" | "BERAND" | "MOBILEMAFIA";
};

export default function UserCouponState({ state }: Props) {
  let couponState: ReactNode;
  switch (state) {
    case "FIRSTPURCHASE":
      couponState = <FirstPurchase />;
      break;
    case "BERAND":
      couponState = <BeRand />;
      break;
    case "MOBILEMAFIA":
      couponState = <MobileMafia />;
  }
  return couponState;
}
