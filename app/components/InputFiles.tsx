import { useRef } from "react";
// import { useTranslation } from "~/hook";
import { CFTypography } from "~/components/third-party/ant-design";

interface InputCustProps {
  onNewImageClick?: (value: string) => void;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

const InputFile = ({ onNewImageClick, inputProps }: InputCustProps) => {
  //   const { _t } = useTranslation();
  const fileRef = useRef<HTMLInputElement | null>(null);

  return (
    <div
      className="w-full"
      onClick={() => {
        if (onNewImageClick) {
          onNewImageClick("new");
        } else {
          fileRef?.current?.click();
        }
      }}
    >
      <input
        {...inputProps}
        className="hidden"
        type="file"
        ref={fileRef}
        multiple
      />
      <div className="bg-gray-100/50 dark:bg-dark-600 border-2 border-dashed border-gray-400/70 dark:border-white/20 rounded-md text-primary-900 dark:text-white/90 py-3.5 flex md:flex-row flex-col md:gap-0 gap-1 justify-center items-center cursor-pointer">
        <div className="">
          <img
            src="https://cdn.contractorforeman.net/assets/images/upload-file.svg"
            alt=""
            className=""
          />
        </div>
        <CFTypography
          title="small"
          className="text-sm pl-2.5 text-primary-900 text-center font-semibold"
        >
          {"Click here or Drop files here to Upload"} <br /> {"OR"} <br />{" "}
          <CFTypography title="small" className="font-bold">
            {"Browse Files"}
          </CFTypography>{" "}
          {"On Your Computer"}
        </CFTypography>
      </div>
    </div>
  );
};
export default InputFile;
