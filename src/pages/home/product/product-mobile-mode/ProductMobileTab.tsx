"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function ProductMobileTab() {
  const [showTabs, setShowTabs] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTabs(window.scrollY > 100);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSmoothScroll = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <AnimatePresence>
      {showTabs && (
        <motion.div
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center gap-3 bg-tint-blue-100 p-4 text-xs font-medium text-tint-blue-500 rounded-bl-lg rounded-br-lg shadow-md lg:hidden"
        >
          <button onClick={() => handleSmoothScroll("#specification")}>
            مشخصات محصول
          </button>
          <button onClick={() => handleSmoothScroll("#review")}>
            نقد و بررسی
          </button>
          <button onClick={() => handleSmoothScroll("#comments")}>
            نظرات کاربران
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
