"use client";

import useActive from "@/src/common/hooks/useActive";
import { ROUTE_NAME } from "@/src/router";
import { routerHelper } from "@/src/service";
import { Button } from "@/src/shadcn/components/ui/button";
import { Input } from "@/src/shadcn/components/ui/input";
import { useRef } from "react";

const MenuView = () => {
  const flag = useRef(Date.now().toString());
  useActive({
    onActive(isFirst) {
      console.log("MenuView onActive", isFirst);
      console.log("MenuView flag", flag.current);
    },
  });
  return (
    <div>
      <div>
        <Button
          onClick={() => {
            routerHelper.jumpTo(ROUTE_NAME.dashboard);
          }}
        >
          Go to Test Page
        </Button>
      </div>
      <Input />
    </div>
  );
};

export default MenuView;
