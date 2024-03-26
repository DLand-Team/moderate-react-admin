import useLocationListen from "@/common/hooks/useLocationListen";
import { routerHelper } from "@/services";
import { Breadcrumb } from "antd";
import { useState } from "react";
import type { Location } from "react-router-dom";

const BreadcrumbComp = () => {
  const [infoArr, setInfoArr] = useState<{ id: string; info: string }[]>([]);
  useLocationListen((location: Location) => {
    const { pathname } = location;
    const pathArr = pathname.split("/").filter((item) => {
      return item;
    });
    const temp2 = pathArr.map((path: string) => {
      const info = routerHelper.getRouteTitleByKey(path);
      return {
        id: path,
        info: info,
      };
    });
    setInfoArr(temp2);
  });

  return (
    <Breadcrumb style={{ margin: "16px 0" }}>
      {infoArr.map((item) => {
        const { info, id } = item;
        return <Breadcrumb.Item key={id}>{info}</Breadcrumb.Item>;
      })}
    </Breadcrumb>
  );
};

export default BreadcrumbComp;
