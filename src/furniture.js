// Furniture catalog
// Every size is in FEET. "width" runs left-to-right, "length" runs top-to-bottom
// when the piece is first placed in the room. Heights are ignored (this is 2D).
// The first size in each "sizes" list is the default.
// layer: "floor" pieces (like rugs) are drawn underneath everything else.

const FURNITURE_CATALOG = [
  {
    type: "couch", name: "Couch", color: "#8fa3b8",
    sizes: [
      { label: "Sofa",       width: 7,   length: 3   },
      { label: "Loveseat",   width: 5,   length: 3   },
      { label: "Large sofa", width: 8,   length: 3.5 },
      { label: "Sectional",  width: 9,   length: 6   },
    ],
  },
  {
    type: "armchair", name: "Armchair", color: "#a7b8a0",
    sizes: [
      { label: "Standard", width: 3,   length: 3   },
      { label: "Accent",   width: 2.5, length: 2.5 },
      { label: "Recliner", width: 3,   length: 3.5 },
    ],
  },
  {
    type: "bed", name: "Bed", color: "#c9b6d9",
    sizes: [
      { label: "Queen",          width: 5,    length: 6.75 },
      { label: "Twin",           width: 3.25, length: 6.25 },
      { label: "Full",           width: 4.5,  length: 6.25 },
      { label: "King",           width: 6.5,  length: 6.75 },
      { label: "California king", width: 6,   length: 7    },
    ],
  },
  {
    type: "nightstand", name: "Nightstand", color: "#b8a48f",
    sizes: [
      { label: "Standard", width: 2,   length: 1.5 },
      { label: "Small",    width: 1.5, length: 1.5 },
    ],
  },
  {
    type: "dresser", name: "Dresser", color: "#9c8574",
    sizes: [
      { label: "Standard", width: 5, length: 1.5 },
      { label: "Small",    width: 3, length: 1.5 },
      { label: "Wide",     width: 6, length: 1.5 },
    ],
  },
  {
    type: "table", name: "Table", color: "#b8946e",
    sizes: [
      { label: "4-seat", width: 4,   length: 3   },
      { label: "Bistro", width: 2.5, length: 2.5 },
      { label: "6-seat", width: 6,   length: 3   },
      { label: "8-seat", width: 8,   length: 3.5 },
    ],
  },
  {
    type: "chair", name: "Chair", color: "#d9a36b",
    sizes: [
      { label: "Dining",   width: 1.5, length: 2 },
      { label: "Standard", width: 2,   length: 2 },
    ],
  },
  {
    type: "desk", name: "Desk", color: "#a08a6e",
    sizes: [
      { label: "Standard", width: 4,   length: 2   },
      { label: "Compact",  width: 3.5, length: 2   },
      { label: "Large",    width: 5,   length: 2.5 },
    ],
  },
  {
    type: "tv-stand", name: "TV Stand", color: "#6f6a73",
    sizes: [
      { label: "Medium", width: 5, length: 1.5 },
      { label: "Small",  width: 4, length: 1.5 },
      { label: "Large",  width: 6, length: 1.5 },
    ],
  },
  {
    type: "bookshelf", name: "Bookshelf", color: "#8c6f5a",
    sizes: [
      { label: "Standard", width: 3, length: 1 },
      { label: "Narrow",   width: 2, length: 1 },
      { label: "Wide",     width: 4, length: 1 },
    ],
  },
  {
    type: "rug", name: "Rug", color: "#d9c9a8", layer: "floor",
    sizes: [
      { label: "8 × 5",  width: 8,  length: 5 },
      { label: "6 × 4",  width: 6,  length: 4 },
      { label: "10 × 8", width: 10, length: 8 },
      { label: "12 × 9", width: 12, length: 9 },
    ],
  },
];
