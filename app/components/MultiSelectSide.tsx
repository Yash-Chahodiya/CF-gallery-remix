import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup } from "@fortawesome/pro-regular-svg-icons/faUserGroup";
import { faBuildingCircleArrowRight } from "@fortawesome/pro-regular-svg-icons/faBuildingCircleArrowRight";
import { faUserLarge } from "@fortawesome/pro-regular-svg-icons/faUserLarge";
import { faBookOpenReader } from "@fortawesome/pro-regular-svg-icons/faBookOpenReader";
import { faUserHelmetSafety } from "@fortawesome/pro-regular-svg-icons/faUserHelmetSafety";
import { faPersonDigging } from "@fortawesome/pro-regular-svg-icons/faPersonDigging";
import { faAddressBook } from "@fortawesome/pro-regular-svg-icons/faAddressBook";
import { faPersonShelter } from "@fortawesome/pro-regular-svg-icons/faPersonShelter";
import { faBars } from "@fortawesome/pro-regular-svg-icons/faBars";
import { faIdBadge } from "@fortawesome/pro-regular-svg-icons/faIdBadge";
import { faUserVneck } from "@fortawesome/pro-regular-svg-icons/faUserVneck";
import {
  CFIconButton,
  notificationApi,
} from "~/components/third-party/ant-design";
import { useEffect, useMemo, useState } from "react";
// import { defaultConfig } from "~/data";
import _ from "lodash";
import SelectOptions from "./SelectOptions";
// import CustomerSelectBody from "./body";

// import SidebarSelectHeader from "../header";
// import { useExistingCustomers } from "./zustand";
// import AddMultiselectDirectorySide from "../../add-multiselect-directory";
// import {
//   getDirectaryIdByKey,
//   resetCustomerFilter,
//   setExistingCustomers,
//   setExistingCustomersFromApi,
// } from "./zustand/action";
// import { getGConfig, getGUser, useGModules } from "~/zustand";
import { CFDrawer } from "./third-party/CFDrawer";
import { CFCloseButton } from "./third-party/CFCloseButton";

