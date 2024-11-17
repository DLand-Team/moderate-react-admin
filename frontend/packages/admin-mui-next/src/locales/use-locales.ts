"use client";

import dayjs from "dayjs";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "@/components/snackbar";
import { allLangs } from "./all-langs";
import { fallbackLng, changeLangMessages as messages } from "./config-locales";
import type { LanguageValue } from "./config-locales";
import { useRouter } from "next/navigation";

// ----------------------------------------------------------------------

export function useTranslate(ns?: string) {
    const router = useRouter();

    const { t, i18n } = useTranslation(ns);

    const fallback = allLangs.filter((lang) => lang.value === fallbackLng)[0];

    const currentLang = allLangs.find((lang) => lang.value === "cn");

    const onChangeLang = useCallback(
        async (newLang: LanguageValue) => {
            try {
                const langChangePromise = i18n.changeLanguage(newLang);

                const currentMessages = messages[newLang] || messages.en;

                toast.promise(langChangePromise, {
                    loading: currentMessages.loading,
                    success: () => currentMessages.success,
                    error: currentMessages.error,
                });

                if (currentLang) {
                    dayjs.locale(currentLang.adapterLocale);
                }

                router.refresh();
            } catch (error) {
                console.error(error);
            }
        },
        [currentLang, i18n, router]
    );

    return {
        t,
        i18n,
        onChangeLang,
        currentLang: currentLang ?? fallback,
    };
}
