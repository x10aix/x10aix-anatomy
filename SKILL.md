---
name: x10aix-anatomy
description: Erstellt isometrische x10aix-Erkläranimationen in Leiterbahn- und Retro-Sci-Fi-CI, als kompakte Videoeinblendung oder ausführlichen interaktiven Web-Erklärer. Nutzt das unveränderte Anatomy-Geometrie-Kit mit eigener Gestaltung und deterministischer Videozeitsteuerung.
license: MIT
compatibility: Node.js 22+, Chrome oder Chromium für Browserprüfungen. Videoexport benötigt HyperFrames und FFmpeg; reine Web-Erklärer nicht.
---
# x10aix Anatomy

Dieser Einstieg ersetzt die gestalterischen und Größenregeln des Original-Skills. Das Geometrie-Kit bleibt unverändert. Lies zuerst [CI / Retro-Sci-Fi](x10aix/references/ci-retro-scifi.md), dann den benötigten Modus. Technische Upstream-Referenzen bleiben nutzbar; ihre Mindestteilzahlen, Standardrahmen oder Daueranimationen sind keine x10aix-Vorgabe.

## Modus wählen

| Wunsch | Modus | Einstieg |
| --- | --- | --- |
| Einblendung über Video, kurzer Clip, freigestelltes Objekt, kleines Motiv | **Videoeinblendung** | [video-insert.md](x10aix/references/video-insert.md) |
| Website, nutzergesteuerter Ablauf, größere interaktive Darstellung | **Web-Erklärer** | [web-explainer.md](x10aix/references/web-explainer.md) |

Leite den Modus aus dem Auftrag ab. Sind beide Ausgaben beauftragt, verwende dasselbe Zustandsmodell mit angepasstem Detailgrad. Ist das Ausgabemedium unklar und entscheidend, frage gezielt danach. Keine universelle Mindestzahl von Teilen; Verständlichkeit bei der Zielgröße entscheidet.

## Gemeinsamer Ablauf

1. Formuliere Aussage, Zustände und Bedeutung jeder Bewegung. Fakten, Simulation und menschliche Entscheidungen eindeutig trennen.
2. Wähle ein verständliches Objekt und wenige Funktionsgruppen. Frühe Sci-Fi-Spiele und Point-and-Click-Adventures sind die Formensprache; nicht jede Aussage braucht eine Maschine.
3. Baue mit `kit/iso-kit.mjs`. Erfasse Bauteile und korrekte Tiefenreihenfolge. Für spezielle Geometrie die passende Originalreferenz unter `references/` lesen; das Kit nicht beiläufig ändern.
4. Gestalte mit warmen dunklen Flächen, integrierten Leiterbahnen, funktionalen Türkis-/Amber-Akzenten, abgeschrägten Gehäusen und gezielten Pixel-Displays. Eigenständige Grafik, keine übernommenen Spielassets. Textflächen bleiben ruhig; Status durch mehr als Farbe vermitteln.
5. Treibe Anzeige und Bewegung aus demselben Modell. Video ausschließlich seekbar; Web mit Tastatur, Pause und reduzierter Bewegung.
6. Prüfe Anfang, Zustandswechsel, Ende und Rückwärtssprung im Browser. Kontrolliere kleine Darstellung, Überdeckungen und tatsächliche Exporte. Ein Render ist keine inhaltliche oder menschliche Freigabe.

## Referenz und Grenzen

`x10aix/example/src/figure-video.mjs`: kompakte Retro-Sci-Fi-Maschine. `figure-web.mjs`: ausführlichere Fassung. Zwölf Teile im Beispiel sind kein allgemeines Limit. [README](README.md) beschreibt Aufbau und Vorschau.

`x10aix/upstream/SKILL.md` dokumentiert Herkunft und ist kein zweiter gleichzeitig geltender Skill. Keine automatische Gallery-Veröffentlichung. Publizieren, Kundenmaterial übertragen oder einen produktiven Webauftritt ändern nur im beauftragten Umfang.

Herkunft: [Anatomy](https://github.com/wheresryan22/anatomy), [LICENSE](LICENSE). Pin: [UPSTREAM](x10aix/UPSTREAM.json). Aktualisierung: [Wartung](x10aix/references/maintenance.md).
