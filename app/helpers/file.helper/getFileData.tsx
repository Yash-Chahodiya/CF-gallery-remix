import { faFile } from "@fortawesome/free-solid-svg-icons/faFile";
import { faFileCsv } from "@fortawesome/free-solid-svg-icons/faFileCsv";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons/faFileExcel";
import { faFileImage } from "@fortawesome/free-solid-svg-icons/faFileImage";
import { faFileLines } from "@fortawesome/free-solid-svg-icons/faFileLines";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons/faFilePdf";
import { faFilePowerpoint } from "@fortawesome/free-solid-svg-icons/faFilePowerpoint";
import { faFileWord } from "@fortawesome/free-solid-svg-icons/faFileWord";
import { faFileZipper } from "@fortawesome/free-solid-svg-icons/faFileZipper";
import { faMusic } from "@fortawesome/free-solid-svg-icons/faMusic";
import pkg from "lodash";
import {
  FileDefaultCsvImage,
  FileDefaultDocxImage,
  FileDefaultDwgImage,
  FileDefaultMusicImage,
  FileDefaultPdfImage,
  FileDefaultPptImage,
  FileDefaultTxtImage,
  FileDefaultUnknownImage,
  FileDefaultXlsxImage,
  FileDefaultZipImage,
} from "../helper";
export const getFileData = ({
  file,
  tags,
}: {
  file: Partial<any>;
  tags?: any;
}) => {
  const { isArray, isEmpty } = pkg;
  let tempFile: Partial<any> = {};
  let filePath: string | undefined = isEmpty(file?.file_path)
    ? undefined
    : file?.file_path?.replace("+", "%2B") +
      "?" +
      Math.random() * Math.random();
  if (file && !isEmpty(file)) {
    tempFile = {
      name: encodeURI(file.file_name || "").trim(),
      date: file.date_added,
      file_path: filePath,
      is_image: file.is_image?.toString() === "1",
      is_file_shared: file.is_file_shared?.toString() === "1",
      size: file.size,
      camera_res: file.camera_res,
      image_res: file.image_res,
      notes: file.notes,
      image_id: file.image_id,
      file_ext: file.file_ext,
      annotation_data: file.annotation_data,
      original_file_path: file.original_file_path,
    };

    if (!isEmpty(file.file_tags) && tags) {
      const fileTags: string[] | undefined = file.file_tags?.split(",");
      const fileTagsData = fileTags
        ?.map((fileTagId: string) => {
          let tempTag: Partial<any> | undefined = tags?.data?.find(
            (tag: Partial<any>) => tag?.tag_id === fileTagId
          );
          if (isEmpty(tempTag)) {
            tempTag = tags?.data_all?.find(
              (tag: Partial<any>) => tag?.tag_id === fileTagId
            );
          }
          return tempTag;
        })
        ?.filter((tag: Partial<any> | undefined) => tag) as Partial<any>[];
      tempFile = {
        ...tempFile,
        file_tags: fileTagsData?.filter((tag: Partial<any> | undefined) => tag),
      };
    }

    if (tempFile?.is_image) {
      tempFile = {
        ...tempFile,
        image: filePath ?? FileDefaultUnknownImage,
        icon: faFileImage,
        iconClassName: "text-[#8380F6]",
      };
    } else {
      switch (file.file_ext?.toLowerCase()) {
        case "pdf":
          tempFile = {
            ...tempFile,
            image: FileDefaultPdfImage,
            icon: faFilePdf,
            iconClassName: "text-[#FC3830]",
          };
          break;
        case "csv":
          tempFile = {
            ...tempFile,
            image: FileDefaultCsvImage,
            icon: faFileCsv,
            iconClassName: "text-[#31D071]",
          };
          break;
        case "docx":
        case "doc":
        case "rtf":
          tempFile = {
            ...tempFile,
            image: FileDefaultDocxImage,
            icon: faFileWord,
            iconClassName: "text-[#004EAE]",
          };
          break;
        case "dwg":
          tempFile = {
            ...tempFile,
            image: FileDefaultDwgImage,
            icon: faFile,
            iconClassName: "text-[#5B5B5B]",
          };
          break;
        case "mp4":
          tempFile = {
            ...tempFile,
            image: FileDefaultMusicImage,
            icon: faMusic,
            iconClassName: "text-[#FF3E4C]",
          };
          break;
        case "ppt":
        case "pptx":
          tempFile = {
            ...tempFile,
            image: FileDefaultPptImage,
            icon: faFilePowerpoint,
            iconClassName: "text-[#ff5400]",
          };
          break;
        case "txt":
          tempFile = {
            ...tempFile,
            image: FileDefaultTxtImage,
            icon: faFileLines,
            iconClassName: "text-[#5659E9]",
          };
          break;
        case "xlsx":
        case "xsl":
          tempFile = {
            ...tempFile,
            image: FileDefaultXlsxImage,
            icon: faFileExcel,
            iconClassName: "text-[#127F45]",
          };
          break;
        case "zip":
        case "rar":
          tempFile = {
            ...tempFile,
            image: FileDefaultZipImage,
            icon: faFileZipper,
            iconClassName: "text-[#307DBC]",
          };
          break;
        default:
          tempFile = {
            ...tempFile,
            image: FileDefaultUnknownImage,
            icon: faFile,
            iconClassName: "text-[#4A5A76]",
          };
          break;
      }
    }
  }

  return tempFile;
};
