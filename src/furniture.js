// Furniture catalog
// Every size is in FEET. "width" runs left-to-right, "length" runs top-to-bottom
// when the piece is first placed in the room. Heights are ignored (this is 2D).

const FURNITURE_CATALOG = [
  { type: "couch",      name: "Couch",      color: "#8fa3b8", width: 7,   length: 3   },
  { type: "armchair",   name: "Armchair",   color: "#a7b8a0", width: 3,   length: 3   },
  { type: "bed",        name: "Bed",        color: "#c9b6d9", width: 5,   length: 6.5 },
  { type: "nightstand", name: "Nightstand", color: "#b8a48f", width: 2,   length: 1.5 },
  { type: "dresser",    name: "Dresser",    color: "#9c8574", width: 5,   length: 1.5 },
  { type: "table",      name: "Table",      color: "#b8946e", width: 5,   length: 3   },
  { type: "chair",      name: "Chair",      color: "#d9a36b", width: 2,   length: 2   },
  { type: "desk",       name: "Desk",       color: "#a08a6e", width: 4,   length: 2   },
  { type: "tv-stand",   name: "TV Stand",   color: "#6f6a73", width: 5,   length: 1.5 },
  { type: "bookshelf",  name: "Bookshelf",  color: "#8c6f5a", width: 3,   length: 1   },
  { type: "rug",        name: "Rug",        color: "#d9c9a8", width: 8,   length: 5   },
];
