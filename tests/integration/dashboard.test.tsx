import { QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { queryClient } from "../../src/lib/apis/queryClient";
import Dashboard from "../test-pages/DashboardWrapper";

describe("Dashboard page integration", () => {
  beforeEach(() => {
    // simple fetch mock for categories endpoints
    globalThis.fetch = vi.fn((input: RequestInfo | URL) => {
      const url = String(input);
      if (url.includes("parentId=1")) {
        return Promise.resolve({
          json: () =>
            Promise.resolve({
              data: [{ id: "2", name: "Child Category", level: 2 }],
            }),
        } as any);
      }
      // root
      return Promise.resolve({
        json: () =>
          Promise.resolve({
            data: [{ id: "1", name: "Root Category", level: 1 }],
          }),
      } as any);
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("renders title, add button and root categories", async () => {
    const jsx = await Dashboard();

    render(
      <QueryClientProvider client={queryClient}>{jsx}</QueryClientProvider>,
    );

    expect(screen.getByText("دسته بندی ها")).toBeInTheDocument();
    expect(screen.getByText("افزودن دسته بندی")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Root Category")).toBeInTheDocument();
    });
  });

  test("expands node to show children", async () => {
    const jsx = await Dashboard();

    render(
      <QueryClientProvider client={queryClient}>{jsx}</QueryClientProvider>,
    );

    const root = await screen.findByText("Root Category");
    await userEvent.click(root);

    // children should be visible after expanding
    await waitFor(() => {
      expect(screen.getByText("Child Category")).toBeInTheDocument();
    });
  });
});
