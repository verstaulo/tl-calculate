<script setup>
import storeKeyToTitle from '../../utils/storeKeyToTitle.js';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';
import { computed, ref, watch } from 'vue';

const props = defineProps({
    itemGroup: String,
    itemLevel: Number,
    enchantedLevel: Number,
    itemStats: Object,
    enchantedStats: Object,
    itemType: String,
    mode: String
});
const groupStats = ['main_min_damage', 'main_max_damage', 'off_hand_min_damage', 'off_hand_max_damage'];
const priorityStats = [
    'attack_range',
    'attack_speed',
    'shield_block_chance',
    'off_hand_weapon_attack_chance',
    'melee_defense',
    'ranged_defense',
    'magic_defense',
    'damage_reduction'
];
const isEnchantedStatsNotEmpty = computed(() => Object.keys(props.enchantedStats).length > 0);
const operationType = ref('');
watch(
    () => props.enchantedLevel,
    (value, oldValue) => {
        if (value > oldValue && value !== props.itemLevel) {
            operationType.value = 'increase';
        } else if (value < oldValue && value !== props.itemLevel) {
            operationType.value = 'decrease';
        } else operationType.value = 'equal';
    }
);
</script>
<template>
    <div class="stats">
        <ul class="stats--primary">
            <li
                v-if="itemGroup === 'weapon'"
                :class="{
                    stats__item_edit: mode === 'edit' && isEnchantedStatsNotEmpty
                }"
                class="stats__item">
                <p class="stats__title">Damage:</p>
                <div
                    :class="{
                        'stats__item-group': mode === 'edit' && isEnchantedStatsNotEmpty
                    }">
                    <span>{{ itemStats.main_min_damage ?? 0 }} ~ {{ itemStats.main_max_damage ?? 0 }}</span>
                    <template v-if="mode === 'edit' && isEnchantedStatsNotEmpty">
                        <FontAwesomeIcon :icon="faChevronRight" :size="'xs'" :style="{ padding: '0 4px' }" />
                        <span
                            :class="{
                                'stats__item-increased': operationType === 'increase',
                                'stats__item-decreased': operationType === 'decrease',
                                stats__item: operationType === 'equal'
                            }">
                            {{ enchantedStats.main_min_damage ?? 0 }}
                            ~
                            {{ enchantedStats.main_max_damage ?? 0 }}
                        </span>
                    </template>
                </div>
            </li>
            <li
                v-if="itemType === 'dagger' || itemType === 'crossbow'"
                :class="{
                    stats__item_edit: mode === 'edit' && isEnchantedStatsNotEmpty
                }"
                class="stats__item">
                <p class="stats__title">Off-Hand Damage:</p>
                <div
                    :class="{
                        'stats__item-group': mode === 'edit' && isEnchantedStatsNotEmpty
                    }">
                    <span>{{ itemStats.off_hand_min_damage ?? 0 }} ~ {{ itemStats.off_hand_max_damage ?? 0 }}</span>
                    <template v-if="mode === 'edit' && isEnchantedStatsNotEmpty">
                        <FontAwesomeIcon :icon="faChevronRight" :size="'xs'" :style="{ padding: '0 4px' }" />
                        <span
                            :class="{
                                'stats__item-increased': operationType === 'increase',
                                'stats__item-decreased': operationType === 'decrease',
                                stats__item: operationType === 'equal'
                            }">
                            {{ enchantedStats.off_hand_min_damage ?? 0 }}
                            ~
                            {{ enchantedStats.off_hand_max_damage ?? 0 }}
                        </span>
                    </template>
                </div>
            </li>

            <template v-for="(value, key) in itemStats">
                <li
                    v-if="priorityStats.includes(key)"
                    :class="{
                        stats__item_edit: mode === 'edit' && isEnchantedStatsNotEmpty
                    }"
                    class="stats__item">
                    <p class="stats__title">{{ storeKeyToTitle(key) }}:</p>
                    <div
                        :class="{
                            'stats__item-group': mode === 'edit' && isEnchantedStatsNotEmpty
                        }">
                        <span>{{ value }}</span>
                        <template v-if="mode === 'edit' && isEnchantedStatsNotEmpty">
                            <FontAwesomeIcon :icon="faChevronRight" :size="'xs'" :style="{ padding: '0 4px' }" />
                            <span
                                :class="{
                                    'stats__item-increased': operationType === 'increase',
                                    'stats__item-decreased': operationType === 'decrease',
                                    stats__item: operationType === 'equal'
                                }">
                                {{ enchantedStats[key] ?? 0 }}
                            </span>
                        </template>
                    </div>
                </li>
            </template>
        </ul>
        <!--    Secondary Stats-->
        <ul class="stats--secondary">
            <template v-for="(value, key) in itemStats">
                <li
                    v-if="!priorityStats.includes(key) && !groupStats.includes(key)"
                    :class="{
                        stats__item_edit: mode === 'edit' && isEnchantedStatsNotEmpty
                    }"
                    class="stats__item">
                    <p class="stats__title">{{ storeKeyToTitle(key) }}:</p>
                    <div
                        :class="{
                            'stats__item-group': mode === 'edit' && isEnchantedStatsNotEmpty
                        }">
                        <span>{{ value }}</span>
                        <template v-if="mode === 'edit' && isEnchantedStatsNotEmpty">
                            <FontAwesomeIcon :icon="faChevronRight" :size="'xs'" :style="{ padding: '0 4px' }" />
                            <span
                                :class="{
                                    'stats__item-increased': operationType === 'increase',
                                    'stats__item-decreased': operationType === 'decrease',
                                    stats__item: operationType === 'equal'
                                }">
                                {{ enchantedStats[key] ?? 0 }}
                            </span>
                        </template>
                    </div>
                </li>
            </template>
        </ul>
    </div>
</template>
<style scoped>
.stats {
    color: var(--neutral1);
    border-radius: 0.2rem;
}

.stats__item {
    display: flex;
    justify-content: space-between;
}

.stats__title {
    flex-grow: 1;
}

.stats__item-group {
    display: grid;
    grid-template-columns: 1fr min-content 1fr;
    justify-items: end;
    align-items: center;
}

.stats__item {
    color: inherit;
}

.stats__item-increased {
    color: var(--secondary);
}

.stats__item-decreased {
    color: red;
}

.stats__item_edit {
    display: grid;
    grid-template-columns: 1fr 45%;
}

.stats--primary {
    padding: 0.5rem;
    background-color: var(--baseForeGroundColor);
}

.stats--secondary {
    padding: 0.5rem;
    background-color: var(--baseBackgroundColor);
}
</style>
