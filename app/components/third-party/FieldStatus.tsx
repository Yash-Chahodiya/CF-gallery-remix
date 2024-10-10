import { twMerge } from "tailwind-merge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/pro-regular-svg-icons/faFloppyDisk";
import { faPencil } from "@fortawesome/pro-regular-svg-icons/faPencil";
import { faSpinnerThird } from "@fortawesome/pro-duotone-svg-icons/faSpinnerThird";
import { Spin } from "./Spin";
import { CFTooltip } from "./ant-design";

const FieldStatus = ({
  status,
  className,
  iconProps,
  ErrorMessageText,
}: any) => {
  return (
    <div
      className={twMerge(
        `opacity-0 group-hover/edit:opacity-100 group-focus/edit:opacity-100 group-focus-within/edit:opacity-100 ${
          status === "loading" ||
          status === "success" ||
          status === "edit" ||
          status === "error"
            ? "opacity-100 group-hover/textarea:opacity-100 group-focus/textarea:opacity-100 group-focus-within/textarea:opacity-100"
            : "opacity-0"
        } ${className}`
      )}
    >
      {status === "edit" ? (
        <div
          className={twMerge(
            `flex items-center justify-center w-5 h-5 ${iconProps?.className}`
          )}
        >
          <FontAwesomeIcon
            className={`w-3.5 h-3.5 text-primary-900 dark:text-white/90 cursor-pointer ${iconProps?.iconClassName}`}
            icon={faPencil}
          />
        </div>
      ) : status === "save" ? (
        <div
          className={twMerge(
            `flex items-center justify-center w-5 h-5 ${iconProps?.className}`
          )}
        >
          <FontAwesomeIcon
            className={`w-3.5 h-3.5 text-primary-900 dark:text-white/90 cursor-pointer ${iconProps?.iconClassName}`}
            icon={faFloppyDisk}
          />
        </div>
      ) : status === "loading" ? (
        <Spin
          indicator={
            <FontAwesomeIcon
              className={twMerge(
                `fa-spin text-primary-900 field-loader dark:text-white/90 w-5 h-5 ${iconProps?.className} ${iconProps?.iconClassName}`
              )}
              icon={faSpinnerThird}
            />
          }
        />
      ) : status === "success" ? (
        <div className={twMerge(`w-5 h-5 ${iconProps?.className}`)}></div>
      ) : status === "error" ? (
        <CFTooltip title={ErrorMessageText}>
          <div className={twMerge(`w-5 h-5 ${iconProps?.className}`)}></div>
        </CFTooltip>
      ) : (
        <></>
      )}
    </div>
  );
};

export default FieldStatus;