interface MultiSelectSideProps {
  buttonText?: string;
  selectedOption: any | "";
  setSelectedOption: (selectedOption: any | "") => void;
  onSelected: (value: Partial<any> | Array<Partial<any>>) => void;
  options?: any[];
  isMail?: boolean;
  singleSelecte: boolean;
  data?: Partial<any> | Partial<any>[];
  closeDrawer?: () => void;
  resetAgencySelected?: number | null;
  showDirectoryContact?: boolean;
}
let isFetching = false;
const MultiSelectSide = ({
  buttonText = "Save",
  selectedOption,
  setSelectedOption,
  onSelected,
  options,
  isMail = false,
  singleSelecte = false,
  data,
  closeDrawer = () => {},
  resetAgencySelected,
  showDirectoryContact = true,
}: MultiSelectSideProps) => {
  const { isArray, isEmpty } = _;
  const [items, setItems] = useState<Partial<any>[]>([]);
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [isOpen, setOpen] = useState(true);
  const [addMultiselectDirectoryOpen, setAddMultiselectDirectoryOpen] =
    useState(false);
  const [currentSelected, setCurrentSelected] = useState<any>();
  //   const gUser: any = getGUser();
  //   const gConfig: any = getGConfig();

  //   const { getGModule, checkModuleAccess } = useGModules();
  //   let { getExistingUsers } = useExistingCustomers();
  //   const { setNotify }: { setNotify: any } = notificationApi();

  const sidebarOpen = useMemo(() => !isEmpty(selectedOption), [selectedOption]);

  const setUniqueItems = (data: Partial<any>[]) => {
    setItems((prev) => {
      return [
        ...prev,
        ...(data?.filter(
          (dataItem) =>
            !Boolean(prev?.find((item) => item?.user_id === dataItem?.user_id))
        ) ?? []),
      ];
    });
  };

  useEffect(() => {
    if (sidebarOpen) {
      let userIds: number[] = [];
      if (Array.isArray(data)) {
        userIds = data
          ?.map((customerData) => customerData?.user_id)
          ?.filter((userId: number | undefined) => userId) as number[];
      } else if (!isEmpty(data)) {
        userIds = data?.user_id ? [data?.user_id] : [];
      }

      if (userIds?.length > 0) {
        const tempExistingUsers: any[] = [109871, 109872];
        if (tempExistingUsers?.length > 0) {
          setUniqueItems(tempExistingUsers);
        }
        const tempUserIds = userIds?.filter(
          (userId) =>
            !Boolean(
              tempExistingUsers?.find(
                (existingUser) => existingUser?.user_id === userId
              )
            )
        );
        if (tempUserIds?.length > 0 && !isFetching) {
          isFetching = true;
          let directoryIds: number[] = [];

          //   if (options && options?.length > 0) {
          //     directoryIds = options
          //       ?.map((option) => getDirectaryIdByKey(option, gConfig))
          //       ?.filter((optionId) => Boolean(optionId));
          //   } else {
          //     directoryIds = [
          //       gConfig?.employee_id,
          //       gConfig?.customer_id,
          //       gConfig?.contractor_id,
          //       gConfig?.vendor_id,
          //       gConfig?.misc_contact_id,
          //       gConfig?.lead_id,
          //     ]?.filter((optionId) => Boolean(optionId));
          //   }
          //   setExistingCustomersFromApi({
          //     setNotify,
          //     callComplete: () => {
          //       isFetching = false;
          //     },

          //     setUnique: setUniqueItems,
          //     directoryIds,
          //     tempUserIds,
          //   });
        }
      }
    }
  }, [data, sidebarOpen]);

  useEffect(() => {
    if (
      typeof data === "undefined" ||
      (Array.isArray(data) && data.length === 0) ||
      resetAgencySelected
    ) {
      setItems([]);
    }
  }, [data, resetAgencySelected]);

  const onClickItem = (value: Partial<any>) => {
    setItems((prev: Partial<any>[]) => {
      const itemExists = prev?.some(
        (selectedItem: Partial<any>) =>
          selectedItem &&
          value &&
          selectedItem.user_id === value.user_id &&
          selectedItem.contact_id === value.contact_id
      );
      if (singleSelecte) {
        if (itemExists) {
          onSave([]);
        } else {
          onSave(value);
          return [value];
        }
      }
      if (itemExists) {
        return prev?.filter(
          (selectedItem: Partial<any>) =>
            selectedItem?.user_id !== value?.user_id
        );
      } else {
        return [...prev, value];
      }
    });
  };

  const onSave = (value: Partial<any> | Array<Partial<any>>) => {
    // if (Array.isArray(value)) {
    //   setExistingCustomers(value as any[]);
    // } else if (!isEmpty(value)) {
    //   setExistingCustomers([value as any]);
    // }
    onSelected(value);
    setSideMenuOpen(false);
    setItems([]);

    setSelectedOption("");
    // resetCustomerFilter();
  };

  const selectedData = useMemo(
    () =>
      items?.filter((item) =>
        Array.isArray(data)
          ? Boolean(
              data?.find((dataItem) => dataItem?.user_id === item?.user_id)
            )
          : data?.user_id === item.user_id
      ),
    [data, items]
  );

  const optionsModuleIds: Partial<any> = {
    contractor: 24,
    customer: 22,
    employee: 23,
    lead: 71,
    misc_contact: 38,
    vendor: 25,
  };

  const defaultOptions = useMemo(
    () =>
      customerSelectOptions
        .filter((dataItem: any) => {
          const optionId = optionsModuleIds?.[dataItem.value];
          if (optionId) {
            // const gModule = getGModule(optionId);
            // return gModule?.hide_tab_in_directory_popup?.toString() === "0";
          }
          return true;
        })
        .map((dataItem: any) => {
          const optionId = optionsModuleIds?.[dataItem.value];
          if (optionId) {
            // const moduleAccess: any =
            //   checkModuleAccess(optionId);
            // if (moduleAccess !== "no_access") {
            //   return {
            //     ...dataItem,
            //     addButton: moduleAccess !== "read_only",
            //   };
            // }
          }
          return dataItem;
        }),
    []
  );

  useEffect(() => {
    setCurrentSelected(
      defaultOptions?.find((option) => selectedOption === option?.value)
    );
  }, [defaultOptions, selectedOption, setCurrentSelected]);

  return (
    <>
      <CFDrawer
        open={sidebarOpen}
        size={1210}
        onClose={() => setSideMenuOpen(false)}
        drawerBody="!h-screen !overflow-hidden"
      >
        <div className="sidebar-body">
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
                {!isEmpty(selectedOption) && (
                  <SelectOptions
                    defaultOptions={defaultOptions}
                    options={options}
                    selectedOption={selectedOption}
                    // addFunction={addFunction}
                    addFunction={() => setAddMultiselectDirectoryOpen(true)}
                    onClick={(value: any) => {
                      setSelectedOption(value);
                    }}
                  />
                )}
              </div>
            </div>
            <div className="flex flex-[1_0_0%] overflow-hidden flex-col">
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
                {currentSelected && (
                  //   <SidebarSelectHeader
                  //     currentSelected={currentSelected}
                  //     headerTitle="Select Contact"
                  //     headerTitleIcon={faIdBadge}
                  //   />
                  <div>SelectSidebarheader</div>
                )}
                <div className="md:relative md:right-[18px] !absolute right-2.5">
                  <CFCloseButton
                    onClick={() => {
                      setSelectedOption("");
                      //   resetCustomerFilter();
                      closeDrawer();
                      setItems([]);
                    }}
                    iconClassName="!w-[18px] !h-[18px]"
                  />
                </div>
              </div>
              {!isEmpty(selectedOption) &&
                customerSelectOptions?.some(
                  (selectOption: any) =>
                    selectOption?.value === selectedOption &&
                    options?.includes(selectOption?.value)
                ) && (
                  //   <CustomerSelectBody
                  //     selectedOption={selectedOption}
                  //     onClickItem={onClickItem}
                  //     items={items}
                  //     onSave={onSave}
                  //     singleSelecte={singleSelecte}
                  //     selectedData={selectedData}
                  //     buttonText={buttonText}
                  //     currentSelected={currentSelected}
                  //     isMail={isMail}
                  //     showDirectoryContact={showDirectoryContact}
                  //   />
                  <div className="flex flex-col gap-2.5"></div>
                )}
            </div>
          </div>
        </div>
      </CFDrawer>
      {!isEmpty(currentSelected) && (
        // <AddMultiselectDirectorySide
        //   setAddMultiselectDirectoryOpen={setAddMultiselectDirectoryOpen}
        //   addMultiselectDirectoryOpen={addMultiselectDirectoryOpen}
        //   selectOption={currentSelected}
        //   onClickItem={onClickItem}
        // />
        <div></div>
      )}
    </>
  );
};

