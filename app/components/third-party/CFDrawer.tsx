import { CFTypography } from "~/components/third-party/ant-design";
import { DrawerProps } from "antd";
import React, { useEffect } from "react";
import _ from "lodash";

import { CFCloseButton } from "./CFCloseButton";
import { Drawer } from "./drawer";
import { ClientOnly } from "remix-utils/client-only";

interface CFDrawerProps extends Omit<DrawerProps, "size"> {
  header?: React.ReactNode;
  bodyStyle?: React.CSSProperties;
  closeDrawer?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  drawerBody?: string;
  drawerheader?: string;
  height?: string | number;
  size?: string | number;
}

interface SidebarHeaderProps {
  icon?: React.ReactNode | React.ReactNode[];
  title?: string;
  closeDrawer?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  subtitle?: string;
  headerRightIcon?: React.ReactNode | React.ReactNode[];
  rightSideClassName?: string;
  drawerHeaderClass?: string;
  headerIconClassName?: string;
  headerTextclass?: string;
  closeButtonClass?: string;
  iconClassName?: string;
  leftSideClassName?: string;
}

export const CFDrawer = React.forwardRef<HTMLDivElement, CFDrawerProps>(
  (
    {
      open,
      children,
      header,
      footer,
      closeDrawer,
      placement = "right",
      size = "700px",
      className,
      maskClosable = false,
      rootClassName,
      height,
      bodyStyle,
      drawerBody = "p-4",
      drawerheader = "border-b",
      ...props
    },
    ref
  ) => {
    const { isEmpty } = _;

    useEffect(() => {
      const overflowScrollBody = document.getElementsByTagName("body");
      if (!isEmpty(overflowScrollBody[0])) {
        if (open) {
          overflowScrollBody[0]?.classList?.add("overflow-y-hidden");
        } else {
          overflowScrollBody[0]?.classList?.remove("overflow-y-hidden");
        }
      }
    }, [open]);

    return (
      <ClientOnly>
        {() => (
          <Drawer
            open={open}
            placement={placement}
            onClose={
              closeDrawer as
                | ((
                    e:
                      | React.MouseEvent<Element, MouseEvent>
                      | React.KeyboardEvent<Element>
                  ) => void)
                | undefined
            }
            maskClosable={maskClosable}
            className={`cursor-default shadow-none p-0 dark:bg-[#15202B] ${
              className || ""
            }`}
            width={size}
            classNames={{
              header: "!hidden",
              body: "!p-0 !overflow-hidden",
            }}
            rootClassName={rootClassName}
            height={height}
            push={false}
            {...props}
          >
            <div ref={ref}>
              {header && (
                <div
                  className={`border-gray-200 dark:border-white/10 ${drawerheader}`}
                >
                  {header}
                </div>
              )}
              <div
                className={`overflow-y-auto mobilesidemenu ${drawerBody} ${
                  footer
                    ? "h-[calc(100vh-116px)]"
                    : "sm:h-[calc(100vh-65px)] h-[calc(100vh-150px)] border-b-0"
                }`}
              >
                {children}
              </div>
              {footer && <div className="p-4">{footer}</div>}
            </div>
          </Drawer>
        )}
      </ClientOnly>
    );
  }
);

export function SidebarHeader({
  icon,
  title,
  closeDrawer,
  subtitle,
  headerRightIcon = false,
  rightSideClassName = "",
  leftSideClassName = "",
  drawerHeaderClass = "py-2.5",
  headerIconClassName = "w-[30px] h-[30px] bg-[#e4ecf68c] dark:bg-dark-500 text-primary-900 dark:text-white/90",
  headerTextclass = "!text-primary-900 dark:!text-white/90",
  closeButtonClass,
  iconClassName = "!w-[18px] !h-[18px]",
}: SidebarHeaderProps) {
  return (
    <div
      className={`flex items-center justify-between w-full px-4 ${drawerHeaderClass}`}
    >
      <div className={`flex items-center ${leftSideClassName}`}>
        {icon && (
          <div
            className={`flex items-center justify-center rounded-full mr-2.5 ${headerIconClassName}`}
          >
            {icon}
          </div>
        )}
        {title && (
          <div>
            <CFTypography
              title="h5"
              className={`!text-[17px] !mb-0 font-semibold ${headerTextclass}`}
            >
              title
            </CFTypography>
            {subtitle && (
              <CFTypography className="text-xs text-primary-900/60 !mb-0 font-normal">
                subtitle
              </CFTypography>
            )}
          </div>
        )}
      </div>
      <div className={`${rightSideClassName}`}>
        {headerRightIcon && headerRightIcon}
        <CFCloseButton
          onClick={closeDrawer}
          className={closeButtonClass}
          iconClassName={iconClassName}
        />
      </div>
    </div>
  );
}
