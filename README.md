# Øvelser med Vitest

Dette sæt øvelser er målrettet elever, der allerede har erfaring med testskrivning i JavaScript. Fokus er på at arbejde med Vitest og styrke forståelsen af testprincipper som struktur, fejlhåndtering, mocking og dækning.

---

## Øvelse 1: Test med forskellige inputtyper

**Opgave:**  
Skriv tests for en funktion, der håndterer både tal, strenge og null-værdier. Sørg for at dække både gyldige og ugyldige input.

**Princip:**  
Test af grænsetilfælde og inputvariation. Formålet er at sikre, at funktioner reagerer korrekt på forskellige typer input og ikke fejler utilsigtet.

**Dokumentation:**  
[Expect API – Vitest](https://vitest.dev/api/expect/)

---

## Øvelse 2: Strukturér dine tests med `describe`, `beforeEach` og `afterEach`

**Opgave:**  
Organisér dine tests i grupper med `describe`. Brug `beforeEach` til at opsætte testdata og `afterEach` til at rydde op.

**Princip:**  
Teststruktur og gentagelighed. Ved at gruppere og genbruge opsætning undgår man duplikering og får mere overskuelige testfiler.

**Dokumentation:**  
[Test Context og Lifecycle – Vitest](https://vitest.dev/guide/test-context.html)

---

## Øvelse 3: Test af asynkrone funktioner

**Opgave:**  
Skriv tests for en funktion, der returnerer en Promise. Test både succes og fejltilfælde.

**Princip:**  
Asynkron testning kræver korrekt håndtering af ventetid og fejl. Det er vigtigt at sikre, at testen venter på resultatet og ikke afsluttes for tidligt.

**Dokumentation:**  
[Async Tests – Vitest](https://vitest.dev/guide/async.html)

---

## Øvelse 4: Test af fejl og undtagelser

**Opgave:**  
Skriv tests for en funktion, der kaster en fejl ved ugyldigt input. Test at fejlen bliver kastet som forventet.

**Princip:**  
Fejltestning handler om at sikre, at koden reagerer korrekt i fejltilstande. Det styrker robustheden og gør det lettere at finde bugs.

**Dokumentation:**  
[Expect toThrow – Vitest](https://vitest.dev/api/expect/#expecttothrow)

---

## Øvelse 5: Mocking af afhængigheder

**Opgave:**  
Skriv tests for en funktion, der bruger en ekstern afhængighed. Brug mocking til at erstatte afhængigheden i testen.

**Princip:**  
Mocking bruges til at isolere funktioner og undgå sideeffekter. Det gør det muligt at teste logik uden at være afhængig af eksterne moduler.

**Dokumentation:**  
[Mocking – Vitest](https://vitest.dev/guide/mocking.html)

---

## Øvelse 6: Testdækning og refaktorering

**Opgave:**  
Brug Vitests dækningsoverblik til at finde manglende tests. Tilføj tests, så alle grene i funktionerne bliver dækket. Refaktorér koden og kontroller, at alle tests stadig består.

**Princip:**  
Testdækning handler om at sikre, at alle relevante dele af koden bliver testet. Refaktorering skal ikke ændre funktionalitet, og tests hjælper med at bevare adfærden.

**Dokumentation:**  
[Coverage – Vitest](https://vitest.dev/guide/coverage.html)