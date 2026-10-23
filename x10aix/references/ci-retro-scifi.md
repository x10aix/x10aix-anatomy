# x10aix Leiterbahn-CI / Retro-Sci-Fi

Stand: 2026-10-23. Versionierte Gestaltungsreferenz dieses Forks. Neuere ausdrückliche Markenentscheidungen haben Vorrang; Änderungen hier und im zentralen Markenleitfaden gemeinsam pflegen.

## Bildidee

Eine Platine: Inhalte sitzen als Bauteile darauf, Leiterbahnen verbinden sie. Wenige Wörter, eine Aussage pro Zustand, belegte Aussagen. Understatement statt Effekt.

## Farben (dunkle Standardansicht)

| Rolle | Wert | statt Stitch01 |
|---|---|---|
| Grundfläche | `#14110E` | `#2A2420` |
| Erhabene Fläche (Bauteil, Knopf) | `#231D18` | `#2D2520` |
| Vertiefte Fläche | `#100D0B` | `#1A1612` |
| Eingelassene Fläche (Inhalt, Erklärfläche) | `#0A0807` | `#221E1A` |
| Überschrift, Wortmarke | `#E8D4A0` | gleich |
| Text | `#D4C5A9` | gleich |
| Nebentext | `#C4B59A` | neu |
| Gedämpft | `#A89968` | gleich |
| Linie leise / Haarlinie / Standard / stark | `#2A231C` / `#3A3127` / `#4F4336` / `#5F5244` | `#6B5D4F` |
| Labels, Reiter, Kicker | `#A8C8E8` | neu |
| Links, Handlung | `#7DD3E8` | neu |
| Leiterbahn-Cyan, Phase Establish | `#00BCD4` | gleich |
| Amber: Zahlen, Preise, Phase Enable | `#E8A030` | gleich |
| Phase Execute / Evolve | `#5FD35F` / `#6B8DB8` | gleich, nur semantisch |
| Signal Achtung | `#E5675A` | neu, nur mit Wort |

Leiterbahnen: Verlauf von Cyan (links) über Creme `#E8D4A0` zu Amber (rechts), Ruhe-Bahnen 20 % deckend. Keine weiteren Farben.

## Schrift

- **Text, Erklärungen, Aussagen:** Inter 400/700 (lokal eingebunden, wie in den Social-Headern `example/assets/inter400.woff2`, `inter700.woff2`).
- **VT323** nur für Wortmarke „x10aix“, kurze Labels/Reiter (Großbuchstaben, weiter Abstand), große Schritt- und Kennzahlen, Preise. Kein durchgehender Pixeltext mehr.
- **Untertitel:** bis zur Entscheidung von Michael unverändert nach Stitch01 (VT323, aktives Wort `#FFE45C`, übriger Text `#F1E9D4`). Vorschlag zur Prüfung: Inter, aktives Wort Amber `#E8A030`. Nicht eigenmächtig umstellen.
- Größen für 1920 × 1080 bzw. 1080 × 1920 neu bemessen; keine Website-Pixelwerte übertragen. Lesbarkeit bei 480 × 270 und ca. 390 × 693 prüfen.

## Rahmen und Flächen

- **Inhalt = Anzeige:** eingelassene Fläche `#0A0807`, leiser Rand, leuchtet nie.
- **Handlung = Bauteil:** erhabene Fläche `#231D18`, Rand in der eigenen Farbe gedimmt, Pfeil `›`, darf aufleuchten.
- **Reiter:** kurzer Begriff in VT323 `#A8C8E8`, sitzt bündig auf dem Rahmen, Ecken oben 8 px (Website-Maß, proportional skalieren).
- **Feine Linien** statt 4-px-Rahmen; kleine Rundungen nach Rolle (Website 6 / 10 / 14 px, auf das Format skaliert), zurückhaltende Schatten. Keine harten Pixelkanten als Pflicht.
- Mehrere Bauteile bilden eine Baugruppe: dünner Umriss `#4F4336`, Füllung `#100D0B` zu 65 %.

