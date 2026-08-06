# Brief per scrivere un case study Two Bee

Da dare a chiunque scriva la scheda di un progetto — incluso un Claude Code avviato
nella cartella di quel progetto. Una scheda = un file `.md` in questa cartella,
nome = slug del progetto (es. `elettra-crm.md`). Le schede approvate le converto
io in `src/pages/caseStudiesData.js`.

## Regole non negoziabili

1. **Nessun numero inventato.** Solo cifre che il cliente confermerebbe se
   qualcuno glielo chiedesse. Vanno bene i fatti verificabili del sistema
   (record migrati, quadrature, volumi gestiti); NON vanno bene stime di
   risparmio, percentuali di crescita o "-40% di tempo" dedotte a occhio.
   Se un numero non c'è: scrivi `TODO` e chi lo sa.
2. **Il problema si racconta come lo racconterebbe il cliente**, non come lo
   descriverebbe uno sviluppatore. "Non sapevamo quali lavori avevamo comprato
   e mai fatturato", non "mancava un vincolo di integrità fra le tabelle".
3. **Niente gergo di implementazione** nel corpo del testo. Framework, librerie
   e infrastruttura stanno solo nel campo `stack`.
4. **Segnala se il progetto NON è pubblicabile**: ancora in demo, cliente da
   avvisare, dati sensibili, contratto in corso. Meglio saperlo prima.
5. Se una cosa non la sai, `TODO` — non riempire il buco a intuito.

## Campi da compilare

```
slug:        (kebab-case, diventa l'ancora /casestudy#slug — poi non si cambia)
cliente:     (nome esatto come va scritto in pagina)
settore:
anno:
categorie:   crm | automazioni | integrazioni | ai | web | ads  (una o più)
sito:        (URL del cliente, se pubblico)

headline:    una riga su cosa è cambiato PER IL CLIENTE, non su cosa hai fatto

sfida:       3-5 righe. Il problema di partenza, concreto.

costruito:   - un punto per pezzo del sistema
             - cosa entra, cosa esce, chi viene avvisato e quando
             - le integrazioni con quello che il cliente già usava

stack:       elenco piatto di strumenti/tecnologie

metriche:    - VALORE — etichetta breve   (max 4, solo numeri confermabili)

citazione:   testo + nome + ruolo, se ce n'è una vera. Altrimenti ometti.

blueprint:   la regola che il diagramma non riesce a mostrare (una riga).
             Il diagramma si disegna a codice, vedi _BLUEPRINT.md

pubblicabile: sì / no + perché
TODO:        cosa manca e chi lo sa
```
