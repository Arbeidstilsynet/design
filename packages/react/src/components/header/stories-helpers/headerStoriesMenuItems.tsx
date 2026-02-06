import { InboxIcon, PersonCircleIcon, TasklistIcon } from "@navikt/aksel-icons";
import { Header } from "..";
import { Link, Switch } from "../../..";

/**
 * Profile menu item example.
 * @internal - Not exported to consumers
 */
export function ProfileMenuItem() {
  return (
    <Header.Menu.Row>
      <Link href="#">
        <Header.Menu.Row.Icon><PersonCircleIcon /></Header.Menu.Row.Icon>
        <span>Profil</span>
      </Link>
    </Header.Menu.Row>
  );
}

ProfileMenuItem.displayName = "ProfileMenuItem";

/**
 * Inbox menu item example with badge.
 * @internal - Not exported to consumers
 */
export function InboxMenuItem({ count = 19 }: Readonly<{ count?: number }>) {
  return (
    <Header.Menu.Row>
      <Link href="#">
        <Header.Menu.Row.Icon><InboxIcon /></Header.Menu.Row.Icon>
        <span>Innboks</span>
        <Header.Menu.Row.Badge color="warning">{count}</Header.Menu.Row.Badge>
      </Link>
    </Header.Menu.Row>
  );
}

InboxMenuItem.displayName = "InboxMenuItem";

/**
 * TODOs menu item example with badge.
 * @internal - Not exported to consumers
 */
export function TODOsMenuItem({ count = 19 }: Readonly<{ count?: number }>) {
  return (
    <Header.Menu.Row>
      <Link href="#">
        <Header.Menu.Row.Icon><TasklistIcon /></Header.Menu.Row.Icon>
        <span>Gjøremål</span>
        <Header.Menu.Row.Badge color="info">{count}</Header.Menu.Row.Badge>
      </Link>
    </Header.Menu.Row>
  );
}

TODOsMenuItem.displayName = "TODOsMenuItem";

/**
 * Dark mode switch example.
 * @internal - Not exported to consumers
 */
export function DarkModeMenuItem() {
  return (
    <div style={{ padding: "var(--ds-size-2) var(--ds-size-4)" }}>
      <Switch label="Mørk modus" position="end" />
    </div>
  );
}

DarkModeMenuItem.displayName = "DarkModeMenuItem";
