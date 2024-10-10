import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/pro-regular-svg-icons/faBars";
import { faFileImage } from "@fortawesome/pro-regular-svg-icons/faFileImage";
import { faCloud } from "@fortawesome/pro-solid-svg-icons/faCloud";
import { faFileLines } from "@fortawesome/pro-solid-svg-icons/faFileLines";
import { faImage } from "@fortawesome/pro-solid-svg-icons/faImage";
import { faLink } from "@fortawesome/pro-solid-svg-icons/faLink";
import { faDropbox } from "@fortawesome/free-brands-svg-icons/faDropbox";
import { faGoogleDrive } from "@fortawesome/free-brands-svg-icons/faGoogleDrive";

import { useState } from "react";

import {
  CFIconButton,
  CFTypography,
} from "~/components/third-party/ant-design";
import { CFDrawer } from "./third-party/CFDrawer";
import _ from "lodash";

import Gallery from "./gallary";

import NewFileList from "~/components/page/common/new-file";
import SelectOptions from "./SelectOptions";

import { CFCloseButton } from "./third-party/CFCloseButton";
import GoogleDrive from "./GoogleDrive";
import FileUploadByUrl from "./FileUploadedbyUrl";

interface FileSelectSideProps {
  fileSelect: any | "";
  setFileSelect: React.Dispatch<React.SetStateAction<any | "">>;
  options?: Array<string>;
  onSelected: (value: (any | Partial<any>)[]) => void;
  filterSelectedItems?: (items: any[]) => any[];
  galleryFilterTab?: any[];
}

const FileSelectSide = ({
  fileSelect,
  setFileSelect,
  options,
  onSelected,
  filterSelectedItems = (items) => items,
  galleryFilterTab,
}: FileSelectSideProps) => {
  const { isEmpty } = _;
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [gallaryList, setGallaryList] = useState<any[]>();
  const [items, setItems] = useState<Partial<any>[]>([]);
  const [isOpen, setIsOpen] = useState(true);

  const onAttech = (value: (any | Partial<any>)[]) => {
    setItems(value);
    onSelected(value);
    setSideMenuOpen(false);
    setIsOpen(false);
    console.log(value);
    onSelected(value);
    if (value.length === 0) {
    } else {
      setItems([]);
      setFileSelect("");
    }
  };
  const handleOpenPicker = () => {};

  return (
    <>
      <CFDrawer
        open={!isEmpty(fileSelect)}
        size={970}
        onClose={() => {
          setIsOpen(false);
          setFileSelect("");
        }}
        drawerBody="!h-screen !overflow-hidden "
      >
        <div className="sidebar-body ">
          <div className="flex">
            <div
              className={`w-60 md:min-w-[240px] md:max-w-[240px] md:relative absolute flex-[1_0_0%] z-20 ${
                sideMenuOpen
                  ? "h-screen w-full"
                  : "md:h-screen md:w-full w-0 h-0"
              }`}
            >
              <div
                className={`md:hidden block absolute bg-black/20 ${
                  sideMenuOpen ? "h-full w-full" : "h-0 w-0"
                }`}
                onClick={() => setSideMenuOpen(false)}
              ></div>
              <div
                className={`overflow-y-auto h-screen relative w-[240px] md:bg-gray-200/50 bg-gray-200 dark:bg-dark-800 transition-all ease-in-out duration-300 ${
                  sideMenuOpen ? "left-0" : "md:left-0 -left-[100%]"
                }`}
              >
                <SelectOptions
                  defaultOptions={selectOptions}
                  options={options}
                  selectedOption={fileSelect}
                  onClick={(value: string) => {
                    setFileSelect(value as any);
                    setItems([]);
                    if (value === "google") {
                      handleOpenPicker();
                    }
                  }}
                />
              </div>
            </div>

            <div className="flex w-full max-w-[735px] flex-[1_0_0%] overflow-hidden flex-col">
              <div className="md:px-4 pl-10 pr-5 py-2.5 border-b border-gray-300 dark:border-white/10 flex items-center relative justify-start">
                <CFIconButton
                  htmlType="button"
                  className={`md:hidden flex w-6 max-w-[24px] max-h-[24px] !absolute left-2.5`}
                  variant="text"
                  onClick={() => setSideMenuOpen((prev) => !prev)}
                >
                  <FontAwesomeIcon
                    className="text-base w-[18px] h-[18px] text-primary-gray-80 dark:text-white/90"
                    icon={faBars}
                  />
                </CFIconButton>
                <div className="flex items-center text-primary-900 dark:text-white/90">
                  <div className="flex items-center justify-center rounded-full mr-2.5 w-[30px] h-[30px] bg-gray-200/50 dark:bg-dark-500">
                    <FontAwesomeIcon
                      className="w-4 h-4 !text-primary-900 dark:!text-white/90"
                      icon={faFileImage}
                    />
                  </div>
                  <CFTypography
                    title="h5"
                    className="md:!text-[17px] !mb-0 !text-lg !text-primary-900 dark:!text-white/90"
                  >
                    Files & Photos
                  </CFTypography>
                </div>
                <div className="md:relative md:right-[18px] !absolute right-2.5">
                  <CFCloseButton
                    onClick={() => {
                      setIsOpen(false);
                      setFileSelect("");
                      setGallaryList([]);
                    }}
                    iconClassName="!w-[18px] !h-[18px]"
                  />
                </div>
              </div>
              {fileSelect === "new" ? (
                <NewFileList onAttech={onAttech} />
              ) : fileSelect === "gallery" ? (
                <Gallery
                  gallaryList={gallaryList ?? []}
                  setGallaryList={setGallaryList}
                  items={items}
                  setItems={setItems}
                  onAttech={onAttech}
                  filterSelectedItems={filterSelectedItems}
                  galleryFilterTab={galleryFilterTab}
                />
              ) : fileSelect === "google" ? (
                <GoogleDrive />
              ) : fileSelect === "dropbox" ? (
                <div className="text-center text-2xl mt-12">
                  {"Comming Soon"}
                </div>
              ) : fileSelect === "drive" ? (
                <div className="text-center text-2xl mt-12">
                  {"Comming Soon"}
                </div>
              ) : fileSelect === "url" ? (
                <FileUploadByUrl onAttech={onAttech} />
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </CFDrawer>
    </>
  );
};

export default FileSelectSide;

const selectOptions: any[] = [
  {
    name: "New Files",
    value: "new",
    icon: <FontAwesomeIcon className="w-5 h-5" icon={faFileLines} />,
  },
  {
    name: "Gallery",
    value: "gallery",
    icon: <FontAwesomeIcon className="w-5 h-5" icon={faImage} />,
  },
  {
    name: "Google Drive",
    value: "google",
    icon: <FontAwesomeIcon className="w-5 h-5" icon={faGoogleDrive} />,
  },
  {
    name: "Dropbox",
    value: "dropbox",
    icon: <FontAwesomeIcon className="w-5 h-5" icon={faDropbox} />,
  },
  {
    name: "OneDrive",
    value: "drive",
    icon: <FontAwesomeIcon className="w-5 h-5" icon={faCloud} />,
  },
  {
    name: "Add a URL",
    value: "url",
    icon: <FontAwesomeIcon className="w-5 h-5" icon={faLink} />,
  },
];
