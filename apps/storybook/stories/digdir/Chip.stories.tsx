import { Chip } from "@arbeidstilsynet/design-react";
import type { Meta, StoryFn } from "@storybook/react-vite";
import styles from "./Chip.stories.module.css";

export default {
  title: "designsystemet.no/Chip",
  component: Chip.Radio,
  subcomponents: {
    "Chip.Button": Chip.Button,
    "Chip.Checkbox": Chip.Checkbox,
    "Chip.Removable": Chip.Removable,
  },
  parameters: {
    customStyles: { display: "flex", gap: "var(--ds-size-2)" },
  },
} satisfies Meta;

export const Preview: StoryFn<typeof Chip.Radio> = (args) => (
  <>
    <Chip.Radio {...args} name="my-radio" value="nynorsk" defaultChecked>
      Nynorsk
    </Chip.Radio>
    <Chip.Radio {...args} name="my-radio" value="bokmål">
      Bokmål
    </Chip.Radio>
  </>
);

export const Checkbox: StoryFn<typeof Chip.Checkbox> = (args) => (
  <Chip.Checkbox {...args}>Nynorsk</Chip.Checkbox>
);

export const Removable: StoryFn<typeof Chip.Removable> = (args) => (
  <Chip.Removable {...args}>Norge</Chip.Removable>
);

Removable.args = {
  "aria-label": "Slett Norge",
};

export const Button: StoryFn<typeof Chip.Button> = (args) => (
  <>
    <Chip.Button {...args}>Søk etter nynorsk</Chip.Button>
    <Chip.Button {...args}>Søk etter bokmål</Chip.Button>
    <Chip.Button {...args}>Søk etter engelsk</Chip.Button>
  </>
);

Button.parameters = {
  customStyles: {
    flexWrap: "wrap",
    justifyContent: "center",
  },
};

type ChipState = {
  id: string;
  label: string;
  checked?: boolean;
  disabled?: boolean;
  className?: string;
};

const chipStates: readonly ChipState[] = [
  { id: "default", label: "Default" },
  { id: "hover", label: "Hover", className: styles.hover },
  { id: "active", label: "Active", className: styles.active },
  { id: "checked", label: "Checked", checked: true },
  {
    id: "checked-hover",
    label: "Checked hover",
    checked: true,
    className: styles.hover,
  },
  {
    id: "checked-active",
    label: "Checked active",
    checked: true,
    className: styles.active,
  },
  { id: "disabled", label: "Disabled", disabled: true },
];

const StateCell = ({
  children,
  state,
}: {
  children: React.ReactNode;
  state: ChipState;
}) => <td className={`${styles.cell} ${state.className ?? ""}`}>{children}</td>;

export const FigmaCombinations: StoryFn = () => (
  <table className={styles.matrix}>
    <caption>Chip combinations from Figma</caption>
    <thead>
      <tr>
        <th scope="col">Component</th>
        {chipStates.map((state) => (
          <th key={state.id} scope="col">
            {state.label}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">
          Toggle
          <span>Radio</span>
        </th>
        {chipStates.map((state) => (
          <StateCell key={state.id} state={state}>
            <Chip.Radio
              defaultChecked={state.checked}
              disabled={state.disabled}
              name={`figma-radio-${state.id}`}
              value={state.id}
            >
              Tekst
            </Chip.Radio>
          </StateCell>
        ))}
      </tr>
      <tr>
        <th scope="row">
          Toggle
          <span>Checkbox</span>
        </th>
        {chipStates.map((state) => (
          <StateCell key={state.id} state={state}>
            <Chip.Checkbox
              defaultChecked={state.checked}
              disabled={state.disabled}
              value={state.id}
            >
              Tekst
            </Chip.Checkbox>
          </StateCell>
        ))}
      </tr>
      <tr>
        <th scope="row">Removable</th>
        {chipStates.map((state) => (
          <StateCell key={state.id} state={state}>
            {state.checked ? (
              <span aria-hidden>—</span>
            ) : (
              <Chip.Removable
                aria-label="Remove Tekst"
                disabled={state.disabled}
              >
                Tekst
              </Chip.Removable>
            )}
          </StateCell>
        ))}
      </tr>
      <tr>
        <th scope="row">Button</th>
        {chipStates.map((state) => (
          <StateCell key={state.id} state={state}>
            {state.checked ? (
              <span aria-hidden>—</span>
            ) : (
              <Chip.Button disabled={state.disabled}>Tekst</Chip.Button>
            )}
          </StateCell>
        ))}
      </tr>
    </tbody>
  </table>
);

FigmaCombinations.storyName = "Figma combinations";

FigmaCombinations.parameters = {
  layout: "fullscreen",
  customStyles: {
    display: "block",
    overflow: "auto",
    padding: "var(--ds-size-6)",
  },
};

Preview.parameters = {
  ...Preview.parameters,
  chromatic: { disableSnapshot: false },
};
