"use client";

import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import resourcesToBackend from "i18next-resources-to-backend";
import { useMemo } from "react";
import { initReactI18next, I18nextProvider as Provider } from "react-i18next";
import type { LanguageValue } from "./config-locales";
import { i18nOptions } from "./config-locales";

export function localStorageAvailable() {
    try {
        const key = "__some_random_key_you_are_not_going_to_use__";
        window.localStorage.setItem(key, key);
        window.localStorage.removeItem(key);
        return true;
    } catch (error) {
        return false;
    }
}

export function localStorageGetItem(key: string, defaultValue = "") {
    const storageAvailable = localStorageAvailable();

    let value;

    if (storageAvailable) {
        value = localStorage.getItem(key) || defaultValue;
    }

    return value;
}
// ----------------------------------------------------------------------

let lng;

/**
 * [1] localStorage
 * Auto detection:
 * const lng = localStorageGetItem('i18nextLng')
 */

const init = { ...i18nOptions(), detection: { caches: ["cookie"] } };
i18next
    .use(LanguageDetector)
    .use(initReactI18next)
    .use(
        resourcesToBackend(
            (lang: string, ns: string) => import(`./langs/${lang}/${ns}.json`)
        )
    )
    .init(init);

// ----------------------------------------------------------------------

type Props = {
    lang?: LanguageValue | undefined;
    children: React.ReactNode;
};

export function I18nProvider({ lang, children }: Props) {
    useMemo(() => {
        if (lang) {
            i18next.changeLanguage(lang);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <Provider i18n={i18next}>{children}</Provider>;
}