export default MultiSelectSide;

export const customerSelectOptions: any[] = [
  {
    name: "All",
    value: "all",
    icon: <FontAwesomeIcon className={"w-5 h-5"} icon={faIdBadge} />,
    displayIcon: (
      <FontAwesomeIcon
        className={"w-4 h-4 text-primary-900 dark:text-white/90"}
        icon={faIdBadge}
      />
    ),
    addButton: false,
  },
  {
    name: "Employees",
    addTooltipContent: "Employee",
    // value: defaultConfig.employee_key,
    icon: <FontAwesomeIcon className="w-5 h-5" icon={faUserVneck} />,
    displayIcon: (
      <FontAwesomeIcon
        className="w-4 h-4 text-primary-900 dark:text-white/90"
        icon={faUserVneck}
      />
    ),
    addButton: false,
  },
  {
    name: "My Crew",
    value: "my_crew",
    icon: <FontAwesomeIcon className="w-5 h-5" icon={faUserGroup} />,
    displayIcon: (
      <FontAwesomeIcon
        className="w-[18px] h-[18px] text-primary-900 dark:text-white/90"
        icon={faUserGroup}
      />
    ),
    addButton: false,
  },
  {
    name: "Customers",
    addTooltipContent: "Customer",
    // value: defaultConfig.customer_key,
    icon: <FontAwesomeIcon className="w-5 h-5" icon={faUserLarge} />,
    displayIcon: (
      <FontAwesomeIcon
        className="w-4 h-4 text-primary-900 dark:text-white/90"
        icon={faUserLarge}
      />
    ),
    addButton: false,
  },
  {
    name: "Leads",
    addTooltipContent: "Lead",
    // value: defaultConfig.lead_key,
    icon: <FontAwesomeIcon className="w-5 h-5" icon={faBookOpenReader} />,
    displayIcon: (
      <FontAwesomeIcon
        className="w-4 h-4 text-primary-900 dark:text-white/90"
        icon={faBookOpenReader}
      />
    ),
    addButton: false,
  },
  {
    name: "Contractors",
    addTooltipContent: "Contractor",
    // value: defaultConfig.contractor_key,
    icon: <FontAwesomeIcon className="w-5 h-5" icon={faUserHelmetSafety} />,
    displayIcon: (
      <FontAwesomeIcon
        className="w-4 h-4 text-primary-900 dark:text-white/90"
        icon={faUserHelmetSafety}
      />
    ),
    addButton: false,
  },
  {
    name: "Vendors",
    addTooltipContent: "Vendor",
    // value: defaultConfig.vendor_key,
    icon: <FontAwesomeIcon className="w-5 h-5" icon={faPersonDigging} />,
    displayIcon: (
      <FontAwesomeIcon
        className="w-5 h-5 text-primary-900 dark:text-white/90"
        icon={faPersonDigging}
      />
    ),
    addButton: false,
  },
  {
    name: "Misc. Contacts",
    addTooltipContent: "Misc. Contact",
    // value: defaultConfig.misc_contact_key,
    icon: <FontAwesomeIcon className="w-5 h-5" icon={faAddressBook} />,
    displayIcon: (
      <FontAwesomeIcon
        className="w-4 h-4 text-primary-900 dark:text-white/90"
        icon={faAddressBook}
      />
    ),
    addButton: false,
  },
  {
    name: "By Service",
    value: "by_service",
    icon: <FontAwesomeIcon className="w-5 h-5" icon={faPersonShelter} />,
    displayIcon: (
      <FontAwesomeIcon
        className="w-4 h-4 text-primary-900 dark:text-white/90"
        icon={faPersonShelter}
      />
    ),
    addButton: false,
  },
  {
    name: "My Project",
    value: "my_project",
    icon: (
      <FontAwesomeIcon className="w-5 h-5" icon={faBuildingCircleArrowRight} />
    ),
    displayIcon: (
      <FontAwesomeIcon
        className="w-4 h-4 text-primary-900 dark:text-white/90"
        icon={faBuildingCircleArrowRight}
      />
    ),
    addButton: false,
  },
];
