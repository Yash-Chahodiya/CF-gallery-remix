import { lazy, memo, Suspense, useEffect, useState } from "react";
import { getApiDefaultParams, isValidURL } from "../helpers/helper";
// import { apiRoutes } from "~/route-services/routes";
// import { getGUser } from "~/zustand";
// import FileDescriptionSide from "../../sidebars/file-description";
// import { useTranslation } from "~/hook";
import {
  CFButton,
  CFConfirmHeader,
  CFConfirmModal,
  CFTooltip,
  CFTypography,
} from "~/components/third-party/ant-design";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faDownload } from "@fortawesome/pro-regular-svg-icons/faDownload";
import { faEllipsisVertical } from "@fortawesome/pro-regular-svg-icons/faEllipsisVertical";
import { faPencil } from "@fortawesome/pro-regular-svg-icons/faPencil";
import { faTrashCan } from "@fortawesome/pro-regular-svg-icons/faTrashCan";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import pkg from "lodash";
import { notificationApi } from "./third-party/notificationApi";
const PdfExp = lazy(() => import("./PdfExp"));
// import PdfExp from "~/components/modals/pages/pdf-view ";
import { getApiData } from "./../helpers/getApiData";
import axios from "axios";
import { CFDropdown } from "./third-party/CFDropdown";
import FileDescriptionSide from "./FileDescriptionSide";

const Attachments =
  "https://cdn.contractorforeman.net/assets/images/attachments.svg";

interface UploadedFileProps {
  file: any;
  deleteFile?: (file: any) => void;
  readOnly?: boolean;
  isDeleteAttach?: boolean;
  onAddMarkUp: (data: Partial<any>, onNewDataLoad?: () => void) => void;
  onSetErrorNotes?: () => void;
  moduleKey?: string;
  description?: string;
}

