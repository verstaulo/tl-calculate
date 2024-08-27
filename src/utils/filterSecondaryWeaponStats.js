const filteredSecondaryStats = (stats) => {
    if (!stats) return {};
    const filteredStats = Object.entries(stats).filter(
        ([key, _]) =>
            key !== "main_max_damage" &&
            key !== "main_min_damage" &&
            key !== "off_hand_min_damage" &&
            key !== "off_hand_max_damage" &&
            key !== "attack_speed" &&
            key !== "attack_range" &&
            key !== "shield_block_chance" &&
            key !== "off_hand_weapon_attack_chance" &&
            key !== "damage_reduction"
    );
    return Object.fromEntries(filteredStats);
};
export default filteredSecondaryStats;
