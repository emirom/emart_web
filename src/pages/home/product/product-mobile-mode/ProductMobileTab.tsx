"use client";

import Container from "@components/Container";
import { useEffect, useState } from "react";

export default function ProductMobileTab() {
  const [showTabs, setShowTabs] = useState(true);
  const [tabActive, setTabActive] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      setShowTabs(window.scrollY > 200);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSmoothScroll = (id: string) => {
    setTabActive(id);
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const tabs = [
    { id: "#specification", label: "مشخصات محصول" },
    { id: "#review", label: "نقد و بررسی" },
    { id: "#comments", label: "نظرات کاربران" },
  ];

  return (
    <>
      {showTabs && (
        <nav
          aria-label="ناوبری بخش‌های محصول"
          role="tablist"
          className="fixed top-15 right-0 left-0 mx-auto z-50 lg:hidden"
        >
          <Container className="flex items-center gap-3 bg-tint-blue-100 px-4 py-2 text-xs font-medium text-tint-blue-500 rounded-bl-lg rounded-br-lg shadow-md">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                id={`tab-${tab.id.replace("#", "")}`}
                aria-controls={tab.id.replace("#", "")}
                aria-selected={tabActive === tab.id}
                onClick={() => handleSmoothScroll(tab.id)}
                className={`py-2 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tint-blue-500 focus-visible:rounded-md ${
                  tabActive === tab.id
                    ? "text-tint-blue-700 border-b-[2px] border-tint-blue-500"
                    : "text-tint-blue-500 border-b-0"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </Container>
        </nav>
      )}
    </>
  );
}
