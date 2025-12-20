import "@testing-library/jest-dom";
import { afterAll, afterEach, beforeAll } from "vitest";
import { server } from "./msw/server.js";

import { vi } from "vitest";

// Global module mocks for UI components so tests can import real components
vi.mock("@components/AlertDialogModal", () => {
  const React = require("react");
  const { useState } = React;
  return {
    AlertDialogModal: ({ button, onConfirm, confirmText = "تأیید" }: any) => {
      // component returned directly
      return React.createElement(function AlertDialogMock() {
        const [open, setOpen] = useState(false);
        const trigger = React.cloneElement(button, {
          onClick: () => setOpen(true),
        });
        return React.createElement(
          "div",
          null,
          trigger,
          open &&
            React.createElement(
              "div",
              { role: "dialog" },
              React.createElement(
                "button",
                { onClick: () => setOpen(false) },
                "انصراف",
              ),
              React.createElement(
                "button",
                {
                  onClick: () => {
                    onConfirm?.();
                    setOpen(false);
                  },
                },
                confirmText,
              ),
            ),
        );
      });
    },
  };
});

vi.mock("@components/BtnWithIcon", () => {
  const React = require("react");
  const make = (label: string) => (props: any) =>
    React.createElement(
      "button",
      { ...(props || {}), "aria-label": props?.["aria-label"] || label },
      label[0],
    );
  return {
    EditButton: make("ویرایش"),
    DeleteButton: make("حذف"),
    PlusButton: make("افزودن"),
    CopyButton: make("کپی"),
    EyeButton: make("مشاهده"),
    SubmitButton: make("ثبت"),
    AddButton: make("افزودن"),
  };
});

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
