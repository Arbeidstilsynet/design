// GENERATED FILE — do not edit by hand.
// Regenerate with: pnpm --filter @arbeidstilsynet/storybook gen:docgen-wrappers
//
// Purpose: make Storybook autodocs show the real prop types for the components we
// re-export from upstream (Digdir). Their source lives in node_modules, which
// react-docgen-typescript (RDT) does not analyse, so without this their autodocs
// fall back to useless types like `variant: string` (issue #554).
//
// How it works: the Vite alias and tsconfig `paths` in this app redirect the
// `@arbeidstilsynet/design-react` package specifier to this barrel. Story files
// import from `@arbeidstilsynet/design-react` unchanged.
//
// - Our own components (FilePicker, Header, …) flow through `export *` from the
//   package source with their existing docgen intact — no wrappers needed.
// - Each Digdir component gets a thin, same-named wrapper declared locally below.
//   Because the wrapper's source is local, RDT resolves the real prop types. A
//   local declaration shadows the matching name from `export *`, so there is no clash.
// - Compound components re-attach their sub-components (pointing at the wrapped
//   siblings, so `Card.Block` etc. keep working and also gain docgen).
// - Unstable components are wrapped under their clean name (e.g. `Suggestion`) so
//   the autodocs heading reads cleanly, then re-exported under their original
//   `EXPERIMENTAL_`-prefixed name so the package API stays unchanged.
//
// Constraints:
// - This folder must NOT live under `.storybook/` (or any dot-folder): the docgen
//   plugin discovers its TS program by globbing `**/*.tsx` with dotfiles excluded.
// - Wrappers import via the relative source path, never the package specifier, to
//   avoid the alias redirecting back into this barrel.
// - Compound sub-components are attached with `Object.assign(fn, {...})`, not
//   `fn.Sub = …` statements. RDT registers every `X.Sub = …` member assignment as
//   a docgen entry keyed by the bare sub-name, and a sub named like a top-level
//   wrapper (e.g. `Breadcrumbs.Link`) then clobbers that wrapper's docgen (`Link`).
//   `Object.assign` is a call expression RDT ignores, and its return type keeps the
//   expando typing so `Breadcrumbs.Link` is still typed for consumers.
import * as Base from "../../../packages/react/src";
import type { ComponentProps } from "react";

export * from "../../../packages/react/src";

export function Alert(props: ComponentProps<typeof Base.Alert>) {
  return <Base.Alert {...props} />;
}

export function Avatar(props: ComponentProps<typeof Base.Avatar>) {
  return <Base.Avatar {...props} />;
}

export const Badge = Object.assign(
  function Badge(props: ComponentProps<typeof Base.Badge>) {
    return <Base.Badge {...props} />;
  },
  {
    Position: BadgePosition,
  },
);

export function BadgePosition(props: ComponentProps<typeof Base.BadgePosition>) {
  return <Base.BadgePosition {...props} />;
}

export const Breadcrumbs = Object.assign(
  function Breadcrumbs(props: ComponentProps<typeof Base.Breadcrumbs>) {
    return <Base.Breadcrumbs {...props} />;
  },
  {
    List: BreadcrumbsList,
    Item: BreadcrumbsItem,
    Link: BreadcrumbsLink,
  },
);

export function BreadcrumbsItem(props: ComponentProps<typeof Base.BreadcrumbsItem>) {
  return <Base.BreadcrumbsItem {...props} />;
}

export function BreadcrumbsLink(props: ComponentProps<typeof Base.BreadcrumbsLink>) {
  return <Base.BreadcrumbsLink {...props} />;
}

export function BreadcrumbsList(props: ComponentProps<typeof Base.BreadcrumbsList>) {
  return <Base.BreadcrumbsList {...props} />;
}

export function Button(props: ComponentProps<typeof Base.Button>) {
  return <Base.Button {...props} />;
}

export const Card = Object.assign(
  function Card(props: ComponentProps<typeof Base.Card>) {
    return <Base.Card {...props} />;
  },
  {
    Block: CardBlock,
  },
);

