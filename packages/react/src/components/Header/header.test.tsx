import { render, screen } from "@testing-library/react";
import { Header, HeaderProps } from "./header";
import { vi } from "vitest";

const defaultProps: HeaderProps = {
  showBanner: true,
  bannerText: "Testbanner",
  showTitle: true,
  fagsystemNavn: "Testsystem",
  brukernavn: "Test bruker",
  showSearch: true,
  showLinks: true,
  links: [{ href: "#", text: "Home" }],
}

describe("Header", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders with default props", () => {
    render(
      <Header {...defaultProps} />
    )
    expect(screen.getByText("Testbanner")).toBeInTheDocument();
    expect(screen.getByText("Testsystem")).toBeInTheDocument();
    expect(screen.getByText("Søk")).toBeInTheDocument();
    expect(screen.getByText("Test bruker")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  test("renders without banner", () => {
    render(
      <Header {...defaultProps} showBanner={false} />
    )
    expect(screen.queryByText("Testbanner")).not.toBeInTheDocument();
  });

  test("renders without title", () => {
    render(
      <Header {...defaultProps} showTitle={false} />
    )
    expect(screen.queryByText("Testsystem")).not.toBeInTheDocument();
  });

  test("renders without search", () => {
    render(
      <Header {...defaultProps} showSearch={false} />
    )
    expect(screen.queryByText("Søk")).not.toBeInTheDocument();
  });

  test("renders without links", () => {
    render(
      <Header {...defaultProps} showLinks={false} />
    )
    expect(screen.queryByText("Home")).not.toBeInTheDocument();
  });
})