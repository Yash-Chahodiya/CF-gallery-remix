import { DateTime } from "luxon";
import React, { useEffect } from "react";
// import { routes } from "~/route-services/routes";
// import ProgressArrow from "~/components//common/progress-arrow";
import pkg from "lodash";
import CryptoJS from "crypto-js";

import { faFile } from "@fortawesome/pro-regular-svg-icons/faFile";
import { faFileCsv } from "@fortawesome/pro-regular-svg-icons/faFileCsv";
import { faFileExcel } from "@fortawesome/pro-regular-svg-icons/faFileExcel";
import { faFileImage } from "@fortawesome/pro-regular-svg-icons/faFileImage";
import { faFileLines } from "@fortawesome/pro-regular-svg-icons/faFileLines";
import { faFilePdf } from "@fortawesome/pro-regular-svg-icons/faFilePdf";
import { faFilePowerpoint } from "@fortawesome/pro-regular-svg-icons/faFilePowerpoint";
import { faFileWord } from "@fortawesome/pro-regular-svg-icons/faFileWord";
import { faFileZip } from "@fortawesome/pro-regular-svg-icons/faFileZip";
import { faMusic } from "@fortawesome/pro-regular-svg-icons/faMusic";

// import { any } from "~/type";
// import { any } from "./type/define-data";
// import { ProgressArrowColor } from "~/components/common/type/define-data-type";
import dayjs, { ManipulateType, UnitType } from "dayjs";
// import { setGOpenBillSidebar, setGOpenPermitSidebar } from "~/zustand";
// import { remixCompletePages } from "~/data/pages";
// import { parseParamsFromURL } from "~/components/page/$url/helper";

const FileDefaultPdfImage =
  "https://cdn.contractorforeman.net/assets/images/file_icons/pdf.png";
const FileDefaultCsvImage =
  "https://cdn.contractorforeman.net/assets/images/file_icons/csv.png";
const FileDefaultDocxImage =
  "https://cdn.contractorforeman.net/assets/images/file_icons/docx.png";
const FileDefaultDwgImage =
  "https://cdn.contractorforeman.net/assets/images/file_icons/dwg.png";
const FileDefaultMusicImage =
  "https://cdn.contractorforeman.net/assets/images/file_icons/music.png";
const FileDefaultPptImage =
  "https://cdn.contractorforeman.net/assets/images/file_icons/ppt.png";
const FileDefaultTxtImage =
  "https://cdn.contractorforeman.net/assets/images/file_icons/txt.png";
const FileDefaultXlsxImage =
  "https://cdn.contractorforeman.net/assets/images/file_icons/xlsx.png";
const FileDefaultZipImage =
  "https://cdn.contractorforeman.net/assets/images/file_icons/zip.png";
const FileDefaultUnknownImage =
  "https://cdn.contractorforeman.net/assets/images/file_icons/unknown.png";

export {
  FileDefaultPdfImage,
  FileDefaultCsvImage,
  FileDefaultDocxImage,
  FileDefaultDwgImage,
  FileDefaultMusicImage,
  FileDefaultPptImage,
  FileDefaultTxtImage,
  FileDefaultXlsxImage,
  FileDefaultZipImage,
  FileDefaultUnknownImage,
};

const { toNumber, isEmpty } = pkg;

