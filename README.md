# Panetti Photography — weboldal

**🌐 Élő oldal:** <https://maszlaig.github.io/PanettiPhotography/>

Palicskó Anett (Panetti Photography, Nyírbátor) fotós vállalkozásának weboldala.
Statikus oldal — nincs szükség szerverre, bármelyik böngészőben megnyitható és
bármelyik tárhelyre feltölthető.

## Fájlok

```
06_PanettiPhotography/
├── index.html        → az oldal szerkezete (kétnyelvű: HU/EN)
├── css/style.css     → megjelenés, arculat, reszponzív elrendezés
├── js/main.js        → nyelvváltó, galéria, lightbox, űrlap, hero-animáció
├── kepek/            → képek (logó, favicon, galéria-almappák)
└── README.md         → ez a fájl
```

Az oldal teljesen **reszponzív**: asztali gép, tablet és mobil nézethez is
igazodik (töréspontok: 960 / 900 / 720 / 460 px), telefonon a menü hamburger-
menüvé alakul. A `csökkentett mozgás` (prefers-reduced-motion) beállítást is
tiszteletben tartja.

## 0. A LOGÓ behelyezése (fontos!)

A logó a fejlécben, a láblécben és a böngészőfül-ikonban (favicon) jelenik meg.
A valódi logók **már be vannak építve**:

- **`kepek/logo.jpg`** → a **kör alakú** logó (807×807). Ez látszik a fejlécben,
  láblécben és faviconként. Az oldal automatikusan körre vágja (`border-radius`).
- **`kepek/logo-negyzet.png`** → a **négyzetes, rózsaszín keretes** változat
  (nagy felbontású). Jelenleg nincs beépítve a weboldalba (social posztokhoz /
  Instagramhoz hasznos), de elérhető, ha később valahol fel akarod használni.

Ha később cserélnéd a logót, csak írd felül a `kepek/logo.jpg` fájlt azonos
néven (vagy más néven, de akkor az `index.html`-ben a `kepek/logo.jpg`
hivatkozásokat is át kell írni — fejléc, lábléc, favicon).

## 1. Fotók

A valódi fotók már be vannak töltve. A **galéria képei kategória-almappákban**
vannak rendszerezve a `kepek/` mappán belül:

```
kepek/
├── kismama/   → kismama-1.png … kismama-3.png
├── portre/    → portre-1.png … portre-2.png
├── eskuvo/    → eskuvo-1.png … eskuvo-2.png
├── csaladi/   → csaladi-1.png … csaladi-3.png
└── gyermek/   → gyermek-1.png … gyermek-2.png
```

A galéria-szűrő ezekhez a kategóriákhoz igazodik (`data-cat` az `index.html`-ben).
**Új kép hozzáadása:** tedd a megfelelő mappába, majd az `index.html` galéria
szekciójában adj hozzá egy sort a minta szerint:
`<figure class="gitem reveal" data-cat="kismama"><img src="kepek/kismama/kismama-4.png" alt="Kismama fotózás" loading="lazy" /></figure>`

> **Tipp:** a galériaképek most PNG-ben vannak, egyenként ~1 MB. Ajánlott JPG-be
> konvertálni és max ~1600px szélességre méretezni a gyorsabb betöltésért.

**Egyéb fotók:**
- `kepek/rolam.jpg` → a „Rólam" szekció portréja (lágy, elmosott széllel illesztve)
- A **nyitó (hero)** logó-animációja: az oldal betöltésekor a logó **vonalai
  kirajzolódnak** (a virágtól kifelé), majd az egész **elhomályosodik** és átúszik
  az oldalba. A rajzolódó logó vektorizált, inline SVG az `index.html`-ben
  (`.intro__draw`); a hero-ban a `kepek/logo-hero.png` (arany, átlátszó hátterű logó)
  lebeg. Ha valódi stúdiófotót szeretnél a hero mögé, beépíthető egy `kepek/hero.jpg`.
- `og-cover.jpg` → megosztási kép (közösségi médiához, 1200×630) — jelenleg egy
  márkázott, stúdió-hangulatú borító a logóval. Ha inkább Anett egy valódi
  stúdiófotóját szeretnéd rá (opcionális arculati felirattal), cseréld ki ezt a
  fájlt egy 1200×630-as képre.

> **Tipp:** a galériaképeknél a `data-cat` attribútum adja meg a kategóriát
> (`kismama`, `portre`, `eskuvo`, `csaladi`, `gyermek`) — ez alapján működik a szűrő.
> A képeket érdemes menteni előtte kb. 1600 px szélességre és tömöríteni, hogy gyorsan töltsön.

## 2. Árak kitöltése

Az árak most szándékosan üresek. Az `index.html`-ben az `Árak` szekcióban
keresd a `— Ft` szövegeket, és írd át a konkrét összegekre
(pl. `15 000 Ft`). Három csomag van előkészítve: Mini, Klasszik, Prémium —
a csomagok neve, tartalma szabadon módosítható.

## 3. Vélemények

A `Vélemények` szekcióban jelenleg minta-szövegek vannak. Cseréld le őket
Anett valódi Facebook-értékeléseire (a `data-hu` / `data-en` attribútumokban
és a látható szövegben egyaránt).

## 4. Kétnyelvűség (HU/EN)

Minden fordítható szöveg `data-hu` és `data-en` attribútumot kapott.
Ha új szöveget adsz hozzá, add meg mindkét nyelven. A nyelvválasztás a
böngészőben megjegyződik (localStorage).

## 5. Kapcsolati űrlap

Az űrlap jelenleg a látogató levelezőprogramját nyitja meg (`mailto:`),
előre kitöltött üzenettel a `panettiphoto@gmail.com` címre. Ha automatikus
küldést szeretnél (a látogató levelezője nélkül), köss be egy ingyenes
szolgáltatást, pl. [Formspree](https://formspree.io) — ehhez a `js/main.js`
`contactForm` részét kell módosítani.

## 6. Elérhetőségek (jelenleg beállítva)

- Telefon: +36 30 254 5022
- E-mail: panettiphoto@gmail.com
- Instagram: https://www.instagram.com/panetti_photography/
- Facebook: https://www.facebook.com/panettiphoto/
- Helyszín: Nyírbátor, Magyarország

## 7. Közzététel

Töltsd fel a mappa teljes tartalmát bármelyik tárhelyre. Ingyenes lehetőségek:
**Netlify**, **Cloudflare Pages**, **GitHub Pages** — elég a mappát behúzni.
Saját domain (pl. `panettiphoto.hu`) ezekhez könnyen köthető.
