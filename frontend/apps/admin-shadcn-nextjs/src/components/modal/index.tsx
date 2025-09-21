import { appHelper, useFlat } from "@/src/service";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./alert-dialog";

export function Modal() {
  const modalList = appHelper.getModalMap();
  const { updateModalStatus, modalData } = useFlat("appStore", {
    modalData: "IN",
  });

  return (
    <>
      {Object.keys(modalData).map((key) => {
        const { Content, Header, Footer } = modalList[key];
        return (
          <AlertDialog
            key={key}
            onOpenChange={(e) => {
              updateModalStatus({
                id: key,
                isShow: e,
              });
            }}
            open={true}
          >
            <AlertDialogContent
              onOverlayClick={() =>
                updateModalStatus({
                  id: key,
                  isShow: false,
                })
              }
            >
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
      })}
    </>
  );
}
