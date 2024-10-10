import { notification as antdNotification } from "antd";

export const notification = antdNotification;
export const Notify = () => {
  const [api, contextHolder] = antdNotification.useNotification();
  return contextHolder;
};
