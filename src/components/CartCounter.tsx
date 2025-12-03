"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import React, { memo, useCallback, useState } from "react";

export default memo(function CartCounter() {
  const [count, setCount] = useState(1);

  const increase = useCallback(() => {
    setCount((c) => c + 1);
  }, []);

  const decrease = useCallback(() => {
    setCount((c) => (c > 1 ? c - 1 : c));
  }, []);

  const remove = useCallback(() => {
    // TODO: remove logic
  }, []);

  return (
    <div
      className="flex items-stretch gap-2 border border-sky-500 rounded-lg p-1 "
      role="group"
      aria-label="کنترل تعداد محصول"
    >
      <IconButton ariaLabel="افزایش تعداد" onClick={increase}>
        <Plus aria-hidden="true" className="stroke-tint-blue-500" />
      </IconButton>

      <label htmlFor="cart-counter-input" className="sr-only">
        تعداد محصول
      </label>

      <input
        id="cart-counter-input"
        className="border-0 w-full text-center outline-none"
        type="number"
        value={count}
        readOnly
        aria-live="polite"
      />

      {count > 1 ? (
        <IconButton ariaLabel="کاهش تعداد" onClick={decrease}>
          <Minus aria-hidden="true" className="stroke-tint-blue-500" />
        </IconButton>
      ) : (
        <IconButton ariaLabel="حذف محصول" onClick={remove}>
          <Trash2 aria-hidden="true" className="stroke-red-500" />
        </IconButton>
      )}
    </div>
  );
});

// -----------------------------------------

const IconButton = memo(function IconButton({
  children,
  onClick,
  ariaLabel,
}: {
  children: React.ReactNode;
  onClick: () => void;
  ariaLabel: string;
}) {
  return (
    <button
      aria-label={ariaLabel}
      className="cursor-pointer p-1"
      onClick={onClick}
    >
      {children}
    </button>
  );
});
