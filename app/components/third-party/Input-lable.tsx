import { faCircleQuestion } from "@fortawesome/pro-solid-svg-icons/faCircleQuestion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CFTooltip, CFTypography } from "~/components/third-party/ant-design";

interface InputLabelProps
  extends Partial<Omit<HTMLLabelElement, "className" | "children">> {
  labelClass?: string;
  required?: boolean;
  children?: React.ReactNode | React.ReactNode[];
  informationProps?: any;
}
const InputLabel = ({
  labelClass,
  required,
  children,
  informationProps,
  htmlFor,
}: InputLabelProps) => {
  return (
    <label
      className={`ant-input-label dark:text-white/90 ${labelClass}`}
      htmlFor={htmlFor}
    >
      {children}
      {required && (
        <CFTypography title="small" className="inline-block ml-0.5 leading-4">
          *
        </CFTypography>
      )}
      {informationProps && Object.keys(informationProps)?.length > 0 && (
        <CFTooltip content={informationProps?.message}>
          <FontAwesomeIcon
            className="w-3.5 h-3.5 ml-1 text-primary-900 dark:text-white/90 "
            icon={informationProps?.icon ?? faCircleQuestion}
          />
        </CFTooltip>
      )}
    </label>
  );
};
export default InputLabel;
