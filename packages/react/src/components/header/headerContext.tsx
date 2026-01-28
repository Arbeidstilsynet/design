import { createContext, type ReactNode, type RefObject } from "react";

export interface HeaderContextValue {
  /** Navigation links to be shown in navbar (desktop) and menu (mobile) */
  links: ReactNode[];
  /** Reference to the header element for positioning calculations */
  headerRef: RefObject<HTMLElement | null>;
}

export const HeaderContext = createContext<HeaderContextValue>({
  links: [],
  headerRef: { current: null },
});
