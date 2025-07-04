import { clsx } from "clsx/lite";
import { DefaultProps } from "../../types";
import { HTMLAttributes } from "react";
import { Search } from "../../digdir";

export interface HeaderSearchProps extends DefaultProps<HTMLDivElement>, HTMLAttributes<HTMLDivElement> {
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
          <Search.Input name="placeholder" />
          <Search.Clear />
          <Search.Button />
        </Search>
      </div>
    </div>
  );
}