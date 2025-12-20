import Dashboard from "@app/[locale]/(admin)/dashboard/page";
import { queryClient } from "@lib/apis/queryClient";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

vi.mock("@lib/apis/queryClient", () => ({
  queryClient: {
    prefetchQuery: vi.fn(),
    getQueryData: vi.fn(),
  },
}));

vi.mock("@lib/services/categories/categories", () => ({
  getCategories: vi.fn(),
}));

vi.mock("next/link", () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

vi.mock("@tanstack/react-query", async () => {
  const actual = await vi.importActual("@tanstack/react-query");
  return {
    ...actual,
    HydrationBoundary: ({ children }: any) => <div>{children}</div>,
    dehydrate: vi.fn(() => ({ mock: "state" })),
  };
});

describe("Dashboard Unit Test", () => {
  it("should render heading and link correctly", async () => {
    render(<Dashboard />);

    const heading = screen.getByText("دسته بندی ها");
    expect(heading).toBeInTheDocument();

    const link = screen.getByRole("link", { name: /افزودن دسته بندی/i });
    expect(link).toHaveAttribute("href", "/dashboard/category/add");
  });

  it("should call prefetchQuery on mount", async () => {
    render(<Dashboard />);
    expect(queryClient.prefetchQuery).toHaveBeenCalled();
  });
});
