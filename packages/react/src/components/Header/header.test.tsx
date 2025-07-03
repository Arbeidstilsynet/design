import { render, screen } from "@testing-library/react";
import { Header, HeaderProps } from "./header";
import { vi } from "vitest";

const defaultProps: HeaderProps = {
  showBanner: true,
  bannerText: "Testbanner",
  showTitle: false,
  fagsystemNavn: "",
  brukernavn: "",
  showSearch: false,
  showLinks: false,
}

describe("Header", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("reders with default props", () => {
    render(
      <Header {...defaultProps} />
    )
    expect(screen.getByText("Testbanner")).toBeInTheDocument();
  });
})