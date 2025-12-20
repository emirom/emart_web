import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/products", () => {
    return HttpResponse.json({
      data: [{ id: 1, name: "Test Product" }],
    });
  }),
];
