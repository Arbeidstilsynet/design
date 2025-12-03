import { clsx } from "clsx/lite";
import type { DefaultProps } from "../../types";
import type { HTMLAttributes } from "react";
import { Search } from "../../digdir";

export interface HeaderSearchProps
  extends DefaultProps<HTMLDivElement>, HTMLAttributes<HTMLDivElement> {
  text?: string;
}

export function HeaderSearch({
  className,
  ...rest
}: Readonly<HeaderSearchProps>) {
  return (
    <div className={clsx("at-header__search-background", className)} {...rest}>
      <div className={clsx("at-header__search")}>
        <Search>
          <Search.Input
            name="placeholder"
            aria-label="Søk"
            className="at-header__search-input"
          />
          <Search.Clear className="at-header__search-clear" />
          <Search.Button className="at-header__search-button" />
        </Search>
      </div>
    </div>
  );
}
