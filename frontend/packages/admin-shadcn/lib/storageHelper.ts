type ItemKey = "messageMap" | "threadList" | "ACCESS_TOKEN";

const storageHelper = {
    setItem: (
        key: ItemKey,
        data: unknown,
        type: "session" | "local" = "session"
    ) => {
        let flag = typeof window !== "undefined";
        let sg = flag
            ? {
                  session: window.sessionStorage,
                  local: window.localStorage,
              }[type]
            : null;
        sg && sg.setItem(key, JSON.stringify(data));
    },
    clear: (type: "session" | "local" = "session") => {
        let flag = typeof window !== "undefined";

        let sg = flag
            ? {
                  session: window.sessionStorage,
                  local: window.localStorage,
              }[type]
            : null;
        sg?.clear();
    },
    removeItem: (key: ItemKey, type: "session" | "local" = "session") => {
        let flag = typeof window !== "undefined";
        let sg = flag
            ? {
                  session: window.sessionStorage,
                  local: window.localStorage,
              }[type]
            : null;
        sg?.removeItem(key);
    },
    getItem: (key: ItemKey, type: "session" | "local" = "session") => {
        let flag = typeof window !== "undefined";
        let sg = flag
            ? {
                  session: window.sessionStorage,
                  local: window.localStorage,
              }[type]
            : null;
        let value = sg ? sg.getItem(key) || "" : "";
        if (value === "undefined") {
            return;
        }
        return value ? JSON.parse(value) : value;
    },
};

export default storageHelper;
