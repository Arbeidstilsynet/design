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
//
// Constraints:
// - This folder must NOT live under `.storybook/` (or any dot-folder): the docgen
//   plugin discovers its TS program by globbing `**/*.tsx` with dotfiles excluded.
// - Wrappers import via the relative source path, never the package specifier, to
//   avoid the alias redirecting back into this barrel.
import * as Base from "../../../packages/react/src";
import type { ComponentProps } from "react";

export * from "../../../packages/react/src";

export function Alert(props: ComponentProps<typeof Base.Alert>) {
  return <Base.Alert {...props} />;
}

export function Avatar(props: ComponentProps<typeof Base.Avatar>) {
  return <Base.Avatar {...props} />;
}

export function Badge(props: ComponentProps<typeof Base.Badge>) {
  return <Base.Badge {...props} />;
}
Badge.Position = BadgePosition;

export function BadgePosition(props: ComponentProps<typeof Base.BadgePosition>) {
  return <Base.BadgePosition {...props} />;
}

export function Breadcrumbs(props: ComponentProps<typeof Base.Breadcrumbs>) {
  return <Base.Breadcrumbs {...props} />;
}
Breadcrumbs.List = BreadcrumbsList;
Breadcrumbs.Item = BreadcrumbsItem;
Breadcrumbs.Link = BreadcrumbsLink;

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

export function Card(props: ComponentProps<typeof Base.Card>) {
  return <Base.Card {...props} />;
}
Card.Block = CardBlock;

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

export function Combobox(props: ComponentProps<typeof Base.Combobox>) {
  return <Base.Combobox {...props} />;
}
Combobox.Option = ComboboxOption;
Combobox.Empty = ComboboxEmpty;

export function ComboboxEmpty(props: ComponentProps<typeof Base.ComboboxEmpty>) {
  return <Base.ComboboxEmpty {...props} />;
}

export function ComboboxOption(props: ComponentProps<typeof Base.ComboboxOption>) {
  return <Base.ComboboxOption {...props} />;
}

export function Details(props: ComponentProps<typeof Base.Details>) {
  return <Base.Details {...props} />;
}
Details.Summary = DetailsSummary;
Details.Content = DetailsContent;

export function DetailsContent(props: ComponentProps<typeof Base.DetailsContent>) {
  return <Base.DetailsContent {...props} />;
}

export function DetailsSummary(props: ComponentProps<typeof Base.DetailsSummary>) {
  return <Base.DetailsSummary {...props} />;
}

export function Dialog(props: ComponentProps<typeof Base.Dialog>) {
  return <Base.Dialog {...props} />;
}
Dialog.Block = DialogBlock;
Dialog.TriggerContext = DialogTriggerContext;
Dialog.Trigger = DialogTrigger;

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

export function Dropdown(props: ComponentProps<typeof Base.Dropdown>) {
  return <Base.Dropdown {...props} />;
}
Dropdown.TriggerContext = DropdownTriggerContext;
Dropdown.Heading = DropdownHeading;
Dropdown.List = DropdownList;
Dropdown.Item = DropdownItem;
Dropdown.Button = DropdownButton;
Dropdown.Trigger = DropdownTrigger;

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

export function EXPERIMENTAL_AvatarStack(props: ComponentProps<typeof Base.EXPERIMENTAL_AvatarStack>) {
  return <Base.EXPERIMENTAL_AvatarStack {...props} />;
}

export function EXPERIMENTAL_Suggestion(props: ComponentProps<typeof Base.EXPERIMENTAL_Suggestion>) {
  return <Base.EXPERIMENTAL_Suggestion {...props} />;
}
EXPERIMENTAL_Suggestion.List = EXPERIMENTAL_SuggestionList;
EXPERIMENTAL_Suggestion.Input = EXPERIMENTAL_SuggestionInput;
EXPERIMENTAL_Suggestion.Empty = EXPERIMENTAL_SuggestionEmpty;
EXPERIMENTAL_Suggestion.Option = EXPERIMENTAL_SuggestionOption;
EXPERIMENTAL_Suggestion.Clear = EXPERIMENTAL_SuggestionClear;

