import { faPlus } from "@fortawesome/pro-regular-svg-icons/faPlus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { CFTooltip } from "~/components/third-party/ant-design";
import FileSelectSide from "./FileSelectSide";
import { CFGallery } from "./CFGallary";
import UploadedFile from "./UploadedFile";

interface FileAttachmentsProps {
  files?: Array<any>;
  isDeleteAttach?: boolean;
  setFiles?: (files: Array<any>) => void;
  options?: Array<any>;
  deleteFile?: (file: any) => void;
  readOnly?: boolean;
  onAddMarkUp: (data: Partial<any>, onNewDataLoad?: () => void) => void;
  galleryFilterTab?: any[];
  moduleKey?: string;
}

const FileAttachments = ({
  files,
  setFiles,
  deleteFile,
  onAddMarkUp,
  isDeleteAttach,
  readOnly,
  options = ["new", "gallery", "google", "drive", "dropbox", "url"],
  galleryFilterTab,
  moduleKey,
}: FileAttachmentsProps) => {
  const [fileSelect, setFileSelect] = useState<any | "">("");

  return (
    <>
      <FileSelectSide
        setFileSelect={setFileSelect}
        fileSelect={fileSelect}
        options={options}
        onSelected={(values: (any | Partial<any>)[]) => {
          setFiles && setFiles(values as Array<any>);
        }}
        filterSelectedItems={(items: any[]) => {
          const imageIds = files?.map((item: any) => item?.name);
          return items?.filter(
            (item: any) => !imageIds?.includes(item?.file_name)
          );
        }}
        galleryFilterTab={galleryFilterTab}
      />

      <CFGallery
        zoom={true}
        animateThumb={false}
        zoomFromOrigin={false}
        allowMediaOverlap={true}
        toggleThumb={true}
        backdropDuration={150}
        showZoomInOutIcons={true}
        actualSize={false}
        mode="lg-slide"
        alignThumbnails="left"
        className="flex gap-[15px] flex-wrap"
        mousewheel={true}
      >
        {!readOnly && (
          <CFTooltip content={"Add Attachments"} placement="top">
            <div
              className="w-24 min-w-[96px] h-24 relative rounded-xl overflow-hidden bg-gray-200 dark:bg-dark-400"
              onClick={() => setFileSelect("new")}
            >
              <div className="cursor-pointer top-0 w-full h-full flex items-center justify-center ">
                <FontAwesomeIcon
                  className="w-7 h-7 text-gray-500 dark:text-white/90"
                  icon={faPlus}
                />
              </div>
            </div>
          </CFTooltip>
        )}
        {files?.map((file: any, key: number) => {
          if (file && file.file_path && file.file_path.includes("thumb")) {
            file.file_path = file.file_path.replace("thumb", "large");
          }
          return (
            <UploadedFile
              readOnly={readOnly}
              key={key}
              file={file}
              description={file?.notes}
              deleteFile={deleteFile}
              onAddMarkUp={onAddMarkUp}
              moduleKey={moduleKey}
              isDeleteAttach={isDeleteAttach}
            />
          );
        })}
      </CFGallery>
    </>
  );
};

export default FileAttachments;
export { default as UploadedFile } from "./UploadedFile";
