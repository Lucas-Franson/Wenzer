import { toast } from "react-toastify";

export function toastfySuccess(message: string) {
  return toast.success(message, {
    position: "top-right",
    autoClose: 4000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    progress: undefined,
  });
}

export function toastfyWarning(message: string) {
  return toast.warning(message, {
    position: "top-right",
    autoClose: 4000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    progress: undefined,
  });
}

export function toastfyError(message: string) {
  return toast.error(message, {
    position: "top-right",
    autoClose: 4000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    progress: undefined,
  });
}
