import { uniqueId } from "lodash-es";

export const UUID = (prefix?: string | undefined) => {
    return uniqueId(prefix);
};
