import { Color } from "@digdir/designsystemet-react/colors";
import { Size } from "./digdir";

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
