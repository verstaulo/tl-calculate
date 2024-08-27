import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { useEquipmentStore } from './equipmentStore.js';
import { useMasteryStore } from './masteryStore.js';
import mergeObjects from '../utils/mergeObjects.js';
import ATTRIBUTES_DAMAGE_PATTERN from '../constants/ATTRIBUTE_DAMAGE_PATTERN.json';
import HP_MP_REGEN_PATTERN from '../constants/HP_MP_REGEN_PATTERN.json';

export const useAttributeStore = defineStore('attributeStore', () => {
    const availableAttributesPoints = ref(54);
    const equipmentStore = useEquipmentStore();
    const masteryStore = useMasteryStore();

    const addedAttributeCount = ref({
        strength: 0,
        dexterity: 0,
        wisdom: 0,
        perception: 0
    });

    const attributeCount = computed(() => ({
        strength:
            addedAttributeCount.value.strength +
            (equipmentStore.equipmentStats?.strength || 0) +
            (masteryStore.masteryStats?.strength || 0) +
            10,
        dexterity:
            addedAttributeCount.value.dexterity +
            (equipmentStore.equipmentStats?.dexterity || 0) +
            (masteryStore.masteryStats?.dexterity || 0) +
            10,
        wisdom:
            addedAttributeCount.value.wisdom +
            (equipmentStore.equipmentStats?.wisdom || 0) +
            (masteryStore.masteryStats?.wisdom || 0) +
            10,
        perception:
            addedAttributeCount.value.perception +
            (equipmentStore.equipmentStats?.perception || 0) +
            (masteryStore.masteryStats?.perception || 0) +
            10
    }));
    const attributeStats = computed(() => {
        const strengthDamage = equipmentStore.equipment.main_weapon
            ? ATTRIBUTES_DAMAGE_PATTERN[equipmentStore.equipment.main_weapon.type].strength[
                  attributeCount.value.strength - 10
              ]
            : 0;
        const dexterityDamage = equipmentStore.equipment.main_weapon
            ? ATTRIBUTES_DAMAGE_PATTERN[equipmentStore.equipment.main_weapon.type].dexterity[
                  attributeCount.value.dexterity - 10
              ] + 1
            : 0;
        const wisdomDamage = equipmentStore.equipment.main_weapon
            ? ATTRIBUTES_DAMAGE_PATTERN[equipmentStore.equipment.main_weapon.type].wisdom[
                  attributeCount.value.wisdom - 10
              ] + 1
            : 0;
        const perceptionDamage = equipmentStore.equipment.main_weapon
            ? ATTRIBUTES_DAMAGE_PATTERN[equipmentStore.equipment.main_weapon.type].perception[
                  attributeCount.value.perception - 10
              ]
            : 0;
        const result = {
            strength: {
                main_max_damage: strengthDamage,
                main_min_damage: strengthDamage,
                off_hand_min_damage: strengthDamage,
                off_hand_max_damage: strengthDamage,
                melee_defense: (attributeCount.value.strength - 10) * 5,
                ranged_defense: (attributeCount.value.strength - 10) * 5,
                max_health: (attributeCount.value.strength - 10) * 45,
                health_regen: HP_MP_REGEN_PATTERN[attributeCount.value.strength - 10]
            },
            dexterity: {
                main_max_damage: dexterityDamage,
                off_hand_max_damage: dexterityDamage,
                attack_speed: Number(((attributeCount.value.dexterity - 10) * -0.002).toFixed(3)),
                melee_evasion: (attributeCount.value.dexterity - 10) * 2,
                ranged_evasion: (attributeCount.value.dexterity - 10) * 2,
                magic_evasion: (attributeCount.value.dexterity - 10) * 2,
                melee_critical_hit: (attributeCount.value.dexterity - 10) * 5,
                ranged_critical_hit: (attributeCount.value.dexterity - 10) * 5,
                magic_critical_hit: (attributeCount.value.dexterity - 10) * 5
            },
            wisdom: {
                main_max_damage: wisdomDamage,
                off_hand_max_damage: wisdomDamage,
                max_mana: (attributeCount.value.wisdom - 10) * 45,
                mana_regen: Number(HP_MP_REGEN_PATTERN[attributeCount.value.wisdom - 10].toFixed(3)),
                cooldown_speed: Number(((attributeCount.value.wisdom - 10) * 0.25).toFixed(2))
            },
            perception: {
                main_max_damage: perceptionDamage,
                main_min_damage: perceptionDamage,
                off_hand_min_damage: perceptionDamage,
                off_hand_max_damage: perceptionDamage,
                melee_hit: (attributeCount.value.perception - 10) * 5,
                ranged_hit: (attributeCount.value.perception - 10) * 5,
                magic_hit: (attributeCount.value.perception - 10) * 5,
                weaken_chance: (attributeCount.value.perception - 10) * 5,
                stun_chance: (attributeCount.value.perception - 10) * 5,
                petrification_chance: (attributeCount.value.perception - 10) * 5,
                silence_chance: (attributeCount.value.perception - 10) * 5,
                sleep_chance: (attributeCount.value.perception - 10) * 5,
                bind_chance: (attributeCount.value.perception - 10) * 5,
                terror_chance: (attributeCount.value.perception - 10) * 5,
                collision_chance: (attributeCount.value.perception - 10) * 5,
                buff_duration: Number(((attributeCount.value.perception - 10) * 0.5).toFixed(2))
            }
        };

        if (attributeCount.value.strength >= 30) {
            result.max_health += 750;
        }
        if (attributeCount.value.strength >= 40) {
            result.damage_reduction = 15;
        }
        if (attributeCount.value.strength >= 50) {
            result.melee_heavy_attack_chance = 100;
            result.ranged_heavy_attack_chance = 100;
            result.magic_heavy_attack_chance = 100;
        }
        if (attributeCount.value.strength >= 60) {
            result.max_health += 950;
        }
        if (attributeCount.value.strength >= 70) {
            result.max_health += 450;
            result.melee_defense += 200;
            result.ranged_defense += 200;
        }
        if (attributeCount.value.dexterity >= 30) {
            result.melee_critical_hit += 100;
            result.ranged_critical_hit += 100;
            result.magic_critical_hit += 100;
        }
        if (attributeCount.value.dexterity >= 40) {
            result.damage_bonus = 15;
        }
        if (attributeCount.value.dexterity >= 50) {
            result.move_speed_bonus = 5;
        }
        if (attributeCount.value.dexterity >= 60) {
            result.melee_critical_hit += 120;
            result.ranged_critical_hit += 120;
            result.magic_critical_hit += 120;
        }
        if (attributeCount.value.dexterity >= 70) {
            result.melee_critical_hit += 60;
            result.ranged_critical_hit += 60;
            result.magic_critical_hit += 60;
            result.melee_evasion += 120;
            result.ranged_evasion += 120;
            result.magic_evasion += 120;
        }
        if (attributeCount.value.wisdom >= 30) {
            result.max_mana += 750;
        }
        if (attributeCount.value.wisdom >= 40) {
            result.debuff_duration = 5;
        }
        if (attributeCount.value.wisdom >= 50) {
            result.cooldown_speed += 5;
        }
        if (attributeCount.value.wisdom >= 60) {
            result.max_mana += 900;
        }
        if (attributeCount.value.wisdom >= 70) {
            result.max_mana += 450;
            result.mana_regen += 120;
        }
        if (attributeCount.value.perception >= 30) {
            result.melee_hit += 100;
            result.ranged_hit += 100;
            result.magic_hit += 100;
        }
        if (attributeCount.value.perception >= 40) {
            result.buff_duration += 5;
        }
        if (attributeCount.value.perception >= 50) {
            result.bonus_range = 7.5;
        }
        if (attributeCount.value.perception >= 60) {
            result.melee_hit += 120;
            result.ranged_hit += 120;
            result.magic_hit += 120;
        }
        if (attributeCount.value.perception >= 70) {
            result.melee_hit += 60;
            result.ranged_hit += 60;
            result.magic_hit += 60;
            result.weaken_chance += 100;
            result.stun_chance += 100;
            result.petrification_chance += 100;
            result.silence_chance += 100;
            result.sleep_chance += 100;
            result.bind_chance += 100;
            result.terror_chance += 100;
            result.collision_chance += 100;
        }
        return result;
    });

    const totalAttributeStats = computed(() =>
        mergeObjects(
            attributeStats.value.strength,
            attributeStats.value.dexterity,
            attributeStats.value.wisdom,
            attributeStats.value.perception
        )
    );

    function increaseAttributeCount(attributeName, count = 1) {
        const currentValue = addedAttributeCount.value[attributeName];
        const neededPointsCount = currentValue >= 20 && currentValue < 30 ? 2 : currentValue >= 30 ? 4 : 1;

        if (availableAttributesPoints.value - neededPointsCount < 0) return;

        addedAttributeCount.value[attributeName] += count;
        availableAttributesPoints.value -= neededPointsCount;
    }

    function decreaseAttributeCount(attributeName, count = 1) {
        const currentValue = addedAttributeCount.value[attributeName];
        const neededPointsCount = currentValue >= 31 && currentValue <= 40 ? 2 : currentValue > 40 ? 4 : 1;

        if (currentValue === 0 || availableAttributesPoints.value + neededPointsCount > 54) return;

        addedAttributeCount.value[attributeName] -= count;
        availableAttributesPoints.value += neededPointsCount;
    }

    function resetAttributes() {
        addedAttributeCount.value.strength = 0;
        addedAttributeCount.value.dexterity = 0;
        addedAttributeCount.value.wisdom = 0;
        addedAttributeCount.value.perception = 0;
        availableAttributesPoints.value = 54;
    }

    return {
        attributeCount,
        addedAttributeCount,
        availableAttributesPoints,
        attributeStats,
        totalAttributeStats,
        increaseAttributeCount,
        decreaseAttributeCount,
        resetAttributes
    };
});
