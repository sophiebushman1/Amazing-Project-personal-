// Room Layout Designer — main script
// Scale: every measurement is stored in FEET and converted to pixels for drawing.

const PIXELS_PER_FOOT = 40;
const MIN_ROOM_FEET = 4;
const MAX_ROOM_FEET = 60;

// The current room, always stored in feet.
const room = {
  widthFt: 12,
  lengthFt: 14,
};

// ----- DOM elements -----
const roomForm = document.getElementById("room-form");
const widthInput = document.getElementById("room-width");
const lengthInput = document.getElementById("room-length");
const roomError = document.getElementById("room-error");
const roomEl = document.getElementById("room");
const roomLabel = document.getElementById("room-label");
const furnitureList = document.getElementById("furniture-list");

// Converts feet to on-screen pixels.
function feetToPixels(feet) {
  return feet * PIXELS_PER_FOOT;
}

// Formats a number of feet for display, e.g. 12 -> "12", 10.5 -> "10.5".
function formatFeet(feet) {
  return Number.isInteger(feet) ? String(feet) : feet.toFixed(1);
}

// Draws the room at its real size and updates the label.
function renderRoom() {
  roomEl.style.width = feetToPixels(room.widthFt) + "px";
  roomEl.style.height = feetToPixels(room.lengthFt) + "px";
  roomLabel.textContent =
    "Room: " + formatFeet(room.widthFt) + " ft × " + formatFeet(room.lengthFt) + " ft";
}

// Checks one input. Returns the number in feet, or null if it's not valid.
function readFeet(input) {
  const value = parseFloat(input.value);
  const valid = !Number.isNaN(value) && value >= MIN_ROOM_FEET && value <= MAX_ROOM_FEET;
  input.parentElement.classList.toggle("invalid", !valid);
  return valid ? value : null;
}

// Runs when "Update room" is clicked (or Enter is pressed in an input).
function handleRoomSubmit(event) {
  event.preventDefault(); // stop the page from reloading

  const width = readFeet(widthInput);
  const length = readFeet(lengthInput);

  if (width === null || length === null) {
    roomError.textContent =
      "Room sides must be between " + MIN_ROOM_FEET + " and " + MAX_ROOM_FEET + " ft.";
    return;
  }

  roomError.textContent = "";
  room.widthFt = width;
  room.lengthFt = length;
  renderRoom();
}

// Builds the furniture panel from FURNITURE_CATALOG (see furniture.js).
function renderFurnitureList() {
  furnitureList.innerHTML = "";

  FURNITURE_CATALOG.forEach(function (item) {
    const li = document.createElement("li");
    li.className = "furniture-item";
    li.dataset.type = item.type;

    const swatch = document.createElement("div");
    swatch.className = "furniture-swatch";
    swatch.style.background = item.color;

    const info = document.createElement("div");
    info.className = "furniture-info";

    const name = document.createElement("span");
    name.className = "furniture-name";
    name.textContent = item.name;

    const size = document.createElement("span");
    size.className = "furniture-size";
    size.textContent = formatFeet(item.width) + " ft × " + formatFeet(item.length) + " ft";

    info.append(name, size);
    li.append(swatch, info);
    furnitureList.appendChild(li);
  });
}

roomForm.addEventListener("submit", handleRoomSubmit);

// Draw the starting page.
renderRoom();
renderFurnitureList();
