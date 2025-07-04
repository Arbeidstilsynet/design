import { clsx } from "clsx/lite";
import { DefaultProps } from "../../types";
import { HTMLAttributes } from "react";
import { HeaderBanner } from "./headerBanner";
import { HeaderTitle } from "./headerTitle";
import { HeaderSearch } from "./headerSearch";
import { HeaderLinks } from "./headerLinks";

export interface HeaderProps
  extends DefaultProps<HTMLDivElement>, HTMLAttributes<HTMLDivElement> {
  showBanner?: boolean;
  bannerText?: string;
  showTitle?: boolean;
  fagsystemNavn?: string;
  brukernavn?: string;
  titleComponent?: React.ReactNode;
  showSearch?: boolean;
  showLinks?: boolean;
  links?: {
    href: string;
    text: string;
  }[];
}

export function Header({
  ref,
  className,
  showBanner = true,
  bannerText = "Designsystem",
  showTitle = true,
  fagsystemNavn = "Designsystemet",
  brukernavn = "Bruker Bruk",
  titleComponent = undefined,
  showSearch = true,
  showLinks = true,
  links = [],
  ...rest
}: Readonly<HeaderProps>) {

  return (
    <div ref={ref} className={clsx("at-header", className)} {...rest}>
      {showBanner &&
        <HeaderBanner text={bannerText} />
      }
      {showTitle &&
        <HeaderTitle fagsystemNavn={fagsystemNavn} brukernavn={brukernavn} />
      }
      {titleComponent}
      {showSearch &&
        <HeaderSearch />
      }
      {showLinks &&
        <HeaderLinks links={links} />
      }
    </div>
  )
}