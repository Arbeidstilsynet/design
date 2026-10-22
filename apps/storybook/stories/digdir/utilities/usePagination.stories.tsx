// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components-docs/en/utilities/use-pagination.stories.tsx

import { Pagination, usePagination } from "@arbeidstilsynet/design-react";
import { useState } from "react";
import preview from "../../../.storybook/preview";

const meta = preview.meta({
  title: "designsystemet.no utilities/usePagination",
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

export const Preview = meta.story({
  render: function Preview() {
    const [currentPage, setCurrentPage] = useState(2);
    const { pages, nextButtonProps, prevButtonProps } = usePagination({
      totalPages: 10,
      currentPage,
      setCurrentPage: setCurrentPage,
      showPages: 5,
    });

    return (
      <Pagination aria-label="Page navigation">
        <Pagination.List>
          <Pagination.Item>
            <Pagination.Button aria-label="Previous page" {...prevButtonProps}>
              Previous
            </Pagination.Button>
          </Pagination.Item>
          {pages.map(({ page, itemKey, buttonProps }) => (
            <Pagination.Item key={itemKey}>
              {typeof page === "number" && (
                <Pagination.Button aria-label={`Page ${page}`} {...buttonProps}>
                  {page}
                </Pagination.Button>
              )}
            </Pagination.Item>
          ))}
          <Pagination.Item>
            <Pagination.Button aria-label="Next page" {...nextButtonProps}>
              Next
            </Pagination.Button>
          </Pagination.Item>
        </Pagination.List>
      </Pagination>
    );
  },
});
