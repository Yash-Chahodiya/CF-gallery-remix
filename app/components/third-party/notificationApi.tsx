import _ from "lodash";
import { Notify, notification } from "./notification";
import { ClientOnly } from "remix-utils/client-only";
import { useEffect, useState } from "react";

export const CFNotify = () => {
  return <ClientOnly>{() => <Notify />}</ClientOnly>;
};

export const notificationApi = (): { setNotify: any } => {
  const { isEmpty } = _;
  const [isClient, setIsClient] = useState<boolean>(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return {
    setNotify: ({ type, title, message }: any) => {
      if (isClient) {
        const duration = 1;
        if (type === "danger") {
          notification.error({
            message: isEmpty(title) ? title : "Alert",
            description: message,
            className: "cf-notification-notice",
            duration,
          });
        } else if (type === "success") {
          notification.success({
            message: isEmpty(title) ? title : "Success",
            description: message,
            className: "cf-notification-notice",
            duration,
          });
        } else if (type === "warning") {
          notification.warning({
            message: isEmpty(title) ? title : "Warning",
            description: message,
            className: "cf-notification-notice",
            duration,
          });
        }
      }
    },
  };
};
