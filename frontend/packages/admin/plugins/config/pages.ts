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
		import("plugins/moderate-plugin-rive/pages/HomePage/CmsPage/RivePage"),
);

const PdfPage = lazy(
	() => import("plugins/moderate-plugin-pdf/pages/HomePage/CmsPage/PdfPage"),
);
const MdPage = lazy(
	() =>
		import(
			"plugins/moderate-plugin-markdown/pages/HomePage/CmsPage/MdPage"
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

const LiteFlowEditorPage = lazy(
	() =>
		import(
			"plugins/moderate-plugin-LiteFlowEditor/pages/HomePage/CmsPage/LiteFlowEditorPage"
		),
);
//>>>PAGE_INPORT_SIGN<<<//

export const pageList = {
	WinboxPage,
	RivePage,
	PdfPage,
	MdPage,
	MusicPage,
	ShikitorPage,
	LiteFlowEditorPage,
	//>>>PAGE_SIGN<<<//
};
