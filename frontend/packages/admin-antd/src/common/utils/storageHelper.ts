type ItemKey =
    | "ACCESS_TOKEN"
    | "SOCKET_ID"
    | "SOCKET_STATUS"
    | "DEAL_ID"
    | "IS_ADMIN"
    | "TABS_HISTORY"
    | "THEME"
    | "BTN_TIME"
    | "BTN_CON"
    | "IS_THEME_AUTO"
    | "LANGUAGE"
    | "SETTING"
    | "IS_PLUGIN_INSTALLING"
    | "REFRESH_TOKEN"
    | "USERNAME"
    | "CHECK"
    | "DEMO_DATA";

const storageHelper = {
    setItem: (
        key: ItemKey,
        data: unknown,
        type: "session" | "local" = "session"
    ) => {
        const flag = typeof window !== "undefined";
        const sg = flag
            ? {
                  session: window.sessionStorage,
                  local: window.localStorage,
              }[type]
            : null;
        sg && sg.setItem(key, JSON.stringify(data));
    },
    clear: (type: "session" | "local" = "session") => {
        const flag = typeof window !== "undefined";
        const sg = flag
            ? {
                  session: window.sessionStorage,
                  local: window.localStorage,
              }[type]
            : null;
        sg?.clear();
    },
    removeItem: (key: ItemKey, type: "session" | "local" = "session") => {
        const flag = typeof window !== "undefined";
        const sg = flag
            ? {
                  session: window.sessionStorage,
                  local: window.localStorage,
              }[type]
            : null;
        sg?.removeItem(key);
    },
    getItem: (key: ItemKey, type: "session" | "local" = "session") => {
        const flag = typeof window !== "undefined";
        const sg = flag
            ? {
                  session: window.sessionStorage,
                  local: window.localStorage,
              }[type]
            : null;
        const value = sg ? sg.getItem(key) || "" : "";
        return value ? JSON.parse(value) : value;
    },
};

export default storageHelper;
