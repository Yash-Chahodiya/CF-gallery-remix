import { memo, useEffect, useState } from "react";

// fortawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuildingCircleArrowRight } from "@fortawesome/pro-light-svg-icons/faBuildingCircleArrowRight";

// antd
import { CFTypography } from "~/components/third-party/ant-design";
import { CFDrawer } from "./third-party/CFDrawer";
import { CFCloseButton } from "~/components/third-party/ant-design";

//custom hook
// import { useTranslation } from "~/hook";

// lodash

// Zustand
// import { setExistingProjects } from "~/zustand";

// Component body
// import MultiProjectSelectBody from "./body";

const MultiProjectSelectSide = ({
  setOpen,
  open,
  isShowProjectType = false,
  searchInputProps = {},
  projectApiParams = {},
  sidebarProps = {},
  buttonProps = {},
  ...props
}: any) => {
  //   const { _t } = useTranslation();

  const { placeholder = "Search Projects" } = searchInputProps;
  const { record_type = "project", is_completed = false } = projectApiParams;
  const { children = "Save" } = buttonProps;
  const { label = "Select Project" } = sidebarProps;

  const [items, setItems] = useState<Array<Partial<any>>>([]);

  useEffect(() => {
    if (props && open) {
      if (props.mode === "single") {
        if (props.data) {
          setItems([props.data]);
        } else {
          setItems([]);
        }
      } else {
        setItems(props.data || []);
      }
    } else {
      setItems([]);
    }
  }, [props.mode, props.data, open]);

  const onClickItem = (value: Partial<any> = {}) => {
    setItems((prev: Partial<any>[]) => {
      const itemExists = prev.some(
        (selectedItem: Partial<any> = {}) => selectedItem.id === value.id
      );
      if (props.mode === "single") {
        if (itemExists) {
          onSave([]);
        } else {
          onSave(value);
          return [value];
        }
      }
      if (itemExists) {
        return prev.filter(
          (selectedItem: Partial<any> = {}) => selectedItem.id !== value.id
        );
      } else {
        return [...prev, value];
      }
    });
  };

  const onSave = (value: Partial<any> | Array<Partial<any>>) => {
    // if (Array.isArray(value)) {
    //   setExistingProjects(value as any[]);
    // } else if (!isEmpty(value)) {
    //   setExistingProjects([value as any]);
    // }

    if (props.mode === "single" && !Array.isArray(value)) {
      props.onSelected(value);
    } else if (Array.isArray(value)) {
      props.onSelected(value);
    } else {
      props.onSelected([]);
    }
    setOpen(false);
    setItems([]);
  };

  return (
    <>
      <CFDrawer
        open={open}
        size={970}
        onClose={() => setOpen(false)}
        drawerBody="!h-screen !overflow-hidden"
      >
        <div className="sidebar-body">
          <div className="flex">
            <div className="flex flex-[1_0_0%] overflow-hidden flex-col">
              <div className="md:px-4 pl-10 pr-5 py-2.5 border-b border-gray-300 dark:border-white/10 flex items-center relative justify-start">
                <div className="flex items-center text-primary-900 dark:text-white/90">
                  <div className="flex items-center justify-center rounded-full mr-2.5 w-[30px] h-[30px] bg-gray-200/50 dark:bg-dark-500">
                    <FontAwesomeIcon
                      className="w-4 h-4 text-primary-900 dark:text-white/90"
                      icon={faBuildingCircleArrowRight}
                    />
                  </div>
                  <CFTypography
                    title="h5"
                    className="!text-[17px] !mb-0 !text-primary-900 dark:!text-white/90"
                  >
                    {label}
                  </CFTypography>
                </div>
                <div className="md:relative md:right-[18px] !absolute right-2.5">
                  <CFCloseButton
                    onClick={() => {
                      setOpen(false);
                      setItems([]);
                    }}
                    iconClassName="!w-[18px] !h-[18px]"
                  />
                </div>
              </div>
              {/* {open && (
                <MultiProjectSelectBody
                  selectedData={props.data}
                  onClickItem={onClickItem}
                  items={items}
                  mode={props.mode}
                  isShowProjectType={isShowProjectType}
                  projectApiParams={{
                    ...projectApiParams,
                    record_type,
                    is_completed,
                  }}
                  buttonProps={{
                    ...buttonProps,
                    children,
                    onClick: () => onSave(items),
                  }}
                  searchInputProps={{
                    placeholder,
                  }}
                />
              )} */}
            </div>
          </div>
        </div>
      </CFDrawer>
    </>
  );
};

export default memo(MultiProjectSelectSide);
