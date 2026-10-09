import { createContext, useContext } from "react";
import type { Lens } from "@/data/lenses";

export interface LensState {
  lens: Lens;
  /** True once the visitor has picked a role (or arrived with one). */
  chosen: boolean;
  setLens: (key: string) => void;
  /** Ask the hero selector to open, e.g. from the navbar pill. */
  requestPicker: () => void;
  pickerPending: boolean;
  consumePicker: () => void;
}

export const LensContext = createContext<LensState | null>(null);

export const useLens = (): LensState => {
  const ctx = useContext(LensContext);
  if (!ctx) throw new Error("useLens must be used inside <LensProvider>");
  return ctx;
};
