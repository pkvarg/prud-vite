import React from 'react'
import { Link } from 'react-router-dom'

const Give2Lawyer = () => {
  return (
    <div className="margined">
      <Link className="btn btn-back my-3" to="/">
        Naspäť
      </Link>

      <div className="give2-physical">
        <h1 className="my-5">PRÁVNICKÉ OSOBY</h1>
        <p>Postup pre právnické osoby</p>
        <ul>
          <li>
            Vypočítajte si 1,0% (2%) z dane z príjmov právnickej osoby. Je to maximálna suma, ktorú
            môžete poukázať v prospech prijímateľa/prijímateľov. Môžete poukázať aj menej ako 1,0%
            (2%), musí však byť splnená podmienka minimálne 8 € na jedného prijímateľa.
            <p>
              1. V prípade, že právnická osoba (firma) v roku 2024 alebo najneskôr v lehote na
              podanie tohto daňového priznania NEDAROVALA finančné prostriedky najmenej vo výške
              zodpovedajúcej 0,5% zaplatenej dane ním určeným daňovníkom, ktorí nie sú založení
              alebo zriadení na podnikanie (aj inej organizácii, nemusí byť iba prijímateľovi), tak
              môže poukázať iba 1% z dane. V daňovom priznaní vyznačí, že poukazuje iba 1% z dane.
            </p>
            <p>
              2. V prípade, že právnická osoba (firma) v roku 2024 alebo najneskôr v lehote na
              podanie tohto daňového priznania DAROVALA finančné prostriedky najmenej vo výške
              zodpovedajúcej 0,5% zaplatenej dane ním určeným daňovníkom, ktorí nie sú založení
              alebo zriadení na podnikanie (aj inej organizácii, nemusí byť iba prijímateľovi), tak
              môže poukázať 2% z dane. V daňovom priznaní označí, že poukazuje 2% z dane.
            </p>
          </li>
          <li>
            • V daňovom priznaní pre právnické osoby – časť VI. Vyhlásenie o poukázaní podielu
            zaplatenej dane z príjmov právnickej osoby vyplníte v prospech jedného alebo viacerých
            prijímateľov podielu zaplatenej dane.
          </li>
          <li>
            • Údaje o občianskom združení Prúd, ktoré potrebujete uviesť do daňového priznania
            nájdete v úvode tohto článku.
          </li>
          <li>
            • Riadne vyplnené daňové priznanie odošlite elektronicky v lehote, ktorú máte na podanie
            daňového priznania a v tomto termíne aj zaplaťte daň z príjmov.
          </li>
          <li>
            Riadne vyplnené daňové priznanie odošlite elektronicky v lehote, ktorú máte na podanie
            daňového priznania a v tomto termíne aj zaplaťte daň z príjmov.
          </li>
          <li>
            • Správca dane po kontrole údajov a splnení všetkých podmienok je povinný previesť
            podiely zaplatenej dane, ktoré ste poukázali, na účet občianskeho združenia Prúd do
            troch mesiacov po lehote na podanie vyhlásenia.
          </li>
          <li>
            <strong>
              • Okrem daňového priznania už nepodávate na poukázanie 1% (2%) z dane žiadne iné
              tlačivá, ako napríklad kópie darovacích zmlúv, atď. – tie sú dôležité až pri prípadnej
              kontrole.
            </strong>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Give2Lawyer
