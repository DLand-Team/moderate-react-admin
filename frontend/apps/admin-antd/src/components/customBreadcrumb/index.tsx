import { Breadcrumb } from "antd";
import { useState, type JSX } from "react";
import { useTranslation } from "react-i18next";
import type { Location } from "react-router-dom";
import useLocationListen from "src/common/hooks/useLocationListen";
import { ROUTE_ID_KEY } from "src/router";
import { useFlat } from "src/service";
import { routerHelper } from "src/service";

const CustomBreadcrumb = () => {
  const [infoArr, setInfoArr] = useState<
    { id: string; title: string | JSX.Element }[]
  >([]);
  const { language } = useFlat("appStore");
  const { t } = useTranslation();
  useLocationListen(
    (location: Location) => {
      const { pathname } = location;
      const pathArr = pathname.split("/").filter((item) => {
        return item;
      });

      const temp2 = pathArr
        .map((path: string, index) => {
          const routeItem =
            routerHelper.getRoutItemConfigById(path as ROUTE_ID_KEY) || {};
          const { meta, index: isIndex } = routeItem;
          if (!meta?.title && isIndex && index == pathArr.length - 1) {
            return null;
          }
          return routeItem;
        })
        .filter((item) => item);
      setInfoArr(
        temp2.map((routeItem, index) => {
          const isLast = temp2.length - 1 == index;
          const { meta, path: pathStr, id } = routeItem || {};
          return {
            id: pathStr,
            title: isLast ? (
              t(meta?.title || "")
            ) : (
              <a
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  id && routerHelper.jumpToIndexChild(id);
                }}
              >
                {t(meta?.title || "")}
              </a>
            ),
          };
        }) as {
          id: string;
          title: JSX.Element;
        }[],
      );
    },
    [language],
  );

  return (
    <Breadcrumb items={infoArr} style={{ margin: "16px 10px" }}></Breadcrumb>
  );
};

export default CustomBreadcrumb;
