// upstream: digdir/designsystemet@v1.23.0 packages/react/stories/utils/create-single-story.tsx
// Gnist: pseudo-state support removed, we don't use addon-pseudo-states.

import { composeStories } from "@storybook/react-vite";
import type { CSSProperties, ReactNode } from "react";

/**
 * Combines all stories from a CSF Next story module into a single story that
 * renders every story stacked. Used as the one Chromatic snapshot of a
 * component in a `*.chromatic.stories.tsx` file. `play` functions do not run
 * here; interactive stories opt in to their own snapshot.
 *
 * @example
 *   const meta = preview.meta({ title: "Chromatic/Button", component: Button });
 *   export const Snapshots = meta.story(createSingleStory(ButtonStories));
 */
export function createSingleStory(stories: Record<string, unknown>) {
  const composed: Record<string, () => ReactNode> = composeStories(
    stories as Parameters<typeof composeStories>[0],
  );

  return {
    render: () => (
      <>
        {/* Fewer diff pixels: remove the padding of nested decorators */}
        <style>{`[data-storybook-decorator="true"] [data-storybook-decorator="true"][style*="padding"]{
          padding: 0!important;
          overflow: visible!important;
        }`}</style>
        {Object.entries(composed).map(([key, Story]) => (
          <div key={key}>
            <Story />
          </div>
        ))}
      </>
    ),
    parameters: {
      chromatic: {
        disableSnapshot: false,
      },
      customStyles: {
        display: "flex",
        flexDirection: "column",
        gap: "var(--ds-size-2)",
      } satisfies CSSProperties,
    },
  };
}
