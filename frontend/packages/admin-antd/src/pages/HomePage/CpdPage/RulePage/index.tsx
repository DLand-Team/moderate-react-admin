import { Outlet } from "react-router-dom";
import { MainContainer } from "src/components";

const RulePage = () => {
    return (
        <MainContainer>
            <Outlet />
        </MainContainer>
    );
};

export default RulePage;