export function CardBlock(props: ComponentProps<typeof Base.CardBlock>) {
  return <Base.CardBlock {...props} />;
}

export function Checkbox(props: ComponentProps<typeof Base.Checkbox>) {
  return <Base.Checkbox {...props} />;
}

export function ChipButton(props: ComponentProps<typeof Base.ChipButton>) {
  return <Base.ChipButton {...props} />;
}

export function ChipCheckbox(props: ComponentProps<typeof Base.ChipCheckbox>) {
  return <Base.ChipCheckbox {...props} />;
}

export function ChipRadio(props: ComponentProps<typeof Base.ChipRadio>) {
  return <Base.ChipRadio {...props} />;
}

export function ChipRemovable(props: ComponentProps<typeof Base.ChipRemovable>) {
  return <Base.ChipRemovable {...props} />;
}

export const Combobox = Object.assign(
  function Combobox(props: ComponentProps<typeof Base.Combobox>) {
    return <Base.Combobox {...props} />;
  },
  {
    Option: ComboboxOption,
    Empty: ComboboxEmpty,
  },
);

export function ComboboxEmpty(props: ComponentProps<typeof Base.ComboboxEmpty>) {
  return <Base.ComboboxEmpty {...props} />;
}

export function ComboboxOption(props: ComponentProps<typeof Base.ComboboxOption>) {
  return <Base.ComboboxOption {...props} />;
}

export const Details = Object.assign(
  function Details(props: ComponentProps<typeof Base.Details>) {
    return <Base.Details {...props} />;
  },
  {
    Summary: DetailsSummary,
    Content: DetailsContent,
  },
);

export function DetailsContent(props: ComponentProps<typeof Base.DetailsContent>) {
  return <Base.DetailsContent {...props} />;
}

export function DetailsSummary(props: ComponentProps<typeof Base.DetailsSummary>) {
  return <Base.DetailsSummary {...props} />;
}

export const Dialog = Object.assign(
  function Dialog(props: ComponentProps<typeof Base.Dialog>) {
    return <Base.Dialog {...props} />;
  },
  {
    Block: DialogBlock,
    TriggerContext: DialogTriggerContext,
    Trigger: DialogTrigger,
  },
);

export function DialogBlock(props: ComponentProps<typeof Base.DialogBlock>) {
  return <Base.DialogBlock {...props} />;
}

export function DialogTrigger(props: ComponentProps<typeof Base.DialogTrigger>) {
  return <Base.DialogTrigger {...props} />;
}

export function DialogTriggerContext(props: ComponentProps<typeof Base.DialogTriggerContext>) {
  return <Base.DialogTriggerContext {...props} />;
}

export function Divider(props: ComponentProps<typeof Base.Divider>) {
  return <Base.Divider {...props} />;
}

export const Dropdown = Object.assign(
  function Dropdown(props: ComponentProps<typeof Base.Dropdown>) {
    return <Base.Dropdown {...props} />;
  },
  {
    TriggerContext: DropdownTriggerContext,
    Heading: DropdownHeading,
    List: DropdownList,
    Item: DropdownItem,
    Button: DropdownButton,
    Trigger: DropdownTrigger,
  },
);

export function DropdownButton(props: ComponentProps<typeof Base.DropdownButton>) {
  return <Base.DropdownButton {...props} />;
}

export function DropdownHeading(props: ComponentProps<typeof Base.DropdownHeading>) {
  return <Base.DropdownHeading {...props} />;
}

export function DropdownItem(props: ComponentProps<typeof Base.DropdownItem>) {
  return <Base.DropdownItem {...props} />;
}

export function DropdownList(props: ComponentProps<typeof Base.DropdownList>) {
  return <Base.DropdownList {...props} />;
}

export function DropdownTrigger(props: ComponentProps<typeof Base.DropdownTrigger>) {
  return <Base.DropdownTrigger {...props} />;
}

export function DropdownTriggerContext(props: ComponentProps<typeof Base.DropdownTriggerContext>) {
  return <Base.DropdownTriggerContext {...props} />;
}

