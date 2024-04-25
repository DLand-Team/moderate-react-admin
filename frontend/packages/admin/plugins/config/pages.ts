//@ts-ignore
import { lazy } from "react";

const PdfPage = lazy(
  () => import("plugins/moderate-plugin-pdf/pages/HomePage/CmsPage/PdfPage")
);
const WinboxPage = lazy(
  () =>
    import("plugins/moderate-plugin-winbox/pages/HomePage/CmsPage/WinboxPage")
);
//>>>PAGE_INPORT_SIGN<<<//

export const pageList = {
  PdfPage,
  WinboxPage,
  //>>>PAGE_SIGN<<<//
};
