<script setup>
import { useEquipmentStore } from '../../store/equipmentStore.js';
import SET_BONUSES from '../../constants/SET_BONUSES.json';
import storeKeyToTitle from '../../utils/storeKeyToTitle.js';

const props = defineProps({
    itemSetName: String
});
const equipmentStore = useEquipmentStore();
const twoItemsDescription = SET_BONUSES[props.itemSetName][2].description;
const isTwoItemsActive = equipmentStore.equipmentSetCounter[props.itemSetName] >= 2;
const fourItemsDescription = SET_BONUSES[props.itemSetName][4]?.description;
const isFourItemsActive = equipmentStore.equipmentSetCounter[props.itemSetName] >= 4;
</script>
<template>
    <div>
        <p>
            <b>{{ storeKeyToTitle(itemSetName) }}</b>
        </p>
        <ul>
            <li :class="{ active: isTwoItemsActive }"><b>(2): </b>{{ twoItemsDescription }}</li>
            <li v-if="fourItemsDescription" :class="{ active: isFourItemsActive }">
                <b>(4): </b>{{ fourItemsDescription }}
            </li>
        </ul>
    </div>
</template>
<style scoped>
.active {
    color: var(--secondary-muted);
}
</style>
