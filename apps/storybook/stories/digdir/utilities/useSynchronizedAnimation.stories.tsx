// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components-docs/en/utilities/use-synchronized-animation.stories.tsx

import {
  Button,
  useSynchronizedAnimation,
} from "@arbeidstilsynet/design-react";
import { useState } from "react";
import preview from "../../../.storybook/preview";

const meta = preview.meta({
  title: "designsystemet.no utilities/useSynchronizedAnimation",
  tags: ["!autodocs"],
  parameters: {
    customStyles: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "var(--ds-size-4)",
    },
  },
});

// Gnist: upstream comments SyncedBox out and renders it undefined; restored
// from the commented-out code so the example runs.
const SyncedBox = () => {
  const ref = useSynchronizedAnimation<HTMLDivElement>("spin");

  return (
    <div
      ref={ref}
      style={{
        animation: "spin 2s linear infinite",
        width: "30px",
        height: "30px",
        backgroundColor: "red",
      }}
    />
  );
};

export const Preview = meta.story({
  render: function Preview() {
    const [count, setCount] = useState(1);

    return (
      <div>
        <Button
          onClick={() => setCount(count + 1)}
          style={{ display: "block" }}
        >
          New box
        </Button>
        <div
          style={{
            display: "flex",
            gap: "10px",
            maxWidth: "300px",
            flexWrap: "wrap",
          }}
        >
          {Array.from({ length: count }).map((_, i) => (
            <SyncedBox key={i} />
          ))}
        </div>

        <style>
          {`
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}
        </style>
      </div>
    );
  },
});
