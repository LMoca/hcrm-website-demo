import { useCallback, useMemo, useState, type ReactNode } from "react";
import { lensByKey, lenses } from "@/data/lenses";
import { LensContext } from "@/context/lens-context";

const STORAGE_KEY = "hcrm-lens";

const readInitial = (): string => {
  if (typeof window === "undefined") return "general";
  try {
    const fromUrl = new URLSearchParams(window.location.search).get("for");
    if (lensByKey(fromUrl)) {
      // a shared link is an explicit choice; remember it for the rest of the visit
      if (fromUrl === "general") window.localStorage.removeItem(STORAGE_KEY);
      else window.localStorage.setItem(STORAGE_KEY, fromUrl as string);
      return fromUrl as string;
    }
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (lensByKey(stored)) return stored as string;
  } catch {
    /* storage can be unavailable in private mode; fall through */
  }
  return "general";
};

/**
 * Holds the visitor's chosen role ("lens") for the whole site. The choice is
 * remembered per browser and mirrored into `?for=` on the home page, so a link
 * such as /?for=carriers (or /for/carriers) opens the tailored version.
 */
const LensProvider = ({ children }: { children: ReactNode }) => {
  const [key, setKey] = useState<string>(readInitial);
  const [pickerPending, setPickerPending] = useState(false);

  const setLens = useCallback((next: string) => {
    const lens = lensByKey(next) ?? lenses[0];
    setKey(lens.key);
    try {
      if (lens.key === "general") window.localStorage.removeItem(STORAGE_KEY);
      else window.localStorage.setItem(STORAGE_KEY, lens.key);
    } catch {
      /* ignore */
    }
    if (window.location.pathname === "/") {
      const url = new URL(window.location.href);
      if (lens.key === "general") url.searchParams.delete("for");
      else url.searchParams.set("for", lens.key);
      window.history.replaceState(window.history.state, "", url.pathname + url.search + url.hash);
    }
  }, []);

  const value = useMemo(
    () => ({
      lens: lensByKey(key) ?? lenses[0],
      chosen: key !== "general",
      setLens,
      requestPicker: () => setPickerPending(true),
      pickerPending,
      consumePicker: () => setPickerPending(false),
    }),
    [key, setLens, pickerPending]
  );

  return <LensContext.Provider value={value}>{children}</LensContext.Provider>;
};

export default LensProvider;
