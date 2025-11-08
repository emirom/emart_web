import { cn } from "@components/lib/utils";
import StarRating from "@components/StarRating";
import { ThumbsDown, ThumbsUp, UserIcon } from "lucide-react";
import React from "react";

export default function CommentsItem() {
  const [dislike, setDislike] = React.useState(false);
  const [like, setLike] = React.useState(false);
  const [rating, setRating] = React.useState(3);

  return (
    <div className="shadow-[0_4px_14px_-4px_rgba(0,0,0,0.12)] border border-gray-100 rounded-md p-2 mb-2 last:mb-0">
      <div className="flex gap-2 items-start">
        <span className="flex items-center justify-center rounded-full p-2 bg-tint-blue-100">
          <UserIcon width={15} height={15} />
        </span>
        <div className="flex flex-col gap-2">
          <header className="flex w-full items-center justify-between gap-1">
            <div className="flex items-center gap-2">
              <h4 className="text-sm text-tint-blue-500 font-bold">
                کاربر سایت
              </h4>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 text-tint-blue-500 text-sm font-medium">
                <span>۳۲</span>
                <button
                  className="cursor-pointer"
                  onClick={() => {
                    setDislike((state) => !state);
                    setLike(false);
                  }}
                >
                  <ThumbsDown
                    className={cn(
                      dislike ? "text-tint-blue-500" : "text-gray-300",
                    )}
                  />
                </button>
              </div>
              <div className="flex items-center gap-2 text-tint-blue-500 text-sm font-medium">
                <span>۳۲</span>
                <button
                  className="cursor-pointer"
                  onClick={() => {
                    setLike((state) => !state);
                    setDislike(false);
                  }}
                >
                  <ThumbsUp
                    className={cn(
                      like ? "text-tint-blue-500" : "text-gray-300",
                    )}
                  />
                </button>
              </div>
            </div>
          </header>
          <p className="text-tint-blue-500 text-xs leading-6 font-medium my-4">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
            استفاده از طراحان گرافیک است.
          </p>
          <div className="flex items-center justify-between mb-3 text-tint-blue-500">
            <span>۲۵ اسفند</span>
            <div className="flex items-center gap-2">
              <span>۱۰۲</span>
              <StarRating
                value={rating}
                maxStars={5}
                onChange={(val) => setRating(val)}
                size={15}
                className="py-2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
