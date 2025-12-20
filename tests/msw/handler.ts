import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/products", () => {
    return HttpResponse.json({
      data: [{ id: 1, name: "Test Product" }],
    });
  }),

  // Categories endpoint used by dashboard and TreeRender
  http.get("/categories", (req) => {
    // `req.url` may not be typed as a URL in this test environment;
    // coerce safely to obtain search params.
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

    // Root categories (parentId null or 'null')
    if (!parentId || parentId === "null") {
      return HttpResponse.json({
        data: [{ id: "1", name: "Root Category", level: 1 }],
      });
    }

    // Child categories for parentId = 1
    if (parentId === "1") {
      return HttpResponse.json({
        data: [{ id: "2", name: "Child Category", level: 2 }],
      });
    }

    return HttpResponse.json({ data: [] });
  }),
];