export function EXPERIMENTAL_SuggestionClear(props: ComponentProps<typeof Base.EXPERIMENTAL_SuggestionClear>) {
  return <Base.EXPERIMENTAL_SuggestionClear {...props} />;
}

export function EXPERIMENTAL_SuggestionEmpty(props: ComponentProps<typeof Base.EXPERIMENTAL_SuggestionEmpty>) {
  return <Base.EXPERIMENTAL_SuggestionEmpty {...props} />;
}

export function EXPERIMENTAL_SuggestionInput(props: ComponentProps<typeof Base.EXPERIMENTAL_SuggestionInput>) {
  return <Base.EXPERIMENTAL_SuggestionInput {...props} />;
}

export function EXPERIMENTAL_SuggestionList(props: ComponentProps<typeof Base.EXPERIMENTAL_SuggestionList>) {
  return <Base.EXPERIMENTAL_SuggestionList {...props} />;
}

export function EXPERIMENTAL_SuggestionOption(props: ComponentProps<typeof Base.EXPERIMENTAL_SuggestionOption>) {
  return <Base.EXPERIMENTAL_SuggestionOption {...props} />;
}

export function ErrorSummary(props: ComponentProps<typeof Base.ErrorSummary>) {
  return <Base.ErrorSummary {...props} />;
}
ErrorSummary.Heading = ErrorSummaryHeading;
ErrorSummary.Item = ErrorSummaryItem;
ErrorSummary.List = ErrorSummaryList;
ErrorSummary.Link = ErrorSummaryLink;

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

export function Field(props: ComponentProps<typeof Base.Field>) {
  return <Base.Field {...props} />;
}
Field.Description = FieldDescription;
Field.Affixes = FieldAffixes;
Field.Affix = FieldAffix;
Field.Counter = FieldCounter;

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

export function Fieldset(props: ComponentProps<typeof Base.Fieldset>) {
  return <Base.Fieldset {...props} />;
}
Fieldset.Legend = FieldsetLegend;
Fieldset.Description = FieldsetDescription;

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

export function Pagination(props: ComponentProps<typeof Base.Pagination>) {
  return <Base.Pagination {...props} />;
}
Pagination.List = PaginationList;
Pagination.Item = PaginationItem;
Pagination.Button = PaginationButton;

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

export function Popover(props: ComponentProps<typeof Base.Popover>) {
  return <Base.Popover {...props} />;
}
Popover.TriggerContext = PopoverTriggerContext;
Popover.Trigger = PopoverTrigger;

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

export function Search(props: ComponentProps<typeof Base.Search>) {
  return <Base.Search {...props} />;
}
Search.Clear = SearchClear;
Search.Button = SearchButton;
Search.Input = SearchInput;

export function SearchButton(props: ComponentProps<typeof Base.SearchButton>) {
  return <Base.SearchButton {...props} />;
}

export function SearchClear(props: ComponentProps<typeof Base.SearchClear>) {
  return <Base.SearchClear {...props} />;
}

export function SearchInput(props: ComponentProps<typeof Base.SearchInput>) {
  return <Base.SearchInput {...props} />;
}

export function Select(props: ComponentProps<typeof Base.Select>) {
  return <Base.Select {...props} />;
}
Select.Option = SelectOption;
Select.Optgroup = SelectOptgroup;

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

export function Table(props: ComponentProps<typeof Base.Table>) {
  return <Base.Table {...props} />;
}
Table.Head = TableHead;
Table.Body = TableBody;
Table.Row = TableRow;
Table.Cell = TableCell;
Table.HeaderCell = TableHeaderCell;
Table.Foot = TableFoot;

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

export function Tabs(props: ComponentProps<typeof Base.Tabs>) {
  return <Base.Tabs {...props} />;
}
Tabs.List = TabsList;
Tabs.Tab = TabsTab;
Tabs.Panel = TabsPanel;

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

export function ToggleGroup(props: ComponentProps<typeof Base.ToggleGroup>) {
  return <Base.ToggleGroup {...props} />;
}
ToggleGroup.Item = ToggleGroupItem;

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
