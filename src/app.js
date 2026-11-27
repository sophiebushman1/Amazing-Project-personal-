// Room Layout Designer — main script
// Scale: every measurement is stored in FEET and converted to pixels for drawing.

const PIXELS_PER_FOOT = 40;
const MIN_ROOM_FEET = 4;
const MAX_ROOM_FEET = 60;
const MIN_PIECE_FEET = 0.5;
const MAX_PIECE_FEET = 30;
const CUSTOM = "custom"; // value of the "Custom" dropdown option

// The current room, always stored in feet.
const room = {
  widthFt: 12,
  lengthFt: 14,
};

// The size currently chosen for each furniture type, e.g.
// selectedSizes.couch = { width: 7, length: 3 }.
// Starts at each type's first preset. Used when a piece is added to the room.
const selectedSizes = {};
FURNITURE_CATALOG.forEach(function (item) {
  selectedSizes[item.type] = { width: item.sizes[0].width, length: item.sizes[0].length };
});

// Every piece of furniture that has been added to the room.
// x and y are the piece's top-left corner, in feet from the room's top-left corner.
const placedPieces = [];
let nextPieceId = 1;

const SNAP_FEET = 0.5; // new pieces line up on a half-foot grid

// ----- DOM elements -----
const roomForm = document.getElementById("room-form");
const widthInput = document.getElementById("room-width");
const lengthInput = document.getElementById("room-length");
const roomError = document.getElementById("room-error");
const roomEl = document.getElementById("room");
const roomLabel = document.getElementById("room-label");
const furnitureList = document.getElementById("furniture-list");
const pieceCount = document.getElementById("piece-count");
const clearRoomButton = document.getElementById("clear-room");

// Converts feet to on-screen pixels.
function feetToPixels(feet) {
  return feet * PIXELS_PER_FOOT;
}

// Formats a number of feet for display, e.g. 12 -> "12", 6.25 -> "6.25".
function formatFeet(feet) {
  return String(Math.round(feet * 100) / 100);
}

// Formats a width × length pair, e.g. "7 ft × 3 ft".
function formatSize(width, length) {
  return formatFeet(width) + " ft × " + formatFeet(length) + " ft";
}

// Draws the room at its real size and updates the label.
function renderRoom() {
  roomEl.style.width = feetToPixels(room.widthFt) + "px";
  roomEl.style.height = feetToPixels(room.lengthFt) + "px";
  roomLabel.textContent = "Room: " + formatSize(room.widthFt, room.lengthFt);
}

// Keeps a number between a min and a max.
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

// Rounds feet to the nearest snap step (0.5 ft).
function snap(feet) {
  return Math.round(feet / SNAP_FEET) * SNAP_FEET;
}

// Moves a piece back inside the walls if it's poking out.
// (If a piece is bigger than the room, it's pinned to the top-left corner.)
function keepInsideRoom(piece) {
  piece.x = clamp(piece.x, 0, Math.max(0, room.widthFt - piece.width));
  piece.y = clamp(piece.y, 0, Math.max(0, room.lengthFt - piece.length));
}

// True if another piece already starts at exactly this spot.
function spotTaken(x, y) {
  return placedPieces.some(function (piece) {
    return piece.x === x && piece.y === y;
  });
}

// Adds a new piece of the given type to the middle of the room,
// using the size currently picked in that type's dropdown.
function addPiece(type) {
  const item = FURNITURE_CATALOG.find(function (entry) {
    return entry.type === type;
  });
  const size = selectedSizes[type];

  const piece = {
    id: nextPieceId++,
    type: item.type,
    name: item.name,
    color: item.color,
    layer: item.layer || "furniture",
    width: size.width,
    length: size.length,
    x: snap((room.widthFt - size.width) / 2),
    y: snap((room.lengthFt - size.length) / 2),
  };
  keepInsideRoom(piece);

  // Nudge it down-right so pieces added back-to-back don't hide each other.
  let tries = 0;
  while (spotTaken(piece.x, piece.y) && tries < 20) {
    piece.x += SNAP_FEET;
    piece.y += SNAP_FEET;
    keepInsideRoom(piece);
    tries++;
  }

  placedPieces.push(piece);
  renderPieces();
}

// Draws every placed piece inside the room.
function renderPieces() {
  roomEl.querySelectorAll(".piece").forEach(function (el) {
    el.remove();
  });

  placedPieces.forEach(function (piece) {
    const el = document.createElement("div");
    el.className = "piece";
    if (piece.layer === "floor") {
      el.classList.add("piece-floor");
    }
    el.dataset.id = piece.id;
    el.style.left = feetToPixels(piece.x) + "px";
    el.style.top = feetToPixels(piece.y) + "px";
    el.style.width = feetToPixels(piece.width) + "px";
    el.style.height = feetToPixels(piece.length) + "px";
    el.style.background = piece.color;
    el.title = piece.name + " — " + formatSize(piece.width, piece.length);

    // Small pieces only have room for the name.
    const smallSide = Math.min(feetToPixels(piece.width), feetToPixels(piece.length));
    if (smallSide < 50) {
      el.classList.add("piece-compact");
    }

    const name = document.createElement("span");
    name.className = "piece-name";
    name.textContent = piece.name;

    const size = document.createElement("span");
    size.className = "piece-size";
    size.textContent = formatFeet(piece.width) + " × " + formatFeet(piece.length);

    el.append(name, size);
    roomEl.appendChild(el);
  });

  const count = placedPieces.length;
  pieceCount.textContent = count + (count === 1 ? " piece" : " pieces");
  clearRoomButton.disabled = count === 0;
}

