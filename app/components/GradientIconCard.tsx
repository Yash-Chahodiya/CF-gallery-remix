import { CFTypography } from "~/components/third-party/ant-design";
import SvgGradient from "./SvgGradient";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface HeaderProps {
  containerClassName?: string;
}

interface IconProps {
  icon?: IconProp;
  containerClassName?: string;
  id?: string;
  colors?: Array<string>;
}
interface GradientIconCardProps {
  title: string;
  headerProps?: HeaderProps;
  iconProps?: IconProps;
  children?: React.ReactNode | React.ReactNode[];
  headerRightButton?: React.ReactNode | React.ReactNode[];
  titleText?: string;
  rightSideClassName?: string;
  hideBorder?: boolean;
  onClickHeader?: (e: React.MouseEvent<HTMLDivElement>) => void;
  subTitle?: string;
  iconOuterClass?: string;
  className?: string;
}

const GradientIconCard = ({
  title,
  headerProps,
  iconProps,
  children,
  headerRightButton,
  hideBorder,
  titleText = "",
  className = "",
  rightSideClassName = "ml-auto",
  subTitle,
  iconOuterClass = "",
  onClickHeader = () => {},
}: GradientIconCardProps) => {
  return (
    <div className="flex items-center justify-between">
      <div
        className={`flex md:flex-row flex-col w-full group/header md:items-center items-start gap-2 relative justify-between before:absolute before:left-0 before:bottom-0 before:w-full before:h-px flex-wrap ${
          headerProps?.containerClassName ?? ""
        } ${
          !hideBorder &&
          "before:bg-[linear-gradient(90deg,#a5a5a53d_24%,#fafafa_100%)] dark:before:bg-[linear-gradient(90deg,#ffffff3d_24%,#3f4c6500_100%)] pb-2"
        }`}
        onClick={onClickHeader}
      >
        <div className="flex items-center">
          {iconProps?.icon ? (
            <div
              className={`flex items-center justify-center rounded-full w-[30px] h-[30px] flex-shrink-0 ${iconOuterClass} ${
                iconProps?.containerClassName ?? ""
              }`}
            >
              <SvgGradient
                className={className}
                id={iconProps?.id ?? ""}
                icon={iconProps?.icon}
                colors={
                  iconProps?.colors?.map((color: string, key: number) => {
                    return {
                      offset: `${
                        (100 / (iconProps?.colors?.length ?? 0)) * (key + 1)
                      }%`,
                      stopColor: color,
                    };
                  }) ?? []
                }
              />
            </div>
          ) : (
            <></>
          )}
          <div className="pl-2">
            <CFTypography
              className={`text-base !mb-0 font-semibold text-black dark:text-white/90 leading-[20px]  ${titleText}`}
            >
              title
            </CFTypography>
            {subTitle && (
              <CFTypography
                title="small"
                className="text-13 text-black dark:text-white/90"
              >
                subTitle
              </CFTypography>
            )}
          </div>
        </div>
        {headerRightButton && (
          <div className={`${rightSideClassName}`}>
            {headerRightButton ?? <></>}
          </div>
        )}
      </div>
      {children}
    </div>
  );
};

export default GradientIconCard;
