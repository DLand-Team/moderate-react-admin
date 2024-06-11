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
const PdfPage = lazy(
  () =>
    import(
      "plugins/moderate-plugin-pdf/pages/HomePage/CmsPage/PdfPage"
    ),
);
const MusicPage = lazy(
  () =>
    import(
      "plugins/moderate-plugin-music/pages/HomePage/CmsPage/MusicPage"
    ),
);
const ShikitorPage = lazy(
  () =>
    import(
      "plugins/moderate-plugin-shikitor/pages/HomePage/CmsPage/ShikitorPage"
    ),
);
//>>>PAGE_INPORT_SIGN<<<//

export const pageList = {
  WinboxPage,
  RivePage,
  MdPage,
  PdfPage,
  MusicPage,
  ShikitorPage,
  //>>>PAGE_SIGN<<<//
};
