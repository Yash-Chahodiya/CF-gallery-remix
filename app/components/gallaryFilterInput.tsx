import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faChevronDown } from "@fortawesome/pro-regular-svg-icons/faChevronDown";
import { faCircleXmark } from "@fortawesome/pro-solid-svg-icons/faCircleXmark";

import { CFTooltip } from "./third-party/ant-design";
import ButtonField from "./third-party/ButtonField";

const GallaryFilterInput = ({
  value,
  onClick,
  onReset,
  label,
  placeholder,
}: any) => {
  return (
    <div className="flex group/gallary-filter items-center relative py-1 px-2.5 bg-[#E4ECF6] dark:bg-dark-400 rounded text-xs text-primary-900 dark:text-white/90 md:max-w-[50%]">
      <div className="flex items-center gap-1 gallery-filter-block">
        <ButtonField
          label={label}
          labelClass="!p-0 !w-fit !text-primary-900"
          labelPlacement="left"
          placeholder={placeholder}
          spanWidthClass="max-w-[186px] w-full"
          inputClassName="before:hidden"
          fieldClassName="max-w-[200px]"
          className="hover:!bg-transparent focus:!bg-transparent focus-within:!bg-transparent !h-5 px-0"
          children={value}
          value={value}
          onClick={onClick}
          addonBefore={
            <FontAwesomeIcon
              className="w-3 h-3 ml-0.5 sm:opacity-0 group-hover/gallary-filter:opacity-100"
              icon={faChevronDown}
            />
          }
        />
      </div>
      {value && (
        <CFTooltip title="Clear Filter" placement="top">
          <div
            className="absolute -top-1 -right-1 bg-white w-4 h-4 text-primary-900 rounded-full flex items-center justify-center cursor-pointer sm:opacity-0 group-hover/gallary-filter:opacity-100"
            onClick={onReset}
          >
            <FontAwesomeIcon
              className="w-3.5 h-3.5 text-primary-900"
              icon={faCircleXmark}
            />
          </div>
        </CFTooltip>
      )}
    </div>
  );
};

export default GallaryFilterInput;
