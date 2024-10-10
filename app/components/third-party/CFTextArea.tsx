import { TextAreaProps } from "antd/es/input";

import _ from "lodash";
import React from "react";

import { ClientOnly } from "remix-utils/client-only";
import ErrorMessage from "./ErrorMessage";
import InputLabel from "./Input-lable";
import { Input } from "./Input";

interface TextareaCustProps extends TextAreaProps {
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  label?: string;
  size?: "large" | "middle" | "small";
  className?: string;
  placeholder?: string;
  paddingName?: string;
  labelClass?: string;
  inputAreaClass?: string;
  errorMessage?: string;
  required?: boolean;
  labelPlacement?: string;
}

export const CFTextarea = React.forwardRef<
  HTMLTextAreaElement,
  TextareaCustProps
>(
  (
    {
      onChange,
      label = "",
      size = "middle",
      className = "",
      placeholder = "",
      paddingName = "pt-1.5 px-0",
      labelClass = "",
      inputAreaClass = "",
      labelPlacement = "top",
      errorMessage,
      required = false,
      ...props
    },
    ref
  ) => {
    const { isEmpty } = _;

    return (
      <>
        <div
          className={`form-group-input w-full ${
            labelPlacement === "left"
              ? "flex sm:flex-row flex-col sm:gap-1.5 gap-0.5"
              : ""
          }`}
        >
          <InputLabel
            labelClass={`${
              labelPlacement === "left"
                ? "py-[7px] sm:w-[165px] sm:max-w-[165px] dark:text-white/90 w-full max-w-[100px]"
                : ""
            } ${labelClass}`}
            required={required}
          >
            {label}
          </InputLabel>
          <div
            className={`cf-textarea-field ${
              labelPlacement === "left" ? "w-full" : ""
            } ${className} ${paddingName}`}
          >
            {
              <ClientOnly>
                {() => (
                  <Input.TextArea
                    className={`!pt-0 !pb-3 min-h-[76px] shadow-none hover:bg-transparent focus-within:shadow-none bg-transparent focus-within:bg-transparent rounded-none mt-4 text-primary-900 dark:text-white/90 placeholder-shown:border-primary-200 dark:placeholder-shown:border-white/40 focus:border-transparent placeholder:!text-[#bdbdbd] dark:placeholder:!text-white/25 ${className} ${inputAreaClass}`}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                      if (onChange) {
                        onChange(e);
                      }
                    }}
                    variant="borderless"
                    ref={ref}
                    size={size}
                    placeholder={placeholder}
                    required={required}
                    {...props}
                  />
                )}
              </ClientOnly>
            }
          </div>
        </div>
        {!isEmpty(errorMessage) ? (
          <ErrorMessage message={errorMessage || ""} />
        ) : (
          ""
        )}
      </>
    );
  }
);