// Removes every piece from the room.
function clearRoom() {
  placedPieces.length = 0;
  renderPieces();
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
  placedPieces.forEach(keepInsideRoom);
  renderRoom();
  renderPieces();
}

// Sizes the little color swatch so its shape matches the piece's proportions.
function sizeSwatch(swatch, width, length) {
  const MAX_PX = 36;
  const scale = MAX_PX / Math.max(width, length);
  swatch.style.width = Math.max(6, width * scale) + "px";
  swatch.style.height = Math.max(6, length * scale) + "px";
}

// Saves a new size for a furniture type and updates its row in the panel.
function setSelectedSize(type, width, length, row) {
  selectedSizes[type] = { width: width, length: length };
  row.querySelector(".furniture-size").textContent = formatSize(width, length);
  sizeSwatch(row.querySelector(".furniture-swatch"), width, length);
}

// Reads a custom size input. Returns feet, or null if invalid (and marks it red).
function readPieceFeet(input) {
  const value = parseFloat(input.value);
  const valid = !Number.isNaN(value) && value >= MIN_PIECE_FEET && value <= MAX_PIECE_FEET;
  input.classList.toggle("invalid", !valid);
  return valid ? value : null;
}

// Makes a small labeled number input for the custom size fields.
function makeFeetInput(labelText, value) {
  const label = document.createElement("label");
  label.className = "custom-field";
  label.textContent = labelText;

  const input = document.createElement("input");
  input.type = "number";
  input.min = MIN_PIECE_FEET;
  input.max = MAX_PIECE_FEET;
  input.step = "0.25";
  input.value = value;

  const unit = document.createElement("span");
  unit.textContent = "ft";

  label.append(input, unit);
  return { label: label, input: input };
}

// Builds one row of the furniture panel: swatch, name, size, and size dropdown.
function buildFurnitureRow(item) {
  const li = document.createElement("li");
  li.className = "furniture-item";
  li.dataset.type = item.type;

  // Top line: swatch + name + current size
  const header = document.createElement("div");
  header.className = "furniture-header";

  const swatchBox = document.createElement("div");
  swatchBox.className = "swatch-box";
  const swatch = document.createElement("div");
  swatch.className = "furniture-swatch";
  swatch.style.background = item.color;
  swatchBox.appendChild(swatch);

  const info = document.createElement("div");
  info.className = "furniture-info";
  const name = document.createElement("span");
  name.className = "furniture-name";
  name.textContent = item.name;
  const size = document.createElement("span");
  size.className = "furniture-size";
  info.append(name, size);

  const addButton = document.createElement("button");
  addButton.type = "button";
  addButton.className = "btn btn-add";
  addButton.textContent = "+ Add";
  addButton.setAttribute("aria-label", "Add " + item.name + " to the room");
  addButton.addEventListener("click", function () {
    addPiece(item.type);
  });

  header.append(swatchBox, info, addButton);

  // Size dropdown: every preset, then "Custom…"
  const select = document.createElement("select");
  select.className = "size-select";
  select.setAttribute("aria-label", item.name + " size");
  item.sizes.forEach(function (preset, index) {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = preset.label + " (" + formatFeet(preset.width) + " × " + formatFeet(preset.length) + ")";
    select.appendChild(option);
  });
  const customOption = document.createElement("option");
  customOption.value = CUSTOM;
  customOption.textContent = "Custom…";
  select.appendChild(customOption);

  // Custom width/length inputs (hidden until "Custom…" is picked)
  const custom = document.createElement("div");
  custom.className = "custom-size";
  custom.hidden = true;
  const widthField = makeFeetInput("W", item.sizes[0].width);
  const lengthField = makeFeetInput("L", item.sizes[0].length);
  custom.append(widthField.label, lengthField.label);

  select.addEventListener("change", function () {
    if (select.value === CUSTOM) {
      custom.hidden = false;
      // Start the custom fields from whatever size was showing.
      widthField.input.value = selectedSizes[item.type].width;
      lengthField.input.value = selectedSizes[item.type].length;
      widthField.input.focus();
    } else {
      custom.hidden = true;
      const preset = item.sizes[Number(select.value)];
      setSelectedSize(item.type, preset.width, preset.length, li);
    }
  });

  function handleCustomInput() {
    const width = readPieceFeet(widthField.input);
    const length = readPieceFeet(lengthField.input);
    if (width !== null && length !== null) {
      setSelectedSize(item.type, width, length, li);
    }
  }
  widthField.input.addEventListener("input", handleCustomInput);
  lengthField.input.addEventListener("input", handleCustomInput);

  li.append(header, select, custom);
  setSelectedSize(item.type, item.sizes[0].width, item.sizes[0].length, li);
  return li;
}

// Builds the furniture panel from FURNITURE_CATALOG (see furniture.js).
function renderFurnitureList() {
  furnitureList.innerHTML = "";
  FURNITURE_CATALOG.forEach(function (item) {
    furnitureList.appendChild(buildFurnitureRow(item));
  });
}

roomForm.addEventListener("submit", handleRoomSubmit);
clearRoomButton.addEventListener("click", clearRoom);

// Draw the starting page.
renderRoom();
renderFurnitureList();
renderPieces();
