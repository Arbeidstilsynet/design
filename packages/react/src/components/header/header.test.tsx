import { Link } from "@digdir/designsystemet-react";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { Header, type HeaderProps } from ".";

const defaultProps: HeaderProps = {
  className: "test-header",
};

describe("Header", () => {
  beforeAll(() => {
    Object.defineProperty(globalThis, "matchMedia", {
      writable: true,
      value: (query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // deprecated
        removeListener: vi.fn(), // deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }),
    });
  });
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders with default props", () => {
    render(
      <Header {...defaultProps}>
        <Header.Title />
        <Header.Search />
        <Header.Links>
          <Header.Links.Item asChild={true}>
            <Link href="#">Home</Link>
          </Header.Links.Item>
        </Header.Links>
      </Header>,
    );
    expect(screen.getByText("Fagsystem")).toBeInTheDocument();
    expect(screen.getByText("Søk")).toBeInTheDocument();
    expect(screen.getByText("Bruker Brukersen")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  test("renders without children", () => {
    render(<Header {...defaultProps} />);
    expect(screen.queryByText("Fagsystem")).not.toBeInTheDocument();
    expect(screen.queryByText("Søk")).not.toBeInTheDocument();
    expect(screen.queryByText("Bruker Brukersen")).not.toBeInTheDocument();
  });

  test("applies custom arguments for all children", () => {
    render(
      <Header {...defaultProps}>
        <Header.Title fagsystemNavn="bil" brukernavn="Jsn for" />
        <Header.Search />
        <Header.Links>
          <Header.Links.Item asChild={true}>
            <Link href="#">Custom Link</Link>
          </Header.Links.Item>
        </Header.Links>
      </Header>,
    );
    expect(screen.getByText("bil")).toBeInTheDocument();
    expect(screen.getByText("Jsn for")).toBeInTheDocument();
    expect(screen.getByText("Custom Link")).toBeInTheDocument();
  });
});
