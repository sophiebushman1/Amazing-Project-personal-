// Room Layout Designer — main script
// Scale: every measurement is stored in FEET and converted to pixels for drawing.

const PIXELS_PER_FOOT = 40;

// Converts feet to on-screen pixels.
function feetToPixels(feet) {
  return feet * PIXELS_PER_FOOT;
}

console.log("Room Layout Designer loaded. Scale:", PIXELS_PER_FOOT, "px per ft");
