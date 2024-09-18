<script setup>
import { useAttributeStore } from './store/attributeStore.js';
import CharacterAttributes from './components/CharacterAttributes/CharacterAttributes.vue';
import CharacterEquipment from './components/CharacterEquipment/CharacterEquipment.vue';
import WeaponMastery from './components/CharacterEquipment/Mastery/WeaponMastery.vue';
import STATS_GROUPS from '../src/constants/STATS_GROUPS.json';
import CharacterStatsList from './components/CharacterStats/CharacterStatsList.vue';

const attributeStore = useAttributeStore();
</script>
<template>
    <main class="main container flex" @click.right.prevent>
        <div class="attributes">
            <character-attributes />
        </div>
        <div class="mainView">
            <div class="mainView__weaponGroup">
                <weapon-mastery></weapon-mastery>
                <character-equipment :items-keys="['secondary_weapon', 'main_weapon']" />
            </div>
            <div class="mainView__statsGroup">
                <character-stats-list :title="'weapons'" :items="STATS_GROUPS.weapons" />
                <character-stats-list :title="'defense'" :items="STATS_GROUPS.defense" />
            </div>
            <character-stats-list :title="'attack'" :items="STATS_GROUPS.attack" />
            <character-stats-list :title="'protection'" :items="STATS_GROUPS.protection" />
            <character-stats-list :title="'survival'" :items="STATS_GROUPS.survival" class="colspan2" />
            <character-stats-list :title="'chance'" :items="STATS_GROUPS.chance" />
            <character-stats-list :title="'resist'" :items="STATS_GROUPS.resist" />
        </div>
        <div class="equipment">
            <character-equipment :items-keys="['head', 'cloak', 'body', 'gloves', 'legs', 'boots']" />
            <character-equipment :items-keys="['necklace', 'bracelet', 'ring_first', 'ring_second', 'belt']" />
        </div>
    </main>
</template>

<style scoped>
.main {
    min-height: 100vh;
}

.container {
    max-width: 1856px;
    padding: 0 1rem;
    margin: 0 auto;
}

.mainView {
    display: grid;
    grid-template-columns: 1fr 1fr;
    max-width: 1000px;
    margin: 0 auto;
    gap: 1rem;
    padding: 2rem;
    position: relative;
}

.mainView:before {
    background-color: #246cf9;
    opacity: 0.3;
    content: '';
    filter: blur(200px);
    position: absolute;
    height: 50%;
    top: 50%;
    left: 0;
    right: 0;
    transform: translateY(-50%);
}

.mainView__weaponGroup {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}

.mainView__statsGroup:deep(.characterStats:first-child) {
    margin-bottom: 1rem;
    min-height: 11rem;
}

.flex {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
}

.colspan2 {
    grid-column: span 2;
}

.colspan2:deep(.characterStats__list) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
}

@media (max-width: 1560px) {
    .equipment {
        order: 1;
    }

    .attributes {
        order: 0;
    }

    .mainView {
        order: 2;
    }
}

@media (max-width: 767px) {
    .mainView {
        grid-template-columns: 1fr;
    }

    .colspan2 {
        grid-column: unset;
    }

    .colspan2:deep(.characterStats__list) {
        display: grid;
        grid-template-columns: 1fr;
    }
}

@media (max-width: 572px) {
    .equipment {
        display: flex;
        flex-wrap: wrap;
    }
}
</style>
