"use client";

import CommentsItem from "./CommenstItem";
import ProductCommentFilter from "./ProductCommentFilter";
import RegisterComment from "./RegisterComment";

export default function Comments() {
  return (
    <section aria-labelledby="comments-heading" className="mb-6" id="comments">
      <h3
        id="comments-heading"
        className="py-4 text-tint-blue-500 text-sm font-bold lg:hidden"
      >
        نظرات کاربران
      </h3>
      <div className="lg:hidden">
        <ProductCommentFilter />
      </div>

      <ul className="space-y-2">
        {Array.from({ length: 10 }, (_, index) => (
          <li key={index}>
            <CommentsItem />
          </li>
        ))}
      </ul>

      <RegisterComment className="mt-4 lg:hidden" />
    </section>
  );
}
