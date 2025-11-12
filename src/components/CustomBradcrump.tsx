"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@components/ui/breadcrumb";
import { SlashIcon } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

interface BreadcrumbRoute {
  label: string;
  href?: string;
}

interface CustomBreadcrumbProps {
  routes: BreadcrumbRoute[];
  separatorIcon?: ReactNode;
  className?: string;
}

export default function CustomBreadcrumb({
  routes,
  separatorIcon = <SlashIcon className="w-4 h-4 text-muted-foreground" />,
  className,
}: CustomBreadcrumbProps) {
  if (!routes?.length) return null;

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        {routes.map((route, index) => {
          const isLast = index === routes.length - 1;
          return (
            <div key={route.label} className="flex items-center">
              <BreadcrumbItem className="text-xs  font-medium text-gray-600">
                {isLast ? (
                  <BreadcrumbPage className="font-bold">
                    {route.label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={route.href ?? "#"}>{route.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && (
                <BreadcrumbSeparator className="mx-1">
                  {separatorIcon}
                </BreadcrumbSeparator>
              )}
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
