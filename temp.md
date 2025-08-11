# Meldinger

Monorepo for å håndtere alle typer meldinger / rapporter innenfor området til #produkt-melding

## Kom i gang

Kun applikasjon:

- Start meldinger applikasjonen:

```terminal
docker compose --profile monitoring up -d --build
```

- Send inn en ny melding (feks. via [scalar](http://localhost:9008/scalar/v1#tag/meldinger/post/meldinger)). Last opp minst et dokument og velg applikasjons id 'ulykkesvarsel' hvis du også vil motta meldingen.

- Sjekk resultat via API eller [Grafana](http://localhost:4000/explore)

Applikasjon med Altinn:

- Start altinn 'applocaltest' (docker) med altinn applikasjonen du vil teste

- Start meldinger applikasjonen:

```terminal
docker compose --profile monitoring up -d --build
```

- Registrer din altinn applikasjon:

```terminal
curl 'http://localhost:9008/altinn/register-application/{appId}' \
  --request POST
```

- Send inn et nytt altinn skjema

- Sjekk resultat via API eller [Grafana](http://localhost:4000/explore)

## Opprydding

```terminal
docker compose --profile monitoring down
```

Hvis du ønsker å slette all data mellom oppstart:

```terminal
docker compose --profile monitoring down -v
```
