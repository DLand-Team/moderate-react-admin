import { LoadingOutlined } from "@ant-design/icons";
import { Button, Result } from "antd";
import React, { useEffect, useState } from "react";
import { ROUTE_ID } from "src/router";
import { useFlat } from "src/service";
import { routerHelper } from "src/service";

const ErrPage: React.FC = () => {
    const { menuPermissions } = useFlat("authStore");
    const [isShowLoading, setIsShowLoading] = useState(true);
    useEffect(() => {
        if (menuPermissions) {
            setTimeout(() => {
                setIsShowLoading(false);
            }, 1000);
        } else {
            setTimeout(() => {
                setIsShowLoading(false);
            }, 20000);
        }
    }, [menuPermissions]);
    return (
        <div
            style={{
                display: "flex",
                width: "100%",
                height: "100%",
                alignContent: "center",
                justifyContent: "center",
            }}
        >
            {isShowLoading && (
                <LoadingOutlined
                    style={{
                        fontSize: "50px",
                    }}
                />
            )}
            {!isShowLoading && (
                <Result
                    status="404"
                    title="404"
                    subTitle="对不起，没有页面匹配当前url."
                    extra={
                        <Button
                            onClick={() => {
                                routerHelper.jumpTo(ROUTE_ID.Hello);
                            }}
                            type="primary"
                        >
                            返回首页
                        </Button>
                    }
                />
            )}
        </div>
    );
};
export default ErrPage;
