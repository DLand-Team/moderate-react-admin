import { Button } from "antd";
import { Suspense } from "react";
import { RolePage } from "src/pages";
import { appHelper } from "src/service";

const WinboxPage = () => {
    return (
        <div>
            <Button
                onClick={() => {
                    appHelper.addWinbox({
                        content: (
                            <Suspense>
                                <RolePage />
                            </Suspense>
                        ),
                    });
                }}
            >
                Show winbox
            </Button>
        </div>
    );
};

export default WinboxPage;
