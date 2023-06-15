import toast from "react-hot-toast";

export const successHotToast = (message: string) => {
  toast.success(message, {
    className:
      "border border-emerald-400 bg-emerald-50 text-emerald-800 font-bold font-Roboto-Condensed",
  });
};

export const errorHotToast = (message: string) => {
  toast.error(message, {
    className:
      "border border-red-400 bg-red-50 text-red-800 font-bold font-Roboto-Condensed",
  });
};
