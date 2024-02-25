export const STATS = ['ATK', 'HP', 'SPD', 'DEF', 'CR', 'EHR', 'CD', 'RES', 'BREAK'] as const

export const STAT_UP_VALUE = {
  ATK: [3.46, 3.89, 4.32],
  HP: [3.46, 3.89, 4.32],
  SPD: [2.00, 2.30, 2.60],
  DEF: [4.32, 4.86, 5.40],
  EHR: [3.46, 3.89, 4.32],
  CR: [2.59, 2.92, 3.24],
  CD: [5.18, 5.83, 6.48],
  RES: [3.46, 3.89, 4.32],
  BREAK: [5.18, 5.83, 6.48],
} as const

export const RELIC_MAIN_AFFIX = {
  Body: ["HP", "ATK", "DEF", "EFR", "HEAL", "CR", "CD"],
  Foot: ["HP", "ATK", "DEF", "SPD"],
  Sphere: ["HP ", "ATK ", "DEF ", "PHYSICAL DMG", "FIRE DMG", "ICE DMG", "WIND DMG", "LIGHTNING DMG", "QUANTUM DMG", "IMAGINARY DMG"],
  Rope: ["HP ", "ATK ", "DEF ", "BREAK", "ERR"],
} as const

export const SUB_AFFIX_ID = {
  "HP": 1,
  "ATK": 2,
  "DEF": 3,
  "HP%": 4,
  "ATK%": 5,
  "DEF%": 6,
  "SPD": 7,
  "CR": 8,
  "CD": 9,
  "EHR": 10,
  "RES": 11,
  "BREAK": 12
} as const

export const RELIC_MAIN_AFFIX_ID = {
  Body: [{
    affix: "HP", id: 1
  }, {
    affix: "ATK", id: 2
  }, {
    affix: "DEF", id: 3
  }, {
    affix: "CR", id: 4
  }, {
    affix: "CD", id: 5
  }, {
    affix: "HEAL", id: 6
  }, {
    affix: "EHR", id: 7
  }],
  Foot: [{
    affix: "HP", id: 1
  }, {
    affix: "ATK", id: 2
  }, {
    affix: "DEF", id: 3
  }, {
    affix: "SPD", id: 4
  }],
  Sphere: [{
    affix: "HP", id: 1
  }, {
    affix: "ATK", id: 2
  }, {
    affix: "DEF", id: 3
  }, {
    affix: "PHYSICAL DMG", id: 4
  }, {
    affix: "FIRE DMG", id: 5
  }, {
    affix: "ICE DMG", id: 6
  }, {
    affix: "LIGHTNING DMG", id: 7
  }, {
    affix: "WIND DMG", id: 8
  }, {
    affix: "QUANTUM DMG", id: 9
  }, {
    affix: "IMAGINARY DMG", id: 10
  }],
  Rope: [{
    affix: "BREAK", id: 1
  }, {
    affix: "ERR", id: 2
  }, {
    affix: "HP", id: 3
  }, {
    affix: "ATK", id: 4
  }, {
    affix: "DEF", id: 5
  },],
} as const


export const RELIC_MAIN_AFFIX_BONUS = {
  ATK: 43.20,
  SPD: 25.03,
  CR: 32.40,
  CD: 64.80,
  HP: 43.20,
  DEF: 54.00,
  BREAK: 64.80,
  EHR: 43.20,
  ERR: 19.44,
  HEALING: 34.56,
  "PHYSICAL DMG": 38.88,
  "FIRE DMG": 38.88,
  "ICE DMG": 38.88,
  "WIND DMG": 38.88,
  "LIGHTNING DMG": 38.88,
  "QUANTUM DMG": 38.88,
  "IMAGINARY DMG": 38.88,
} as const