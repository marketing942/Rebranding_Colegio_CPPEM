"use client";

import { useEffect } from "react";
import { storeUtmsFromUrl } from "@/lib/lead-origin";

/** Guarda as UTMs da página de entrada, para o lead levar a origem mesmo depois de navegar pelo site. */
export function UtmCapture() {
  useEffect(() => {
    storeUtmsFromUrl();
  }, []);
  return null;
}
