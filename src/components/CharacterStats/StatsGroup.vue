<script setup>
import storeKeyToTitle from '../../utils/storeKeyToTitle.js';
import { useStatsStore } from '../../store/statsStore.js';
import { useEquipmentStore } from '../../store/equipmentStore.js';
import Stat from './Stat.vue';

defineProps({
    groupName: String,
    groupStats: Array
});
const statsStore = useStatsStore();
const equipmentStore = useEquipmentStore();
</script>

<template>
    <p class="characterStats__list_title">{{ groupName }}</p>
    <ul
        class="characterStats__list_stats"
        :class="{
            addedHeight: groupName === 'weapons'
        }">
        <template
            v-if="
                groupName === 'weapons' &&
                (equipmentStore.equipment.main_weapon?.type === 'dagger' ||
                    equipmentStore.equipment.main_weapon?.type === 'crossbow')
            ">
            <li class="characterStats__list_item">
                <span>Base Damage | Main </span>
                <div class="doubledStats">
                    <Stat :count="statsStore.stats.main_min_damage" />
                    &nbsp;~&nbsp;
                    <Stat :count="statsStore.stats.main_max_damage" />
                </div>
            </li>
            <li class="characterStats__list_item">
                <span>Attack Speed</span>
                <Stat :count="statsStore.stats.attack_speed" />
            </li>
            <li class="characterStats__list_item">
                <span>Range </span>
                <Stat :count="statsStore.stats.attack_range" />
            </li>
            <li class="characterStats__list_item">
                <span>Base Damage | Off-Hand Weapon </span>
                <div class="doubledStats">
                    <Stat :count="statsStore.stats.off_hand_min_damage" />
                    &nbsp;~&nbsp;
                    <Stat :count="statsStore.stats.off_hand_max_damage" />
                </div>
            </li>
            <li class="characterStats__list_item">
                <span>Off-Hand Weapon Attack Chance </span>
                <Stat :count="statsStore.stats.off_hand_weapon_attack_chance" />
            </li>
        </template>

        <template v-else-if="groupName === 'weapons' && equipmentStore.equipment.main_weapon?.type === 'shield'">
            <li class="characterStats__list_item">
                <span>Base Damage | Main </span>
                <div class="doubledStats">
                    <Stat :count="statsStore.stats.main_min_damage" />
                    &nbsp;~&nbsp;
                    <Stat :count="statsStore.stats.main_max_damage" />
                </div>
            </li>
            <li class="characterStats__list_item">
                <span>Attack Speed</span>
                <Stat :count="statsStore.stats.attack_speed" />
            </li>
            <li class="characterStats__list_item">
                <span>Range </span>
                <Stat :count="statsStore.stats.attack_range" />
            </li>
            <li class="characterStats__list_item">
                <span>Shield Block Chance </span>
                <Stat :count="statsStore.stats.shield_block_chance" />
            </li>
            <li class="characterStats__list_item">
                <span>Damage Reduction </span>
                <Stat :count="statsStore.stats.damage_reduction" />
            </li>
        </template>

        <template v-else-if="groupName === 'weapons'">
            <li class="characterStats__list_item">
                <span>Base Damage | Main </span>
                <div class="doubledStats">
                    <Stat :count="statsStore.stats.main_min_damage" />
                    &nbsp;~&nbsp;
                    <Stat :count="statsStore.stats.main_max_damage" />
                </div>
            </li>
            <li class="characterStats__list_item">
                <span>Attack Speed</span>
                <Stat :count="statsStore.stats.attack_speed" />
            </li>
            <li class="characterStats__list_item">
                <span>Range </span>
                <Stat :count="statsStore.stats.attack_range" />
            </li>
        </template>

        <template v-else>
            <li v-for="statName of groupStats" :key="statName" class="characterStats__list_item">
                <span>{{ storeKeyToTitle(statName) }}:</span>
                <Stat :count="statsStore.stats[statName]" />
            </li>
        </template>
    </ul>
</template>
<style scoped>
.characterStats__list_title {
    text-transform: capitalize;
    text-align: center;
    user-select: none;
    padding: calc(var(--base-padding) / 2);
    background-color: hsla(var(--neutral77), 0.6);
    mix-blend-mode: screen;
    border-top-left-radius: var(--base-border-radius);
    border-top-right-radius: var(--base-border-radius);
}

.characterStats__list_stats {
    user-select: none;
    padding: 0 8px 4px;
}

.characterStats__list_item {
    display: grid;
    grid-template-columns: max-content 1fr;
    justify-items: end;
}

.doubledStats {
    display: flex;
}

.addedHeight {
    min-height: 8rem;
}
</style>
