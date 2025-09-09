import { RiveParameters, useRive } from "@rive-app/react-canvas";

export const RiveAni = ({
  url,
  options = {} as any,
}: {
  url: string;
  options?: Partial<RiveParameters>;
}) => {
  const { RiveComponent } = useRive({
    src: url,
    ...options,
  });
  return <RiveComponent />;
};
