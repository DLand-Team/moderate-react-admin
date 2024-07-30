//@ts-ignore
import { lazy } from "react";

const WinboxPage = lazy(
  () =>
    import(
      "plugins/moderate-plugin-winbox/pages/HomePage/CmsPage/WinboxPage"
    ),
);
const RivePage = lazy(
  () =>
    import(
      "plugins/moderate-plugin-rive/pages/HomePage/CmsPage/RivePage"
    ),
);

const PdfPage = lazy(
  () =>
    import(
      "plugins/moderate-plugin-pdf/pages/HomePage/CmsPage/PdfPage"
    ),
);
//>>>PAGE_INPORT_SIGN<<<//

export const pageList = {
  WinboxPage,
  RivePage,
  PdfPage,
  //>>>PAGE_SIGN<<<//
};
