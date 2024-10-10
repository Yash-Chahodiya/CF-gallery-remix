import { CFTypography } from "~/components/third-party/ant-design";

interface CommonCardWithBorderProps {
  cardTitle?: string;
  children: React.ReactNode | React.ReactNode[];
  className?: string;
  addGap?: boolean;
}

const CommonCardWithBorder = ({
  cardTitle,
  children,
  className = "",
  addGap = true,
}: CommonCardWithBorderProps) => {
  return (
    <>
      <div
        className={`border-primary-900 dark:!border-[#969696] border-l-2 rounded-lg px-4 py-4 bg-gray-100/60 dark:!bg-dark-600 ${className}`}
      >
        {cardTitle && (
          <CFTypography
            title="h5"
            className="text-base !mb-[15px] text-[#4B4B4B]"
          >
            {cardTitle}
          </CFTypography>
        )}
        <div className={`flex flex-col ${addGap ? "gap-5" : ""}`}>
          {children}
        </div>
      </div>
    </>
  );
};

export default CommonCardWithBorder;
