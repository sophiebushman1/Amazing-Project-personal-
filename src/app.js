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
// Starts at each type's first preset. Used when placing furniture (next feature).
const selectedSizes = {};
FURNITURE_CATALOG.forEach(function (item) {
  selectedSizes[item.type] = { width: item.sizes[0].width, length: item.sizes[0].length };
});

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

  header.append(swatchBox, info);

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

// Draw the starting page.
renderRoom();
renderFurnitureList();
