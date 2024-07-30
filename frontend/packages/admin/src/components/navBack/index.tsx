import { LeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { ComponentType } from "react";
import { appHelper, routerHelper } from "src/service";

export interface NavBackProps {
    render?: ComponentType;
    handleClick?: () => void;
}

const NavBack = (props: NavBackProps) => {
    const {
        handleClick,
        render = () => {
            return (
                <>
                    <LeftOutlined />
                    Back
                </>
            );
        },
    } = props;
    const Comp = render;
    return (
        <Button
            type="link"
            style={{
                margin: "12px 0px",
            }}
            onClick={
                handleClick ||
                (() => {
                    const { depends, isTab = true } =
                        routerHelper.getRoutItemConfigByPath(
                            window.location.pathname
                        );
                    if (depends?.length) {
                        if (isTab) {
                            appHelper.swtichToParentTabByPath(
                                window.location.pathname
                            );
                        } else {
                            appHelper.closeTabByPath();
                        }
                    } else {
                        routerHelper.goBack();
                    }
                })
            }
        >
            {<Comp />}
        </Button>
    );
};

export default NavBack;
