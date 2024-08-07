import { Col, Row } from "antd";
import { useEffect } from "react";
import { dpChain } from "src/service";
import { Itinenarary } from "../itinenarary";
import SliderMenu from "../sliderMenu";

const BottomPart = ({ branchName = "" }: { branchName?: string }) => {

    useEffect(() => {
        dpChain("ruleStore").getRuleCarrierListAct(null);
    }, []);

    return (
        <Row>
            <Col span={5}>
                <SliderMenu branchName={branchName} isJustShow={false} />
            </Col>
            <Col span={19}>
                <Itinenarary branchName={branchName} />
            </Col>
        </Row>
    );
};

export default BottomPart;
