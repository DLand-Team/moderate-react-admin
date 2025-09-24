"use client";

import { Card } from "@/src/shadcn/components/ui/card";
import {
  GuideCoreProvider,
  GuideHook as GuideHookBase,
  useGuideRef,
} from "src/components/guide-eazy";

import { PropsWithChildren, useEffect } from "react";
import { appHelper } from "@/src/service";

export type GuideId = "start" | "step1_1" | "step1_2" | "step1_3";

const GuideProvider = ({ children }: PropsWithChildren) => {
  const guideIns = useGuideRef();

  useEffect(() => {
    appHelper.setGuideIns(guideIns);
  }, []);

  return (
    <GuideCoreProvider<GuideId>
      guideIns={guideIns}
      steps={{
        steps: [
          {
            id: "start",
            customPopRender({ api }) {
              return (
                <div
                  style={{
                    position: "fixed",
                  }}
                >
                  <Card
                    style={{
                      position: "relative",
                      bottom: 50,
                      padding: "32px",
                      fontSize: "30px",
                      fontWeight: "bold",
                    }}
                    onClick={() => {
                      api.setGuideIndex(1);
                    }}
                  >
                    欢迎来到闲D岛🏝️
                  </Card>
                </div>
              );
            },
          },
          {
            id: "step1_1",
            popover: {
              title: "动画背景",
              description: "使用的是Rive动画",
              side: "left",
              align: "start",
              showButtons: ["previous", "close"],
              showProgress: false,
            },
          },
          {
            id: "step1_2",
            popover: {
              title: "标签页导航",
              description: "支持KeepAlive",
              side: "left",
              align: "start",
              showButtons: ["close", "next"],
            },
          },
          {
            id: "step1_3",
            popover: {
              title: "Tanstack Table",
              description: "支持select，折叠",
              side: "left",
              align: "start",
              showButtons: ["close", "next"],
            },
          },
        ],
      }}
    >
      {children}
    </GuideCoreProvider>
  );
};
export const GuideHook = GuideHookBase<GuideId>;
export default GuideProvider;
