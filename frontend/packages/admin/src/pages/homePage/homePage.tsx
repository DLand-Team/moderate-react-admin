import { Outlet } from "react-router-dom";
import themeProviderHoc from "src/common/hocs/themeHoc/themeHoc";
import Layout from "./layout";

const HomePage = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default themeProviderHoc(HomePage, {});
