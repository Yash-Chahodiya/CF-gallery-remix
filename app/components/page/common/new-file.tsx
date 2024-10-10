import { useEffect, useState } from "react";
import { CFButton } from "~/components/third-party/CFButton";

import UploadFile from "./upload-file";
import {
  setStateObjectElementById,
  uid,
  getFileDataFromFileObj,
} from "~/helpers/helper";
import _ from "lodash";
import InputFile from "~/components/InputFiles";
import { fileUploadApi } from "~/helpers/fileuploadApi";
import * as ReactDropzone from "react-dropzone";
import axios from "axios";
import { notificationApi } from "~/components/third-party/notificationApi";

const { useDropzone } = ReactDropzone;

interface NewFileListProps {
  onAttech: (value: any[]) => void;
}

function NewFileList({ onAttech }: NewFileListProps) {
  const { isArray, isEmpty } = _;
  const [selectedFiles, setSelectedFiles] = useState<any[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const [showSaveButton, setShowSaveButton] = useState(false);
  const allFilesUploaded = uploadedFiles?.every(
    (file: { progress: number }) => file.progress === 100
  );

  const { setNotify }: { setNotify: any } = notificationApi();

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles: any) => {
      changeSelectedFiles(acceptedFiles);
    },
    noClick: true,
  });

  const changeSelectedFiles = (files: File[]) => {
    const tempFiles: any[] = files
      ?.map((tempFile: File) => {
        let fileData: Partial<any> = getFileDataFromFileObj(
          tempFile,
          "16-07-2024"
        );
        return {
          ...(fileData || {}),
          id: uid(),
          isUploaded: 0,
          progress: 0,
          error: "",
          file_type: tempFile?.type,
          file: tempFile,
        };
      })
      ?.filter((newFile: any) => {
        const oldFiles: any[] = uploadedFiles?.filter(
          (uploadedFile: any) => newFile?.name === uploadedFile?.name
        );
        if (newFile?.file) {
          const aleadyNotUploaded = !Boolean(
            oldFiles?.find(
              (oldFile: any) =>
                oldFile?.file &&
                JSON.stringify(oldFile?.file) === JSON.stringify(newFile?.file)
            )
          );
          if (!aleadyNotUploaded) {
            setNotify({
              type: "danger",
              message:
                decodeURIComponent(newFile?.name ?? "") + " aleady uploaded",
            });
          }
          return aleadyNotUploaded;
        }
        return true;
      });

    setSelectedFiles(tempFiles);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempFiles = e.target.files;
    if (tempFiles) {
      let files: File[] = Object.values(tempFiles);
      changeSelectedFiles(files);
    }
  };

  useEffect(() => {
    if (allFilesUploaded && uploadedFiles.length > 0) {
      const timeoutId = setTimeout(() => {
        setShowSaveButton(true);
      }, 1000);
      return () => clearTimeout(timeoutId);
    } else {
      setShowSaveButton(false);
    }
  }, [allFilesUploaded, uploadedFiles]);

  useEffect(() => {
    if (!isEmpty(selectedFiles)) {
      const tempSelectedFiles = selectedFiles;
      tempSelectedFiles?.forEach((tempSelectedFile: any) => {
        if (
          !isEmpty(tempSelectedFile) &&
          tempSelectedFile?.isUploaded === 0 &&
          isEmpty(tempSelectedFile?.error)
        ) {
          tempSelectedFile.name = tempSelectedFile?.file?.name
            ?.replace(/[^\w.-]/g, "")
            ?.replace(/\.[^/.]+$/, "");
          setStateObjectElementById<any>({
            set: setUploadedFiles,
            id: tempSelectedFile?.id,
            data: tempSelectedFile,
            elements: {
              progress: 0,
            },
          });
          setSelectedFiles([]);
          const uploadedFile = tempSelectedFile.file ?? {};
          const newName = uploadedFile?.name?.replace(/[^\w.-]/g, "");
          const tempfile = new File([uploadedFile], newName, {
            type: uploadedFile.type,
          });
          const fetchAwsUrlError = (errorMessage: string) => {
            setStateObjectElementById<any>({
              set: setUploadedFiles,
              id: tempSelectedFile?.id,
              data: tempSelectedFile,
              elements: {
                error: errorMessage,
              },
            });
          };
          const onUploadProgress = (progress: number) => {
            setStateObjectElementById<any>({
              set: setUploadedFiles,
              id: tempSelectedFile?.id,
              elements: {
                progress: progress,
              },
            });
          };
          const fileUploadSuccess = (uploadedFileUrl: string) => {
            let newData: Partial<any> = {
              id: tempSelectedFile?.id,
              isUploaded: 1,
              progress: 100,
              file_path: uploadedFileUrl,
            };
            if (tempSelectedFile?.is_image) {
              newData = {
                ...newData,
                image: uploadedFileUrl,
              };
            }
            setStateObjectElementById<any>({
              set: setUploadedFiles,
              id: tempSelectedFile?.id,
              elements: newData,
            });
          };

          fileUploadApi({
            file: tempfile,
            fetchAwsUrlError: fetchAwsUrlError,
            onUploadProgress: onUploadProgress,
            fileUploadSuccess: fileUploadSuccess,
          });
        }
      });
    }
  }, [selectedFiles]);

  const uploadFilesToAPI = async (files: any[]) => {
    const awsFilesUrl = files.map((file) => ({
      file_url: file.file_path,
      is_image: file.is_image ? 1 : 0,
      notes: "",
      is_file_shared: 0,
      attach_item_id: 0,
      image_res: file.image_res,
      camera_res: file.camera_res,
    }));

    const payload = {
      add_to_sub_folder: 1,
      aws_files_url: awsFilesUrl,
      called_from: 0,
      chld_item_name: "",
      client_cover_image: 0,
      company_id: "829",
      user_id: "109871",
      companycam_creator_name: 0,
      companycam_photo_id: 0,
      companycam_webhook_id: 1,
      curr_time: new Date().toISOString().slice(0, 19).replace("T", " "),
      directory_type: 1,
      file_save_from_email: 0,
      file_tags: "photo",
      file_type: files[0].file_type.split("/")[1],
      force_login: "0",
      from: "panel",
      global_project: "",
      iframe_call: 0,
      is_already_save: 0,
      is_common_notes: 0,
      is_file_shared: 0,
      is_google_drive_file: 0,
      module_id: 108,
      module_key: "project_permits",
      notes: "Test",
      primary_id: "2984",
      project_id: "147535",
      title: "Testing Add",
      tz: "+05:30",
      tzid: "Asia/Calcutta",
      version: "web",
    };

    try {
      const response = await axios.post(
        "https://api2-beta.contractorforeman.net/files/add",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImhhcnNoaWwuc2FraGl5YSs4NTQ1QHdlZW5nZ3MuaW4iLCJ1c2VyX2lkIjoxMDk4NzEsImNvbXBhbnlfaWQiOjgyOSwiZW1haWwiOiJoYXJzaGlsLnNha2hpeWErODU0NUB3ZWVuZ2dzLmluIiwiZnVsbE5hbWUiOiJoYXJzaGlsIHRlc3QiLCJyb2xlX2lkIjo5MjQ4NCwiY2ZfdG9rZW4iOiIkMmEkMTIkZTAzMDQ4ZmQxZTI0NmYwNGRiNWJlZTQ5NzV6enE0UkpadTlCT2JRSE9keklpZnJEL0piLzZfMF8wIn0.hlkooYTtEgZ0gIkWx1_4FcqYfStlfQ6kfiaA0KHLRkg",
          },
        }
      );
      console.log("API response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error uploading files:", error);
      throw error;
    }
  };

  const handleSave = async () => {
    try {
      await uploadFilesToAPI(uploadedFiles);
      onAttech(uploadedFiles);
    } catch (error) {
      console.error("Failed to save files:", error);
    }
  };

  return (
    <>
      <div className="overflow-hidden" {...getRootProps()} onClick={() => {}}>
        <div className="p-4">
          <InputFile
            inputProps={{
              ...getInputProps(),
              onChange,
            }}
          />
        </div>
        <div className="flex flex-col gap-2 pb-3 md:h-[calc(100vh-320px)] h-[calc(100vh-270px)] overflow-y-auto overflow-hidden">
          {selectedFiles?.map((selectedFile: any, key: number) => (
            <UploadFile
              file={selectedFile}
              key={key}
              setFiles={setSelectedFiles}
            />
          ))}
          {uploadedFiles?.map((uploaded: any, key: number) => (
            <UploadFile file={uploaded} key={key} setFiles={setUploadedFiles} />
          ))}
        </div>
        {showSaveButton && (
          <div className="p-4">
            <CFButton
              variant="primary"
              className="w-full justify-center"
              onClick={handleSave}
            >
              Save
            </CFButton>
          </div>
        )}
      </div>
    </>
  );
}

export default NewFileList;
