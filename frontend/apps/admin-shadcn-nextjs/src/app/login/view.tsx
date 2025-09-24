"use client";
import { GuideHook, useGuideContext } from "@/src/components/guide-eazy";
import { appHelper } from "@/src/service";
import { Fit, Layout } from "@rive-app/react-canvas";
import { useEffect } from "react";
import { LoginFormView } from "./formViews/login-form-view";
import { RiveAni } from "./riveAni";

export default function LoginView() {
  const guide = useGuideContext();
  useEffect(() => {
    guide.setGuideIndex(0);
  }, []);
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <img src="/logo.png" alt="Logo" />
            </div>
            Dland
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginFormView />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block overflow-hidden">
        <GuideHook readyId="step1_1" />
        <RiveAni
          options={{
            // This is optional.Provides additional layout control.
            layout: new Layout({
              fit: Fit.Cover, // Change to: rive.Fit.Contain, or Cover
            }),
            autoplay: true,
            automaticallyHandleEvents: true,
          }}
          url="/beach_icon.riv"
        />
      </div>
    </div>
  );
}
