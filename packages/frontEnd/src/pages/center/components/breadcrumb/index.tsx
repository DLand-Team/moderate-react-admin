import "react";
import { Breadcrumb } from "antd";
import routeConfig from "@/router/config";
import type { Location } from "react-router-dom";
import useLocationListen from "@/common/hooks/useLocationListen";
import { useState } from "react";

export default () => {
  const [infoArr, setInfoArr] = useState<{ id: string; info: string }[]>([]);
  useLocationListen((location: Location) => {
    const { pathname } = location;
    let temp = pathname.split("/").filter((item) => {
      return item;
    });
    let temp2 = temp.map((item) => {
        return {
          id: item,
          info: routeConfig[item]?.meta?.title,
        };
      })
      
    setInfoArr(
        temp2
    );
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
