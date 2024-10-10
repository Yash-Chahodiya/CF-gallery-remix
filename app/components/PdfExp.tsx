import { useEffect, useRef } from "react";
import WebViewer from "@pdftron/pdfjs-express";
import { CFPDFModal } from "./third-party/ant-design";

const PdfExp = ({
  fileUrl,
  punchListPdfExpOpen,
  setPunchListPdfExpOpen,
}: any) => {
  console.log(fileUrl);
  const viewer = useRef(null);

  useEffect(() => {
    if (typeof window == "undefined" || !punchListPdfExpOpen) return;
    //if pdf express viewer run ont he html file so change the webviewer on window and its not run the development server if run on rhe development server and show the pdfs so you need to remove the window
    (window as any).WebViewer(
      {
        path: "../public//webviewer/lib",
        initialDoc: fileUrl,
      },
      viewer.current
    );
  }, [fileUrl, punchListPdfExpOpen]);

  if (!punchListPdfExpOpen) return null;

  return (
    <CFPDFModal
      visible={punchListPdfExpOpen}
      className={"w-full"}
      onClose={() => {
        setPunchListPdfExpOpen(false);
        console.log("closed");
      }}
      width={1000}
      zindex={999}
      footer={
        <div
          className="webviewer w-full h-[calc(100vh-200px)]"
          ref={viewer}
        ></div>
      }
    />
  );
};

export default PdfExp;
