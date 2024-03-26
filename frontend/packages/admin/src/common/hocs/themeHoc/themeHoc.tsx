import { ConfigProvider, ThemeConfig } from "antd";

const themeHoc = (Comp: React.FC, theme: ThemeConfig) => {
	return (props: any) => {
		return (
			<ConfigProvider theme={theme}>
				<Comp {...props} />
			</ConfigProvider>
		);
	};
};

export default themeHoc;
