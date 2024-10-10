import { faMemo } from "@fortawesome/pro-regular-svg-icons/faMemo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form } from "@remix-run/react";
import { CFTypography } from "~/components/third-party/ant-design";

import { useState } from "react";

import { Number } from "~/helpers/helper";
import { notificationApi } from "~/components/third-party/notificationApi";
import { CFDrawer, SidebarHeader } from "./third-party/CFDrawer";
import { CFButton } from "~/components/third-party/CFButton";
import { CFSelect } from "./third-party/CFSelect";
import { CFTextarea } from "./third-party/CFTextArea";
import CommonCardWithBorder from "./third-party/CommonCardWithBorder";
import AddMarkupModal, { AddMarkupProps } from "./third-party/AddmarkupModal";
import axios from "axios";

const FileDescriptionSide = ({
  fileDescriptionOpen,
  setFileDescriptionOpen,
  value,
  onChange,
  onSave,
  setNotes,
  file,
  visibleTags = false,
  errorMessage,
  onAddMarkUp,
  onSetErrorNotes,
  moduleKey,
}: any) => {
  const [markupDailogOpen, setMarkupDailogOpen] = useState<boolean>(false);

  const { setNotify }: { setNotify: any } = notificationApi();
  const handleSave = async (savedImageData: any): Promise<void> => {
    console.log(savedImageData);
    return new Promise<void>(async (resolve) => {
      const filePath = file?.file_path?.split("?")?.[0] ?? "";
      if (!!filePath && !!savedImageData?.imageBase64) {
        await axios
          .post(
            "https://api-cfdev.contractorforeman.net/service.php",
            {
              TEST_PARAM: "UP-06",
              old_img: file?.file_path?.split("?")?.[0] ?? "",
              file_id: file?.image_id ?? "",
              encode_image: savedImageData?.imageBase64 ?? "",
              notes: file?.notes,
              company_id: 829,
              op: "aws_upload_url",
              user_id: 109871,
              curr_time: new Date()
                .toISOString()
                .slice(0, 19)
                .replace("T", " "),
              force_login: 0,
              global_project: "",
              version: "web",
              from: "panel",
              tz: "+05:30",
              tzid: "Asia/Calcutta",
              iframe_call: 0,
              encode: 1,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization:
                  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImhhcnNoaWwuc2FraGl5YSs4NTQ1QHdlZW5nZ3MuaW4iLCJ1c2VyX2lkIjoxMDk4NzEsImNvbXBhbnlfaWQiOjgyOSwiZW1haWwiOiJoYXJzaGlsLnNha2hpeWErODU0NUB3ZWVuZ2dzLmluIiwiZnVsbE5hbWUiOiJoYXJzaGlsIHRlc3QiLCJyb2xlX2lkIjo5MjQ4NCwiY2ZfdG9rZW4iOiIkMmEkMTIkZTAzMDQ4ZmQxZTI0NmYwNGRiNWJlZTQ5NzV6enE0UkpadTlCT2JRSE9keklpZnJEL0piLzZfMF8wIn0.hlkooYTtEgZ0gIkWx1_4FcqYfStlfQ6kfiaA0KHLRkg",
              },
            }
          )
          .then((response) => {
            if (response.data.type === "danger") {
              setMarkupDailogOpen(false);
            }
            setNotify(response.data);

            const onNewDataLoad = () => {
              setMarkupDailogOpen(false);
            };
            onAddMarkUp(response.data, onNewDataLoad);

            resolve();
          })
          .catch((error) => {
            console.error("There was an error!", error);

            setNotify({ type: "danger", message: "An error occurred!" });

            resolve();
          });
      } else if (savedImageData && !!filePath && !!savedImageData.xfdf) {
        let newUrl = new URL(file?.file_path);

        const result = await axios.post(
          "https://api-cfdev.contractorforeman.net/service.php",
          {
            fileId: file?.image_id,
            newMarkupData: {
              image: savedImageData.blobdata,
              original_pdf_file_path: newUrl
                ?.toString()
                ?.replace(newUrl?.search, ""),
              annotation_data: savedImageData.xfdf,
              pdf_file: savedImageData.blobdata,
              module_name: moduleKey,
              is_overwrite: Number(!savedImageData.saveAs),
            },
          }
        );
        if (result && result?.success) {
          const onNewDataLoad = () => {
            setMarkupDailogOpen(false);
          };
          onAddMarkUp(result.data, onNewDataLoad);
        } else {
          setNotify({
            title: "Alert",
            type: "danger",
            message: result?.message || "Image is not updated.",
          } as any);
          setMarkupDailogOpen(false);
        }
        resolve();
      } else {
        setNotify({
          title: "Alert",
          type: "danger",
          message: "Image is not updated.",
        } as any);
        resolve();
      }
    });
  };

  return (
    <>
      <CFDrawer
        open={fileDescriptionOpen}
        drawerBody="!h-[calc(100vh-52px)]"
        header={
          <SidebarHeader
            title="File Description"
            icon={<FontAwesomeIcon className="w-4 h-4" icon={faMemo} />}
            closeDrawer={() => {
              setFileDescriptionOpen(!fileDescriptionOpen);
              if (typeof onSetErrorNotes === "function") {
                onSetErrorNotes();
              }
            }}
          />
        }
      >
        <div className="py-4">
          <div className="sidebar-body overflow-y-auto h-[calc(100vh-132px)] px-4">
            <CommonCardWithBorder>
              <div className="w-full">
                <CFTextarea
                  label="Notes"
                  name="notes"
                  value={value}
                  ref={(ref: HTMLTextAreaElement | null) => {
                    ref?.focus();
                  }}
                  onChange={onChange}
                  labelClass="dark:text-white/90"
                  required
                  errorMessage={errorMessage}
                />
              </div>
              {!!visibleTags ? (
                <div className="flex flex-col gap-2">
                  <div className="w-full">
                    <CFSelect
                      name="tags"
                      label="Tags"
                      options={TagsOption}
                      multiple={true}
                      addTagFiled={true}
                      className="text-sm"
                    />
                  </div>
                  <CFTypography
                    title="small"
                    className="text-xs text-primary-900 font-normal dark:text-white/80"
                  >
                    Type to add a Tag: Daily Log, Estimate, Project, or a Custom
                    Tag
                  </CFTypography>
                </div>
              ) : (
                ""
              )}
            </CommonCardWithBorder>
          </div>
          <div className="sidebar-footer flex items-center justify-center w-full gap-6 px-4 pt-4">
            <CFButton
              variant="primary"
              className="justify-center w-full"
              onClick={() => {
                setMarkupDailogOpen(true);
              }}
            >
              Markup
            </CFButton>
            <CFButton
              variant="primary"
              className="justify-center w-full"
              onClick={onSave}
            >
              Save
            </CFButton>
          </div>
        </div>
      </CFDrawer>
      {(file?.is_image || file?.file_ext === "pdf") && markupDailogOpen && (
        <AddMarkupModal
          open={markupDailogOpen}
          closeModalHandler={() => setMarkupDailogOpen(false)}
          file={file}
          onSave={handleSave as AddMarkupProps["onSave"]}
        />
      )}
    </>
  );
};

const TagsOption = [
  {
    label: "Fail",
    value: "fail",
  },
  {
    label: "Pass",
    value: "pass",
  },
  {
    label: "Re-Inspect1",
    value: "re_inspect",
  },
];

export default FileDescriptionSide;
