<script setup>
import { ref } from 'vue';
import { useEquipmentStore } from '../../store/equipmentStore.js';
import DEFAULT_ITEMS_DATA from '../../constants/DEFAULT_ITEMS_DATA.json';
import Modal from '../UI/Modal.vue';
import EquipmentList from './EquipmentList.vue';
import ItemMenu from './ItemMenu.vue';
import Tooltip from '../UI/Tooltip.vue';

const props = defineProps({
    equipmentItemStateKey: String
});
defineEmits(['updateMenuIsOpen']);
const equipmentStore = useEquipmentStore();

const isItemsListOpen = ref(false);
const menuMode = ref('info');
const fixedMenuStyles = {
    'box-shadow': '0 0 2px var(--epic),0 0 4px var(--epic)'
};

const takeoffItemHandler = () => {
    if (equipmentStore.equipment[props.equipmentItemStateKey]) {
        equipmentStore.takeOffEquipment(props.equipmentItemStateKey);
    }
};
const openItemsListHandler = (event) => {
    if (!equipmentStore.equipment[props.equipmentItemStateKey]) {
        event.stopPropagation();
        isItemsListOpen.value = true;
    } else {
        menuMode.value = 'edit';
    }
};
const setMenuMode = () => {
    menuMode.value = 'info';
};
</script>

<template>
    <div class="equipmentItem">
        <Tooltip withFixedMode :fixedModeStyles="fixedMenuStyles" :on-close="setMenuMode">
            <template #tooltip__trigger>
                <button
                    :class="{
                        uncommon: equipmentStore.equipment[equipmentItemStateKey]?.tier === 'uncommon',
                        common: equipmentStore.equipment[equipmentItemStateKey]?.tier === 'common',
                        rare: equipmentStore.equipment[equipmentItemStateKey]?.tier === 'rare',
                        epic: equipmentStore.equipment[equipmentItemStateKey]?.tier === 'epic',
                        epic2: equipmentStore.equipment[equipmentItemStateKey]?.tier === 'epic2',
                        legendary: equipmentStore.equipment[equipmentItemStateKey]?.tier === 'legendary',
                        mainWeapon: equipmentItemStateKey === 'main_weapon',
                        shadow:
                            equipmentItemStateKey === 'main_weapon' && equipmentStore.equipment[equipmentItemStateKey],
                        secondaryWeapon: equipmentItemStateKey === 'secondary_weapon'
                    }"
                    class="equipmentItem__button"
                    @click.right.prevent="takeoffItemHandler"
                    @click.capture="openItemsListHandler">
                    <img
                        :src="
                            equipmentStore.equipment[equipmentItemStateKey]
                                ? equipmentStore.equipment[equipmentItemStateKey].image
                                : DEFAULT_ITEMS_DATA[equipmentItemStateKey].image
                        "
                        :alt="equipmentItemStateKey"
                        draggable="false"
                        class="equipmentItem__image"
                        :class="{ 'equipmentItem__image-default': !equipmentStore.equipment[equipmentItemStateKey] }" />
                    <span
                        v-if="equipmentStore.equipment[equipmentItemStateKey]?.level > 0"
                        class="equipmentItem__level">
                        {{ equipmentStore.equipment[equipmentItemStateKey]?.level }}
                    </span>
                </button>
            </template>
            <template #tooltip__content>
                <ItemMenu :equipment-item-state-key="equipmentItemStateKey" :mode="menuMode" />
            </template>
        </Tooltip>
    </div>
    <Modal v-model:is-open="isItemsListOpen">
        <EquipmentList :equipmentStateKey="equipmentItemStateKey" @selected="isItemsListOpen = false" />
    </Modal>
</template>

<style scoped>
.equipmentItem {
    position: relative;
}

.equipmentItem__button {
    display: block;
    border: 1px solid hsla(0, 0%, 100%, 0.05);
    border-radius: 100%;
    background-color: var(--baseBackgroundColor);
    width: 4.75rem;
    height: 4.75rem;
}

.equipmentItem__button.mainWeapon {
    width: 12.75rem;
    height: 12.75rem;
}

.equipmentItem__button.secondaryWeapon {
    width: 6.75rem;
    height: 6.75rem;
    filter: brightness(50%);
}

.equipmentItem__level {
    position: absolute;
    bottom: 0;
    left: 5%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--neutral5);
    font-size: 12px;
    font-weight: bold;
    width: 1.5rem;
    height: 1.5rem;
    clip-path: polygon(8% 25%, 8% 75%, 50% 100%, 92% 75%, 92% 25%, 50% 0%);
}

.equipmentItem__level:before {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
    width: 1.2rem;
    height: 1.2rem;
    background-color: var(--epicBase);
    clip-path: polygon(8% 25%, 8% 75%, 50% 100%, 92% 75%, 92% 25%, 50% 0%);
}

.shadow {
    filter: drop-shadow(0 0 8px var(--epic));
}

.equipmentItem__image {
    height: 100%;
    width: 100%;
    object-fit: contain;
    transition: all 0.3s ease;
}

.equipmentItem__image-default {
    filter: brightness(30%);
}

.equipmentItem__image-default:hover {
    filter: brightness(100%);
}

.epic {
    background: var(--epic-Rgradient);
}

.epic2 {
    background: var(--epic2-Rgradient);
}

.legendary {
    background: var(--legendary-Rgradient);
}

.rare {
    background: var(--rare-Rgradient);
}

.uncommon {
    background: var(--uncommon-Rgradient);
}
</style>
