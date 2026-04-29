import { renderHook } from "@testing-library/react";
import type { VitestUtils } from "vitest";
import { afterEach, describe, expect, it, vi } from "vitest";

import { useMediaQuery } from "./useMediaQuery";

// Test data:
const query = "(min-width: 600px)";

describe("useMediaQuery", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it.each([true, false])(
    "Returns value from window.matchMedia.matches when it is %s",
    (matches) => {
      const matchMediaValue = matchMediaValueMock({ matches });
      const { result } = renderHook(() => useMediaQuery(query));
      expect(matchMediaValue).toHaveBeenCalledWith(query);
      expect(result.current).toBe(matches);
    },
  );

  it("Adds event listener", () => {
    // oxlint-disable-next-line vitest/require-mock-type-parameters
    const addEventListener = vi.fn();
    matchMediaValueMock({ addEventListener });
    renderHook(() => useMediaQuery(query), {
      // In React strict mode the hook is mounted twice. Disable it to properly test hook initialisation.
      reactStrictMode: false,
    });
    expect(addEventListener).toHaveBeenCalledTimes(1);
  });

  it("Removes the event listener on unmount", () => {
    // oxlint-disable-next-line vitest/require-mock-type-parameters
    const removeEventListener = vi.fn();
    matchMediaValueMock({ removeEventListener });
    const { unmount } = renderHook(() => useMediaQuery(query), {
      // In React strict mode the hook is mounted twice. Disable it to properly test hook cleanup.
      reactStrictMode: false,
    });
    expect(removeEventListener).not.toHaveBeenCalled();
    unmount();
    expect(removeEventListener).toHaveBeenCalledTimes(1);
  });
});

const matchMediaValueMock = ({
  matches,
  addEventListener,
  removeEventListener,
}: Partial<{
  matches: boolean;
  addEventListener: VitestUtils["fn"];
  removeEventListener: VitestUtils["fn"];
}>) => {
  // oxlint-disable-next-line vitest/require-mock-type-parameters
  const value = vi.fn().mockImplementation((q: string) => ({
    matches: matches ?? false,
    media: q,
    onchange: null,
    addEventListener: addEventListener ?? vi.fn<() => void>(),
    removeEventListener: removeEventListener ?? vi.fn<() => void>(),
    dispatchEvent: vi.fn<() => void>(),
  }));
  Object.defineProperty(globalThis, "matchMedia", { writable: true, value });
  return value;
};
