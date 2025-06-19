import "@testing-library/jest-dom";

// fix "TypeError: document.getAnimations is not a function" for tests that render <Spinner>
Object.defineProperty(document, "getAnimations", {
  value: () => [],
  writable: true,
});
