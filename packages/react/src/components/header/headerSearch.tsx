import { clsx } from "clsx/lite";
import type { DefaultProps } from "../../types";
import type { HTMLAttributes } from "react";
import { Search } from "../../digdir";
import { useMediaQuery } from "../hooks/useMediaQuery";

export interface HeaderSearchProps
  extends DefaultProps<HTMLDivElement>,
    HTMLAttributes<HTMLDivElement> {
  text?: string;
}

export function HeaderSearch({
  className,
  ...rest
}: Readonly<HeaderSearchProps>) {
  const isMobile = useMediaQuery("(max-width: 30rem)");
  const dataSize = isMobile ? "xs" : "md";
  return (
    <div
      className={clsx("at-header__search-background", className)}
      {...rest}
      data-size={dataSize}
    >
      <div className={clsx("at-header__search")}>
        {isMobile ? (
          <Search>
            <Search.Input name="placeholder" aria-label="Søk" />
          </Search>
        ) : (
          <Search>
            <Search.Input name="placeholder" aria-label="Søk" />
            <Search.Clear />
            <Search.Button />
          </Search>
        )}
      </div>
    </div>
  );
}
