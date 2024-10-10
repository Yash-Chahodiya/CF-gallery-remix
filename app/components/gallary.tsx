import { useEffect, useState } from "react";
import pkg from "lodash";
import { CFTypography } from "~/components/third-party/ant-design";
import {
  getFileData,
  isValidURL,
  sanitizeString,
  replaceDOMParams,
} from "../helpers/helper";
import { CFGallery } from "./CFGallary";
import MultiSelectSide from "./MultiSelectSide";
import MultiProjectSelectSide from "./MultiProjectSelectSide";
import FetchDataListView from "./FetchDataListView";
import LoadingGallery from "./loading-gallery";
import FilePhotos from "./FilePhotos";
import axios from "axios";
import { CFCheckBox } from "./third-party/CFCheckBox";
import { notificationApi } from "./third-party/notificationApi";
import { CFButton } from "~/components/third-party/CFButton";

interface GalleryProps {
  gallaryList: any[];
  setGallaryList: React.Dispatch<React.SetStateAction<any[] | undefined>>;
  items: Partial<any>[];
  setItems: React.Dispatch<React.SetStateAction<Partial<any>[]>>;
  onAttech: (value: Partial<any>[]) => void;
  gUser: any;
  filterSelectedItems: (items: any[]) => any[];
  galleryFilterTab?: any[];
}

