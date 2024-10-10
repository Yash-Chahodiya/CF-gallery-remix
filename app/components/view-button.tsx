import { isValidURL } from "~/helpers/helper";

interface ViewButtonProps {
  isImage?: boolean;
  filePath?: string;
}

const ViewButton = ({ isImage, filePath }: ViewButtonProps) => {
  return (
    <>
      {isValidURL(filePath ?? "") && (
        <a
          href={filePath}
          download={!isImage}
          className={`bg-white hover:!bg-deep-orange-500 text-black hover:text-white flex items-center justify-center w-12 text-13 rounded h-6 max-w-[62px] hover:shadow-primary-500 ${
            isImage ? "light-gallery" : ""
          }`}
        >
          View
          <img src={filePath} className="hidden" />
        </a>
      )}
    </>
  );
};

export default ViewButton;
