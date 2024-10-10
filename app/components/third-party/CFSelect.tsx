import { DefaultOptionType, SelectProps } from "antd/es/select";
import _ from "lodash";
import React, { useEffect, useMemo, useRef, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinnerThird } from "@fortawesome/pro-duotone-svg-icons/faSpinnerThird";

import { SpinIndicator } from "antd/es/spin";

import { ClientOnly } from "remix-utils/client-only";

import { CFTooltip, CFTypography } from "~/components/third-party/ant-design";
import { Spin } from "./Spin";
import InputLabel from "./Input-lable";
import ErrorMessage from "./ErrorMessage";
import { Select, BaseSelectRef } from "./Select";
import { Tag } from "./Tag";
import AnimateCheckmark from "./AnimateCheckmark";
import AnimateError from "./AnimateCheckMarkError";

interface TagRenderProps {
  label: React.ReactNode | React.ReactNode[];
  value: string;
  closable?: boolean | undefined;
  onClose?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

export interface SelectCustProps extends Omit<SelectProps, "status"> {
  labelClass?: string;
  paddingName?: string;
  formInputClassName?: string;
  addIconStatusPosition?: string;
  addIconSelectFiled?: string;
  errorMessage?: string;
  className?: string;
  selectEditInlineClass?: string;
  label?: string;
  placeholder?: string;
  placement?: "bottomLeft" | "bottomRight" | "topLeft" | "topRight";
  size?: "large" | "middle" | "small";
  required?: boolean;
  multiple?: boolean;
  editInline?: boolean;
  beforeRemove?: boolean;
  applyBorder?: boolean;
  addTagFiled?: boolean;
  name?: string;
  selectAll?: boolean;
  readOnly?: boolean;
  labelPlacement?: "top" | "left";
  onInputKeyDown?: (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  iconView?: boolean;
  iconsEditOnly?: boolean;
  setOpen?: boolean;
  addonBefore?: React.ReactNode | React.ReactNode[];
  readOnlyClassName?: string;
  maxWidthClass?: string;
  onBlur?: React.FocusEventHandler<HTMLElement>;
  message?: {
    text?: string;
    icon?: any;
  };
  informationProps?: any;
  status?: any;
  setStatus?: (status: any) => void;
}

export const CFSelect = React.forwardRef<HTMLSelectElement, SelectCustProps>(
  (
    {
      label = "",
      size = "middle",
      className = "",
      placeholder = "",
      paddingName = "py-1.5 !px-0",
      labelClass = "",
      errorMessage,
      required = false,
      multiple = false,
      iconsEditOnly = false,
      // disabled,
      iconView = false,
      placement = "bottomLeft",
      editInline = false,
      beforeRemove = false,
      applyBorder = false,
      addTagFiled = false,
      addonBefore,
      name = "select",
      options = [],
      selectAll = false,
      onChange = () => {},
      onBlur = (e: React.FocusEvent<HTMLElement, Element>) => {},
      onInputKeyDown = () => {},
      value,
      labelPlacement = "top",
      formInputClassName = "",
      selectEditInlineClass = "",
      addIconStatusPosition = "",
      addIconSelectFiled = "",
      maxWidthClass = "",
      allowClear = false,
      setOpen = false,
      readOnly = false,
      readOnlyClassName = "text-sm",
      message,
      status = "button",
      setStatus,
      onFocus,
      informationProps,
      ...props
    },
    ref
  ) => {
    const { isArray, isEmpty } = _;
    const [inputStatus, setInputStatus] = useState<any>("button");
    const [isOnFocus, setIsOnFocus] = useState<boolean>(false);
    const [hoverFiled, setHoverFiled] = useState<boolean>(false);
    const selectRef = useRef<HTMLSelectElement | null>(null);
    const [selectedOptions, setSelectedOptions] = useState<
      Array<string> | string
    >();
    const optionsWithSelectAll = selectAll
      ? [{ label: "Select All", value: "select_all" }, ...options]
      : options;
    const antIcon: SpinIndicator = (
      <FontAwesomeIcon
        className="h-5 w-5 fa-spin field-loader dark:text-white/90"
        icon={faSpinnerThird}
      />
    );

    const getSelectedOptions = () => {
      let tempValues = value;
      if (typeof tempValues === "string") {
        tempValues = isEmpty(tempValues) ? undefined : tempValues;
      } else if (
        Array.isArray(tempValues) &&
        selectAll &&
        options?.length !== 0 &&
        options?.length === tempValues?.length
      ) {
        tempValues = ["select_all", ...tempValues];
      }
      return tempValues;
    };

    const changeStatus = (status: any) => {
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
          changeStatus("success");
        }, 1000);
      } else if (inputStatus === "success") {
        setTimeout(() => {
          changeStatus("button");
        }, 2000);
      } else {
        changeStatus(inputStatus);
      }
    }, [inputStatus]);

    useEffect(() => {
      if (!isOnFocus && inputStatus === "error") {
        setTimeout(() => {
          changeStatus("button");
        }, 2000);
        setSelectedOptions(getSelectedOptions());
      }
    }, [inputStatus, isOnFocus, value]);

    const onChangeCust = (
      value: string | string[],
      selectedOption: DefaultOptionType | DefaultOptionType[]
    ) => {
      if (Array.isArray(selectedOptions)) {
        if (
          selectedOptions.includes("select_all") &&
          isArray(value) &&
          value?.filter((val: string) => val !== "select_all").length <=
            selectedOptions.filter((val: string) => val !== "select_all").length
        ) {
          value = value?.filter((val: string) => val !== "select_all");
        } else {
          if (selectAll) {
            value = optionsWithSelectAll
              .map((option): string =>
                typeof option?.value === "string" ? option?.value : ""
              )
              .filter((option) => !isEmpty(option));
          }
        }
      } else if (
        value?.length ===
        optionsWithSelectAll.filter((option) => option.value !== "select_all")
          .length
      ) {
        if (selectedOptions?.includes("select_all")) {
          value = [];
        } else {
          value = ["select_all", ...value];
        }
      }

      setSelectedOptions(value);
      onChange(
        multiple && isArray(value)
          ? value?.filter((val: string) => val !== "select_all")
          : value,
        selectedOption
      );
      changeStatus("loading");
    };
    const filterOption = (input: string, option?: DefaultOptionType) => {
      const optionLabel = option?.label as string;
      return optionLabel?.toLowerCase()?.includes(input.toLowerCase());
    };

    const [selectAntdProps, setSelectAntdProps] = useState<SelectProps>({
      showSearch: true,
      size: size,
      placeholder: placeholder,
      placement: placement,
      className: `text-sm w-full text-primary-900 h-[34px] common-arrow rounded-none placeholder:!text-[#BDBDBD] dark:placeholder:!text-white/25 font-normal ${
        applyBorder
          ? "!border !rounded border-solid !border-[#CED4DA] hover:!border-solid focus-within:border-solid hover:!bg-transparent focus-within:!bg-transparent select-apply-border"
          : "border-0"
      } ${
        editInline
          ? ` !p-0 hover:bg-[#F4F5F6] dark:hover:bg-dark-900 dark:focus-within:bg-dark-900 focus-within:bg-[#F4F5F6] ${selectEditInlineClass}`
          : "border-b border-solid border-[#CED4DA] !py-0 dark:text-white"
      } ${paddingName} ${className} `,
      filterOption,
      variant: "borderless",
    });

    useEffect(() => {
      if (multiple) {
        setSelectAntdProps((prev: SelectProps) => ({
          ...prev,
          mode: "multiple",
          maxTagCount: "responsive",
        }));
      }
    }, [multiple]);

    useEffect(() => {
      setSelectAntdProps((prev: SelectProps) => ({
        ...prev,
        onChange: onChangeCust,
      }));
    }, [selectedOptions, multiple]);

    useEffect(() => {
      if (selectAll) {
        setSelectAntdProps((prev: SelectProps) => ({
          ...prev,
          tagRender: TagRender,
        }));
      }
    }, [selectAll]);

    useEffect(() => {
      setSelectedOptions(getSelectedOptions());
    }, [value, options]);

    useEffect(() => {
      function handleClickOutside(event: Event): void {
        const current = selectRef.current;
        if (current && !current.contains(event.target as Node)) {
          changeStatus(iconsEditOnly ? "button" : "loading");
          setIsOnFocus(false);
        }
      }
      if (inputStatus === "edit") {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }
    }, [selectRef, inputStatus]);

    useEffect(() => {
      if (ref && "current" in ref) {
        ref.current = selectRef.current; // Store the ref value in the useRef
      }
    }, [ref, selectRef.current]);

    const getValue = () => {
      if (isArray(value)) {
        return optionsWithSelectAll
          ?.filter(
            (option) =>
              value?.includes(option?.value) && option?.value !== "select_all"
          )
          ?.map((option) => <div>{option?.label}</div>);
      }
      return (
        optionsWithSelectAll?.find((option) => option?.value === value)
          ?.label ?? ""
      );
    };
    const textValue = getValue();

    return (
      <>
        <div
          className={`form-group-input ${formInputClassName} ${
            labelPlacement === "left"
              ? "flex sm:flex-row flex-col sm:gap-1.5 gap-0.5"
              : ""
          }`}
        >
          {!isEmpty(label) ? (
            <InputLabel
              labelClass={`${
                labelPlacement === "left"
                  ? "py-[7px] sm:w-[165px] sm:max-w-[165px] w-full"
                  : ""
              } ${labelClass}`}
              required={required}
              informationProps={informationProps}
            >
              {label}
            </InputLabel>
          ) : (
            <></>
          )}
          {readOnly ? (
            <CFTypography
              title="small"
              className={`px-1.5 cursor-no-drop flex items-center sm:h-auto h-[34px] sm:bg-transparent bg-[#F4F5F6] ${readOnlyClassName} ${
                !isEmpty(textValue)
                  ? "text-primary-900 font-normal dark:text-white/90"
                  : "text-[#bdbdbd] font-light"
              }`}
            >
              {!isEmpty(textValue) ? textValue : placeholder ?? ""}
            </CFTypography>
          ) : (
            <div
              className={`${maxWidthClass} ${!addonBefore && "w-full"} ${
                hoverFiled ? "w-full" : ""
              } field-select-inline-block`}
            >
              <div
                className={`ease-in-out duration-300 relative max-sm:w-full field-select-inline-inner ${
                  addonBefore ? "addon-before-class" : "w-full"
                } `}
              >
                <div
                  className={`cf-select-field dark:text-white/90 ${
                    addTagFiled ? "multiselect-tags" : ""
                  } ${editInline ? "inline-edit" : ""} ${
                    labelPlacement === "left" ? "w-full" : ""
                  } ${
                    (iconView && inputStatus === "loading") ||
                    (iconView && inputStatus === "success")
                      ? "inline-loading-success"
                      : ""
                  } ${
                    beforeRemove ? "before:hidden custom-select-dropdown" : ""
                  } ${hoverFiled ? "w-full" : ""}`}
                  onMouseOver={() => {
                    setHoverFiled(true);
                  }}
                  onMouseOut={() => {
                    setHoverFiled(false);
                  }}
                >
                  {
                    <ClientOnly>
                      {() => (
                        <Select
                          ref={
                            selectRef as React.MutableRefObject<BaseSelectRef>
                          }
                          {...selectAntdProps}
                          {...props}
                          onInputKeyDown={(
                            e: React.KeyboardEvent<
                              HTMLInputElement | HTMLTextAreaElement
                            >
                          ) => {
                            if (e.key === "Enter") {
                              e.stopPropagation();
                              onInputKeyDown(e);
                            }
                          }}
                          dropdownRender={
                            !isEmpty(message)
                              ? (menu) => (
                                  <>
                                    <CFTypography
                                      title="small"
                                      className="pl-3 pt-1 pr-0.5 pb-2 text-primary-900 dark:text-white font-normal border-b border-solid border-[#f1f1f1] flex items-center gap-1 text-xs"
                                    >
                                      {message?.icon && (
                                        <FontAwesomeIcon
                                          className="w-3 h-3 text-primary-900 dark:text-white/90"
                                          icon={message?.icon}
                                        />
                                      )}
                                      {message?.text && message?.text}
                                    </CFTypography>
                                    {menu}
                                  </>
                                )
                              : undefined
                          }
                          onDropdownVisibleChange={(open) => {
                            if (!open) {
                              setIsOnFocus(false);
                            }
                          }}
                          maxTagPlaceholder={(omittedValues) => (
                            <CFTooltip
                              content={omittedValues
                                .map(({ label }) => label)
                                .join(", ")}
                              placement="top"
                            >
                              <span>+ {omittedValues?.length}..</span>
                            </CFTooltip>
                          )}
                          options={optionsWithSelectAll ?? []}
                          onBlur={(e) => {
                            onBlur?.(e);
                            setIsOnFocus(false);
                          }}
                          onFocus={(e) => {
                            onFocus?.(e);
                            setIsOnFocus(true);
                          }}
                          allowClear={allowClear}
                          value={
                            isArray(selectedOptions) && !selectAll
                              ? selectedOptions?.filter(
                                  (value: string) => value !== "select_all"
                                )
                              : selectedOptions
                          }
                        />
                      )}
                    </ClientOnly>
                  }
                  {!isEmpty(optionsWithSelectAll) ? (
                    <select
                      className="hover:bg-[#F4F5F6] dark:hover:bg-dark-900 dark:focus-within:bg-dark-900 focus-within:bg-[#F4F5F6]"
                      name={name}
                      hidden
                      required={required}
                      multiple={multiple}
                      value={
                        multiple
                          ? selectedOptions
                          : isArray(selectedOptions)
                          ? selectedOptions || ""
                          : ""
                      }
                      onChange={() => {}}
                    >
                      {optionsWithSelectAll?.map(
                        (option: DefaultOptionType, key: number) => (
                          <option
                            key={key}
                            value={
                              option?.value as
                                | string
                                | number
                                | readonly string[]
                                | undefined
                            }
                          >
                            {option?.label}
                          </option>
                        )
                      )}
                    </select>
                  ) : (
                    <></>
                  )}
                  {iconView ? (
                    <div
                      className={`absolute ${
                        inputStatus === "loading" ||
                        inputStatus === "success" ||
                        inputStatus === "error"
                          ? "opacity-100 group-hover/textarea:opacity-100 group-focus/textarea:opacity-100 group-focus-within/textarea:opacity-100"
                          : "opacity-0"
                      } top-1.5 right-2 group-hover/textarea:opacity-100 group-focus/textarea:opacity-100 group-focus-within/textarea:opacity-100`}
                    >
                      {inputStatus === "loading" && !iconsEditOnly ? (
                        <ClientOnly>
                          {() => <Spin indicator={antIcon} />}
                        </ClientOnly>
                      ) : inputStatus === "success" && !iconsEditOnly ? (
                        <div className="w-5 h-5">
                          <AnimateCheckmark color="#5baa46" />
                        </div>
                      ) : inputStatus === "error" && !iconsEditOnly ? (
                        errorMessage ? (
                          <CFTooltip content={errorMessage} placement="top">
                            <div className="w-5 h-5">
                              <AnimateError color="#ef4444" />
                            </div>
                          </CFTooltip>
                        ) : (
                          <div className="w-5 h-5">
                            <AnimateError color="#ef4444" />
                          </div>
                        )
                      ) : (
                        <></>
                      )}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                {addonBefore ? addonBefore : <></>}
              </div>
              {!isEmpty(errorMessage) && !(iconView && !iconsEditOnly) && (
                <ErrorMessage message={errorMessage || ""} />
              )}
            </div>
          )}
        </div>
      </>
    );
  }
);

const TagRender = ({ label, value, closable, onClose }: TagRenderProps) => {
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <ClientOnly>
      {() => (
        <Tag
          onMouseDown={onPreventMouseDown}
          closable={closable}
          onClose={onClose}
          style={{ display: value === "select_all" ? "none" : undefined }}
        >
          {label}
        </Tag>
      )}
    </ClientOnly>
  );
};
