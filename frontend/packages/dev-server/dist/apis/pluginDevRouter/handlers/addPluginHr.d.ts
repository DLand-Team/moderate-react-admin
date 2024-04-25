export interface PluginsConfig {
    name: string;
    type: string;
    dependencies: Record<PropertyKey, string>;
}
declare const addPluginHandler: (ctx: any) => Promise<void>;
export default addPluginHandler;
