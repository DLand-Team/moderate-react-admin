import { Outlet } from "react-router-dom";
import themeProviderHoc from "src/common/hocs/themeHoc/themeHoc";
// import Layout from "./layouts/layout-1";
import Layout2 from "../../layouts/Layout-2";

const HomePage = () => {
	return (
		<Layout2>
			<Outlet />
		</Layout2>
	);
};

export default themeProviderHoc(HomePage, {});
