import { render, screen } from "@testing-library/react";
import { Header, type HeaderProps } from ".";
import { vi } from "vitest";

const defaultProps: HeaderProps = {
  className: "test-header",
};

describe("Header", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders with default props", () => {
    render(
      <Header {...defaultProps}>
        <Header.Banner />
        <Header.Title />
        <Header.Search />
        <Header.Links links={[{ href: "#", text: "Home" }]} />
      </Header>,
    );
    expect(screen.getByText("Miljøbanner")).toBeInTheDocument();
    expect(screen.getByText("Fagsystem")).toBeInTheDocument();
    expect(screen.getByText("Søk")).toBeInTheDocument();
    expect(screen.getByText("Bruker Brukersen")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  test("renders without children", () => {
    render(<Header {...defaultProps} />);
    expect(screen.queryByText("Miljøbanner")).not.toBeInTheDocument();
    expect(screen.queryByText("Fagsystem")).not.toBeInTheDocument();
    expect(screen.queryByText("Søk")).not.toBeInTheDocument();
    expect(screen.queryByText("Bruker Brukersen")).not.toBeInTheDocument();
  });

  test("applies custom arguments for all children", () => {
    render(
      <Header {...defaultProps}>
        <Header.Banner text="båt" />
        <Header.Title fagsystemNavn="bil" brukernavn="Jsn for" />
        <Header.Search />
        <Header.Links links={[{ href: "#", text: "Custom Link" }]} />
      </Header>,
    );
    expect(screen.getByText("båt")).toBeInTheDocument();
    expect(screen.getByText("bil")).toBeInTheDocument();
    expect(screen.getByText("Jsn for")).toBeInTheDocument();
    expect(screen.getByText("Custom Link")).toBeInTheDocument();
  });
});
