import { clsx } from "clsx/lite";
import type { DefaultProps } from "../../types";
import type { HTMLAttributes } from "react";
import { Search } from "../../digdir";

export interface HeaderSearchProps
  extends DefaultProps<HTMLDivElement>,
    HTMLAttributes<HTMLDivElement> {
  text?: string;
}

export function HeaderSearch({
  className,
  ...rest
}: Readonly<HeaderSearchProps>) {
  const isMobile = false; // useMediaQuery('(max-width: 30rem)'); // Uncomment if you want to use media queries
  const dataSize = isMobile ? "xs" : "md";
  return (
    <div
      className={clsx("at-header__search-background", className)}
      {...rest}
      data-size={dataSize}
    >
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
