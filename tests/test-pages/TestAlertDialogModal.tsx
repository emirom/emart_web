import React, { useState } from "react";

type Props = {
  button: React.ReactNode;
  alertTitle: string;
  alertDescription?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
};

export function AlertDialogModal({
  button,
  onConfirm,
  confirmText = "تأیید",
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <span onClick={() => setOpen(true)}>{button}</span>

      {open && (
        <div role="dialog">
          <button onClick={() => setOpen(false)}>{"انصراف"}</button>
          <button
            onClick={() => {
              onConfirm?.();
              setOpen(false);
            }}
          >
            {confirmText}
          </button>
        </div>
      )}
    </div>
  );
}

export default AlertDialogModal;
