import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FilePicker } from "./index";

test("Example test", async () => {
  const onClick = vi.fn();
  render(<FilePicker onClick={onClick} />);
  const button = screen.getByRole("button", { name: "Klikk meg" });
  await userEvent.click(button);
  expect(onClick).toHaveBeenCalledTimes(1);
});