## Leiterbahnen

- Leiterbahnen sind integrierter Bestandteil der CI, nicht bloß Randdekoration (Michael, bestätigt 2026-10-23 am Anatomy-Vergleich). Sie bilden die gemeinsame Platinenfläche um und unter Funktionsbauteilen; nicht den gesamten Maschinenbereich aussparen. Text, Gesicht, Untertitel und eingelassene Statusanzeigen freistellen.
- Im Video bleibt die Leiterbahnfläche statisch. Gezielte, timelinegesteuerte Impulse dürfen Funktionen verbinden; danach Ruhe. Keine zufälligen Dauerpulse aus dem Website-Script in den Render übernehmen.
- 8-px-Raster (auf das Format skaliert), nur 90°/45°, runde Pads an freien Enden.
- Das Beispiel enthält einen statischen Leiterbahn-Hintergrund aus der x10aix-CI; eigene SVG-Verbindungen sind Adaptionen. Die Hintergrundfläche nicht durch zufällige Laufzeitpulse ersetzen.

## Bewegung

Kurzes Ein-/Ausblenden, gezielte Aktivierung (Rahmen leuchtet ca. 280 ms auf, verglimmt ca. 2,4 s), danach Ruhe. Keine Dauerpulse, keine Glitches, keine Scanlines oder CRT-Struktur (Altbestand Stitch01).

## Icons

Semantisch eindeutig, wenige Teile. Bis zur Entscheidung über einen neuen Iconstil bleiben die bestehenden Motive aus dem x10aix-Iconkatalog nutzbar, in den Farben dieser Datei. Keine metallischen Objekte, keine Fremd-Iconfonts.

## Retro-Sci-Fi als Animationsgrundlage

Von Michael am 2026-10-23 als Grundlage für zukünftige x10aix-Animationen bestätigt. Bezug: frühe Computerspiele, Wing Commander und Point-and-Click-Adventures. Die Richtung ergänzt die aktive Leiterbahn-CI; Stitch01 bleibt Legacy.

- Gestalte technische Objekte wie verständliche, bedienbare Adventure-Requisiten: kantige oder abgeschrägte Gehäuse, eingelassene Paneele, dunkle Transport-/Dockingflächen und wenige deutlich abgesetzte Bedienelemente.
- Nutze kleine Pixel-Displays, blockige Statusglyphen und kräftige Konturen gezielt. Statusanzeigen folgen dem tatsächlichen Ablauf; dekorative Technik darf keine zusätzliche Funktion oder automatische Freigabe suggerieren.
- Erhalte warme dunkle Grundflächen, integrierte Leiterbahnen und funktionale Türkis-/Amber-Akzente. Matte Flächen und abgestufte Schattierung statt metallischem Fotorealismus. Retro ist eine Formensprache, kein Vollbildfilter: kein Dauerflackern, keine Glitches oder CRT-/Scanline-Pflicht.
- Für Videoeinblendungen bleiben wenige große Funktionsgruppen entscheidend; Oberflächengrafik statt zusätzlicher Kleinteile. Prüfe die Silhouette und Hauptfunktion bei 480 × 270. Die zwölf Bauteile des Beispiels sind kein allgemeines Limit.
- Übertrage die Stilrichtung auf die jeweilige Aussage; nicht jede Animation braucht eine Maschine, ein Cockpit oder eine Docking-Schranke. Schrift-, Untertitel- und Produktionsregeln bleiben gültig. Eigenständige Grafiken entwickeln; Spielassets nicht als Bestandteil der CI behandeln.


Referenz: `../example-retro.png` und `../example/src/figure-video.mjs`.

Standard der Maschinenbauform (Nutzerentscheidung 2026-10-23): kompakt für Video und Web. Im Web kommt interaktive Schrittwahl hinzu; detaillierte Mechanik nur auf ausdrücklichen Wunsch.