function Gallery({
  gallaryList,
  setGallaryList,
  items,
  setItems,
  onAttech,
  filterSelectedItems,
}: any) {
  const { isArray, isEmpty } = pkg;
  const { setNotify }: { setNotify: any } = notificationApi();
  const [project, setProject] = useState<Partial<any>>();
  const [customer, setCustomer] = useState<Partial<any>>({});
  const [multiSelectProjectOpen, setMultiSelectProjectOpen] =
    useState<boolean>(false);
  const [multiSelect, setMultiSelect] = useState<any | "">("");
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState<any>();
  const [showProjectFiles, setShowProjectFiles] = useState<boolean>(true);

  let isFetching = false;
  let isTagFetching = false;

  useEffect(() => {
    if (!isTagFetching) {
      isTagFetching = true;
      if (isEmpty(tags)) {
        axios
          .get("https://api-beta.contractorforeman.net/service.php", {
            params: {
              company_id: 829,
              user_id: 109871,
              op: "get_tag_categories",
              iframe_call: 0,
              length: "40",
              force_login: "0",
              is_deleted: 0,
              allTag: 1,
            },
            headers: {
              "Content-Type": "application/json",
              Authorization:
                "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImhhcnNoaWwuc2FraGl5YSs4NTQ1QHdlZW5nZ3MuaW4iLCJ1c2VyX2lkIjoxMDk4NzEsImNvbXBhbnlfaWQiOjgyOSwiZW1haWwiOiJoYXJzaGlsLnNha2hpeWErODU0NUB3ZWVuZ2dzLmluIiwiZnVsbE5hbWUiOiJoYXJzaGlsIHRlc3QiLCJyb2xlX2lkIjo5MjQ4NCwiY2ZfdG9rZW4iOiIkMmEkMTIkZTAzMDQ4ZmQxZTI0NmYwNGRiNWJlZTQ5NzV6enE0UkpadTlCT2JRSE9keklpZnJEL0piLzZfMF8wIn0.hlkooYTtEgZ0gIkWx1_4FcqYfStlfQ6kfiaA0KHLRkg",
            },
          })
          .then((response) => {
            if (!isEmpty(response?.data)) {
              setTags({
                data: response?.data,
                data_all: response?.dataAll,
              });
            }
          })
          .catch((error) => {
            console.error("Error fetching tag categories:", error);
          })
          .finally(() => {
            isTagFetching = false;
          });
      }
    }
  }, [tags, isTagFetching]);

  useEffect(() => {
    if (!isFetching) {
      isFetching = true;
      if (isEmpty(gallaryList)) {
        fetchFun();
      }
    }
  }, [gallaryList, isFetching]);

  useEffect(() => {
    if (!isFetching) {
      isFetching = true;
      setGallaryList([]);
      fetchFun();
    }
  }, [project, customer, showProjectFiles]);

  const fetchFun = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://api-beta.contractorforeman.net/service.php",
        {
          params: {
            company_id: 829,
            user_id: 109871,
            op: "get_aws_files",
            curr_time: new Date().toISOString().slice(0, 19).replace("T", " "),
            force_login: "0",
            global_project: "",
            version: "web",
            from: "panel",
            tz: "+05:30",
            tzid: "Asia/Calcutta",
            iframe_call: "0",
            "filter[]":
              '{"customer":"","tags":"","extension":"","project":"147535"}',
            page: "0",
            length: "40",
            all_project_check: "0",
          },
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImhhcnNoaWwuc2FraGl5YSs4NTQ1QHdlZW5nZ3MuaW4iLCJ1c2VyX2lkIjoxMDk4NzEsImNvbXBhbnlfaWQiOjgyOSwiZW1haWwiOiJoYXJzaGlsLnNha2hpeWErODU0NUB3ZWVuZ2dzLmluIiwiZnVsbE5hbWUiOiJoYXJzaGlsIHRlc3QiLCJyb2xlX2lkIjo5MjQ4NCwiY2ZfdG9rZW4iOiIkMmEkMTIkZTAzMDQ4ZmQxZTI0NmYwNGRiNWJlZTQ5NzV6enE0UkpadTlCT2JRSE9keklpZnJEL0piLzZfMF8wIn0.hlkooYTtEgZ0gIkWx1_4FcqYfStlfQ6kfiaA0KHLRkg",
          },
        }
      );
      setGallaryList(response.data.data);
    } catch (error) {
      console.error("Error fetching AWS files:", error);
    } finally {
      isFetching = false;
      setLoading(false);
    }
  };

  const uploadFilesToAPI = async (files: any[]) => {
    console.log("files in gallery ", files);
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
      return response.data;
    } catch (error) {
      console.error("Error uploading files:", error);
      throw error;
    }
  };

  const getFilters = () => {
    let filter: {
      customer: string;
      tags: string;
      extension: string;
      project?: string;
    } = {
      customer: customer?.user_id?.toString() || "",
      tags: "",
      extension: "",
    };
    if (showProjectFiles !== undefined) {
      filter = {
        ...filter,
        project: "147535",
      };
    }
    return filter;
  };

  const onChange = (value: Partial<any>, select: boolean) => {
    if (!value?.file_path || !isValidURL(value?.file_path)) {
      setNotify({
        message: "File Path is not valid.",
        type: "danger",
      });
    } else {
      if (select) {
        setItems((prev?: Partial<any>[]) => [...(prev ?? []), value]);
      } else {
        setItems(
          () =>
            items?.filter(
              (data: Partial<any>) => data?.image_id !== value?.image_id
            ) ?? []
        );
      }
    }
  };
  return (
    <>
      <div className="h-full overflow-hidden">
        <div className="p-4">
          <div className="py-4 px-4 flex flex-col gap-4 border-primary-900 dark:border-[#969696] border-l-2 rounded-lg bg-gray-100/60 dark:bg-dark-800">
            <div className="flex lg:items-center items-start gap-2">
              <CFTypography
                title="small"
                className="!text-base text-[#4B4B4B] font-semibold dark:text-white/90"
              >
                Filter:
              </CFTypography>
              <div className="flex lg:flex-row flex-col lg:items-center items-start gap-3 w-[calc(100%-54px)]">
                {/* <GallaryFilterInput
                  label="Customer:"
                  value={replaceDOMParams(
                    sanitizeString(customer?.display_name) || ""
                  )}
                  onReset={() => {
                    setCustomer({});
                  }}
                  tooltipContent={customer?.display_name}
                  placeholder="Select Customer"
                />
                <GallaryFilterInput
                  label="Project:"
                  value={replaceDOMParams(
                    sanitizeString(project?.project_name) ?? ""
                  )}
                  onClick={() => setMultiSelectProjectOpen(true)}
                  onReset={() => {
                    setProject(undefined);
                  }}
                  tooltipContent={replaceDOMParams(
                    sanitizeString(project?.project_name) ?? ""
                  )}
                  placeholder="Select Project"
                /> */}
              </div>
            </div>
            <CFCheckBox
              className="gap-1.5 text-primary-900"
              label={"Only show files for this Project"}
              onChange={(e: any) => {
                console.log(e.target.checked);
                setProject(e.target.checked ? project : undefined);
                setShowProjectFiles(e.target.checked);
              }}
              checked={showProjectFiles || false}
            />
          </div>
          <CFGallery>
            <FetchDataListView
              loading={loading || !gallaryList || !tags}
              data={gallaryList ?? []}
              loaderComponent={<LoadingGallery />}
              mapFunction={(file: any, key?: number) => {
                const fileData = getFileData({
                  file: file,
                  tags: tags,
                });
                return (
                  <FilePhotos
                    hideOptions
                    key={key}
                    file={fileData as Partial<any>}
                    selected={items?.some(
                      (item: Partial<any>) =>
                        new URL(item?.file_path)?.pathname ===
                        new URL(fileData?.file_path)?.pathname
                    )}
                    // selected={
                    //   items.length > 0 &&
                    //   items?.some(
                    //     (item: Partial<any>) =>
                    //       item?.image_id === fileData?.image_id
                    //   )
                    // }
                    onChange={onChange}
                  />
                );
              }}
              container={({ children, noDataFound }: any) => {
                return !noDataFound ? (
                  <div
                    className={`mt-5 w-full lg:h-[calc(100vh-250px)] grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3.5 auto-rows-max px-0.5 h-[calc(100vh-375px)] overflow-hidden ${
                      !(gallaryList?.length > 0 && !isEmpty(tags)) &&
                      (loading || !gallaryList || !tags)
                        ? "overflow-hidden "
                        : "overflow-y-auto"
                    }`}
                  >
                    {children}
                  </div>
                ) : (
                  <div className="h-[calc(100vh-230px)]">{children} </div>
                );
              }}
            />
          </CFGallery>
          <div className="pt-4">
            <CFButton
              className="w-full justify-center"
              onClick={() => {
                if (items && items.length > 0) {
                  uploadFilesToAPI(items);
                  onAttech(items);
                  setGallaryList([]);
                } else {
                  setNotify({
                    title: "Alert",
                    message: "Please select file.",
                    type: "danger",
                  });
                }
              }}
            >
              Attach
            </CFButton>
          </div>
        </div>
      </div>

      <MultiSelectSide
        setSelectedOption={setMultiSelect}
        selectedOption={multiSelect}
        onSelected={(value: Partial<any> | Array<Partial<any>>) =>
          isArray(value) ? setCustomer(value?.[0]) : setCustomer(value)
        }
        data={!isEmpty(customer) ? [customer] : []}
        singleSelecte={true}
        showDirectoryContact={false}
      />

      <MultiProjectSelectSide
        setOpen={setMultiSelectProjectOpen}
        open={multiSelectProjectOpen}
        onSelected={(value: Partial<any>) => {
          setProject(value);
          setShowProjectFiles(false);
        }}
        data={project}
        mode="single"
      />
    </>
  );
}

export default Gallery;
