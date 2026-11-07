# Roadmap

Each session is one feature and one commit (`feat: ... [time: Xh]`).
Time estimates are targets. Log your **actual** time in `TIME_LOG.md`.

**Done so far:** project setup, basic HTML/CSS layout (~1 h)
**Planned below:** ~22 h → total ~23 h (goal: 20+ h)

| #  | Session | What it adds | Est. |
|----|---------|--------------|------|
| 1  | Resize the room | "Update room" reads width/length in feet and redraws the room to scale; input validation (4–60 ft) | 1 h |
| 2  | Furniture catalog | Move furniture into a JavaScript data list (name, color, default width/length) and build the panel from that list | 1.5 h |
| 3  | Size dropdowns | Each furniture type gets a dropdown of preset sizes (e.g. Couch: Loveseat 5×3, Sofa 7×3, Sectional 9×6) plus a "Custom" option with width/length in feet | 2 h |
| 4  | Add furniture to the room | Clicking "Add" places a piece in the room at its real size, with its name printed on it | 1.5 h |
| 5  | Drag inside the room | Move pieces with the mouse, snap to a 0.5 ft grid, and keep them inside the walls | 2.5 h |
| 6  | Drag from the panel | Drag a piece straight from the panel and drop it where you want in the room | 1.5 h |
| 7  | Edit selected piece | Click a piece to select it; edit its size, rotate 90°, duplicate or delete it (buttons + Delete key) | 2 h |
| 8  | Overlap warnings | Pieces that overlap turn red so you can see what doesn't fit | 1.5 h |
| 9  | Multiple rooms | Create, name and switch between rooms (Living Room, Bedroom...) | 2 h |
| 10 | Save & load | Layouts persist in the browser (localStorage); export/import a layout as a JSON file | 1.5 h |
| 11 | Measurements | Dimension labels on pieces, foot markers along the walls, a "free floor space" readout | 1 h |
| 12 | Undo / redo | Ctrl/⌘+Z and Ctrl/⌘+Shift+Z for moves, adds, deletes and resizes | 2 h |
| 13 | Polish & keyboard | Arrow keys nudge the selected piece, nicer empty states, small-screen layout fixes | 1 h |
| 14 | Publish the site | Deploy with GitHub Pages and add the live link to the README | 0.5 h |
| 15 | Demo video & README | Record the 1–3 min video, embed it, finish the README and screenshots | 1.5 h |

## Stretch ideas (if there's time)
- Doors and windows on walls
- L-shaped rooms
- Furniture shapes beyond rectangles (round table, corner sectional)
- Export the layout as a PNG image
