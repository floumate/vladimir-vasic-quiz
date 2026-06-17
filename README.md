# SF1 Kviz - Vladimir Vasić

Frontend kviz funnela (React + Vite) po SF1 Framework dokumentu i Brand Book-u v1.0.

## Pokretanje

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # produkcijski build u dist/
```

## Tok

`Intro → Q1–Q6 → Q7 (opciono) → Email gate → Score ekran → Gate 2 (korak 1/2 → 2/2) → hvala.html`

- **Gate 2 korak 1/2:** ime, email, telefon (country picker + zastava + pozivni
  broj, IP auto-detekcija države, validacija broja po državi — libphonenumber-js).
- **Gate 2 korak 2/2:** naziv firme, PIB/matični, godišnji prihod, broj zaposlenih, očekivanja.
- **Posle submita:** payload se sačuva u `sessionStorage` (`sf1_lead_payload`) i
  radi se redirect na posebnu `hvala.html` stranicu (spremna za meta pixel u `<head>`).
  Ništa se ne šalje na server.

Sva scoring logika je čista frontend if-then (računa se lokalno čim su Q1–Q6
odgovoreni, prikazuje tek posle email gate-a).

## Struktura

| Putanja | Šta je |
|---|---|
| `src/data/questions.js` | Pitanja Q1–Q7 + bodovi (jedini izvor istine za scoring) |
| `src/data/content.js` | Zone, problem-blokovi, personalizacija, copy |
| `src/lib/scoring.js` | `computeResult()` - score_100, 4 dimenzije, zona, problemi |
| `src/styles/tokens.css` | Brand boje, tipografija, radijusi (Brand Book) |
| `src/components/` | Ekrani i UI komponente |
| `src/App.jsx` | State machine toka + sklapanje payload-a |

## Scoring (SF1 Sekcija 4)

- Q1–Q6 nose 0–3, max 18 → `score_100 = round(zbir/18*100)`
- Dimenzije: Cash flow (Q1+Q5), Bankabilnost (Q4), Sistemska zrelost (Q3), Finansijska svest (Q2+Q6)
- Zone: 80–100 zelena, 60–79 žuta, 40–59 narandžasta, 0–39 crvena

## Otvoreno / čeka potvrdu

1. **Personalizovana rečenica (5.2):** tabela uslov→rečenica je rekonstruisana
   iz PDF-a (deo se izgubio pri konverziji). Vidi `PERSONALIZATION_RULES` u
   `content.js` - proveriti redosled prioriteta i mapiranje uz original.
2. **Finalni copy** (problemi, čitanja zone, CTA) - trenutno placeholder iz
   primera u dokumentu; menja se u `content.js`.
3. **VSL video** - placeholder blok; pravi video ide kasnije.
