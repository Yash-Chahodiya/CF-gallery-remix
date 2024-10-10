import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DropDownProps, MenuProps } from "antd";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Dropdown } from "./dropdown";
import { ClientOnly } from "remix-utils/client-only";
import { CFTypography } from "~/components/third-party/ant-design";
import { CFIconButton } from "./ant-design";
import { CFTooltip } from "~/components/third-party/ant-design";
import { CFButton } from "~/components/third-party/ant-design";

interface CFDropdownMenuOptionProps {
  icon?: IconProp;
  label?: React.ReactNode | React.ReactNode[];
  onlyIconView?: boolean;
  content?: string;
  disabled?: boolean;
}

interface CFDropdownOptionParams extends CFDropdownMenuOptionProps {
  onClick?: () => void;
}

interface CFDropdownProps extends DropDownProps {
  options: CFDropdownOptionParams[];
  menuFooter?: React.ReactNode | React.ReactNode[];
  icon?: IconProp;
  tooltipcontent?: string;
  footerOptionText?: boolean;
  contentClassName?: string;
  buttonClass?: string;
  isScrollable?: boolean;
  divRef?: React.MutableRefObject<HTMLDivElement | null>;
  iconClass?: string;
  isDrawerClose?: string;
}

export const CFDropdown = React.forwardRef<HTMLButtonElement, CFDropdownProps>(
  (
    {
      options = [],
      menuFooter,
      icon,
      children,
      tooltipcontent = "",
      footerOptionText = true,
      className = "",
      contentClassName = "w-[230px]",
      buttonClass = "",
      isScrollable = false,
      divRef,
      isDrawerClose = "",
      onOpenChange,
      iconClass = "text-primary-800 hover:text-primary-900 dark:text-white/90",
      disabled,
    },
    ref
  ) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

    useEffect(() => {
      if (ref && "current" in ref) {
        ref.current = buttonRef.current; // Store the ref value in the useRef
      }
    }, [ref, buttonRef.current]);

    useEffect(() => {
      if (isDrawerClose) {
        setIsDrawerOpen(false);
      }
    }, [isDrawerClose]);

    const items: MenuProps["items"] = options
      ?.filter((option: CFDropdownOptionParams) => !option?.onlyIconView)
      ?.map(
        (
          { onClick, disabled, ...option }: CFDropdownOptionParams,
          key: number
        ) => ({
          label: <CFDropdownMenuOption disabled={disabled} {...option} />,
          key: key,
          onClick: () => {
            onClick?.();
            setIsDrawerOpen(false);
          },
          disabled,
        })
      );

    isScrollable &&
      useEffect(() => {
        const handleScroll = () => {
          setIsDrawerOpen(false);
        };

        const div = divRef?.current;

        const agElement = div?.querySelector(
          ".ag-body-viewport.ag-row-no-animation.ag-layout-normal"
        );

        if (agElement) {
          agElement.addEventListener("scroll", handleScroll);

          return () => {
            agElement.removeEventListener("scroll", handleScroll);
          };
        }
      }, [divRef]);

    const iconOnlyOptions = useMemo(
      () =>
        options
          ? options.filter(
              (option: CFDropdownOptionParams) => option && option.onlyIconView
            )
          : [],
      [options]
    );

    return (
      <div className={`text-center ${className}`}>
        {
          <ClientOnly>
            {() => (
              <Dropdown
                menu={{ items }}
                trigger={["click"]}
                open={isDrawerOpen}
                overlayClassName="dropdown-option-block"
                onOpenChange={(value: boolean, info: any) => {
                  setIsDrawerOpen(value);
                  onOpenChange?.(value, info);
                }}
                dropdownRender={(menu: any) => (
                  <div className={`dropdown-content ${contentClassName}`}>
                    {menu}
                    {menuFooter}
                    {iconOnlyOptions.length > 0 && (
                      <div>
                        <CFTypography
                          title="small"
                          className="h-px w-full mt-0.5 block bg-gradient-to-r from-[#ffffff03] via-[#bdbfc0] to-[#ffffff03]"
                        ></CFTypography>
                        <ul className="flex items-center justify-center px-[15px] py-[5px] dark:bg-[#1f1f1f]">
                          {iconOnlyOptions.map(
                            (
                              {
                                onClick,
                                icon,
                                disabled,
                                content,
                              }: CFDropdownOptionParams,
                              key: number
                            ) => {
                              const button = (
                                <CFIconButton
                                  htmlType="button"
                                  className={`dark:bg-dark-600 !w-[25px] h-[25px] text-primary-gray-900 ${
                                    !disabled
                                      ? "hover:!bg-deep-orange-500/5"
                                      : ""
                                  } `}
                                  variant="text"
                                  iconClass={`w-3.5 h-3.5 ${
                                    !disabled
                                      ? "group-hover/buttonHover:animate-toggle group-hover/buttonHover:!text-deep-orange-500"
                                      : "group-hover/buttonHover:!text-[#0000004d] text-[#0000004d]"
                                  }`}
                                  icon={icon}
                                  onClick={onClick}
                                  disabled={disabled}
                                />
                              );
                              return (
                                <li className="mx-2.5" key={key}>
                                  {content ? (
                                    <CFTooltip
                                      content={content}
                                      placement="top"
                                    >
                                      {button}
                                    </CFTooltip>
                                  ) : (
                                    button
                                  )}
                                </li>
                              );
                            }
                          )}
                        </ul>
                      </div>
                    )}
                    {footerOptionText && (
                      <div className="dropdown-list-bottom-note rounded-b">
                        <CFTypography className="whitespace-normal text-primary-900 text-center !mb-0 font-sm">
                          Some actions might be unavailable depending on your
                          privilege.
                        </CFTypography>
                      </div>
                    )}
                  </div>
                )}
                disabled={disabled}
              >
                <CFButton
                  className={`h-6 w-6 !bg-transparent border-0 !p-0 mx-auto ${buttonClass}`}
                  onClick={(e: any) => e.preventDefault()}
                  ref={buttonRef}
                >
                  <CFTooltip content={tooltipcontent} placement="top">
                    <div className="h-full w-full flex rounded-none justify-center items-center">
                      {icon && (
                        <FontAwesomeIcon
                          className={`text-base w-4 h-4 dark:text-white/90  ${iconClass}`}
                          icon={icon}
                        />
                      )}
                      {children}
                    </div>
                  </CFTooltip>
                </CFButton>
              </Dropdown>
            )}
          </ClientOnly>
        }
      </div>
    );
  }
);

const CFDropdownMenuOption = ({ icon, label }: CFDropdownMenuOptionProps) => {
  return (
    <div className="flex items-center dark:text-white !text-primary-900 group/menu-item px-3 py-[5px]">
      {icon && (
        <div className="w-6 text-start">
          <FontAwesomeIcon
            className="dropdown-list-icon !text-primary-900 dark:!text-white"
            icon={icon}
          />
        </div>
      )}
      {label ?? ""}
    </div>
  );
};
