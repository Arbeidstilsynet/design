import { render, screen } from "@testing-library/react";
import { Header, type HeaderProps } from ".";
import { vi } from "vitest";

const defaultProps: HeaderProps = {
  className: "test-header",
}

describe("Header", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders with default props", () => {
    render(
      <Header {...defaultProps} >
        <Header.Banner />
        <Header.Title />
        <Header.Search />
        <Header.Links links={[{ href: "#", text: "Home" }]} />
      </Header>
    )
    expect(screen.getByText("Miljøbanner")).toBeInTheDocument();
    expect(screen.getByText("Fagsystem")).toBeInTheDocument();
    expect(screen.getByText("Søk")).toBeInTheDocument();
    expect(screen.getByText("Bruker Brukersen")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
  });

})