export const handleOutsideClick = (
  ref: React.MutableRefObject<any>,
  set: (value: boolean, event?: Event) => void,
  value: boolean,
  cust?: boolean
) => {
  useEffect(() => {
    function handleClickOutside(event: Event) {
      const current = ref.current;
      if (current && !current.contains(event.target as Node)) {
        if (cust) {
          set(false, event);
        } else {
          set(false);
        }
      }
    }
    if (value) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [ref, value]);
};

export const hasModulePermission = (modules: any[], keys: string[]) => {
  if (modules?.length > 0) {
    const filterModule =
      modules?.filter((module: any) =>
        keys?.find((key: string) => module?.module_key === key)
      ) || [];
    return !isEmpty(filterModule)
      ? filterModule?.every((module: any) => module?.can_write)
      : false;
  }
  return false;
};

export const getUserFullName = (user: any) => {
  return user ? `${user.first_name || ""} ${user.last_name || ""}`.trim() : "";
};

export const getFormat = (format?: string) => {
  const ChangeChar = (char: string) => {
    switch (char) {
      case "Y":
        return "y";
      case "M":
        return "L";
      case "D":
        return "d";
    }
    return char;
  };
  if (!isEmpty(format)) {
    return format
      ?.split("")
      ?.map((char) => ChangeChar(char))
      ?.join("");
  }
  return "yyyy-MM-dd";
};

export const uid = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export function setStateObjectElementById<TData>({
  set,
  elements,
  data,
  id,
}: any) {
  set((prev: TData[]) => {
    const updatedPrev = prev.map((prevValue: TData) => {
      if (id === (prevValue as any).id) {
        return {
          ...prevValue,
          ...elements,
        };
      }
      return prevValue;
    });

    // If the element with the provided ID wasn't found, add a new element
    if (!updatedPrev.some((prevValue: TData) => id === (prevValue as any).id)) {
      const newData = {
        ...(data || {}),
        ...(elements as TData),
      };
      updatedPrev.unshift(newData);
    }

    return updatedPrev;
  });
}
export const formatBytes = (bytes: number, decimals = 2) => {
  if (!+bytes) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = [
    "Bytes",
    "KiB",
    "MiB",
    "GiB",
    "TiB",
    "PiB",
    "EiB",
    "ZiB",
    "YiB",
  ];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

export const getFetchListViewData = <TData extends {}>(
  data: Array<TData> | undefined
): TData[] | undefined => {
  if (isEmpty(data)) {
    return;
  }
  return data;
};

export const Int = (value: string | number | boolean | undefined) => {
  return Number(value);
};

export const Float = (value: string | number | boolean | undefined) => {
  return Number(value);
};

export const Number = (value: string | number | boolean | undefined) => {
  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return toNumber(value);
  }
  return 0;
};

let typingTimeout: NodeJS.Timeout | null = null;

/**
 * improvement needed.
 **/
export const handleFormElementChange = (
  value: string,
  onSearch: (value: string) => void = (value) => {},
  setData: (value: []) => void = (value) => {},
  setFirstTimeApiCall?: (value: boolean) => void
) => {
  if (typingTimeout) {
    clearTimeout(typingTimeout);
  }
  typingTimeout = setTimeout(() => {
    onSearch(value);
    setData([]);
    if (setFirstTimeApiCall) {
      setFirstTimeApiCall(true);
    }
  }, 500);
};

export const cleanupTypingTimeout = () => {
  if (typingTimeout) {
    clearTimeout(typingTimeout);
  }
};

export const Percent = (
  firstValue: number,
  secondValue: number,
  isSign: boolean = false
): string => {
  let per = ((Int(secondValue) / Int(firstValue)) * 100 - 100).toFixed(2);
  let PerRound = Math.round(+per);
  if (isSign) {
    if (firstValue > secondValue) {
      return PerRound?.toString();
    }
  }
  if (!isFinite(PerRound)) {
    return "~";
  }

  return PerRound.toString()?.replace("-", "");
};

export const fnum = (value: number, count = 0) => {
  const cNum =
    Math.abs(Number(value)) >= 1.0e9
      ? (Math.abs(Number(value)) / 1.0e9).toFixed(2) + "B"
      : // Six Zeroes for Millions
      Math.abs(Number(value)) >= 1.0e6
      ? (Math.abs(Number(value)) / 1.0e6).toFixed(2) + "M"
      : // Three Zeroes for Thousands
      Math.abs(Number(value)) >= 1.0e3
      ? (Math.abs(Number(value)) / 1.0e3).toFixed(2) + "K"
      : Math.abs(Number(value)).toFixed(count);

  return cNum;
};

export const useComparisonChart = () => {
  const chartText = (preVal: number, currentVal: number) => {
    if (preVal > currentVal) {
      return "Decrease";
    } else if (preVal < currentVal) {
      return "Increase";
    }
    return "";
  };

  const chartColor = (preVal: number, currentVal: number) => {
    if (preVal > currentVal) {
      return "red";
    } else if (preVal < currentVal) {
      return "green";
    }
    return "";
  };
  const chartImage = (
    preVal: number,
    currentVal: number,
    color: any | "" = chartColor(preVal, currentVal)
  ) => {
    if (preVal > currentVal) {
      return (
        // <ProgressArrow
        //   progress="down"
        //   color={!isEmpty(color) ? color : undefined}
        // />
        <></>
      );
    } else if (preVal < currentVal) {
      return (
        // <ProgressArrow
        //   progress="up"
        //   color={!isEmpty(color) ? color : undefined}
        // />
        <></>
      );
    }
    return <></>;
  };

  return { chartText, chartColor, chartImage };
};

export const isJson = (str: string) => {
  try {
    if (typeof str === "string") {
      const parsed = JSON.parse(str);
      return typeof parsed === "object" && parsed !== null;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
  return true;
};

// export const getAuthUrls = () => {
//   return [
//     routes.SIGNIN.url,
//     routes.RECOVER_PASSWORD.url,
//     routes.FORGOT_PASSWORD.url,
//     routes.OTP_VERIFICATION.url,
//     routes.VERIFICATION.url,
//     routes.RESETPASSWORD.url,
//     routes.FORCE_SIGNIN.url,
//     routes.HEALTH_CHECK.url,
//     routes.HANDLER.url,
//     routes.PAYMENT_METHOD.url,
//   ];
// };

export const onKeyDownValidation = (
  event: any,
  { decimalDigits, integerDigits, currentCurrencySymbol }: any
) => {
  const { value } = event.target;

  // Define an array of valid control keys
  const validKeys = [
    "ArrowLeft",
    "ArrowRight",
    "ArrowUp",
    "ArrowDown",
    "Backspace",
    "Delete",
    "End",
    "Insert",
    "Tab",
  ];

  // Allow Backspace, Delete, End, Insert, and arrow keys without validation
  if (validKeys.includes(event.key)) {
    return;
  }

  // Allow only floting value
  if (
    !new RegExp(
      `^\\d{0,${decimalDigits}}(?:\\.\\d{0,${integerDigits}})?$`
    ).test(value.replaceAll(",", "").replace(currentCurrencySymbol, ""))
  ) {
    event.preventDefault(); // Prevent the invalid input.
  }

  // Allow only one digits or dot
  if (!/^[0-9.]$/.test(event.key)) {
    event.preventDefault(); // Prevent the invalid input.
  }
};

// This helper function is use only 5 integer and 2 fration value
export const onKeyDownNumber = (
  event: any,
  {
    decimalDigits,
    integerDigits,
    currentCurrencySymbol,
    allowNegative = false,
  }: any
) => {
  const { value, selectionStart, selectionEnd } = event.target;

  // Define an array of valid control keys
  const validKeys = [
    "ArrowLeft",
    "ArrowRight",
    "ArrowUp",
    "ArrowDown",
    "Backspace",
    "Delete",
    "End",
    "Insert",
    "Tab",
  ];

  // Allow Backspace, Delete, End, Insert, and arrow keys without validation
  if (validKeys.includes(event.key)) {
    return;
  }

  const regexPattern = new RegExp(
    `${
      allowNegative ? "^-?" : "^(?!\\.)"
    }[0-9]{0,${integerDigits}}(?:\\.[0-9]{0,${decimalDigits}})?$`
  );

  const newValue = value.replaceAll(",", "").replace(currentCurrencySymbol, "");

  const newValueWithKey =
    newValue.slice(0, selectionStart) +
    event.key +
    newValue.slice(selectionEnd);

  if (!regexPattern.test(newValueWithKey)) {
    event.preventDefault(); // Prevent the invalid input.
  }
};

export const onKeyDownDigit = (
  event: any,
  { integerDigits, currentCurrencySymbol }: any
) => {
  const { value } = event.target;

  // Define an array of valid control keys
  const validKeys = [
    "ArrowLeft",
    "ArrowRight",
    "ArrowUp",
    "ArrowDown",
    "Backspace",
    "Delete",
    "End",
    "Insert",
    "Tab",
  ];

  // Allow Backspace, Delete, End, Insert, and arrow keys without validation
  if (validKeys.includes(event.key)) {
    return;
  }

  // Allow only integer value
  if (
    !new RegExp(`^\\d{0,${integerDigits}}$`).test(
      value.replaceAll(",", "").replace(currentCurrencySymbol, "")
    )
  ) {
    event.preventDefault(); // Prevent the invalid input.
  }

  // Allow only digits, and prevent dot and alphabet characters
  if (!/^[0-9]$/.test(event.key)) {
    event.preventDefault(); // Prevent the invalid input.
  }
};

export function getApiDefaultParams<TData extends {}>({
  op,
  user,
  otherParams,
  globalProject = "",
}: any): any & TData {
  const date = DateTime.now();
  let params: any & TData = {
    curr_time: date.toFormat("yyyy-MM-dd hh:mm:ss"),
    force_login: "0",
    global_project: globalProject,
    version: "web",
    from: "panel",
    tz: date.toFormat("ZZ"),
    tzid: date.zoneName,
    iframe_call: 0,
    ...otherParams,
  };
  if (!isEmpty(op)) {
    params = {
      op: op,
      ...params,
    };
  }
  if (user) {
    params = {
      company_id: user?.company_id,
      user_id: user?.user_id,
      ...params,
    };
  }
  return params;
}

// export function getApiDefaultParams<TData extends {}>({
//   moduleKey,
//   user,
//   otherParams,
//   globalProject = "",
// }: GetApiDefaultParams<TData>): ApiDefaultParams & TData {
//   const date = DateTime.now();
//   let params: ApiDefaultParams & TData = {
//     curr_time: date.toFormat("yyyy-MM-dd hh:mm:ss"),
//     force_login: "0",
//     global_project: globalProject,
//     version: "web",
//     from: "panel",
//     tz: date.toFormat("ZZ"),
//     tzid: date.zoneName,
//     iframe_call: 0,
//     ...otherParams,
//   };
//   if (!isEmpty(moduleKey)) {
//     params = {
//       moduleKey: moduleKey,
//       ...params,
//     };
//   }
//   if (user) {
//     params = {
//       company_id: user?.company_id,
//       user_id: user?.user_id,
//       ...params,
//     };
//   }
//   return params;
// }

// Function to match the URL against route patterns
export const getIframeParams = (
  url: string,
  routes: { [key: string]: boolean }
) => {
  for (const route in routes) {
    const pattern = route.replace(/:\w+/g, "([^/]+)");
    const regex = new RegExp(`^${pattern}$`);
    const match = url.match(regex);
    if (match) {
      const keys = route.match(/:\w+/g);
      const params = keys?.reduce(
        (result: { [key: string]: string }, key, index) => {
          const paramName = key.slice(1);
          result[paramName] = match[index + 1];
          return result;
        },
        {}
      );
      return { route, params };
    }
  }
  return null;
};

export function getQueryString(url: string, key?: string) {
  let params: { [key: string]: string } = {};
  if (!isEmpty(url)) {
    const qString = url?.split("?")?.[1];
    if (!isEmpty(qString)) {
      params = qString
        ?.split("&")
        ?.reduce((hash: { [key: string]: string }, param: string) => {
          const a: string[] = param?.split("=");
          if (a?.length == 2) {
            return Object.assign(hash, {
              [a?.[0]]: a?.[1],
            });
          }
          return hash;
        }, {});
    }
  }
  if (key && !isEmpty(key)) {
    return params?.[key];
  }
  return params;
}

export const getFileData = ({
  file,
  tags,
}: {
  file: Partial<any>;
  tags?: any;
}) => {
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
            icon: faFileZip,
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

export const getFileType = ({ file }: { file: string }): any => {
  const fileDotIndex: number = file?.lastIndexOf(".") ?? -1;
  const fileType: string =
    fileDotIndex >= 0 ? file?.substring(fileDotIndex + 1, file?.length) : "";

  let tempFile;
  switch (fileType) {
    case "png":
    case "gif":
    case "jpeg":
    case "jpg":
      tempFile = {
        isImage: true,
        image: file,
        icon: faFileImage,
        fileUrl: file,
        iconClassName: "text-[#8380F6]",
      };
      break;
    case "docx":
    case "doc":
    case "rtf":
      tempFile = {
        isImage: false,
        image: FileDefaultDocxImage,
        icon: faFileWord,
        fileUrl: file,
        iconClassName: "text-[#004EAE]",
      };
      break;
    case "ppt":
    case "pptx":
      tempFile = {
        isImage: false,
        image: FileDefaultPptImage,
        icon: faFilePowerpoint,
        fileUrl: file,
        iconClassName: "text-[#ff5400]",
      };
      break;
    case "xlsx":
    case "xsl":
      tempFile = {
        isImage: false,
        image: FileDefaultXlsxImage,
        icon: faFileExcel,
        fileUrl: file,
        iconClassName: "text-[#127F45]",
      };
      break;
    case "zip":
    case "rar":
      tempFile = {
        isImage: false,
        image: FileDefaultZipImage,
        icon: faFileZip,
        fileUrl: file,
        iconClassName: "text-[#307DBC]",
      };
      break;
    case "pdf":
      tempFile = {
        isImage: false,
        image: FileDefaultPdfImage,
        icon: faFilePdf,
        fileUrl: file,
        iconClassName: "text-[#FC3830]",
      };
      break;
    case "csv":
      tempFile = {
        isImage: false,
        image: FileDefaultCsvImage,
        icon: faFileCsv,
        fileUrl: file,
        iconClassName: "text-[#31D071]",
      };
      break;
    case "dwg":
      tempFile = {
        isImage: false,
        image: FileDefaultDwgImage,
        icon: faFile,
        fileUrl: file,
        iconClassName: "text-[#5B5B5B]",
      };
      break;
    case "mp4":
      tempFile = {
        isImage: false,
        image: FileDefaultMusicImage,
        icon: faMusic,
        fileUrl: file,
        iconClassName: "text-[#FF3E4C]",
      };
      break;
    case "txt":
      tempFile = {
        isImage: false,
        image: FileDefaultTxtImage,
        icon: faFileLines,
        fileUrl: file,
        iconClassName: "text-[#5659E9]",
      };
      break;
    default:
      tempFile = {
        isImage: true,
        image: FileDefaultUnknownImage,
        icon: faFile,
        fileUrl: file,
        iconClassName: "text-[#4A5A76]",
      };
      break;
  }
  return tempFile;
};

export const decryptData = (encrypted: string, key: string) => {
  const iv = CryptoJS.enc.Base64.parse("");
  const decryptkey = CryptoJS.SHA256(key);
  let decrypted = CryptoJS.AES.decrypt(encrypted, decryptkey, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
};

export const encryptData = (decrypted: any, key: string) => {
  const iv = CryptoJS.enc.Base64.parse("");
  const decryptkey = CryptoJS.SHA256(key);
  let encrypted = CryptoJS.AES.encrypt(JSON.stringify(decrypted), decryptkey, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
};

export const isFullPageIframe = ({
  location,
  params,
}: {
  location?: any;
  params?: {
    id?: string;
    tab?: string;
  };
}) => {
  return (
    location?.pathname?.includes("manage-settings") && !isEmpty(params?.tab)
  );
};

export const isValidURL = (url: string) => {
  try {
    new URL(url ?? "");
    return true;
  } catch (error) {
    return false;
  }
};

export const getFileDataFromFileObj = (file: File, date: string) => {
  return getFileData({
    file: {
      file_name: file?.name,
      file_ext: file?.name?.split(".")?.pop(),
      date_added: date,
      file_path: URL.createObjectURL(file),
      is_image: file?.type?.startsWith("image/") ? "1" : "0",
      is_file_shared: "0",
      size: file?.size?.toString(),
    },
  });
};

export const getDifferenceBetweenDate = (
  formDate: string,
  toDate: string,
  differenceType: UnitType
) => {
  return dayjs(formDate).diff(dayjs(toDate), differenceType);
};

export const addCustomDateValue = (
  date: string,
  customValue: number,
  differenceType: ManipulateType
) => {
  return dayjs(date).add(customValue, differenceType);
};

export const replaceDOMParams = (str: string) => {
  if (typeof str === "string") {
    return new DOMParser().parseFromString(str, "text/html").body
      .textContent as string;
  }
  return str;
};

export const base64URLAsync = async (url: string) => {
  const response = await fetch(url);
  const blob = await response.blob();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;

    reader.readAsDataURL(blob);
  });
};
export function removeLeadingSlash(str: string) {
  if (str.startsWith("/")) {
    return str.substring(1);
  }
  return str;
}

export const removeQueryParams = () => {
  if (window) {
    window.history?.replaceState({}, document.title, window.location.pathname);
  }
};

export const openAddPopOver = (actionType: string, pageUrl: string) => {
  const appendActionNew = (url: string) => {
    const urlObj = new URL(url, window.location.origin);
    urlObj.searchParams.set("action", "new");
    return urlObj.toString();
  };
  switch (actionType) {
    case "bills":
      // window.location.href = `${pageUrl}?action=new`;
      window.location.href = appendActionNew(pageUrl);
      break;
    case "permits":
      // window.location.href = `${pageUrl}?action=new`;
      window.location.href = appendActionNew(pageUrl);
      break;
    default:
      // temporary comment
      // navigate({
      //   pathname: pageUrl,
      //   search: "?action=new",
      // });
      const newUrl = new URL(
        (window as any).ENV.PANEL_URL +
          removeLeadingSlash(
            pageUrl ? pageUrl?.replaceAll("-", "_") + ".php" : ""
          )
      );
      const newUrlParams = new URLSearchParams({
        action: "new",
      })?.toString();
      newUrl.search = newUrlParams;
      window.location.href = newUrl.toString();
      break;
  }
};

export const escapeHtmlEntities = (inputText: string) => {
  if (typeof inputText === "string") {
    var htmlEntityMap: { [key: string]: string } = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&apos;",
    };

    return inputText.replace(
      /[&<>"']/g,
      (match: string) => htmlEntityMap?.[match]
    );
  }
  return inputText;
};

// Remove empty element from object
type ValuableObj<T> = {
  [K in keyof T as T[K] extends null | undefined ? never : K]: T[K];
};
export function getValuableObj<T extends {}, V = ValuableObj<T>>(obj: T): V {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([, v]) =>
        !(
          (typeof v === "string" && !v.length) ||
          v === null ||
          typeof v === "undefined"
        )
    )
  ) as V;
}

export const sanitizeString = (value: string | undefined) => {
  if (!value) return "";
  return value.replaceAll(/\\/g, "");
};

// export const getConvertedLink = ({
//   url,
//   moduleKey,
//   queryParams,
// }: {
//   url: string;
//   moduleKey: string;
//   queryParams?: string;
// }) => {
//   if (!url.includes("http")) {
//     let page = removeLeadingSlash(url || "");
//     if (page.includes("#")) page = page.replace("#", "/");
//     const isRemixCompletePage = remixCompletePages.some(
//       (remixCompletePage: any) => remixCompletePage.key === moduleKey
//     );
//     if (!isRemixCompletePage) {
//       const tempParams: Partial<any> = parseParamsFromURL("/" + page);
//       if (tempParams) {
//         let hash: string | undefined;
//         if (tempParams.id?.trim() && tempParams?.page === "manage-settings") {
//           hash = tempParams.id.replaceAll("-", "_");
//         }
//         const newUrl = new URL(
//           (window as any).ENV.PANEL_URL +
//             removeLeadingSlash(
//               tempParams.page
//                 ? tempParams.page.replaceAll("-", "_") + ".php"
//                 : ""
//             )
//         );
//         if (hash) {
//           newUrl.hash = hash;
//         }
//         page = newUrl.toString();
//       }
//     }

//     if (queryParams?.trim()) {
//       page += "?" + queryParams;
//     }
//     return page;
//   }
//   return url;
// };

export const handleApiCatchError = (error: Error) => {
  return {
    message: error?.message || "Something went wrong",
    success: false,
  };
};

export const getDefaultStatuscolor = (defaultColor: string) => {
  const color = defaultColor ? `${defaultColor}1a` : "#EBF1F9";
  // ! If it needs to be made dynamic in the future
  const textColor = defaultColor || "";
  return {
    color,
    textColor,
  };
};

export const fileNameWithExt = ({
  fileName,
  ext,
}: {
  fileName: string;
  ext: string;
}) => {
  if (fileName && ext) {
    let extension = ".";
    if (ext) {
      extension += ext;
    }
    if (!fileName.includes(extension)) {
      return decodeURI(fileName) + extension;
    }
  }
  return fileName;
};
