# Validierung

Stand: 2026-10-23.

- Beide Beispielmodi mit Node.js gebaut: kompakte Videoeinblendung (12 Solid-Bauteile), ausführlicher Web-Erklärer (69).
- Alle 16 Dateien unter `kit/` gegenüber Upstream-Commit `1482e8469b0a9e0d8cc18ea2740a01423d29ae80` unverändert; Git-Diff leer, SHA-256-Katalog geprüft.
- Beide Modi in Chrome: keine Laufzeitfehler; Vor-/Zurückspringen bei 0, 3, 9 und 14 Sekunden, wiederholte Frames pixelidentisch.
- Mobilbreite 390 Pixel ohne horizontalen Überlauf; Schrittwahl und reduzierte Bewegung geprüft.
- Transparente Komposition wird aus derselben Timeline generiert. Die ursprüngliche Referenzproduktion wurde als 15-Sekunden-H.264 und ProRes 4444 mit tatsächlichem Alpha geprüft. Ein späterer Render aus diesem Fork muss erneut geprüft werden; ein Build allein ist kein Videoexportnachweis.

GitHub Actions prüft Kit-Integrität und beide Builds. Die visuelle Browserprüfung ist lokal erfolgt; sie wird durch den automatisierten Build nicht ersetzt.
