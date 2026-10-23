# Modus Web-Erklärer

Standard seit Nutzerentscheidung 2026-10-23: dieselbe kompakte Retro-Sci-Fi-Maschine wie für Videoeinblendungen, ergänzt um interaktive Schrittwahl. Referenz: `../example/src/figure-video.mjs`. Größere Webfläche rechtfertigt keine zusätzlichen mechanischen Teile. Zustände und Erklärungstexte vertiefen die Erklärung.

`npm run build:web` baut die kompakte Standardfassung. Nur auf ausdrücklichen Wunsch: `npm run build:web:detailed` verwendet die erhaltene Detailvariante `figure-web.mjs`. Keine Mindestteilzahl.

- CI: `ci-retro-scifi.md`. Gleiche Leiterbahnfläche, warm-dunkle Gehäuse und funktionale Akzente; bei neuen Objekten Pixelstatus und abgeschrägte Formen passend einsetzen.
- Verständliche Zustände, Schrittwahl, Pause/Neustart und Tastaturbedienung anbieten. Reduzierte Bewegung durch ruhige Einzelzustände respektieren, beim Verlassen der Seite pausieren.
- Werte und Teile aus demselben Modell ableiten. Simulierte menschliche Schritte sichtbar als Simulation bezeichnen.
- Lesetext auf ruhiger Fläche; Glyphen ergänzen die Information. Auf Mobilgeräten Lesbarkeit und Bedienung zuerst.
- Gate: Desktop/Mobil, Tastatur, reduzierte Bewegung, Überläufe, Überdeckungen und Zustandskonsistenz im Browser. Veröffentlichung als eigener beauftragter Schritt.
