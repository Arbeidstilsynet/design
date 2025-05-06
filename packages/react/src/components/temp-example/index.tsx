import { Button, Card, Details, Heading } from "@digdir/designsystemet-react";

interface TempExampleProps {
  onClick: () => void | Promise<void>;
}

export function TempExample({ onClick }: Readonly<TempExampleProps>) {
  return (
    <Card>
      <Card.Block>
        <Heading>Tittel</Heading>
      </Card.Block>
      <Card.Block>
        <Details>
          <Details.Summary>Oppsummering</Details.Summary>
          <Details.Content>
            <Button variant="primary" onClick={onClick}>
              Klikk meg
            </Button>
          </Details.Content>
        </Details>
      </Card.Block>
    </Card>
  );
}