const UploadedFile = ({
  file,
  deleteFile,
  readOnly,
  onAddMarkUp,
  moduleKey,
  isDeleteAttach = false,
  description,
}: UploadedFileProps) => {
  const { setNotify }: { setNotify: any } = notificationApi();
  const { isArray, isEmpty } = pkg;
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [fileDescriptionOpen, setFileDescriptionOpen] =
    useState<boolean>(false);
  const [billsPdfExpOpen, setBillsListPdfExpOpen] = useState<boolean>(false);

  //   const {  any } = useTranslation();
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
  //   const gUser: GUser = getGUser();
  const [notes, setNotes] = useState<string>("");
  const [errorNotes, setErrorNotes] = useState<string>("");

  const [notesData, setNotesData] = useState<string>(description);
  const [punchListPdfExpOpen, setPunchListPdfExpOpen] =
    useState<boolean>(false);
  useEffect(() => {
    if (!fileDescriptionOpen) {
      setNotes("notesData");
    }
  }, [fileDescriptionOpen]);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        "https://api-cfdev.contractorforeman.net/service.php",
        {
          params: {
            op: "delete_file",
            image_id: Number(file?.image_id),
            version: "web",
            from: "panel",
            iframe_call: 0,
            tz: "+5:30",
            tzid: "Asia/Calcutta",
            curr_time: new Date().toISOString().slice(0, 19).replace("T", " "),
            force_login: 0,
            global_project: "",
            user_id: 109871,
            company_id: 829,
            permit_id: "2984",
          },
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImhhcnNoaWwuc2FraGl5YSs4NTQ1QHdlZW5nZ3MuaW4iLCJ1c2VyX2lkIjoxMDk4NzEsImNvbXBhbnlfaWQiOjgyOSwiZW1haWwiOiJoYXJzaGlsLnNha2hpeWErODU0NUB3ZWVuZ2dzLmluIiwiZnVsbE5hbWUiOiJoYXJzaGlsIHRlc3QiLCJyb2xlX2lkIjo5MjQ4NCwiY2ZfdG9rZW4iOiIkMmEkMTIkZTAzMDQ4ZmQxZTI0NmYwNGRiNWJlZTQ5NzV6enE0UkpadTlCT2JRSE9keklpZnJEL0piLzZfMF8wIn0.hlkooYTtEgZ0gIkWx1_4FcqYfStlfQ6kfiaA0KHLRkg",
          },
        }
      );
      if (response.data?.success === "1") {
        setNotify({
          message: response.data?.message,
          type: "success",
        });
        deleteFile?.(file);
      } else {
        if (file?.image_id) {
          setNotify({
            message: response.data?.message,
            type: "danger",
          });
        } else {
          deleteFile?.(file);
        }
      }
      setConfirmDialogOpen(false);
    } catch (error: unknown) {
      setNotify({
        message: (error as Error)?.message,
        type: "danger",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e?.target?.value;
    if (isEmpty(value?.trim())) {
      setErrorNotes("This field is required.");
    } else {
      setErrorNotes("");
    }
    setNotes(value);
  };

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      if (isEmpty(notes?.trim())) {
        setErrorNotes("This field is required.");
        return;
      }
      const response = await axios.post(
        "https://api-cfdev.contractorforeman.net/service.php",
        {
          op: "update_file_notes",
          company_id: 829,
          file_id: file?.image_id,
          notes: notes?.trim(),
          user_id: 109871,
          curr_time: new Date().toISOString().slice(0, 19).replace("T", " "),
          force_login: 0,
          global_project: "",
          version: "web",
          from: "panel",
          tz: "+05:30",
          tzid: "Asia/Calcutta",
          iframe_call: 0,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImhhcnNoaWwuc2FraGl5YSs4NTQ1QHdlZW5nZ3MuaW4iLCJ1c2VyX2lkIjoxMDk4NzEsImNvbXBhbnlfaWQiOjgyOSwiZW1haWwiOiJoYXJzaGlsLnNha2hpeWErODU0NUB3ZWVuZ2dzLmluIiwiZnVsbE5hbWUiOiJoYXJzaGlsIHRlc3QiLCJyb2xlX2lkIjo5MjQ4NCwiY2ZfdG9rZW4iOiIkMmEkMTIkZTAzMDQ4ZmQxZTI0NmYwNGRiNWJlZTQ5NzV6enE0UkpadTlCT2JRSE9keklpZnJEL0piLzZfMF8wIn0.hlkooYTtEgZ0gIkWx1_4FcqYfStlfQ6kfiaA0KHLRkg",
          },
        }
      );
      if (response?.data?.success === "1") {
        setNotify({
          title: "Success",
          message: "Attachment updated successfully.",
          type: "success",
        });
        // setNotesData(notes?.trim());
      } else if (response?.data?.success === "0") {
        setNotify({
          title: "Alert",
          message: response?.data?.message,
          type: "danger",
        });
      }
      setFileDescriptionOpen(false);
    } catch (error: unknown) {
      setNotify({
        message: (error as Error)?.message,
        type: "danger",
      });
    }
  };

  const uploadedFileOptions: Array<{
    label: string;
    icon: IconProp;
    onClick: () => void;
  }> = [
    {
      label: "Download",
      icon: faDownload,
      onClick: () => {
        const link = document.createElement("a");
        if (file.image.includes("thumb")) {
          file.image = file.image.replace("thumb", "large");
        }

        fetch(
          file?.icon?.iconName === "file-image" ? file?.image : file?.file_path
        )
          .then((response) => response.blob())
          .then((blob) => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.style.display = "none";
            a.href = url;
            a.download = file?.name;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
          })
          .catch(() => alert("Failed to download file!"));
      },
    },
    {
      label: "Edit",
      icon: faPencil,
      onClick: () => {
        setFileDescriptionOpen(true);
        setMenuOpen(false);
      },
    },
    {
      label: "Delete",
      icon: faTrashCan,
      onClick: () => {
        if (isDeleteAttach) {
          deleteFile?.(file);
        } else {
          setConfirmDialogOpen(true);
          setMenuOpen(false);
        }
      },
    },
  ];

  const downloadCsvFile = (file: any) => {
    const link = document.createElement("a");
    link.href = file;
    link.download = file;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {file?.icon?.iconName === "file-image" ? (
        <div className="w-24 group/upload-file">
          <div className="w-24 h-24 overflow-hidden relative !rounded-xl flex items-center justify-center bg-gray-200 dark:bg-dark-400">
            <img
              src={file?.image || Attachments}
              className=""
              onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                const imageElement = e.target as HTMLImageElement;
                imageElement.onerror = null;
                imageElement.src = Attachments;
              }}
              alt="not found"
            />
            <div
              className={`absolute top-0 w-full h-full ease-in opacity-0 ${
                menuOpen ? "opacity-100 before:scale-100" : ""
              } before:scale-0 before:rounded-xl group-hover/upload-file:opacity-100 group-hover/upload-file:!visible group-hover/upload-file:before:scale-100 delay-100 before:absolute before:w-full before:h-full before:top-0 before:left-0 before:bg-black/50 before:ease-in before:duration-300 `}
            >
              {!readOnly && (
                <div className="flex items-center justify-end w-full h-fit p-1.5">
                  <CFDropdown
                    contentClassName="w-[150px]"
                    iconClass="text-white"
                    icon={faEllipsisVertical}
                    options={uploadedFileOptions}
                    footerOptionText={false}
                    onOpenChange={(open: boolean) => setMenuOpen(open)}
                  />
                </div>
              )}
              <div className="absolute top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 group-hover/upload-file:block hidden">
                {isValidURL(file?.file_path) && (
                  <a
                    href={file?.file_path}
                    download={!file?.is_image}
                    className={` bg-white hover:!bg-deep-orange-500 text-black  hover:text-white flex items-center justify-center w-12 rounded text-13 h-6 max-w-[62px] hover:shadow-primary-500 ${
                      file?.is_image ? "light-gallery" : ""
                    }`}
                    data-sub-html={`<h4>${file?.name}</p>`}
                  >
                    View
                    <img
                      src={file?.file_path}
                      className="hidden"
                      alt="not found"
                    />
                  </a>
                )}
              </div>
            </div>
          </div>
          <CFTooltip content={file?.name} placement="top">
            <CFTypography className="!text-[10px] text-center max-w-24 truncate font-normal !text-gray-500 dark:!text-white/50 mt-1.5 !mb-0">
              {file?.name}
            </CFTypography>
          </CFTooltip>
        </div>
      ) : (
        <div className="w-24 group/upload-file">
          <div className="w-24 h-24 overflow-hidden relative !rounded-xl flex items-center justify-center bg-gray-200 dark:bg-dark-400">
            <img
              src={file?.image || Attachments}
              className=""
              onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                const imageElement = e.target as HTMLImageElement;
                imageElement.onerror = null;
                imageElement.src = Attachments;
              }}
              alt="not found"
            />
            <div
              className={`absolute top-0 w-full h-full ease-in opacity-0 ${
                menuOpen ? "opacity-100 before:scale-100" : ""
              } before:scale-0 before:rounded-xl group-hover/upload-file:opacity-100 group-hover/upload-file:!visible group-hover/upload-file:before:scale-100 delay-100 before:absolute before:w-full before:h-full before:top-0 before:left-0 before:bg-black/50 before:ease-in before:duration-300 `}
            >
              {!readOnly && (
                <div className="flex items-center justify-end w-full h-fit p-1.5">
                  <CFDropdown
                    contentClassName="w-[150px]"
                    iconClass="text-white"
                    icon={faEllipsisVertical}
                    options={uploadedFileOptions}
                    footerOptionText={false}
                    onOpenChange={(open: boolean) => setMenuOpen(open)}
                  />
                </div>
              )}
              <div className="absolute top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 group-hover/upload-file:block hidden">
                {isValidURL(file?.file_path) && (
                  <>
                    {file?.icon?.iconName === "file-pdf" ? (
                      <>
                        <div
                          className={`bg-white hover:!bg-deep-orange-500 cursor-pointer text-black hover:text-white flex items-center justify-center w-12 rounded text-13 h-6 max-w-[62px] hover:shadow-primary-500 `}
                          data-sub-html={`<h4>${file?.name}</p>`}
                          onClick={() => setPunchListPdfExpOpen(true)}
                        >
                          View
                        </div>
                        <Suspense fallback={<p>PDF is Loading...</p>}>
                          <PdfExp
                            punchListPdfExpOpen={punchListPdfExpOpen}
                            setPunchListPdfExpOpen={setPunchListPdfExpOpen}
                            fileUrl={file?.file_path}
                          />
                        </Suspense>
                      </>
                    ) : (
                      <>
                        <div
                          className={`bg-white hover:!bg-deep-orange-500 cursor-pointer text-black hover:text-white flex items-center justify-center w-12 rounded text-13 h-6 max-w-[62px] hover:shadow-primary-500 `}
                          data-sub-html={`<h4>${file?.name}</p>`}
                          onClick={() => downloadCsvFile(file?.file_path)}
                        >
                          View
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
          <CFTooltip content={file?.name} placement="top">
            <CFTypography className="!text-[10px] text-center max-w-24 truncate font-normal !text-gray-500 dark:!text-white/50 mt-1.5 !mb-0">
              {file?.name}
            </CFTypography>
          </CFTooltip>
        </div>
      )}
      <CFConfirmModal
        zIndex={9999}
        open={confirmDialogOpen}
        message="Are you sure you want to delete this attachment?"
        handelModal={() => setConfirmDialogOpen(false)}
        bodyClassName="flex text-center justify-center"
        header={
          <CFConfirmHeader
            title="delete"
            icon={<FontAwesomeIcon className="w-3.5 h-3.5" icon={faTrashCan} />}
            handelModal={() => setConfirmDialogOpen(false)}
            isIconShow={false}
          />
        }
        footer={
          <>
            <CFButton
              variant="default"
              onClick={() => {
                handleDelete();
                setConfirmDialogOpen(false);
              }}
            >
              Yes
            </CFButton>
            <CFButton
              variant="primary"
              className="!bg-red-500 !border-0"
              onClick={() => setConfirmDialogOpen(false)}
            >
              No
            </CFButton>
          </>
        }
      />
      <FileDescriptionSide
        setFileDescriptionOpen={setFileDescriptionOpen}
        fileDescriptionOpen={fileDescriptionOpen}
        value={notes}
        onChange={handleChange}
        setNotes={setNotes}
        onSave={handleSave}
        file={file}
        errorMessage={errorNotes}
        onAddMarkUp={onAddMarkUp}
        moduleKey={moduleKey}
        onSetErrorNotes={() => {
          setErrorNotes("");
        }}
      />
    </>
  );
};

export default memo(UploadedFile);
