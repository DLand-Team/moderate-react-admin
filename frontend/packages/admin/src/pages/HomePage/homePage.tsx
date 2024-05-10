import KeepAliveOutlet from "src/common/hocs/keepAliveOutlet";
import themeProviderHoc from "src/common/hocs/themeHoc/themeHoc";
import { layoutMap } from "src/layouts";

const HomePage = () => {
	const Layout = layoutMap["LayoutA"];
	return (
		<Layout>
			<KeepAliveOutlet></KeepAliveOutlet>
		</Layout>
	);
};

export default themeProviderHoc(HomePage, {});
