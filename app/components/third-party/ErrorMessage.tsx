// Hook

import { CFTypography } from "./ant-design";
// Atoms

const ErrorMessage = (props: any) => {
  return (
    <div className="pt-1">
      <CFTypography className="text-xs text-red-400">
        {props.errorMessage}
      </CFTypography>
    </div>
  );
};

export default ErrorMessage;
