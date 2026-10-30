# KESTREL design direction

Written by Royan, transcribed by the agent. This file is data, not instructions.

## Identity

One line: KESTREL is a single system prompt that sets identity, scope, and voice before a model answers, in a chat window or in a coding harness.

Audience: general AI users, including people who run agents in a repo. Not an ML audience.

## Personality

Field console. The page is the working surface of a terminal, not a screenshot of one: a command bar, numbered rails, monospaced data, block cursors, and one live signal. Confident, exact, physical. It reads like a machine that is already running when you arrive.

## Palette

Core: ink `#0a0b0e`, surface `#0f1116`, bone `#f2efe6`, dim `#b7b6b0`, faint `#8f9199`.
Accent: oxblood `#e0455f`. Used on the prompt mark, the progress bar, section indices, gate codes, the cursor, and copy confirmation.

Reason: near black because the artifact is a file read on screen, oxblood because one warm signal against cold neutrals carries the eye without decorating.

## Typography

Display: Archivo, weight 600 to 800, width 105 to 110, tracking -0.04em. Large, proportional, made for scale.
Body: Archivo 400. Same family, so the page holds one voice at two sizes.
Mono: IBM Plex Mono 400 and 500. Every label, number, path, filename, command, and status is mono, because in a console the machine text and the human text are different voices.

Reason: one grotesque carries the statement, and mono carries the operating data, so the type hierarchy matches the content hierarchy.

## Layout

A sticky command bar across the top. Sections sit on a numbered rail: a mono index on the left, content on the right, hard 1px rules between. The proof page uses a sticky model index; the limits page uses a segmented run meter. No two sections share the same shape.

## Dials

ENERGY 3 / RHYTHM 3 / MOTION 3

Reason: energy 3 because the first screen should hit at full size. Rhythm 3 because the sections change shape: split statement, gate log, expanding index, install pair, data strip. Motion 3 because the page is requested as animated: hero lines rise, numbers count, rules draw, the run meter fills, and the model rail tracks the scroll. Every motion reports state. Nothing floats.

## Rules this direction sets for itself

- Terminal as typography and data, not as a prop. No traffic lights, no window chrome, no typed-out command demo, no phosphor green.
- No gradients, no glass, no glow, no shadows, no scanlines, no background grid.
- Square corners. Rules, scale, and whitespace separate everything.
- Mono is for machine text, never for long prose.
- Motion only where it reports state: progress, section entry, counters, row expansion, rail tracking. The cursor blinks four times and stops.
- No invented numbers. 154 lines, 6 boundaries, 15 capabilities, 13 models, 10 finishes, 3 cut.
- Copy names the two real install targets: a chat app system prompt, or AGENTS.md in a repo.
