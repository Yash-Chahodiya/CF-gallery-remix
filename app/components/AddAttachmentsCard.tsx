import { faPaperclip } from "@fortawesome/pro-solid-svg-icons/faPaperclip";
import { useEffect, useState } from "react";
// import { GradientIconCard, FileAttachments } from "./GradientIconCard";
import { Number, getFileData } from "../helpers/helper";
import GradientIconCard from "./GradientIconCard";
import FileAttachments from "./FileAttachments";

interface IAttachmentPropps {
  files: Array<any>;
  onChange: (files: Array<any>) => void;
  newFileOnly: boolean;
  isView?: boolean;
  hideBorder?: boolean;
  readOnly?: boolean;
  deleteFile: (file: any) => void;
  onAddMarkUp: (data: Partial<any>, onNewDataLoad?: () => void) => void;
  galleryFilterTab?: any[];
  moduleKey?: string;
}

const AddAttachmentsCard = ({
  files,
  onChange,
  newFileOnly = false,
  isView = true,
  hideBorder = false,
  readOnly = false,
  deleteFile,
  onAddMarkUp,
  galleryFilterTab,
  moduleKey,
}: IAttachmentPropps) => {
  const [cardFiles, setCardFiles] = useState<any[]>([]);

  useEffect(() => {
    setCardFiles(
      files?.map((file: any) => {
        let tempFile = getFileData({
          file: { ...file, is_image: Number(file?.is_image)?.toString() },
        }) as any;
        return tempFile;
      }) ?? []
    );
  }, [files]);

  return (
    <>
      {isView && (
        <GradientIconCard
          title="Attachments"
          hideBorder={(readOnly && cardFiles?.length === 0) || hideBorder}
          iconProps={{
            icon: faPaperclip,
            containerClassName:
              "bg-[linear-gradient(180deg,#5996E91a_0%,#50EBFD1a_100%)]",
            id: "add_attachments_icon",
            colors: ["#5996E9", "#50EBFD "],
          }}
        />
      )}
      <div
        className={`${
          (readOnly && cardFiles?.length === 0) || hideBorder ? "" : "pt-2.5"
        }`}
      >
        <div className="flex flex-wrap gap-[15px]">
          <FileAttachments
            files={cardFiles}
            readOnly={readOnly}
            setFiles={(selectedFiles: Array<any>) => {
              let allFile = [...(selectedFiles ?? []), ...(cardFiles ?? [])];
              if (onChange) {
                if (newFileOnly) {
                  onChange(selectedFiles);
                } else {
                  onChange(allFile);
                }
              }
              setCardFiles(allFile);
            }}
            deleteFile={deleteFile}
            onAddMarkUp={onAddMarkUp}
            moduleKey={moduleKey}
            galleryFilterTab={galleryFilterTab}
          />
        </div>
      </div>
    </>
  );
};

export default AddAttachmentsCard;
