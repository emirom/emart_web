/// <reference types="vitest" />

import Dashboard from "@app/[locale]/(admin)/dashboard/page";
import { queryClient } from "@lib/apis/queryClient";
import { getCategories } from "@lib/services/categories/categories";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { Mock } from "vitest";
import { vi } from "vitest";

vi.mock("@lib/services/categories/categories");

vi.mock("next/link", () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

describe("Dashboard Integration Test", () => {
  beforeEach(() => {
    (getCategories as Mock).mockResolvedValue([
      { id: 1, name: "Electronics" },
      { id: 2, name: "Clothes" },
    ]);
  });

  it("renders categories after hydration", async () => {
    render(
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Dashboard />
      </HydrationBoundary>,
    );

    await waitFor(() => {
      expect(getCategories).toHaveBeenCalled();
    });

    expect(screen.getByText("دسته بندی ها")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /افزودن دسته بندی/i }),
    ).toBeInTheDocument();
  });

  it("handles empty categories gracefully", async () => {
    (getCategories as Mock).mockResolvedValue([]);

    render(
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Dashboard />
      </HydrationBoundary>,
    );

    await waitFor(() => {
      expect(getCategories).toHaveBeenCalled();
    });
  });

  it("link is clickable", async () => {
    render(
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Dashboard />
      </HydrationBoundary>,
    );

    const link = screen.getByRole("link", { name: /افزودن دسته بندی/i });
    await userEvent.click(link);
    expect(link).toHaveAttribute("href", "/dashboard/category/add");
  });
});
