import { Button, Card, Details, Heading } from "@digdir/designsystemet-react";
import { ComponentProps } from "react";

interface TempExampleProps {
  heading?: string;
  onClick: () => void | Promise<void>;
  buttonVariant?: ComponentProps<typeof Button>["variant"];
}

export function TempExample({
  onClick,
  heading = "Tittel",
  buttonVariant = "primary",
}: Readonly<TempExampleProps>) {
  return (
    <Card>
      <Card.Block>
        <Heading>{heading}</Heading>
      </Card.Block>
      <Card.Block>
        <Details>
          <Details.Summary>Oppsummering</Details.Summary>
          <Details.Content>
            <Button variant={buttonVariant} onClick={onClick}>
              Klikk meg
            </Button>
          </Details.Content>
        </Details>
      </Card.Block>
    </Card>
  );
}
