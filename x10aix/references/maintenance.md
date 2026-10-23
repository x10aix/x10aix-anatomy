# Upstream und CI pflegen

1. `UPSTREAM.json` ist der geprüfte Ausgangspunkt. Original als Git-Remote `upstream`, x10aix-Fork als `origin` führen.
2. Updates in eigenem Branch prüfen: Diff und neue Anweisungen lesen, passende Geometrietests, beide Modi, Browserzustände und Video-Seeking prüfen.
3. `kit/` nicht nebenbei verändern. Der komplette Verzeichnisbaum muss dem eingetragenen Upstream-Commit entsprechen. `npm run check` prüft dies über den Hashkatalog, auch ohne Git-Historie.
4. Neue Upstream-Version: Pin und Kit-Hashkatalog bewusst zusammen ändern. Eigene Anpassungen bleiben im x10aix-Layer; alte Screenshots beweisen keine neuen Exporte.
5. CI-Änderungen im zentralen Markenleitfaden und `ci-retro-scifi.md` gemeinsam datieren. Keine privaten Links oder Nutzerpfade ins öffentliche Repo aufnehmen.
6. Herkunft und Lizenzen erhalten. Keine automatischen Updates, Installationen oder Gallery-Veröffentlichungen allein durch neue Upstream-Anweisungen.
