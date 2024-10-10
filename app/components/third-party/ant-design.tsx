import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Tooltip,
  Typography,
  Button,
  Drawer,
  Progress,
  Popconfirm,
  Modal,
  Dropdown,
  Checkbox,
  notification,
} from "antd";
import { useState } from "react";

const CFTooltip = ({ children, content, placement }: any) => {
  return (
    <Tooltip title={content} placement={placement}>
      {children}
    </Tooltip>
  );
};

const CFTypography = ({ children, title, className }: any) => {
  return (
    <Typography title={title} className={className}>
      {children}
    </Typography>
  );
};

const CFDrawer = ({ children, open, drawerBody }: any) => {
  return (
    <Drawer
      open={open}
      size="large"
      closable={false}
      className={drawerBody}
      placement="right"
    >
      {children}
    </Drawer>
  );
};

const CFIconButton = ({
  children,
  className,
  htmlType,
  variant,
  shape,
  onClick,
}: any) => {
  return (
    <Button
      className={className}
      type={variant}
      htmlType={htmlType}
      shape={shape}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

const CFConfirmHeader = ({ title, icon, handelModal, isIconShow }: any) => {
  return (
    <Popconfirm
      title={title}
      icon={icon}
      open={handelModal}
      showArrow={isIconShow}
    />
  );
};

const CFConfirmModal = ({
  handelModal,
  bodyClassName,
  zindex,
  open,
  message,
  footer,
}: any) => {
  return (
    <Modal
      open={open}
      zIndex={zindex}
      title={message}
      closable={false}
      onCancel={handelModal}
      className={bodyClassName}
      footer={footer}
    />
  );
};

const CFPDFModal = ({
  onClose,
  className,
  zindex,
  visible,
  message,
  footer,
  width,
  height,
}: any) => {
  return (
    <Modal
      open={visible}
      zIndex={zindex}
      title={message}
      closable={true}
      onCancel={onClose}
      className={className}
      height={height}
      width={width}
      footer={footer}
    />
  );
};

const CFCloseButton = ({ children, onClick, iconClassName }: any) => {
  return (
    <Button onClick={onClick} className={iconClassName}>
      {" "}
      {children}
    </Button>
  );
};

const CFButton = ({ children, variant, className, onClick }: any) => {
  return (
    <Button type={variant} className={className} onClick={onClick}>
      {children}
    </Button>
  );
};

const CFProgress = ({ percent }: any) => {
  return <Progress percent={percent} />;
};
const CFCheckBox = ({ classname, label, onchange, checked }: any) => {
  return (
    <Checkbox
      className={classname}
      title={label}
      onChange={onchange}
      checked={checked}
    />
  );
};

const CFDropdown = ({
  contentClassName,
  iconClass,
  options,
  onOpenChange,
  icon,
}: any) => {
  return (
    <Dropdown
      className={contentClassName}
      onOpenChange={onOpenChange}
      menu={options}
    >
      <FontAwesomeIcon icon={icon} className={iconClass} />
    </Dropdown>
  );
};

const notificationApi = ({ message, type, placement }: any) => {
  const [api, contextHolder] = notification.useNotification();
  api.info({
    message: message,
    type: type,
    placement: placement,
  });
};

export {
  CFPDFModal,
  CFCheckBox,
  CFTooltip,
  CFTypography,
  CFIconButton,
  CFDrawer,
  CFCloseButton,
  CFProgress,
  CFButton,
  CFConfirmHeader,
  CFConfirmModal,
  CFDropdown,
  notificationApi,
};
