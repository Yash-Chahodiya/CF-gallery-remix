import { InputProps } from "antd/es/input";
import _ from "lodash";

import React from "react";
import { InputFocusOptions } from "antd/es/input/Input";

import { ClientOnly } from "remix-utils/client-only";
import { Input } from "./Input";
import { CFTypography } from "~/components/third-party/ant-design";
import InputLabel from "./Input-lable";
import ErrorMessage from "./ErrorMessage";

interface InputRef {
  focus: (options?: InputFocusOptions) => void;
  blur: () => void;
  setSelectionRange: (
    start: number,
    end: number,
    direction?: "forward" | "backward" | "none"
  ) => void;
  select: () => void;
  input: HTMLInputElement | null;
}

export interface CFInputProps extends InputProps {
  labelClass?: string;
  paddingName?: string;
  beforeClass?: string;
  errorMessage?: string;
  className?: string;
  label?: string;
  placeholder?: string;
  size?: "large" | "middle" | "small";
  borderedApply?: boolean;
  required?: boolean;
  formInputClassName?: string;
  alignItem?: string;
  cursorInput?: boolean;
  labelSeparator?: boolean;
  leftIcon?: boolean;
  maxLength?: number;
  labelPlacement?: "top" | "left";
  inputType?:
    | "button"
    | "checkbox"
    | "color"
    | "date"
    | "datetime-local"
    | "email"
    | "file"
    | "hidden"
    | "image"
    | "month"
    | "number"
    | "password"
    | "radio"
    | "range"
    | "reset"
    | "search"
    | "submit"
    | "tel"
    | "text"
    | "time"
    | "url"
    | "week"
    | string;
}

export const CFInput = React.forwardRef<HTMLInputElement, CFInputProps>(
  (
    {
      label = "",
      size = "middle",
      className = "",
      placeholder = "",
      paddingName = "py-1.5 px-0",
      beforeClass = "",
      labelClass = "",
      errorMessage,
      borderedApply = true,
      required = false,
      variant = "borderless",
      alignItem = "",
      labelSeparator = false,
      cursorInput = false,
      leftIcon = false,
      labelPlacement = "top",
      formInputClassName = "",
      inputType = "text",
      ...props
    },
    ref
  ) => {
    const { isEmpty } = _;

    return (
      <>
        <div
          className={`form-group-input w-full ${formInputClassName} ${
            cursorInput ? "cursor-group-input" : ""
          } ${
            labelPlacement === "left"
              ? "flex sm:flex-row flex-col sm:gap-1.5 gap-0.5"
              : ""
          } ${alignItem}`}
        >
          {!isEmpty(label) ? (
            <InputLabel
              labelClass={`${
                labelPlacement === "left"
                  ? "py-[7px] sm:w-[165px] sm:max-w-[165px] dark:text-white/90 w-full max-w-[100px]"
                  : ""
              } ${labelClass}`}
              required={required}
            >
              {label}
              {labelSeparator ? (
                <CFTypography
                  title="small"
                  className="ant-input-label dark:text-white/90"
                >
                  :
                </CFTypography>
              ) : (
                <></>
              )}
            </InputLabel>
          ) : (
            <></>
          )}

          <div
            className={`cf-input-field ${
              borderedApply ? "apply-border" : ""
            } ${beforeClass} ${labelPlacement === "left" ? "w-full" : ""} ${
              leftIcon && "inputleft-icon-suffix"
            }`}
          >
            {
              <ClientOnly>
                {() => (
                  <Input
                    size={size}
                    type={inputType}
                    variant={variant}
                    placeholder={placeholder}
                    className={`text-sm text-primary-900 rounded-none shadow-none hover:bg-transparent focus-within:shadow-none bg-transparent focus-within:bg-transparent placeholder:!text-[#bdbdbd] dark:placeholder:!text-white/25 font-normal dark:text-white/90 ${paddingName} ${className} `}
                    ref={ref as unknown as React.MutableRefObject<InputRef>}
                    required
                    {...props}
                  />
                )}
              </ClientOnly>
            }
          </div>
        </div>
        {!isEmpty(errorMessage) && (
          <ErrorMessage message={errorMessage || ""} />
        )}
      </>
    );
  }
);
