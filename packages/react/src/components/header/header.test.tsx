import { cleanup, render, screen } from "@testing-library/react";
import type { ComponentProps, ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

// Designsystemet 1.21 Dropdown stalls during happy-dom module evaluation.
// Keep Header tests focused on its own composition, not Dropdown behavior.
vi.mock("../../digdir", async () => {
  const { createElement, Fragment } = await import("react");
  const Container = ({ children }: { children?: ReactNode }) =>
    createElement(Fragment, null, children);
  const Button = ({ children, ...props }: ComponentProps<"button">) =>
    createElement("button", props, children);
  const Divider = () => createElement("hr");

  return {
    Button,
    Divider,
    Dropdown: Object.assign(Container, {
      Item: Container,
      List: Container,
      Trigger: Button,
      TriggerContext: Container,
    }),
  };
});

import { Header } from ".";

// Mock useMediaQuery to control mobile/desktop behavior in tests
vi.mock("../hooks/useMediaQuery", () => ({
  useMediaQuery: vi.fn<() => boolean>(() => false), // Default to desktop view
}));

import { useMediaQuery } from "../hooks/useMediaQuery";

const mockUseMediaQuery = vi.mocked(useMediaQuery);

describe("Header", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseMediaQuery.mockReturnValue(false); // Reset to desktop view
  });

  afterEach(cleanup);

  test("renders header with children", () => {
    render(
      <Header>
        <Header.Title>
          <Header.Logo>App Name</Header.Logo>
        </Header.Title>
      </Header>,
    );

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByText("App Name")).toBeInTheDocument();
  });

  test("renders navigation links in navbar", () => {
    const links = [
      <a key="home" href="/">
        Home
      </a>,
      <a key="about" href="/about">
        About
      </a>,
    ];

    render(
      <Header links={links}>
        <Header.Navbar />
      </Header>,
    );

    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "About" })).toBeInTheDocument();
  });

  test("renders empty navbar when no links provided", () => {
    render(
      <Header>
        <Header.Navbar />
      </Header>,
    );

    const nav = screen.getByRole("navigation");
    expect(nav).toBeEmptyDOMElement();
  });

  describe("Header.Menu", () => {
    test("shows triggerContent on desktop", () => {
      mockUseMediaQuery.mockReturnValue(false);

      render(
        <Header>
          <Header.Menu triggerContent="Ola Nordmann" />
        </Header>,
      );

      expect(screen.getByText("Ola Nordmann")).toBeInTheDocument();
    });

    test("shows hamburger menu text on mobile", () => {
      mockUseMediaQuery.mockReturnValue(true);

      render(
        <Header>
          <Header.Menu triggerContent="Ola Nordmann" mobileMenuText="Meny" />
        </Header>,
      );

      expect(screen.getByText("Meny")).toBeInTheDocument();
      expect(screen.queryByText("Ola Nordmann")).not.toBeInTheDocument();
    });

    test("renders dropdown children", () => {
      render(
        <Header>
          <Header.Menu triggerContent="Menu">
            <span>Profile</span>
            <span>Settings</span>
          </Header.Menu>
        </Header>,
      );

      expect(screen.getByText("Profile")).toBeInTheDocument();
      expect(screen.getByText("Settings")).toBeInTheDocument();
    });

    test("renders close button with default text on mobile", () => {
      mockUseMediaQuery.mockReturnValue(true);

      render(
        <Header>
          <Header.Menu triggerContent="Menu" />
        </Header>,
      );

      expect(screen.getByText("Lukk")).toBeInTheDocument();
    });

    test("renders close button with custom text on mobile", () => {
      mockUseMediaQuery.mockReturnValue(true);

      render(
        <Header>
          <Header.Menu triggerContent="Menu" closeButtonText="Close menu" />
        </Header>,
      );

      expect(screen.getByText("Close menu")).toBeInTheDocument();
    });
  });

  test("renders complete header with all subcomponents", () => {
    const links = [
      <a key="home" href="/">
        Home
      </a>,
      <a key="about" href="/about">
        About
      </a>,
    ];

    render(
      <Header links={links}>
        <Header.Title>
          <Header.Illustration>
            <img src="/illustration.svg" alt="Illustration" />
          </Header.Illustration>
          <Header.Logo>App Name</Header.Logo>
        </Header.Title>
        <Header.Navbar />
        <Header.Menu triggerContent="User" />
      </Header>,
    );

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByAltText("Illustration")).toBeInTheDocument();
    expect(screen.getByText("App Name")).toBeInTheDocument();
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Home" })).toHaveLength(2);
    expect(screen.getAllByRole("link", { name: "About" })).toHaveLength(2);
    expect(screen.getByRole("button", { name: /User/i })).toBeInTheDocument();
  });

  test("renders header without optional subcomponents", () => {
    render(
      <Header>
        <Header.Title>
          <Header.Logo>App Name</Header.Logo>
        </Header.Title>
      </Header>,
    );

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByText("App Name")).toBeInTheDocument();
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });

  test("passes through HTML attributes to header", () => {
    render(
      <Header data-testid="header" aria-label="Main navigation header">
        Content
      </Header>,
    );

    const header = screen.getByTestId("header");
    expect(header).toHaveAttribute("aria-label", "Main navigation header");
  });
});
