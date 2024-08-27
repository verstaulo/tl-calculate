import ENCHANT_PATTERNS from "../constants/ENCHANT_PATTERNS.json";

export const enchantEquipmentStats = (stats, enchantPattern, itemLvl) => {
  const resultStats = {};

  const filteredKeys = Object.keys(stats).filter((key) => {
    if (Object.keys(ENCHANT_PATTERNS[enchantPattern]).includes(key)) return key;
  });

  filteredKeys.forEach((statkey) => {
    resultStats[statkey] = ENCHANT_PATTERNS[enchantPattern][statkey][itemLvl];
  });
  return resultStats;
};
