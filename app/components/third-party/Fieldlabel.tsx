// FontAwesome
import { faCircleQuestion } from "@fortawesome/pro-solid-svg-icons/faCircleQuestion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { twMerge } from "tailwind-merge";
// Atoms

import { CFTypography } from "~/components/third-party/ant-design";
import { CFTooltip } from "~/components/third-party/ant-design";

const FieldLabel = ({ children, ...props }: any) => {
  const { labelClass, required, informationProps, ...labelProps } = props;
  return (
    <label
      {...labelProps}
      className={`ant-input-label dark:text-white/90 ${labelClass}`}
    >
      {children}
      {required && (
        <CFTypography title="small" className="inline-block ml-0.5 leading-4">
          *
        </CFTypography>
      )}
      {informationProps && Object.keys(informationProps)?.length > 0 && (
        <CFTooltip title={informationProps?.message}>
          <FontAwesomeIcon
            className={twMerge(
              `w-3.5 h-3.5 ml-1 text-primary-900/50 hover:text-primary-900 dark:text-white/90 ${informationProps?.className}`
            )}
            icon={informationProps?.icon ?? faCircleQuestion}
          />
        </CFTooltip>
      )}
    </label>
  );
};

export default FieldLabel;
