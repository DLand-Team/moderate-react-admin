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

const MdPage = lazy(
  () =>
    import(
      "plugins/moderate-plugin-markdown/pages/HomePage/CmsPage/MdPage"
    ),
);
//>>>PAGE_INPORT_SIGN<<<//

export const pageList = {
  WinboxPage,
  RivePage,
  MdPage,
  //>>>PAGE_SIGN<<<//
};
