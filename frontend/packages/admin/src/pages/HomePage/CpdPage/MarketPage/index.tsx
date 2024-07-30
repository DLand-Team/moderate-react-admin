import { MainContainer } from "src/components";

import { Outlet } from "react-router-dom";

const MarketPage = () => {
    return (
        <MainContainer>
            <Outlet />
        </MainContainer>
    );
};

export default MarketPage;