function AvatarStack(props: ComponentProps<typeof Base.EXPERIMENTAL_AvatarStack>) {
  return <Base.EXPERIMENTAL_AvatarStack {...props} />;
}
export { AvatarStack as EXPERIMENTAL_AvatarStack };

const Suggestion = Object.assign(
  function Suggestion(props: ComponentProps<typeof Base.EXPERIMENTAL_Suggestion>) {
    return <Base.EXPERIMENTAL_Suggestion {...props} />;
  },
  {
    List: SuggestionList,
    Input: SuggestionInput,
    Empty: SuggestionEmpty,
    Option: SuggestionOption,
    Clear: SuggestionClear,
  },
);
export { Suggestion as EXPERIMENTAL_Suggestion };

function SuggestionClear(props: ComponentProps<typeof Base.EXPERIMENTAL_SuggestionClear>) {
  return <Base.EXPERIMENTAL_SuggestionClear {...props} />;
}
export { SuggestionClear as EXPERIMENTAL_SuggestionClear };

function SuggestionEmpty(props: ComponentProps<typeof Base.EXPERIMENTAL_SuggestionEmpty>) {
  return <Base.EXPERIMENTAL_SuggestionEmpty {...props} />;
}
export { SuggestionEmpty as EXPERIMENTAL_SuggestionEmpty };

function SuggestionInput(props: ComponentProps<typeof Base.EXPERIMENTAL_SuggestionInput>) {
  return <Base.EXPERIMENTAL_SuggestionInput {...props} />;
}
export { SuggestionInput as EXPERIMENTAL_SuggestionInput };

function SuggestionList(props: ComponentProps<typeof Base.EXPERIMENTAL_SuggestionList>) {
  return <Base.EXPERIMENTAL_SuggestionList {...props} />;
}
export { SuggestionList as EXPERIMENTAL_SuggestionList };

function SuggestionOption(props: ComponentProps<typeof Base.EXPERIMENTAL_SuggestionOption>) {
  return <Base.EXPERIMENTAL_SuggestionOption {...props} />;
}
export { SuggestionOption as EXPERIMENTAL_SuggestionOption };

export const ErrorSummary = Object.assign(
  function ErrorSummary(props: ComponentProps<typeof Base.ErrorSummary>) {
    return <Base.ErrorSummary {...props} />;
  },
  {
    Heading: ErrorSummaryHeading,
    Item: ErrorSummaryItem,
    List: ErrorSummaryList,
    Link: ErrorSummaryLink,
  },
);

export function ErrorSummaryHeading(props: ComponentProps<typeof Base.ErrorSummaryHeading>) {
  return <Base.ErrorSummaryHeading {...props} />;
}

export function ErrorSummaryItem(props: ComponentProps<typeof Base.ErrorSummaryItem>) {
  return <Base.ErrorSummaryItem {...props} />;
}

export function ErrorSummaryLink(props: ComponentProps<typeof Base.ErrorSummaryLink>) {
  return <Base.ErrorSummaryLink {...props} />;
}

export function ErrorSummaryList(props: ComponentProps<typeof Base.ErrorSummaryList>) {
  return <Base.ErrorSummaryList {...props} />;
}

export const Field = Object.assign(
  function Field(props: ComponentProps<typeof Base.Field>) {
    return <Base.Field {...props} />;
  },
  {
    Description: FieldDescription,
    Affixes: FieldAffixes,
    Affix: FieldAffix,
    Counter: FieldCounter,
  },
);

export function FieldAffix(props: ComponentProps<typeof Base.FieldAffix>) {
  return <Base.FieldAffix {...props} />;
}

export function FieldAffixes(props: ComponentProps<typeof Base.FieldAffixes>) {
  return <Base.FieldAffixes {...props} />;
}

export function FieldCounter(props: ComponentProps<typeof Base.FieldCounter>) {
  return <Base.FieldCounter {...props} />;
}

export function FieldDescription(props: ComponentProps<typeof Base.FieldDescription>) {
  return <Base.FieldDescription {...props} />;
}

