"use client";

import { AxeIcon, HomeIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";

const helloWorldMenus = [
  {
    label: "hello world 1",
    icon: <AxeIcon size={20} />,
    content: [
      { text: "Link A1", href: "/a1" },
      { text: "Link A2", href: "/a2" },
    ],
  },
  {
    label: "hello world 2",
    content: [
      { text: "Link B1", href: "/b1" },
      { text: "Link B2", href: "/b2" },
    ],
  },
  {
    label: "hello world 3",
    content: [
      { text: "Link C1", href: "/c1" },
      { text: "Link C2", href: "/c2" },
      { text: "Link C3", href: "/c3" },
    ],
  },
];

export function MainHeaderMenu() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <NavigationMenu>
      <LanguageSwitcher />
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-sm w-fit text-tint-blue-500 flex items-center gap-2">
            <span>خانه</span>
            <HomeIcon />
          </NavigationMenuTrigger>
          <NavigationMenuContent className="p-0 m-0 bg-tint-blue-100">
            <div className="flex md:w-[500px] lg:w-[700px]">
              <div className="flex flex-col gap-2 items-start  ">
                {helloWorldMenus.map((item, i) => (
                  <button
                    key={i}
                    onMouseEnter={() => setActiveIndex(i)}
                    className={` w-full flex items-stretch  gap-2 px-2 py-1 rounded hover:bg-accent ${
                      activeIndex === i ? "bg-accent font-medium" : ""
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
              </div>
              <div className="flex-1  bg-[#EEF6FF]">
                {activeIndex !== null && (
                  <ul className="flex flex-col gap-2">
                    {helloWorldMenus[activeIndex].content.map((link, j) => (
                      <li key={j}>
                        <NavigationMenuLink asChild>
                          <Link href={link.href} className="block text-sm ">
                            {link.text}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
