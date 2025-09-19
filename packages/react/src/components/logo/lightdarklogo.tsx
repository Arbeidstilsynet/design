import { LogoBlack } from "./logoblack";
import { LogoWhite } from "./logowhite";

export const LightDarkLogo = () => (
  <span className="at-logo-wrapper">
    <span className="at-logo at-logo-light">
      <LogoBlack />
    </span>
    <span className="at-logo at-logo-dark">
      <LogoWhite />
    </span>
  </span>
);
