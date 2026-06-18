import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, test, vi } from "vitest";
import { Steps } from ".";

describe("Steps", () => {
  afterEach(cleanup);

  test("renders as an ordered list", () => {
    render(
      <Steps aria-label="Progress">
        <Steps.Step>
          <Steps.StepTitle>Steg 1</Steps.StepTitle>
        </Steps.Step>
      </Steps>,
    );

    expect(screen.getByRole("list")).toBeInTheDocument();
  });

  test("renders step items as list items", () => {
    render(
      <Steps>
        <Steps.Step>
          <Steps.StepTitle>Steg 1</Steps.StepTitle>
        </Steps.Step>
        <Steps.Step>
          <Steps.StepTitle>Steg 2</Steps.StepTitle>
        </Steps.Step>
        <Steps.Step>
          <Steps.StepTitle>Steg 3</Steps.StepTitle>
        </Steps.Step>
      </Steps>,
    );

    expect(screen.getAllByRole("listitem")).toHaveLength(3);
  });

  test("renders all subcomponents", () => {
    render(
      <Steps>
        <Steps.Step>
          <Steps.StepMark />
          <Steps.StepTitle>Steg 1</Steps.StepTitle>
          <Steps.StepDescription>Beskrivelse</Steps.StepDescription>
          <Steps.StepDetails>Detaljer</Steps.StepDetails>
        </Steps.Step>
      </Steps>,
    );

    expect(screen.getByText("Steg 1")).toBeInTheDocument();
    expect(screen.getByText("Beskrivelse")).toBeInTheDocument();
    expect(screen.getByText("Detaljer")).toBeInTheDocument();
  });

  test("renders StepFill inside a step", () => {
    const { container } = render(
      <Steps>
        <Steps.Step aria-current="step">
          <Steps.StepMark />
          <Steps.StepFill />
          <Steps.StepTitle>Steg 1</Steps.StepTitle>
        </Steps.Step>
      </Steps>,
    );

    expect(container.querySelector(".at-steps__fill")).toBeInTheDocument();
  });

  test("passes through HTML attributes to the list", () => {
    render(
      <Steps data-testid="steps-list" aria-label="Progress steps">
        <Steps.Step>
          <Steps.StepTitle>Steg 1</Steps.StepTitle>
        </Steps.Step>
      </Steps>,
    );

    const list = screen.getByTestId("steps-list");
    expect(list).toHaveAttribute("aria-label", "Progress steps");
  });

  describe("aria-current", () => {
    test('marks the active step with aria-current="step"', () => {
      render(
        <Steps>
          <Steps.Step>
            <Steps.StepTitle>Steg 1</Steps.StepTitle>
          </Steps.Step>
          <Steps.Step aria-current="step">
            <Steps.StepTitle>Steg 2</Steps.StepTitle>
          </Steps.Step>
          <Steps.Step>
            <Steps.StepTitle>Steg 3</Steps.StepTitle>
          </Steps.Step>
        </Steps>,
      );

      const items = screen.getAllByRole("listitem");
      expect(items[0]).not.toHaveAttribute("aria-current");
      expect(items[1]).toHaveAttribute("aria-current", "step");
      expect(items[2]).not.toHaveAttribute("aria-current");
    });

    test("no step is active when aria-current is omitted", () => {
      render(
        <Steps>
          <Steps.Step>
            <Steps.StepTitle>Steg 1</Steps.StepTitle>
          </Steps.Step>
          <Steps.Step>
            <Steps.StepTitle>Steg 2</Steps.StepTitle>
          </Steps.Step>
        </Steps>,
      );

      for (const item of screen.getAllByRole("listitem")) {
        expect(item).not.toHaveAttribute("aria-current");
      }
    });
  });

  describe("data-state", () => {
    test('applies data-state="complete" to the list', () => {
      render(
        <Steps data-state="complete">
          <Steps.Step>
            <Steps.StepTitle>Steg 1</Steps.StepTitle>
          </Steps.Step>
        </Steps>,
      );

      expect(screen.getByRole("list")).toHaveAttribute(
        "data-state",
        "complete",
      );
    });
  });

  describe("data-direction", () => {
    test.each(["right", "down", "up"] as const)(
      'applies data-direction="%s" to the list',
      (direction) => {
        render(
          <Steps data-direction={direction}>
            <Steps.Step>
              <Steps.StepTitle>Steg 1</Steps.StepTitle>
            </Steps.Step>
          </Steps>,
        );

        expect(screen.getByRole("list")).toHaveAttribute(
          "data-direction",
          direction,
        );
      },
    );
  });

  describe("data-fade", () => {
    test.each(["start", "end", "none"] as const)(
      'applies data-fade="%s" to the list',
      (fade) => {
        render(
          <Steps data-fade={fade}>
            <Steps.Step>
              <Steps.StepTitle>Steg 1</Steps.StepTitle>
            </Steps.Step>
          </Steps>,
        );

        expect(screen.getByRole("list")).toHaveAttribute("data-fade", fade);
      },
    );
  });

  describe("StepMark", () => {
    test("renders with correct CSS class", () => {
      const { container } = render(
        <Steps>
          <Steps.Step>
            <Steps.StepMark />
          </Steps.Step>
        </Steps>,
      );

      expect(
        container.querySelector(".at-steps__step-mark"),
      ).toBeInTheDocument();
    });

    test("passes data-color to StepMark", () => {
      const { container } = render(
        <Steps>
          <Steps.Step>
            <Steps.StepMark data-color="danger" />
          </Steps.Step>
        </Steps>,
      );

      expect(container.querySelector(".at-steps__step-mark")).toHaveAttribute(
        "data-color",
        "danger",
      );
    });

    test("renders a custom icon child inside StepMark", () => {
      render(
        <Steps>
          <Steps.Step>
            <Steps.StepMark>
              <svg aria-label="custom icon" />
            </Steps.StepMark>
          </Steps.Step>
        </Steps>,
      );

      expect(screen.getByLabelText("custom icon")).toBeInTheDocument();
    });
  });

  describe("interactive wrapper", () => {
    test("button inside a step can be focused with keyboard", async () => {
      const user = userEvent.setup();

      render(
        <Steps>
          <Steps.Step>
            <button type="button">
              <Steps.StepMark />
              <Steps.StepTitle>Steg 1</Steps.StepTitle>
            </button>
          </Steps.Step>
          <Steps.Step>
            <button type="button">
              <Steps.StepMark />
              <Steps.StepTitle>Steg 2</Steps.StepTitle>
            </button>
          </Steps.Step>
        </Steps>,
      );

      await user.tab();
      expect(screen.getAllByRole("button")[0]).toHaveFocus();

      await user.tab();
      expect(screen.getAllByRole("button")[1]).toHaveFocus();
    });

    test("link inside a step can be focused with keyboard", async () => {
      const user = userEvent.setup();

      render(
        <Steps>
          <Steps.Step>
            <a href="#step1">
              <Steps.StepMark />
              <Steps.StepTitle>Steg 1</Steps.StepTitle>
            </a>
          </Steps.Step>
          <Steps.Step>
            <a href="#step2">
              <Steps.StepMark />
              <Steps.StepTitle>Steg 2</Steps.StepTitle>
            </a>
          </Steps.Step>
        </Steps>,
      );

      await user.tab();
      expect(screen.getAllByRole("link")[0]).toHaveFocus();

      await user.tab();
      expect(screen.getAllByRole("link")[1]).toHaveFocus();
    });

    test("button inside a step fires onClick when clicked", async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();

      render(
        <Steps>
          <Steps.Step>
            <button type="button" onClick={onClick}>
              <Steps.StepMark />
              <Steps.StepTitle>Steg 1</Steps.StepTitle>
            </button>
          </Steps.Step>
        </Steps>,
      );

      await user.click(screen.getByRole("button"));
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    test("button inside a step can be activated with Enter key", async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();

      render(
        <Steps>
          <Steps.Step>
            <button type="button" onClick={onClick}>
              <Steps.StepMark />
              <Steps.StepTitle>Steg 1</Steps.StepTitle>
            </button>
          </Steps.Step>
        </Steps>,
      );

      await user.tab();
      await user.keyboard("{Enter}");
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });
});
