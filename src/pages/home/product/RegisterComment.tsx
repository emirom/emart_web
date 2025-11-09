import StarRating from "@components/StarRating";
import { Button } from "@components/ui/button";

export default function RegisterComment({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Button className="w-full bg-tint-blue-500 text-white text-sm font-medium rounded-lg">
        ثبت دیدگاه شما
      </Button>
      <p className="text-tint-blue-500 text-sm font-medium my-2">
        میانگین آراء کاربران از مجموع 113 رای
      </p>
      <StarRating maxStars={5} className="justify-start" size={15} />
    </div>
  );
}
