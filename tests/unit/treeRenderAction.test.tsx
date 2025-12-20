import { QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import { queryClient } from "../../src/lib/apis/queryClient";

// mock toast
const mockSuccess = vi.fn();
const mockError = vi.fn();
vi.mock("react-toastify", () => ({
  toast: {
    success: (...args: any[]) => mockSuccess(...args),
    error: (...args: any[]) => mockError(...args),
  },
}));

// mock deleteCategoryAction module (tests will provide implementations)
const mockDelete = vi.fn(() => Promise.resolve({}));
vi.mock("../../src/lib/actions/category-action", () => ({
  deleteCategoryAction: (id: string) => mockDelete(id),
}));

import TreeRenderAction from "../../src/pages/dashboard/category/TreeRenderAction";

describe("TreeRenderAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("shows confirm dialog and calls delete action on confirm", async () => {
    const invalidateSpy = vi.spyOn(queryClient, "invalidateQueries");

    render(
      <QueryClientProvider client={queryClient}>
        <TreeRenderAction id="1" />
      </QueryClientProvider>,
    );

    // click delete button (AlertDialog trigger)
    const deleteBtn = screen.getByLabelText(/حذف|Delete category|حذف/i);
    await userEvent.click(deleteBtn);

    // confirm button text is "تأیید" by default in AlertDialogModal
    const confirm = await screen.findByText(/تأیید|Confirm|Confirmar/i);
    await userEvent.click(confirm);

    await waitFor(() => {
      expect(mockDelete).toHaveBeenCalledWith("1");
      expect(invalidateSpy).toHaveBeenCalled();
      expect(mockSuccess).toHaveBeenCalled();
    });
  });

  test("renders copy/view/add buttons and edit link", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <TreeRenderAction id="1" />
      </QueryClientProvider>,
    );

    expect(
      screen.getByLabelText(/Add child category|افزودن/i),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Copy category|کپی/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/View category|مشاهده/i)).toBeInTheDocument();

    const editLink = screen.getByRole("link", { name: /edit|ویرایش|/i });
    // If role/name doesn't match, fallback to querying by href
    if (!editLink) {
      const link = screen.getByRole("link");
      expect(link.getAttribute("href")).toBe("/dashboard/category/1");
    } else {
      expect(editLink.getAttribute("href")).toBe("/dashboard/category/1");
    }
  });

  test("shows toast.error on delete failure", async () => {
    // make the module-level delete mock reject for this test
    // (TreeRenderAction uses the imported deleteCategoryAction which calls `mockDelete`)
    mockDelete.mockImplementationOnce(() => Promise.reject(new Error("boom")));

    render(
      <QueryClientProvider client={queryClient}>
        <TreeRenderAction id="1" />
      </QueryClientProvider>,
    );

    const deleteBtn = screen.getByLabelText(/حذف|Delete category|حذف/i);
    await userEvent.click(deleteBtn);

    const confirm = await screen.findByText(/تأیید|Confirm|Confirmar/i);
    await userEvent.click(confirm);

    await waitFor(() => {
      expect(mockDelete).toHaveBeenCalledWith("1");
      expect(mockError).toHaveBeenCalled();
    });
  });
});
