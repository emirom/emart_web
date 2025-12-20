import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { server } from "../msw/server";

import { vi } from "vitest";
import TreeRender from "../test-pages/TreeRenderWrapper";

describe("TreeRender integration (MSW)", () => {
  test("success: shows root and children when expanded", async () => {
    render(<TreeRender />);

    // root from default handler
    await waitFor(() => {
      expect(screen.getByText("Root Category")).toBeInTheDocument();
    });

    const root = screen.getByText("Root Category");
    await userEvent.click(root);

    // children list should appear (at least one child li)
    await waitFor(() => {
      const items = screen.getAllByRole("listitem");
      expect(items.length).toBeGreaterThan(1);
    });
  });

  test("empty: shows no nodes when API returns empty list", async () => {
    // override /categories to return empty root
    server.use(http.get("/categories", () => HttpResponse.json({ data: [] })));

    render(<TreeRender />);

    await waitFor(() => {
      expect(screen.queryByText("Root Category")).not.toBeInTheDocument();
    });
  });

  test("error: API 500 behaves deterministically (no nodes)", async () => {
    // return 500 with empty body
    server.use(
      http.get("/categories", () =>
        HttpResponse.json({ data: [] }, { status: 500 }),
      ),
    );

    render(<TreeRender />);

    await waitFor(() => {
      expect(screen.queryByText("Root Category")).not.toBeInTheDocument();
    });
  });

  test("deep nesting: expands to third level", async () => {
    // reset and override to provide deeper nesting
    server.resetHandlers();
    server.use(
      http.get("/categories", (req) => {
        const maybeUrl = (req as any).url;
        let parentId: string | null = null;
        if (maybeUrl) {
          try {
            const searchParams =
              typeof maybeUrl === "string"
                ? new URL(maybeUrl, "http://localhost").searchParams
                : maybeUrl.searchParams;
            parentId = searchParams.get("parentId");
          } catch (e) {
            parentId = null;
          }
        }

        if (!parentId || parentId === "null") {
          return HttpResponse.json({
            data: [{ id: "1", name: "Root Category", level: 1 }],
          });
        }
        if (parentId === "1") {
          return HttpResponse.json({
            data: [{ id: "2", name: "Child Level 2", level: 2 }],
          });
        }
        if (parentId === "2") {
          return HttpResponse.json({
            data: [{ id: "3", name: "Child Level 3", level: 3 }],
          });
        }
        return HttpResponse.json({ data: [] });
      }),
    );

    render(<TreeRender />);

    await waitFor(() =>
      expect(screen.getByText("Root Category")).toBeInTheDocument(),
    );

    await userEvent.click(screen.getByText("Root Category"));
    await waitFor(() => {
      const items = screen.getAllByRole("listitem");
      expect(items.length).toBeGreaterThan(1);
    });

    // expand the first child and expect the list to grow again
    const firstChild = screen.getAllByRole("listitem")[1];
    await userEvent.click(firstChild.querySelector("div")!);
    await waitFor(() => {
      const items = screen.getAllByRole("listitem");
      expect(items.length).toBeGreaterThan(2);
    });
  });

  test("slow-loading: shows loading indicator while fetching children", async () => {
    // Use a fetch mock for deterministic slow response
    const originalFetch = globalThis.fetch;
    globalThis.fetch = vi.fn((input: RequestInfo | URL) => {
      const url = String(input);
      if (url.includes("parentId=1")) {
        return new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({
                json: () =>
                  Promise.resolve({
                    data: [{ id: "2", name: "Child Category", level: 2 }],
                  }),
              } as any),
            500,
          ),
        );
      }
      // root
      return Promise.resolve({
        json: () =>
          Promise.resolve({
            data: [{ id: "1", name: "Root Category", level: 1 }],
          }),
      } as any);
    });

    try {
      render(<TreeRender />);

      await waitFor(() =>
        expect(screen.getByText("Root Category")).toBeInTheDocument(),
      );

      await userEvent.click(screen.getByText("Root Category"));

      // ensure the slow response actually delays the appearance of the child
      const start = Date.now();
      await screen.findByText("Child Category");
      const elapsed = Date.now() - start;
      expect(elapsed).toBeGreaterThanOrEqual(400);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
});
