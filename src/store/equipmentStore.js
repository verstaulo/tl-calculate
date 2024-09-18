import { computed, reactive, ref, watch } from 'vue';
import { defineStore } from 'pinia';
import { useMasteryStore } from './masteryStore.js';
import mergeObjects from '../utils/mergeObjects';
import filteredSecondaryStats from '../utils/filterSecondaryWeaponStats';
import SET_BONUSES from '../constants/SET_BONUSES';

export const useEquipmentStore = defineStore('equipmentStore', () => {
    const masteryStore = useMasteryStore();
    const equipment = reactive({
        main_weapon: null,
        secondary_weapon: null,
        body: null,
        head: null,
        legs: null,
        boots: null,
        gloves: null,
        cloak: null,
        necklace: null,
        belt: null,
        bracelet: null,
        ring_first: null,
        ring_second: null
    });
    const equipmentStats = computed(() =>
        mergeObjects(
            equipment.main_weapon?.stats,
            equipment.main_weapon?.selectedTraits,
            equipment.main_weapon?.selectedResonance,
            filteredSecondaryStats(equipment.secondary_weapon?.stats),
            equipment.secondary_weapon?.selectedTraits,
            equipment.secondary_weapon?.selectedResonance,
            equipment.head?.stats,
            equipment.head?.selectedTraits,
            equipment.head?.selectedResonance,
            equipment.legs?.stats,
            equipment.legs?.selectedTraits,
            equipment.legs?.selectedResonance,
            equipment.body?.stats,
            equipment.body?.selectedTraits,
            equipment.body?.selectedResonance,
            equipment.boots?.stats,
            equipment.boots?.selectedTraits,
            equipment.boots?.selectedResonance,
            equipment.gloves?.stats,
            equipment.gloves?.selectedTraits,
            equipment.gloves?.selectedResonance,
            equipment.cloak?.stats,
            equipment.cloak?.selectedTraits,
            equipment.cloak?.selectedResonance,
            equipment.necklace?.stats,
            equipment.necklace?.selectedTraits,
            equipment.necklace?.selectedResonance,
            equipment.belt?.stats,
            equipment.belt?.selectedTraits,
            equipment.belt?.selectedResonance,
            equipment.bracelet?.stats,
            equipment.bracelet?.selectedTraits,
            equipment.bracelet?.selectedResonance,
            equipment.ring_first?.stats,
            equipment.ring_first?.selectedTraits,
            equipment.ring_first?.selectedResonance,
            equipment.ring_second?.stats,
            equipment.ring_second?.selectedTraits,
            equipment.ring_second?.selectedResonance,
            equipmentValidSetStats.value
        )
    );

    const equipmentSetCounter = computed(() => {
        const result = {};
        Object.values(equipment).forEach((item) => {
            if (item?.setName) {
                result[item.setName] = (result[item.setName] || 0) + 1;
            }
        });
        return result;
    });

    const equipmentDynamicSetStats = computed(() => {
        let result = null;
        Object.entries(equipmentSetCounter.value).forEach(([key, value]) => {
            if (value >= 4 && SET_BONUSES[key][4].value_type === 'dynamic') {
                result = SET_BONUSES[key][4].value;
            }
        });
        return result;
    });

    const equipmentSetStats = computed(() => {
        let result = {};
        Object.entries(equipmentSetCounter.value).forEach(([key, value]) => {
            if (value >= 2) {
                result = mergeObjects(result, SET_BONUSES[key][2].value);
            }
            if (value >= 4 && SET_BONUSES[key][4].value_type === 'static') {
                result = mergeObjects(result, SET_BONUSES[key][4].value);
            }
        });
        return result;
    });
    const equipmentValidSetStats = ref(null);
    watch(
        () => equipmentSetStats.value,
        (newValue, oldValue) => {
            if (newValue.skill_damage_over_time && oldValue.skill_damage_over_time) {
                if (newValue.skill_damage_over_time > oldValue.skill_damage_over_time) {
                    equipmentValidSetStats.value = {
                        ...newValue,
                        skill_damage_over_time: oldValue.skill_damage_over_time
                    };
                } else if (newValue.skill_damage_over_time < oldValue.skill_damage_over_time) {
                    equipmentValidSetStats.value = newValue;
                } else equipmentValidSetStats.value = newValue;
            } else if (newValue.critical_damage_bonus && oldValue.critical_damage_bonus) {
                if (newValue.critical_damage_bonus > oldValue.critical_damage_bonus) {
                    equipmentValidSetStats.value = {
                        ...newValue,
                        critical_damage_bonus: oldValue.critical_damage_bonus
                    };
                } else if (newValue.critical_damage_bonus < oldValue.critical_damage_bonus) {
                    equipmentValidSetStats.value = newValue;
                } else equipmentValidSetStats.value = newValue;
            } else equipmentValidSetStats.value = newValue;
        }
    );

    function putOnEquipment(item, equipmentStateKey) {
        if (equipment[equipmentStateKey]) {
            takeOffEquipment(equipmentStateKey);
        }
        equipment[equipmentStateKey] = item;
    }

    function takeOffEquipment(equipmentStateKey) {
        equipment[equipmentStateKey] = null;
        masteryStore.resetMasteryStore();
    }

    return {
        equipment,
        equipmentStats,
        equipmentSetCounter,
        equipmentDynamicSetStats,
        putOnEquipment,
        takeOffEquipment
    };
});
