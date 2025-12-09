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
        <Header.Title
          logo={<div></div>}
          appName="Fagsystem"
          userName="Bruker Brukersen"
        />
      </Header>,
    );
    expect(screen.getByText("Fagsystem")).toBeInTheDocument();
    expect(screen.getByText("Bruker Brukersen")).toBeInTheDocument();
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
        <Header.Title logo={<div></div>} appName="bil" userName="Jsn for" />
        <Link href="#">Custom Link</Link>
      </Header>,
    );
    expect(screen.getByText("bil")).toBeInTheDocument();
    expect(screen.getByText("Jsn for")).toBeInTheDocument();
  });
});
