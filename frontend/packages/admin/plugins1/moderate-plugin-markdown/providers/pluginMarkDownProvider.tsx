import { PluginDetailDrawer } from "../components/pluginDetailDrawer";

export const PluginMarkDownProvider = ({
  children,
}: React.PropsWithChildren) => {
  return (
    <>
      <PluginDetailDrawer />
      {children}
    </>
  );
};
