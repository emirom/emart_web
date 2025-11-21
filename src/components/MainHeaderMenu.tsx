"use client";

import { mainCategories, subMenuData } from "@lib/constants/menu-data";
import { HomeIcon } from "lucide-react";
import Link from "next/link";
import { useId, useState } from "react";
import { cn } from "./lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";

type SubMenuKey = keyof typeof subMenuData;

export function MainHeaderMenu() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const menuId = useId();

  return (
    <NavigationMenu dir="rtl">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className="text-sm w-fit text-tint-blue-500 flex items-center gap-4 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            aria-label="خانه"
          >
            <span className="w-[1.125rem] h-[1.5625rem]">
              <HomeIcon aria-hidden="true" />
            </span>
            <span>خانه</span>
          </NavigationMenuTrigger>
          <NavigationMenuContent className="p-0 m-0 bg-tint-blue-100">
            <div className="flex md:w-[700px] lg:w-[1000px]">
              <div className="flex flex-col gap-2 items-start py-3 border-l border-l-black text-tint-blue-500 w-[200px]">
                {mainCategories.map((cat, i) => (
                  <button
                    key={i}
                    id={`${menuId}-button-${i}`}
                    onMouseEnter={() => setActiveIndex(i)}
                    onFocus={() => setActiveIndex(i)}
                    className={`w-full flex items-center gap-5 px-2 py-1 rounded hover:bg-accent focus:outline-none focus:bg-accent ${
                      activeIndex === i ? "bg-accent font-medium" : ""
                    }`}
                    aria-haspopup={
                      subMenuData[cat.label as SubMenuKey]?.length
                        ? "menu"
                        : undefined
                    }
                    aria-expanded={activeIndex === i}
                  >
                    <span
                      className={cn(
                        "w-[3px] h-full inline rounded-tl-lg rounded-bl-lg",
                        activeIndex === i
                          ? "bg-tint-blue-500"
                          : "bg-transparent",
                      )}
                    ></span>
                    <span className="w-[1.125rem] h-[1.5625rem]">
                      {cat.icon}
                    </span>
                    <span>{cat.label}</span>
                  </button>
                ))}
              </div>
              <div className="flex-1 flex gap-4 p-3">
                {activeIndex !== null &&
                  subMenuData[
                    mainCategories[activeIndex].label as SubMenuKey
                  ]?.map((section, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col gap-2 min-w-[150px]"
                    >
                      <h4 className="font-medium text-sm text-tint-blue-500 flex items-center gap-3">
                        <span
                          className={cn(
                            "w-[3px] h-[75%] inline rounded-tl-lg rounded-bl-lg bg-tint-blue-500",
                          )}
                        ></span>
                        {section.title}
                      </h4>
                      <ul className="flex flex-col gap-1">
                        {section.items.map((item, j) => (
                          <li key={j}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={item.href}
                                prefetch={true}
                                className="text-sm text-tint-blue-500 block hover:bg-whit-smoke focus:outline-none focus:ring-2 rounded transition-colors "
                              >
                                {item.text}
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
