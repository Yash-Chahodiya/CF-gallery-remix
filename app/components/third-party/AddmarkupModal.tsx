import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ClientOnly } from "remix-utils/client-only";
import { lazy, Suspense } from "react";
const PdfExp = lazy(() => import("../PdfExp"));
import { faPaintbrushPencil } from "@fortawesome/pro-regular-svg-icons";
import { CFModal } from "./CFModal";
import ImageEditor from "../ImageEditor";

export interface AddMarkupProps {
  open: boolean;
  closeModalHandler: () => void;
  file: any;
  onSave: (savedImageData: any | any) => Promise<void>;
}

const AddMarkupModal = ({
  open,
  closeModalHandler,
  onSave,
  file,
}: AddMarkupProps) => {
  return (
    <CFModal
      open={open}
      size="100vw"
      modalBody="p-0"
      closeModalHandler={closeModalHandler}
      icon={
        <FontAwesomeIcon className="w-3.5 h-3.5" icon={faPaintbrushPencil} />
      }
      title="Markup"
      rootClassName="modal-root-z-index full-width-modal"
    >
      <div className="h-[calc(100vh-53px)] overflow-y-auto">
        {file?.is_image ? (
          <div className="py-4">
            <ImageEditor
              isImgEditorShown={open}
              onSave={onSave}
              closeImgEditor={closeModalHandler}
              source={file?.file_path?.split("?")?.[0] ?? ""}
            />
          </div>
        ) : (
          file?.file_ext === "pdf" && (
            <ClientOnly>
              {() => (
                <Suspense>
                  <PdfExp
                    file={{
                      file_path: file?.original_file_path || file?.file_path,
                      file_id: file?.image_id,
                      annotation_data: file?.annotation_data,
                    }}
                    onSave={(data: any) => {
                      onSave(data);
                    }}
                  />
                </Suspense>
              )}
            </ClientOnly>
          )
        )}
      </div>
    </CFModal>
  );
};

export default AddMarkupModal;
