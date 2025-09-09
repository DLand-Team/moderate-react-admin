import i18next from ".";
import { headerName } from "./settings";
import { headers } from "next/headers";
import type { TFunction, TOptions } from "i18next";

type Namespace = string | readonly string[];
type GetTOptions = {
  keyPrefix?: string;
} & TOptions;

type GetTResult = {
  t: TFunction;
  i18n: typeof i18next;
};

export async function getT(
  ns?: Namespace,
  options?: GetTOptions,
): Promise<GetTResult> {
  const headerList = await headers();
  const lng = headerList.get(headerName) as string | null;
  if (lng && i18next.resolvedLanguage !== lng) {
    await i18next.changeLanguage(lng);
  }
  if (ns && !i18next.hasLoadedNamespace(ns)) {
    await i18next.loadNamespaces(ns);
  }
  return {
    t: i18next.getFixedT(
      lng ?? i18next.resolvedLanguage!,
      Array.isArray(ns) ? ns[0] : ns,
      options?.keyPrefix,
    ),
    i18n: i18next,
  };
}
