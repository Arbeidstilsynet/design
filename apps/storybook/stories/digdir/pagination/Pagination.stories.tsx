// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/pagination/pagination.stories.tsx
// upstream: digdir/designsystemet@v1.23.0 apps/www/app/content/components/pagination/metadata.json

import { Pagination, usePagination } from "@arbeidstilsynet/design-react";
import { useState } from "react";
import preview from "../../../.storybook/preview";

const meta = preview.meta({
  title: "designsystemet.no/Pagination",
  component: Pagination,
  // Gnist: so Controls shows a tab per compound part.
  subcomponents: {
    "Pagination.List": Pagination.List,
    "Pagination.Item": Pagination.Item,
    "Pagination.Button": Pagination.Button,
  },
  tags: ["!autodocs"],
  parameters: {
    docs: {
      subtitle:
        "Pagination is a list of buttons used to navigate between different pages of content, such as search results or tables.",
    },
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
  args: {
    "aria-label": "Pagination menu",
  },
  render: (args) => (
    <Pagination {...args}>
      <Pagination.List>
        <Pagination.Item>
          <Pagination.Button aria-label="Previous page">
            Previous
          </Pagination.Button>
        </Pagination.Item>

        <Pagination.Item>
          <Pagination.Button aria-label="Page 1">1</Pagination.Button>
        </Pagination.Item>

        <Pagination.Item>
          <Pagination.Button aria-label="Page 2" aria-current="true">
            2
          </Pagination.Button>
        </Pagination.Item>

        <Pagination.Item />

        <Pagination.Item>
          <Pagination.Button aria-label="Page 9">9</Pagination.Button>
        </Pagination.Item>

        <Pagination.Item>
          <Pagination.Button aria-label="Page 10">10</Pagination.Button>
        </Pagination.Item>

        <Pagination.Item>
          <Pagination.Button aria-label="Next page">Next</Pagination.Button>
        </Pagination.Item>
      </Pagination.List>
    </Pagination>
  ),
});

export const WithAnchor = meta.story({
  render: function WithAnchor() {
    const [currentPage, setCurrentPage] = useState(2);
    const { pages, nextButtonProps, prevButtonProps } = usePagination({
      currentPage,
      setCurrentPage,
      totalPages: 10,
      showPages: 7,
    });

    return (
      <Pagination aria-label="Pagination menu">
        <Pagination.List>
          <Pagination.Item>
            <Pagination.Button
              asChild
              aria-label="Previous page"
              {...prevButtonProps}
            >
              <a href="#previous-page">Previous</a>
            </Pagination.Button>
          </Pagination.Item>
          {pages.map(({ page, itemKey, buttonProps }) => (
            <Pagination.Item key={itemKey}>
              {typeof page === "number" && (
                <Pagination.Button
                  asChild
                  aria-label={`Page ${page}`}
                  {...buttonProps}
                >
                  <a href={`#page-${page}`}>{page}</a>
                </Pagination.Button>
              )}
            </Pagination.Item>
          ))}
          <Pagination.Item>
            <Pagination.Button
              asChild
              aria-label="Next page"
              {...nextButtonProps}
            >
              <a href="#next-page">Next</a>
            </Pagination.Button>
          </Pagination.Item>
        </Pagination.List>
      </Pagination>
    );
  },
});

export const Mobile = meta.story(() => (
  <Pagination aria-label="Pagination menu">
    <Pagination.List>
      <Pagination.Item>
        <Pagination.Button aria-label="Previous page" />
      </Pagination.Item>

      <Pagination.Item>
        <Pagination.Button aria-label="Page 2">2</Pagination.Button>
      </Pagination.Item>

      <Pagination.Item>
        <Pagination.Button aria-label="Page 3">3</Pagination.Button>
      </Pagination.Item>

      <Pagination.Item>
        <Pagination.Button aria-label="Page 4">4</Pagination.Button>
      </Pagination.Item>

      <Pagination.Item>
        <Pagination.Button aria-label="Next page" />
      </Pagination.Item>
    </Pagination.List>
  </Pagination>
));
