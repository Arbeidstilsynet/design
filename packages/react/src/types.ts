import type { Color, Size } from "@digdir/designsystemet-types";

export interface DefaultProps<TRef> {
  /**
   * Ref for the component. It is set on the root element as part of `...rest` props.
   */
  ref?: React.Ref<TRef>;

  /**
   * Changes size for descendant Designsystemet components. Select from predefined sizes.
   */
  "data-size"?: Size;
  /**
   * Changes color for descendant Designsystemet components.
   * Select from predefined colors and colors defined using theme.designsystemet.no.
   */
  "data-color"?: Color;
}

export type { Color, Size };
