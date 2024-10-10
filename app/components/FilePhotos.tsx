import { faEllipsisVertical } from "@fortawesome/pro-regular-svg-icons/faEllipsisVertical";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import pkg from "lodash";
import { CFTooltip, CFTypography } from "~/components/third-party/ant-design";

import { useState } from "react";
// import { filePhotosOptions } from "../data";
// import { FilePhotoFile, FilePhotosOption } from "../type/define-data-type";
// import FileShareButton from "./file-share-button";
import ViewButton from "./view-button";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { CFCheckBox } from "./third-party/CFCheckBox";

// import { CFDropdown } from "./third-party/CFDropdown";

interface FilePhotosProps {
  file?: Partial<any>;
  selected?: boolean;
  onChange?: (file: Partial<any>, select: boolean) => void;
  hideOptions?: boolean;
  filePhotosOptionsList?: Array<any>;
}

const FilePhotos = ({ file, selected, onChange, hideOptions = false }: any) => {
  const { isEmpty } = pkg;
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  return (
    !isEmpty(file) && (
      <div className="relative group/file-photos">
        <div className="bg-white dark:bg-dark-400 border border-primary-200 dark:border-white/10 rounded">
          <div className="h-28 rounded-tr rounded-tl bg-gray-200 dark:bg-dark-800 overflow-hidden">
            <div className="h-28 flex items-center justify-center">
              <img
                src={file?.image}
                alt=""
                className="w-full h-full object-none m-auto"
              />
            </div>
          </div>
          <div className="p-2">
            <div className="flex items-center">
              <div className={`${file?.iconClassName ?? ""} mr-1.5`}>
                {file?.icon && (
                  <FontAwesomeIcon className="w-4 h-4" icon={file?.icon} />
                )}
              </div>
              <CFTooltip content={file?.name} placement="top">
                <CFTypography
                  title="small"
                  className="text-sm text-primary-900 dark:text-white/90 truncate font-semibold"
                >
                  {file?.name}
                </CFTypography>
              </CFTooltip>
            </div>
            <div className="flex gap-1 items-center justify-between pt-1">
              <div className="flex items-center w-[calc(100%-70px)] overflow-x-auto scroll-auto file-photos-tag pb-0.5">
                {!isEmpty(file?.file_tags) ? (
                  file?.file_tags?.map((tag: Partial<any>, key: number) => (
                    <CFTypography
                      title="small"
                      key={key}
                      className="py-0.5 px-1.5 bg-[#DEEAF7] dark:bg-dark-600 whitespace-nowrap rounded-sm text-primary-900 dark:text-white font-bold text-[10px] mr-1 last:mr-0"
                    >
                      {tag?.name}
                    </CFTypography>
                  ))
                ) : (
                  <></>
                )}
              </div>
              <div className="text-[11px] text-primary-600 dark:text-white/90 whitespace-nowrap font-semibold pb-1">
                <CFTypography title="small">{file?.date}</CFTypography>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`absolute w-full h-28 flex top-0 p-2 ease-in ${
            selected || menuOpen
              ? "opacity-100 visible z-auto before:scale-100"
              : "sm:opacity-0 sm:-z-10 sm:invisible before:scale-75 group-hover/file-photos:opacity-100 group-hover/file-photos:!visible group-hover/file-photos:z-auto group-hover/file-photos:before:scale-100"
          } delay-100 sm:before:absolute sm:before:w-full sm:before:h-full sm:before:top-0 sm:before:left-0 sm:before:bg-black/50 sm:before:rounded-tr sm:before:rounded-tl sm:before:ease-in sm:before:duration-300 sm:before:border-transparent sm:before:border cursor-pointer`}
          onClick={(e: any) => {
            console.log("checked");
            e.stopPropagation();
            onChange?.(file, !selected);
          }}
        >
          <div className="flex items-center justify-between w-full h-6">
            <div
              className={
                !selected && !menuOpen
                  ? "group-hover/file-photos:block sm:hidden"
                  : ""
              }
            >
              <CFCheckBox
                className="gap-1.5"
                checked={selected}
                onChange={(e: CheckboxChangeEvent) => {
                  onChange?.(file, e.target.checked);
                }}
              />
            </div>

            {!hideOptions && (
              <div
                className={`items-center sm:hidden group-hover/file-photos:flex ${
                  menuOpen ? "!flex" : ""
                }`}
              >
                {/* <FileShareButton file={file} /> */}
                {/* <CFDropdown
                  contentClassName="w-[150px]"
                  iconClass="text-white"
                  icon={faEllipsisVertical}
                  options={filePhotosOptionsList}
                  footerOptionText={false}
                  onOpenChange={(open: boolean) => setMenuOpen(open)}
                /> */}
              </div>
            )}
          </div>
          <div className="absolute top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 group-hover/file-photos:block sm:hidden">
            <ViewButton isImage={file?.is_image} filePath={file?.file_path} />
          </div>
        </div>
      </div>
    )
  );
};

export default FilePhotos;
// export { default as ViewButton } from "./view-button";
// export { default as FileShareButton } from "./file-share-button";
