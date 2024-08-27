const mergeObjects = (...objects) => {
    let result = {};
    if (objects.length === 0) return result;
    result = objects.reduce((acc, stats) => {
        if (stats) {
            Object.entries(stats).forEach(([key, value]) => {
                if (key === 'hit') {
                    acc.melee_hit = (acc.melee_hit || 0) + value;
                    acc.ranged_hit = (acc.ranged_hit || 0) + value;
                    acc.magic_hit = (acc.magic_hit || 0) + value;
                } else if (key === 'critical_hit') {
                    acc.melee_critical_hit = (acc.melee_critical_hit || 0) + value;
                    acc.ranged_critical_hit = (acc.ranged_critical_hit || 0) + value;
                    acc.magic_critical_hit = (acc.magic_critical_hit || 0) + value;
                } else if (key === 'heavy_attack_chance') {
                    acc.melee_heavy_attack_chance = (acc.melee_heavy_attack_chance || 0) + value;
                    acc.ranged_heavy_attack_chance = (acc.ranged_heavy_attack_chance || 0) + value;
                    acc.magic_heavy_attack_chance = (acc.magic_heavy_attack_chance || 0) + value;
                } else if (key === 'heavy_attack_evasion') {
                    acc.melee_heavy_attack_evasion = (acc.melee_heavy_attack_evasion || 0) + value;
                    acc.ranged_heavy_attack_evasion = (acc.ranged_heavy_attack_evasion || 0) + value;
                    acc.magic_heavy_attack_evasion = (acc.magic_heavy_attack_evasion || 0) + value;
                } else if (key === 'endurance') {
                    acc.melee_endurance = (acc.melee_endurance || 0) + value;
                    acc.ranged_endurance = (acc.ranged_endurance || 0) + value;
                    acc.magic_endurance = (acc.magic_endurance || 0) + value;
                } else acc[key] = Number(((acc[key] || 0) + (value || 0)).toFixed(3));
            });
            return acc;
        } else return acc;
    }, {});
    return result;
};
export default mergeObjects;
