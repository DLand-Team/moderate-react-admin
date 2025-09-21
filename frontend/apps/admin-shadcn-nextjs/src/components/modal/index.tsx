import { appHelper, useFlat } from "@/src/service";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./alert-dialog";

export function Modal() {
  const { isShowModal, modalContentId, setIsShowModal } = useFlat("appStore");
  const { Content, Header, Footer } =
    appHelper.getModalContent({
      modalContentId,
    }) || {};
  return (
    <AlertDialog
      onOpenChange={(e) => {
        setIsShowModal(e);
      }}
      open={isShowModal}
    >
      <AlertDialogContent onOverlayClick={() => setIsShowModal(false)}>
        <AlertDialogHeader>
          <AlertDialogTitle>{Header}</AlertDialogTitle>
        </AlertDialogHeader>
        {Content}
        {Footer || (
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Ok</AlertDialogAction>
          </AlertDialogFooter>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}
