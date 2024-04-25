import { Outlet } from "react-router-dom";
import themeProviderHoc from "src/common/hocs/themeHoc/themeHoc";
import { layoutMap } from "src/layouts";

const HomePage = () => {
	const Layout = layoutMap["LayoutA"];
	return (
		<Layout>
			<Outlet />
		</Layout>
	);
};

export default themeProviderHoc(HomePage, {});
