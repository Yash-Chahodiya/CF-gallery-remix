import React, { lazy, Suspense } from "react";

const LazyFilerobotImageEditor = lazy(
  () => import("react-filerobot-image-editor")
);

import { FilerobotImageEditorConfig } from "react-filerobot-image-editor";
import { Spin } from "./third-party/Spin";
/**
 * This is ImageEditor reuse common components and User can perform some operation on img
 * @param param0
 * @returns JSX
 * Reference
 * Github Link => https://github.com/scaleflex/filerobot-image-editor?tab=readme-ov-file#react-component
 * Sit Link => https://scaleflex.github.io/filerobot-image-editor/
 * Demo link https://codesandbox.io/p/sandbox/react-image-editor-filerobot-forked-pq25qk?file=%2Fsrc%2FApp.js%3A2%2C1-5%2C39
 */

type moreSaveOptions = FilerobotImageEditorConfig["moreSaveOptions"];
const ImageEditor: React.FunctionComponent<any> = ({
  isImgEditorShown,
  closeImgEditor,
  onSave,
  source,
}) => {
  const moreOpt: moreSaveOptions = [
    {
      label: "Save this image",
      onClick: (_, triggerSave: any) => {
        // ! There is no type defind in library that's why used any
        triggerSave(async (...args: any) => {
          await onSave(args[0]);
        });
      },
      icon: "",
    },
    {
      label: "Save as new version",
      onClick: (triggerSaveModal: any) => {
        // ! There is no type defind in library that's why used any
        triggerSaveModal(async (...args: any) => {
          await onSave(args[0]);
        });
      },
      icon: "",
    },
  ];

  return (
    isImgEditorShown && (
      <Suspense fallback={<Spin />}>
        <LazyFilerobotImageEditor
          source={`${source}?v=${new Date().valueOf()}`}
          onSave={onSave}
          onClose={closeImgEditor}
          annotationsCommon={{
            fill: "#000000",
          }}
          moreSaveOptions={moreOpt}
          Text={{ text: "Text..." }}
          Rotate={{ angle: 90, componentType: "slider" }}
          tabsIds={[
            "Adjust",
            "Annotate",
            "Watermark",
            "Filters",
            "Finetune",
            "Resize",
          ]}
          defaultTabId="Annotate"
          defaultToolId="Text"
          disableSaveIfNoChanges={true}
          savingPixelRatio={4}
          previewPixelRatio={window.devicePixelRatio}
          closeAfterSave={false}
          removeSaveButton={false}
        />
      </Suspense>
    )
  );
};

export default ImageEditor;
