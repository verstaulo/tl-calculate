<script setup>
import mastery_img from '../../../assets/images/mastery.svg';
import WEAPON_MASTERY_DATA from '../../../constants/WEAPON_MASTERY.json';
import { computed, ref, watch } from 'vue';
import Modal from '../../UI/Modal.vue';
import WeaponMasteryTree from './WeaponMasteryTree.vue';
import { useEquipmentStore } from '../../../store/equipmentStore.js';
import { useMasteryStore } from '../../../store/masteryStore.js';

const equipmentStore = useEquipmentStore();
const masteryStore = useMasteryStore();

const mainTree = computed(() => {
    return WEAPON_MASTERY_DATA[equipmentStore.equipment.main_weapon?.type];
});
const secondaryTree = computed(() => {
    return WEAPON_MASTERY_DATA[equipmentStore.equipment.secondary_weapon?.type];
});
const isMasteryOpen = ref(false);
const openMasteryHandler = () => {
    if (equipmentStore.equipment.main_weapon) {
        isMasteryOpen.value = !isMasteryOpen.value;
    }
};

watch(
    () => equipmentStore.equipment.main_weapon,
    () => {
        if (equipmentStore.equipment.main_weapon?.type) {
            masteryStore.addMasteryStats('main_weapon', 'rootBonus', mainTree.value.rootBonus.stats);
        } else {
            masteryStore.removeMasteryStats('main_weapon', 'rootBonus');
        }
    }
);
</script>
<template>
    <div class="mastery">
        <button @click="openMasteryHandler">
            <img :src="mastery_img" alt="masteryLogo" class="mastery__button" />
        </button>
        <modal v-model:is-open="isMasteryOpen">
            <div class="mastery__body" @click.stop>
                <weapon-mastery-tree
                    v-if="equipmentStore.equipment.main_weapon?.type"
                    :tree="mainTree"
                    :source="'main_weapon'" />
                <weapon-mastery-tree
                    v-if="equipmentStore.equipment.secondary_weapon?.type"
                    :tree="secondaryTree"
                    :source="'secondary_weapon'" />
            </div>
        </modal>
    </div>
</template>
<style scoped>
.mastery {
    position: absolute;
    bottom: 1rem;
    left: 1rem;
}

.mastery__button {
    width: 3rem;
    height: 3rem;
}

.mastery__body {
    max-width: 1200px;
    margin: 0 auto;
}

.mastery__body > * + * {
    margin-top: 0.5rem;
}
</style>
