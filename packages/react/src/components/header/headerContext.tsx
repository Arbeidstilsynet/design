import { createContext, type ReactNode } from "react";

export interface HeaderContextValue {
  /** Navigation links to be shown in navbar (desktop) and menu (mobile) */
  links: ReactNode[];
}

export const HeaderContext = createContext<HeaderContextValue>({
  links: [],
});