export const Fieldset = Object.assign(
  function Fieldset(props: ComponentProps<typeof Base.Fieldset>) {
    return <Base.Fieldset {...props} />;
  },
  {
    Legend: FieldsetLegend,
    Description: FieldsetDescription,
  },
);

export function FieldsetDescription(props: ComponentProps<typeof Base.FieldsetDescription>) {
  return <Base.FieldsetDescription {...props} />;
}

export function FieldsetLegend(props: ComponentProps<typeof Base.FieldsetLegend>) {
  return <Base.FieldsetLegend {...props} />;
}

export function Heading(props: ComponentProps<typeof Base.Heading>) {
  return <Base.Heading {...props} />;
}

export function Input(props: ComponentProps<typeof Base.Input>) {
  return <Base.Input {...props} />;
}

export function Label(props: ComponentProps<typeof Base.Label>) {
  return <Base.Label {...props} />;
}

export function Link(props: ComponentProps<typeof Base.Link>) {
  return <Base.Link {...props} />;
}

export function ListItem(props: ComponentProps<typeof Base.ListItem>) {
  return <Base.ListItem {...props} />;
}

export function ListOrdered(props: ComponentProps<typeof Base.ListOrdered>) {
  return <Base.ListOrdered {...props} />;
}

export function ListUnordered(props: ComponentProps<typeof Base.ListUnordered>) {
  return <Base.ListUnordered {...props} />;
}

export const Pagination = Object.assign(
  function Pagination(props: ComponentProps<typeof Base.Pagination>) {
    return <Base.Pagination {...props} />;
  },
  {
    List: PaginationList,
    Item: PaginationItem,
    Button: PaginationButton,
  },
);

export function PaginationButton(props: ComponentProps<typeof Base.PaginationButton>) {
  return <Base.PaginationButton {...props} />;
}

export function PaginationItem(props: ComponentProps<typeof Base.PaginationItem>) {
  return <Base.PaginationItem {...props} />;
}

export function PaginationList(props: ComponentProps<typeof Base.PaginationList>) {
  return <Base.PaginationList {...props} />;
}

export function Paragraph(props: ComponentProps<typeof Base.Paragraph>) {
  return <Base.Paragraph {...props} />;
}

export const Popover = Object.assign(
  function Popover(props: ComponentProps<typeof Base.Popover>) {
    return <Base.Popover {...props} />;
  },
  {
    TriggerContext: PopoverTriggerContext,
    Trigger: PopoverTrigger,
  },
);

export function PopoverTrigger(props: ComponentProps<typeof Base.PopoverTrigger>) {
  return <Base.PopoverTrigger {...props} />;
}

export function PopoverTriggerContext(props: ComponentProps<typeof Base.PopoverTriggerContext>) {
  return <Base.PopoverTriggerContext {...props} />;
}

export function Radio(props: ComponentProps<typeof Base.Radio>) {
  return <Base.Radio {...props} />;
}

export function RovingFocusItem(props: ComponentProps<typeof Base.RovingFocusItem>) {
  return <Base.RovingFocusItem {...props} />;
}

export function RovingFocusRoot(props: ComponentProps<typeof Base.RovingFocusRoot>) {
  return <Base.RovingFocusRoot {...props} />;
}

export const Search = Object.assign(
  function Search(props: ComponentProps<typeof Base.Search>) {
    return <Base.Search {...props} />;
  },
  {
    Clear: SearchClear,
    Button: SearchButton,
    Input: SearchInput,
  },
);

export function SearchButton(props: ComponentProps<typeof Base.SearchButton>) {
  return <Base.SearchButton {...props} />;
}

export function SearchClear(props: ComponentProps<typeof Base.SearchClear>) {
  return <Base.SearchClear {...props} />;
}

export function SearchInput(props: ComponentProps<typeof Base.SearchInput>) {
  return <Base.SearchInput {...props} />;
}

export const Select = Object.assign(
  function Select(props: ComponentProps<typeof Base.Select>) {
    return <Base.Select {...props} />;
  },
  {
    Option: SelectOption,
    Optgroup: SelectOptgroup,
  },
);

