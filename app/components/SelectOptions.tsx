import { faPlus } from "@fortawesome/pro-regular-svg-icons/faPlus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "lodash";
import { useEffect, useState } from "react";
// import { useTranslation } from "~/hook";
import {
  CFButton,
  CFIconButton,
  CFTooltip,
} from "~/components/third-party/ant-design";

interface SelectOptionsProps<TData> {
  defaultOptions: any[];
  options?: Array<TData>;
  addFunction?: React.MouseEventHandler;
  onClick?: (value: TData) => void;
  selectedOption: TData;
  themeSidebar?: boolean;
}

function SelectOptions<TData>({
  defaultOptions,
  options,
  addFunction = () => {},
  onClick = () => {},
  selectedOption,
  themeSidebar = false,
}: SelectOptionsProps<TData>) {
  const { isArray, isEmpty } = _;
  const [oprionsList, setOprionsList] = useState<any[]>([]);
  //   const { _t } = useTranslation();

  useEffect(() => {
    if (!isEmpty(selectedOption)) {
      const tempOprion = defaultOptions?.filter(
        (selectOption: any) =>
          !(
            options &&
            options?.length > 0 &&
            !options?.includes(selectOption?.value)
          )
      );
      setOprionsList(tempOprion);
      if (
        !isEmpty(tempOprion) &&
        !Boolean(
          tempOprion?.find(
            (selectOption: any) => selectOption?.value === selectedOption
          )
        )
      ) {
        onClick(tempOprion[0]?.value);
      }
    }
  }, [defaultOptions, options, selectedOption]);

  return (
    <>
      <ul className="py-[18px] md:pt-[18px] pt-9 pl-[18px] flex flex-col gap-2.5">
        {oprionsList?.map((selectOptions: any, key: number) => (
          <li
            className={`flex items-center rounded-l-lg hover:bg-[linear-gradient(90deg,#3f4c653d_24%,#3f4c6500_100%)] dark:hover:bg-[linear-gradient(90deg,#343f54_24%,#1e2732_100%)] ${
              themeSidebar
                ? selectOptions?.value === selectedOption
                  ? "!bg-[linear-gradient(90deg,#34496F_0%,#243556_100%)] dark:!bg-[linear-gradient(90deg,#2b323b_0%,#131d27_100%)]"
                  : ""
                : selectOptions?.value === selectedOption
                ? "bg-[linear-gradient(90deg,#3f4c653d_24%,#3f4c6500_100%)] dark:bg-[linear-gradient(90deg,#343f54_24%,#1e2732_100%)]"
                : ""
            }`}
            key={key}
          >
            <CFButton
              variant="default"
              className={`w-full !border-0 !h-full rounded-none rounded-l-lg text-primary-900 dark:text-white/90 font-normal capitalize py-4 pl-3.5 !pr-0 flex items-center gap-2.5 !bg-transparent hover:!bg-transparent hover:!shadow-none ${
                themeSidebar && "!text-white/90"
              }`}
              onClick={() => onClick(selectOptions?.value)}
            >
              <div
                className={`w-[30px] flex justify-center text-primary-900/60 dark:text-white/60`}
              >
                {selectOptions?.icon}
              </div>
              {selectOptions?.name || ""}
            </CFButton>
            {selectOptions?.addButton &&
            selectOptions?.value === selectedOption ? (
              <CFTooltip
                content={`Add ${selectOptions?.addTooltipContent ?? ""}`}
                placement="top"
              >
                <CFIconButton
                  htmlType="button"
                  className={`w-10 !rounded-none h-[52px] min-h-[52px] hover:!bg-transparent active:!bg-transparent`}
                  variant="text"
                  onClick={addFunction}
                >
                  <FontAwesomeIcon
                    className="text-base w-5 h-5 text-primary-gray-80 dark:text-white/90"
                    icon={faPlus}
                  />
                </CFIconButton>
              </CFTooltip>
            ) : (
              <></>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}

export default SelectOptions;
