"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  useTranslation,
  UseTranslationOptions,
  UseTranslationResponse,
} from "react-i18next";
import i18next from "./";

const runsOnServerSide = typeof window === "undefined";

type Namespace = string | readonly string[] | undefined;

export function useT<Ns extends Namespace = undefined>(
  ns?: Ns,
  options?: UseTranslationOptions<
    Ns extends readonly string[] ? Ns[number] : Ns
  >,
): UseTranslationResponse<string, Ns> {
  // next/navigation's useParams returns Record<string, string | string[]>
  const params = useParams() as Record<string, string | string[] | undefined>;
  const lng = typeof params?.lng === "string" ? params.lng : undefined;

  if (runsOnServerSide && lng && i18next.resolvedLanguage !== lng) {
    i18next.changeLanguage(lng);
  } else {
    const [activeLng, setActiveLng] = useState(i18next.resolvedLanguage);
    useEffect(() => {
      if (activeLng === i18next.resolvedLanguage) return;
      setActiveLng(i18next.resolvedLanguage);
    }, [activeLng, i18next.resolvedLanguage]);
    useEffect(() => {
      if (!lng || i18next.resolvedLanguage === lng) return;
      i18next.changeLanguage(lng);
    }, [lng, i18next]);
  }
  return useTranslation(ns, options);
}
