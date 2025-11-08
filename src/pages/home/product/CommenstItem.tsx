"use client";

import { cn } from "@components/lib/utils";
import StarRating from "@components/StarRating";
import { ThumbsDown, ThumbsUp, UserIcon } from "lucide-react";
import { useState } from "react";

export default function CommentsItem() {
  const [dislike, setDislike] = useState(false);
  const [like, setLike] = useState(false);
  const [rating, setRating] = useState(3);

  return (
    <article
      className="shadow-[0_4px_14px_-4px_rgba(0,0,0,0.12)] border border-gray-100 rounded-md p-3 mb-2 last:mb-0"
      aria-label="نظر کاربر"
    >
      <header className="flex gap-2 items-start">
        <span
          className="flex items-center justify-center rounded-full p-2 bg-tint-blue-100"
          aria-hidden="true"
        >
          <UserIcon width={15} height={15} />
        </span>

        <div className="flex flex-col gap-2 w-full">
          <div className="flex items-center justify-between">
            <h4 className="text-sm text-tint-blue-500 font-bold">کاربر سایت</h4>

            <div className="flex items-center gap-4">
              <button
                aria-label="نپسندیدن"
                aria-pressed={dislike}
                className="flex items-center gap-1 text-tint-blue-500 text-sm font-medium"
                onClick={() => {
                  setDislike((prev) => !prev);
                  setLike(false);
                }}
              >
                <ThumbsDown
                  className={cn(
                    "transition-colors",
                    dislike ? "text-tint-blue-500" : "text-gray-300"
                  )}
                  width={16}
                  height={16}
                  aria-hidden="true"
                />
                <span>۳۲</span>
              </button>

              <button
                aria-label="پسندیدن"
                aria-pressed={like}
                className="flex items-center gap-1 text-tint-blue-500 text-sm font-medium"
                onClick={() => {
                  setLike((prev) => !prev);
                  setDislike(false);
                }}
              >
                <ThumbsUp
                  className={cn(
                    "transition-colors",
                    like ? "text-tint-blue-500" : "text-gray-300"
                  )}
                  width={16}
                  height={16}
                  aria-hidden="true"
                />
                <span>۳۲</span>
              </button>
            </div>
          </div>

          <p className="text-tint-blue-500 text-xs leading-6 font-medium my-2">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
            استفاده از طراحان گرافیک است.
          </p>

          <footer className="flex items-center justify-between text-tint-blue-500 text-xs">
            <time dateTime="2024-03-15">۲۵ اسفند</time>
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
          </footer>
        </div>
      </header>
    </article>
  );
}
