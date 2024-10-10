import _ from "lodash";

// Molecules

import { twMerge } from "tailwind-merge";
import ErrorMessage from "./ErrorMessage";
import FieldLabel from "./Fieldlabel";
import FieldStatus from "./FieldStatus";
import { CFButton } from "./CFButton";
import { CFTooltip, CFTypography } from "~/components/third-party/ant-design";

const ButtonField = (props: any) => {
  const {
    formInputClassName = "",
    cursorInput,
    alignItem,
    required,
    className = "",
    labelClass = "",
    label,
    fieldClassName = "",
    labelPlacement,
    editInline,
    addonBefore,
    rightIcon,
    value,
    children,
    placeholder,
    iconView,
    statusIconClassName = "",
    inputStatusClassName = "",
    spanWidthClass = "",
    disabledFiled,
    placeholderClassName = "",
    inputClassName = "",
    errorMessage,
    onClick,
    informationProps,
    buttonClassName,
    readOnly,
    readOnlyClassName,
    fixStatus,
    ...buttonProps
  } = props;
  const { isEmpty } = _;
  const isPlacementLeft = labelPlacement === "left";
  return (
    <>
      <div
        className={twMerge(
          `form-group-input w-full  ${
            cursorInput ? "cursor-group-input" : ""
          } ${
            isPlacementLeft
              ? "flex items-center sm:flex-row flex-col sm:gap-1.5 gap-0.5"
              : ""
          } ${alignItem} ${formInputClassName}`
        )}
      >
        {!isEmpty(label) && (
          <FieldLabel
            labelClass={twMerge(
              `${
                isPlacementLeft
                  ? "py-[7px] sm:w-[165px] sm:max-w-[165px] dark:text-white/90 w-full "
                  : ""
              } ${labelClass}`
            )}
            required={required}
            informationProps={informationProps}
          >
            {label && label}
          </FieldLabel>
        )}
        {readOnly ? (
          <CFTypography
            className={twMerge(
              `px-1.5 flex cursor-default items-center sm:h-auto h-[34px] sm:w-fit w-full sm:bg-transparent bg-[#F4F5F6] ${readOnlyClassName} ${
                !isEmpty(props?.value)
                  ? "text-primary-900 font-normal dark:text-white/90"
                  : "text-[#bdbdbd] font-light"
              }`
            )}
          >
            {!isEmpty(props?.value)
              ? props.value?.toString()
              : placeholder ?? ""}
          </CFTypography>
        ) : (
          <div
            className={twMerge(
              `overflow-hidden ${
                rightIcon &&
                !isEmpty(value?.toString()) &&
                value?.toString() !== "0"
                  ? "right-button-icon xl:w-fit w-full "
                  : "w-full"
              } ${fieldClassName}`
            )}
          >
            <div className={`flex gap-1 items-center overflow-hidden w-full`}>
              <div
                className={twMerge(
                  `cf-field cf-new-button-field overflow-hidden group/input-button w-full relative ${
                    editInline ? "edit-inline group/edit" : ""
                  } ${inputClassName}`
                )}
              >
                <CFButton
                  className={twMerge(
                    `px-1.5 !border-0 flex items-center justify-start bg-transparent hover:!bg-transparent shadow-none text-left rounded-none w-full focus-within:outline-0 focus-within:shadow-none h-[34px] ${
                      editInline && !disabledFiled
                        ? "hover:!bg-[#f4f5f6] focus-within:!bg-[#f4f5f6]"
                        : ""
                    } ${addonBefore ? "justify-between" : ""} ${
                      !isPlacementLeft
                        ? "!border-b !border-solid !border-[#CED4DA] p-0 hover:bg-transparent"
                        : ""
                    } ${className}`
                  )}
                  onClick={onClick}
                  {...buttonProps}
                >
                  {!isEmpty(value?.toString()) && value?.toString() !== "0" ? (
                    <div
                      className={twMerge(`w-full truncate ${spanWidthClass}`)}
                    >
                      <CFTooltip title={value}>
                        <div className="max-w-fit">
                          <CFTypography
                            className={twMerge(
                              `text-primary-900 dark:text-white/90 !text-sm font-normal truncate block ${buttonClassName}`
                            )}
                          >
                            {value}
                          </CFTypography>
                        </div>
                      </CFTooltip>
                    </div>
                  ) : (
                    <CFTypography
                      className={twMerge(
                        `text-[#bdbdbd] text-sm font-light dark:!text-white/25 dark:font-normal button-placeholder ${placeholderClassName}`
                      )}
                    >
                      {placeholder}
                    </CFTypography>
                  )}
                  {iconView && (
                    <FieldStatus
                      className={`ml-1.5 ${statusIconClassName}`}
                      status={fixStatus}
                    />
                  )}
                  {addonBefore}
                </CFButton>
              </div>
              {rightIcon}
            </div>
            {!!errorMessage && (
              <ErrorMessage errorMessage={errorMessage}></ErrorMessage>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ButtonField;
