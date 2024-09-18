<script setup>
import storeKeyToTitle from '../../utils/storeKeyToTitle.js';
import { useStatsStore } from '../../store/statsStore.js';
import { useEquipmentStore } from '../../store/equipmentStore.js';
import Stat from './Stat.vue';

defineProps({
    title: String,
    items: Array
});
const statsStore = useStatsStore();
const equipmentStore = useEquipmentStore();
</script>

<template>
    <section class="characterStats">
        <p class="characterStats__title">{{ title }}</p>
        <ul class="characterStats__list">
            <template
                v-if="
                    title === 'weapons' &&
                    (equipmentStore.equipment.main_weapon?.type === 'dagger' ||
                        equipmentStore.equipment.main_weapon?.type === 'crossbow')
                ">
                <li class="characterStats__list-item">
                    <span>Base Damage | Main </span>
                    <div class="doubledStats">
                        <Stat :count="statsStore.stats.main_min_damage" />
                        &nbsp;~&nbsp;
                        <Stat :count="statsStore.stats.main_max_damage" />
                    </div>
                </li>
                <li class="characterStats__list-item">
                    <span>Attack Speed</span>
                    <Stat :count="statsStore.stats.attack_speed" />
                </li>
                <li class="characterStats__list-item">
                    <span>Range </span>
                    <Stat :count="statsStore.stats.attack_range" />
                </li>
                <li class="characterStats__list-item">
                    <span>Base Damage | Off-Hand Weapon </span>
                    <div class="doubledStats">
                        <Stat :count="statsStore.stats.off_hand_min_damage" />
                        &nbsp;~&nbsp;
                        <Stat :count="statsStore.stats.off_hand_max_damage" />
                    </div>
                </li>
                <li class="characterStats__list-item">
                    <span>Off-Hand Weapon Attack Chance </span>
                    <Stat :count="statsStore.stats.off_hand_weapon_attack_chance" />
                </li>
            </template>

            <template v-else-if="title === 'weapons' && equipmentStore.equipment.main_weapon?.type === 'shield'">
                <li class="characterStats__list-item">
                    <span>Base Damage | Main </span>
                    <div class="doubledStats">
                        <Stat :count="statsStore.stats.main_min_damage" />
                        &nbsp;~&nbsp;
                        <Stat :count="statsStore.stats.main_max_damage" />
                    </div>
                </li>
                <li class="characterStats__list-item">
                    <span>Attack Speed</span>
                    <Stat :count="statsStore.stats.attack_speed" />
                </li>
                <li class="characterStats__list-item">
                    <span>Range </span>
                    <Stat :count="statsStore.stats.attack_range" />
                </li>
                <li class="characterStats__list-item">
                    <span>Shield Block Chance </span>
                    <Stat :count="statsStore.stats.shield_block_chance" />
                </li>
                <li class="characterStats__list-item">
                    <span>Damage Reduction </span>
                    <Stat :count="statsStore.stats.damage_reduction" />
                </li>
            </template>

            <template v-else-if="title === 'weapons'">
                <li class="characterStats__list-item">
                    <span>Base Damage | Main </span>
                    <div class="doubledStats">
                        <Stat :count="statsStore.stats.main_min_damage" />
                        &nbsp;~&nbsp;
                        <Stat :count="statsStore.stats.main_max_damage" />
                    </div>
                </li>
                <li class="characterStats__list-item">
                    <span>Attack Speed</span>
                    <Stat :count="statsStore.stats.attack_speed" />
                </li>
                <li class="characterStats__list-item">
                    <span>Range </span>
                    <Stat :count="statsStore.stats.attack_range" />
                </li>
            </template>

            <template v-else>
                <li v-for="statItem of items" :key="statItem.key" class="characterStats__list-item">
                    <span>{{ storeKeyToTitle(statItem.key) }}:</span>
                    <Stat :count="statsStore.stats[statItem.key]" />
                </li>
            </template>
        </ul>
    </section>
</template>
<style scoped>
.characterStats {
    min-width: 300px;
    border-radius: var(--base-border-radius);
    backdrop-filter: blur(33px);
    background: rgba(27, 28, 37, 0.4);
    border: 1px solid hsla(0, 0%, 100%, 0.05);
    box-shadow: 0 5px 48px -9px rgba(0, 0, 0, 0.07);
}

.characterStats__title {
    text-transform: capitalize;
    text-align: center;
    user-select: none;
    padding: calc(var(--base-padding) / 2);
    background-color: var(--baseForeGroundColor);
    mix-blend-mode: screen;
    border-top-left-radius: var(--base-border-radius);
    border-top-right-radius: var(--base-border-radius);
}

.characterStats__list {
    user-select: none;
    padding: var(--base-padding);
}

.characterStats__list-item {
    display: grid;
    grid-template-columns: max-content 1fr;
    justify-items: end;
}

.doubledStats {
    display: flex;
}
</style>
