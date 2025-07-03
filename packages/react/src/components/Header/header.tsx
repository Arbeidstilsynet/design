import { clsx } from "clsx/lite";
import { DefaultProps } from "../../types";
import { HTMLAttributes } from "react";
import { Banner } from "./banner";
import { Title } from "./title";
import { HeaderSearch } from "./headerSearch";
import { Links } from "./links";

export interface HeaderProps
  extends DefaultProps<HTMLDivElement>, HTMLAttributes<HTMLDivElement> {
  showBanner?: boolean;
  bannerText?: string;
  showTitle?: boolean;
  fagsystemNavn?: string;
  brukernavn?: string;
  showSearch?: boolean;
  showLinks?: boolean;
  links?: [];
}

export function Header({
  ref,
  className,
  showBanner = true,
  bannerText = "Designsystem",
  showTitle = true,
  fagsystemNavn = "Designsystemet",
  brukernavn = "Bruker Bruk",
  showSearch = true,
  showLinks = true,
  ...rest
}: Readonly<HeaderProps>) {

  return (
    <div ref={ref} className={clsx("at-topnav", className)} {...rest}>
      {showBanner &&
        <Banner text={bannerText} />
      }
      {showTitle &&
        <Title fagsystemNavn={fagsystemNavn} brukernavn={brukernavn} />
      }
      {showSearch &&
        <HeaderSearch />
      }
      {showLinks &&
        <Links links={[{ href: "#", text: "Home" }]} />
      }
    </div>
  )
}