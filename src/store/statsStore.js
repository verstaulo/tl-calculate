import { defineStore } from 'pinia';
import { computed } from 'vue';
import { useEquipmentStore } from './equipmentStore.js';
import { useAttributeStore } from './attributeStore.js';
import mergeObjects from '../utils/mergeObjects';
import DEFAULT_CHARACTER_STATS from '../constants/DEFAULT_CHARACTER_STATS.json';
import CHARACTER_STATS_DAMAGE_NO_WEAPON from '../constants/CHARACTER_STATS_DAMAGE_NO_WEAPON.json';
import { useMasteryStore } from './masteryStore.js';

export const useStatsStore = defineStore('statsStore', () => {
    const attributeStore = useAttributeStore();
    const equipmentStore = useEquipmentStore();
    const masteryStore = useMasteryStore();

    const stats = computed(() => {
        let result = {};
        if (equipmentStore.equipment.main_weapon) {
            result = mergeObjects(
                DEFAULT_CHARACTER_STATS,
                attributeStore.totalAttributeStats,
                equipmentStore.equipmentStats,
                masteryStore.masteryStats
            );
            result.attack_speed = Number(
                (result.attack_speed / (((result.attack_speed_bonus || 0) + 0) / 100 + 1)).toFixed(3)
            );
            if (result.bonus_range > 0) {
                result.attack_range = Number(
                    (result.attack_range + (result.attack_range * result.bonus_range) / 100).toFixed(2)
                );
            }
            if (result.shield_block_chance_bonus > 0) {
                result.shield_block_chance += result.shield_block_chance_bonus;
            }
            if (result.off_hand_weapon_attack_chance_bonus > 0) {
                result.off_hand_weapon_attack_chance = Number(
                    result.off_hand_weapon_attack_chance *
                        (result.off_hand_weapon_attack_chance_bonus / 100 + 1).toFixed(0)
                );
            }
            if (result.move_speed_bonus > 0) {
                result.move_speed = Number((result.move_speed * (result.move_speed_bonus / 100 + 1)).toFixed(0));
            }
        } else {
            result = mergeObjects(
                DEFAULT_CHARACTER_STATS,
                CHARACTER_STATS_DAMAGE_NO_WEAPON,
                attributeStore.totalAttributeStats,
                equipmentStore.equipmentStats
            );
            result.attack_speed = Number(
                (result.attack_speed / ((result.attack_speed_bonus || 0) / 100 + 1)).toFixed(3)
            );
            if (result.move_speed_bonus > 0) {
                result.move_speed = Number((result.move_speed * (result.move_speed_bonus / 100 + 1)).toFixed(0));
            }
        }
        if (equipmentStore.equipmentDynamicSetStats) {
            const bonusValue = Number(
                parseInt(
                    result[equipmentStore.equipmentDynamicSetStats.dependency_key] /
                        equipmentStore.equipmentDynamicSetStats.dependency_key_count
                ) * equipmentStore.equipmentDynamicSetStats.target_key_count
            );
            result[equipmentStore.equipmentDynamicSetStats.target_key] +=
                bonusValue > equipmentStore.equipmentDynamicSetStats.max_bonus
                    ? equipmentStore.equipmentDynamicSetStats.max_bonus
                    : bonusValue;
        }
        return result;
    });

    return {
        stats
    };
});
