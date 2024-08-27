import { computed, ref, watch } from 'vue';
import { defineStore } from 'pinia';
import { useMasteryStore } from './masteryStore.js';
import mergeObjects from '../utils/mergeObjects';
import filteredSecondaryStats from '../utils/filterSecondaryWeaponStats';
import SET_BONUSES from '../constants/SET_BONUSES';

export const useEquipmentStore = defineStore('equipmentStore', () => {
    const masteryStore = useMasteryStore();
    const equipment = ref({
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
            mergeObjects(equipment.value.main_weapon?.stats, equipment.value.main_weapon?.selectedTraits),
            mergeObjects(
                filteredSecondaryStats(equipment.value.secondary_weapon?.stats),
                equipment.value.secondary_weapon?.selectedTraits
            ),
            mergeObjects(equipment.value.head?.stats, equipment.value.head?.selectedTraits),
            mergeObjects(equipment.value.legs?.stats, equipment.value.legs?.selectedTraits),
            mergeObjects(equipment.value.body?.stats, equipment.value.body?.selectedTraits),
            mergeObjects(equipment.value.boots?.stats, equipment.value.boots?.selectedTraits),
            mergeObjects(equipment.value.gloves?.stats, equipment.value.gloves?.selectedTraits),
            mergeObjects(equipment.value.cloak?.stats, equipment.value.cloak?.selectedTraits),
            mergeObjects(equipment.value.necklace?.stats, equipment.value.necklace?.selectedTraits),
            mergeObjects(equipment.value.belt?.stats, equipment.value.belt?.selectedTraits),
            mergeObjects(equipment.value.bracelet?.stats, equipment.value.bracelet?.selectedTraits),
            mergeObjects(equipment.value.ring_first?.stats, equipment.value.ring_first?.selectedTraits),
            mergeObjects(equipment.value.ring_second?.stats, equipment.value.ring_second?.selectedTraits),
            equipmentValidSetStats.value
        )
    );
    const equipmentSetCounter = computed(() => {
        const result = {};
        Object.values(equipment.value).forEach((item) => {
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
        if (equipment.value[equipmentStateKey]) {
            takeOffEquipment(equipmentStateKey);
        }
        equipment.value[equipmentStateKey] = item;
    }

    function takeOffEquipment(equipmentStateKey) {
        equipment.value[equipmentStateKey] = null;
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
