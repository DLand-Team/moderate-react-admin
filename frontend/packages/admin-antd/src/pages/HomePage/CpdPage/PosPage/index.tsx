import { Outlet } from "react-router-dom";
import { MainContainer } from "src/components";

const PosPage = () => {
    return (
        <MainContainer>
            <Outlet />
        </MainContainer>
    );
};

export default PosPage;
