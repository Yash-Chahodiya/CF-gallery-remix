import { faCircleXmark } from "@fortawesome/pro-regular-svg-icons/faCircleXmark";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import pkg from "lodash";
import {
  CFIconButton,
  CFProgress,
  CFTooltip,
  CFTypography,
} from "~/components/third-party/ant-design";
import { formatBytes } from "~/helpers/formatbytes";
// import { NewFileObj } from "~/components/page/common/type/deine-data";

interface UploadFileProps {
  file: any;
  setFiles: React.Dispatch<React.SetStateAction<any[]>>;
}

function UploadFile({ file, setFiles }: UploadFileProps) {
  const { isArray, isEmpty } = pkg;
  const onRemoveFileClick = () => {
    setFiles((prev: any[]) =>
      prev?.filter((prevValue: any) => prevValue?.id !== file?.id)
    );
  };
  return (
    <>
      <div className="group/upload-file new-file-upload-inner first:before:hidden relative px-4 before:absolute before:-top-[5px] before:left-0 before:h-px before:bg-gray-200/50 before:w-full hover:before:opacity-0">
        <div className="flex items-center justify-between py-3 px-4 rounded-md group-hover/upload-file:shadow-[0px_4px_15px] group-hover/upload-file:shadow-black/10">
          <div className="flex items-center gap-4 w-[calc(100%-40px)]">
            <div className="w-[39px] h-[49px] bg-gray-100 flex items-center justify-center overflow-hidden">
              <img
                src={file?.image?.split("?")?.shift()}
                alt=""
                className="m-auto"
              />
            </div>
            <div className="flex flex-col gap-1.5 w-[calc(100%-40px)]">
              <CFTypography
                title="h5"
                className="!text-sm !mb-0 !text-primary-900 dark:text-white/90 font-normal"
              >
                {file?.name && decodeURIComponent(file?.name)}
              </CFTypography>
              <div>
                {!isEmpty(file?.error) ? (
                  <CFTypography
                    title="small"
                    className="text-sm leading-4 text-red-900"
                  >
                    {file?.error}
                  </CFTypography>
                ) : file?.isUploaded === 1 && file?.progress === 100 ? (
                  <CFTypography
                    title="small"
                    className="text-sm text-primary-900 leading-4"
                  >
                    {formatBytes(
                      file?.size
                        ? typeof file?.size === "string"
                          ? Number(file?.size)
                          : file?.size
                        : 0
                    )}
                  </CFTypography>
                ) : (
                  <div className="pt-0.5">
                    <CFProgress percent={file?.progress} />
                  </div>
                )}
              </div>
            </div>
          </div>
          {(file?.isUploaded === 1 && file?.progress === 100) ||
          !isEmpty(file?.error) ? (
            <CFTooltip content={"Cancel File"} placement="top">
              <CFIconButton
                shape="round"
                htmlType="button"
                className={`w-[18px] !p-0 max-w-[18px] max-h-[18px] xl:opacity-0 hover:!shadow-none xl:group-hover/upload-file:opacity-100`}
                variant="text"
                onClick={onRemoveFileClick}
              >
                <FontAwesomeIcon
                  className={`text-base w-[18px] h-[18px] text-red-500`}
                  icon={faCircleXmark}
                />
              </CFIconButton>
            </CFTooltip>
          ) : (
            <> </>
          )}
        </div>
      </div>
    </>
  );
}

export default UploadFile;
