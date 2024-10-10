import React, { useEffect } from "react";
import _ from "lodash";

import { ClientOnly } from "remix-utils/client-only";
import { ModalProps } from "antd";
import { CFCloseButton } from "./CFCloseButton";
import { CFTypography } from "~/components/third-party/ant-design";
import { Modal } from "./Modal";

interface CFModalProps
  extends Omit<
    ModalProps,
    "onOk" | "width" | "onCancel" | "footer" | "closable"
  > {
  icon?: React.ReactNode | React.ReactNode[];
  handler?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  size?: string | number;
  title?: string;
  subTitle?: string;
  subTitleClass?: string;
  children?: React.ReactNode | React.ReactNode[];
  header?: boolean;
  closeIcon?: boolean;
  footer?: React.ReactNode | React.ReactNode[];
  closeModalHandler?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  modalBody?: string;
  headerClassName?: string;
  rightSideClassName?: string;
  headerRightIcon?: React.ReactNode | React.ReactNode[];
}

export const CFModal = React.forwardRef<HTMLDivElement, CFModalProps>(
  (
    {
      icon,
      open,
      handler = () => {},
      title,
      subTitle,
      subTitleClass,
      centered = true,
      mask = true,
      maskClosable = false,
      children,
      header = true,
      footer,
      closeIcon = true,
      modalBody = "p-4",
      size = 500,
      closeModalHandler,
      rootClassName,
      headerClassName = "",
      headerRightIcon = false,
      rightSideClassName = "",
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
          <Modal
            open={open}
            onOk={handler}
            width={size}
            maskClosable={maskClosable}
            centered={centered}
            onCancel={closeModalHandler}
            footer={false}
            closable={false}
            rootClassName={rootClassName}
            mask={mask}
            {...props}
          >
            {header ? (
              <div className="flex items-center justify-between w-full py-2.5 px-4 border-b border-gray-200 dark:border-white/10">
                <div className="flex items-center w-[calc(100%-40px)]">
                  {icon ? (
                    <div className="w-8 h-8 flex items-center justify-center bg-[#e4ecf68c] dark:bg-dark-500 mr-2.5 text-primary-900 dark:text-white/90 rounded-full">
                      {icon}
                    </div>
                  ) : (
                    <></>
                  )}
                  <div
                    className={`w-[calc(100%-54px)] ${headerClassName} ${
                      subTitle && "flex flex-col"
                    }`}
                  >
                    <CFTypography
                      title="h5"
                      className="truncate !text-[17px] !mb-0 !text-primary-900 font-semibold dark:!text-white/90"
                    >
                      {title}
                    </CFTypography>
                    {subTitle && (
                      <CFTypography
                        title="small"
                        className={`truncate text-13 !mb-0 text-[#777] font-normal ${subTitleClass}`}
                      >
                        {subTitle}
                      </CFTypography>
                    )}
                  </div>
                </div>
                <div className={`${rightSideClassName}`}>
                  {headerRightIcon && headerRightIcon}
                  {closeIcon ? (
                    <CFCloseButton
                      onClick={closeModalHandler}
                      iconClassName="!w-[18px] !h-[18px]"
                    />
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            ) : (
              <></>
            )}
            <div ref={ref} className={`${modalBody}`}>
              {children}
            </div>
            {footer ? (
              <div
                className={`py-2.5 px-4 gap-2.5 justify-center flex border-t border-gray-300`}
              >
                {footer}
              </div>
            ) : (
              <></>
            )}
          </Modal>
        )}
      </ClientOnly>
    );
  }
);

export function ModalHeader({
  icon,
  title,
  closeModalHandler,
}: {
  icon: React.ReactNode | React.ReactNode[];
  title: string;
  closeModalHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <div className="flex items-center justify-between w-full py-2.5 px-4 border-b border-gray-200 dark:border-white/10">
      <div className="flex items-center w-[calc(100%-40px)]">
        {icon ? (
          <div className="w-8 h-8 flex items-center justify-center bg-[#e4ecf68c] dark:bg-dark-500 mr-2.5 text-primary-900 dark:text-white/90 rounded-full">
            {icon}
          </div>
        ) : (
          <></>
        )}
        <CFTypography
          title="h5"
          className="truncate !text-xl w-[calc(100%-54px)] !mb-0 text-primary-900 font-semibold"
        >
          {title}
        </CFTypography>
      </div>
      <CFCloseButton
        onClick={closeModalHandler}
        iconClassName="!w-[18px] !h-[18px]"
      />
    </div>
  );
}
