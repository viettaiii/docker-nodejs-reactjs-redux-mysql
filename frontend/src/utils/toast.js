import { toast } from "react-toastify";

const toastSuccess = (message) => toast.success(message, { theme: "success" });
const toastError = (message) => toast.error(message, { theme: "error" });
const toastInfo = (message) => toast.info(message, { theme: "info" });
const toastWarning = (message) => toast.warning(message, { theme: "warning" });
const toastDanger = (message) => toast.error(message, { theme: "danger" });

export { toastSuccess, toastError, toastInfo, toastWarning, toastDanger };
