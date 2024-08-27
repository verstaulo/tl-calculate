<script setup>
import { useAttributeStore } from './store/attributeStore.js';
import CharacterAttributes from './components/CharacterAttributes/CharacterAttributes.vue';
import CharacterEquipment from './components/CharacterEquipment/CharacterEquipment.vue';
import CharacterStats from './components/CharacterStats/CharacterStats.vue';
import WeaponMastery from './components/CharacterEquipment/Mastery/WeaponMastery.vue';
import STATS_GROUPS from '../src/constants/STATS_GROUPS.json';

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
            <character-stats :group-names="STATS_GROUPS.mainGroup" />
            <character-stats :group-names="STATS_GROUPS.secondaryGroup" class="row" />
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
    padding: 1rem;
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
    flex-grow: 1;
}

.mainView__weaponGroup {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}

.row {
    grid-column-start: 1;
    grid-column-end: -1;
}

.flex {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
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
}

@media (max-width: 572px) {
    .equipment {
        display: flex;
        flex-wrap: wrap;
    }
}
</style>
