import { faLinkSimple } from "@fortawesome/pro-regular-svg-icons/faLinkSimple";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CFInput } from "./third-party/CFInput";

interface FileUploadByUrlProps {
  onAttech: (value: Partial<any>[]) => void;
}
const FileUploadByUrl = ({ onAttech }: FileUploadByUrlProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const target = e.target as HTMLInputElement;
      onAttech([
        {
          file_path: target.value,
        },
      ]);
    }
  };

  return (
    <div className="p-5">
      <div className="relative">
        <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-14 text-gray-400 z-10 border-r border-dashed border-gray-400/70 dark:border-white/10">
          <FontAwesomeIcon
            className="w-5 h-5 text-primary-900 dark:text-white/90"
            icon={faLinkSimple}
          />
        </div>
        <CFInput
          type={"text"}
          className={`text-sm url-inpul-filed !border !border-dashed border-gray-400/70 focus-within:!bg-white bg-gray-100/50 border-1  dark:border-white/10 rounded-md placeholder:!text-primary-500 dark:placeholder:!text-white/40 !font-LexendDeca placeholder-gray-500 pl-16 pr-4 w-full !py-3 focus:outline-0 focus:border-solid dark:text-white/90 dark:bg-dark-600 dark:focus:bg-dark-900 dark:hover:bg-dark-900 dark:focus-within:!bg-dark-900`}
          labelClass="hidden"
          size="middle"
          beforeClass="before:hidden"
          placeholder={"Upload file via url"}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
};

export default FileUploadByUrl;
