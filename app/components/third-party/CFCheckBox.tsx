import { CheckboxProps } from "antd";
import React, { useEffect, useState } from "react";

import { ClientOnly } from "remix-utils/client-only";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinnerThird } from "@fortawesome/pro-duotone-svg-icons/faSpinnerThird";
import { Checkbox } from "./Checkbox";
import { Spin } from "./Spin";

export interface CFCheckBoxProps extends CheckboxProps {
  label?: string;
  iconView?: boolean;
  status?: "" | "loading";
  setStatus?: (status: "" | "loading") => void;
  description?: React.ReactNode | React.ReactNode[];
}

interface CheckboxRef {
  focus: () => void;
  blur: () => void;
  input: HTMLInputElement | null;
}

export const CFCheckBox = React.forwardRef<HTMLInputElement, CFCheckBoxProps>(
  (
    {
      label = "",
      className = "",
      iconView = false,
      status = "",
      setStatus,
      description,
      ...props
    },
    ref
  ) => {
    const [inputStatus, setInputStatus] = useState<"" | "loading">("");

    const changeStatus = (status: "" | "loading") => {
      if (typeof setStatus === "undefined") {
        setInputStatus(status);
      } else {
        setStatus(status);
      }
    };

    useEffect(() => {
      setInputStatus(status);
    }, [status]);

    useEffect(() => {
      if (inputStatus === "loading" && typeof setStatus === "undefined") {
        setTimeout(() => {
          changeStatus("");
        }, 1000);
      }
    }, [inputStatus]);

    const antIcon: React.ReactNode = (
      <FontAwesomeIcon
        className="!h-[18px] !w-[18px] fa-spin field-loader dark:text-white/90"
        icon={faSpinnerThird}
      />
    );
    return (
      <ClientOnly>
        {() => (
          <Checkbox
            className={`w-fit relative ${className}`}
            ref={ref as unknown as React.MutableRefObject<CheckboxRef>}
            {...props}
          >
            {description}
            {iconView && inputStatus === "loading" && (
              <div
                className={`absolute w-[18px] h-[18px] left-0 top-0.5 bg-white group-hover/textarea:opacity-100 group-focus/textarea:opacity-100 group-focus-within/textarea:opacity-100`}
              >
                <ClientOnly>
                  {() => <Spin className="!align-top" indicator={antIcon} />}
                </ClientOnly>
              </div>
            )}
          </Checkbox>
        )}
      </ClientOnly>
    );
  }
);
