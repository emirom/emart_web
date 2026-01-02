import UserCouponState from "./UserCouponState";

export default function CustomerDiscountCouponAnnouncement() {
  return (
    <div className="flex flex-col gap-2 ">
      <span className="text-tint-blue-500 text-sm font-medium">کوپن تخفیف</span>
      <div className="flex items-stretch gap-8 border border-tint-blue-500 rounded-md px-8 py-11">
        <UserCouponState state="FIRSTPURCHASE" />
        <UserCouponState state="BERAND" />
        <UserCouponState state="MOBILEMAFIA" />
      </div>
    </div>
  );
}
