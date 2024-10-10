import pkg from "lodash";

const { isEmpty } = pkg;

export const getApiData = <TData extends {}>({
  error,
  success,
  callComplete,
  fullResponse = false,
  ...axiosApiParams
}: any) => {
  if (window.Worker) {
    const worker = new Worker("/web-worker/index.js");
    worker.postMessage(axiosApiParams);
    worker.onmessage = (e) => {
      const response = e.data;
      if (response?.data?.unauthorize || response?.unauthorize) {
        console.error("Auto logout from axios", error);
        window.location.href = window.location.origin + routes.SIGNOUT.url;
      } else {
        if (
          response?.data?.statusCode < 200 ||
          response?.data?.statusCode > 205 ||
          (!isEmpty(response?.data?.message) &&
            response?.data?.success?.toString() === "0")
        ) {
        } else if (response?.statusCode < 200 || response?.statusCode > 205) {
          error?.({
            message: response?.message,
            type: "danger",
          });
          callComplete?.();
          return response?.message;
        }
        if (fullResponse) {
          success(response);
        } else {
          if (response?.data && response?.data?.success) {
            success(response?.data);
          } else {
            success(response);
          }
        }
      }
      callComplete?.();
    };

    worker.onerror = (workerError) => {
      console.error("worker error", error);
      error?.({
        message: workerError?.message,
        type: "danger",
      });
      callComplete?.();
    };

    worker.onmessageerror = (workerError) => {
      console.error("worker onmessageerror", workerError);
      callComplete?.();
    };
  }
};