export function SelectOptgroup(props: ComponentProps<typeof Base.SelectOptgroup>) {
  return <Base.SelectOptgroup {...props} />;
}

export function SelectOption(props: ComponentProps<typeof Base.SelectOption>) {
  return <Base.SelectOption {...props} />;
}

export function Skeleton(props: ComponentProps<typeof Base.Skeleton>) {
  return <Base.Skeleton {...props} />;
}

export function SkipLink(props: ComponentProps<typeof Base.SkipLink>) {
  return <Base.SkipLink {...props} />;
}

export function Spinner(props: ComponentProps<typeof Base.Spinner>) {
  return <Base.Spinner {...props} />;
}

export function Switch(props: ComponentProps<typeof Base.Switch>) {
  return <Base.Switch {...props} />;
}

export const Table = Object.assign(
  function Table(props: ComponentProps<typeof Base.Table>) {
    return <Base.Table {...props} />;
  },
  {
    Head: TableHead,
    Body: TableBody,
    Row: TableRow,
    Cell: TableCell,
    HeaderCell: TableHeaderCell,
    Foot: TableFoot,
  },
);

export function TableBody(props: ComponentProps<typeof Base.TableBody>) {
  return <Base.TableBody {...props} />;
}

export function TableCell(props: ComponentProps<typeof Base.TableCell>) {
  return <Base.TableCell {...props} />;
}

export function TableFoot(props: ComponentProps<typeof Base.TableFoot>) {
  return <Base.TableFoot {...props} />;
}

export function TableHead(props: ComponentProps<typeof Base.TableHead>) {
  return <Base.TableHead {...props} />;
}

export function TableHeaderCell(props: ComponentProps<typeof Base.TableHeaderCell>) {
  return <Base.TableHeaderCell {...props} />;
}

export function TableRow(props: ComponentProps<typeof Base.TableRow>) {
  return <Base.TableRow {...props} />;
}

export const Tabs = Object.assign(
  function Tabs(props: ComponentProps<typeof Base.Tabs>) {
    return <Base.Tabs {...props} />;
  },
  {
    List: TabsList,
    Tab: TabsTab,
    Panel: TabsPanel,
  },
);

export function TabsList(props: ComponentProps<typeof Base.TabsList>) {
  return <Base.TabsList {...props} />;
}

export function TabsPanel(props: ComponentProps<typeof Base.TabsPanel>) {
  return <Base.TabsPanel {...props} />;
}

export function TabsTab(props: ComponentProps<typeof Base.TabsTab>) {
  return <Base.TabsTab {...props} />;
}

export function Tag(props: ComponentProps<typeof Base.Tag>) {
  return <Base.Tag {...props} />;
}

export function Textarea(props: ComponentProps<typeof Base.Textarea>) {
  return <Base.Textarea {...props} />;
}

export function Textfield(props: ComponentProps<typeof Base.Textfield>) {
  return <Base.Textfield {...props} />;
}

export const ToggleGroup = Object.assign(
  function ToggleGroup(props: ComponentProps<typeof Base.ToggleGroup>) {
    return <Base.ToggleGroup {...props} />;
  },
  {
    Item: ToggleGroupItem,
  },
);

export function ToggleGroupItem(props: ComponentProps<typeof Base.ToggleGroupItem>) {
  return <Base.ToggleGroupItem {...props} />;
}

export function Tooltip(props: ComponentProps<typeof Base.Tooltip>) {
  return <Base.Tooltip {...props} />;
}

export function ValidationMessage(props: ComponentProps<typeof Base.ValidationMessage>) {
  return <Base.ValidationMessage {...props} />;
}

export const Chip = Object.assign({}, Base.Chip, {
  Button: ChipButton,
  Checkbox: ChipCheckbox,
  Radio: ChipRadio,
  Removable: ChipRemovable,
});

export const List = Object.assign({}, Base.List, {
  Item: ListItem,
  Ordered: ListOrdered,
  Unordered: ListUnordered,
});
