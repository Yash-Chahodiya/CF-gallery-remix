import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type ButtonProps } from "antd";
import { type ButtonType } from "antd/es/button";
import React, { useEffect, useState } from "react";
import { Button } from "./Button";
import { ClientOnly } from "remix-utils/client-only";

export interface CFButtonProps extends Omit<ButtonProps, "icon"> {
  variant?: ButtonType;
  icon?: IconProp;
  readOnly?: boolean;
}

export const CFButton = React.forwardRef<HTMLButtonElement, CFButtonProps>(
  (
    {
      children,
      icon,
      shape = "default",
      className = "",
      variant = "primary",
      readOnly,
      ...props
    },
    ref
  ) => {
    const getButtonColor = () => {
      if (variant === "primary") {
        return "text-white bg-primary-900 border-primary-900 dark:border-dark-400 dark:bg-dark-400";
      } else if (variant === "default") {
        return "text-primary-900 bg-white dark:bg-dark-900 dark:text-white border-[#ccc] dark:border-white/10 hover:bg-blue-gray-50 dark:hover:bg-[#131920] dark:hover:!text-white hover:shadow-primary-500";
      }
    };

    const [buttonProps, setButtonProps] = useState<ButtonProps>({
      type: variant,
      shape: shape,
      className: `py-1.5 px-3 flex items-center text-center capitalize border shadow-none leading-[1.42857143] focus-within:!outline-0 rounded ${getButtonColor()} ${className}`,
    });

    useEffect(() => {
      if (icon) {
        setButtonProps((prev: ButtonProps) => ({
          ...prev,
          icon: <FontAwesomeIcon className="w-[13px] h-[13px]" icon={icon} />,
        }));
      }
    }, [icon]);

    useEffect(() => {
      setButtonProps((prev: ButtonProps) => ({
        ...prev,
        className: `py-1.5 px-3 flex items-center text-center justify-normal capitalize font-normal text-primary-900  border shadow-none leading-[1.42857143] focus-within:!outline-0 focus-visible:!outline-2 rounded ${getButtonColor()} ${className}`,
      }));
    }, [className]);

    return readOnly ? (
      <div className={`!w-fit ${buttonProps?.className}`}>{children}</div>
    ) : (
      <ClientOnly>
        {() => (
          <Button {...props} {...buttonProps} ref={ref}>
            {children}
          </Button>
        )}
      </ClientOnly>
    );
  }
);
