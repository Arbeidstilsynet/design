import { clsx } from "clsx/lite";
import { DefaultProps } from "../../types";
import { HTMLAttributes } from "react";
import { Search } from "../../digdir";

export interface SearchProps extends DefaultProps<HTMLDivElement>, HTMLAttributes<HTMLDivElement> {
  text?: string;
}

export function HeaderSearch({
  className,
  ...rest
}: Readonly<SearchProps>) {
  return (
    <div className={clsx("at-topnav__search-background", className)} {...rest}>
      <div className={clsx("at-topnav__search")}>
        <Search>
          <Search.Input name="placeholder" />
          <Search.Clear />
          <Search.Button />
        </Search>
      </div>
    </div>
  );
}