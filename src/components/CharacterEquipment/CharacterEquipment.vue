<script setup>
import CharacterEquipmentItem from './CharacterEquipmentItem.vue';

defineProps({
    itemsKeys: Array
});
</script>

<template>
    <section class="characterEquipment">
        <CharacterEquipmentItem v-for="stateKey in itemsKeys" :equipment-item-state-key="stateKey" />
    </section>
</template>

<style scoped>
.characterEquipment {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    place-content: center;
    gap: 1rem;
    padding: var(--base-padding);
}

.characterEquipment :deep(.equipmentItem:nth-child(2n + 1)) {
    justify-self: end;
}

@media (max-width: 899px) {
    .characterEquipment {
        gap: 0.25rem;
    }
}
@media (max-width: 375px) {
    .characterEquipment {
        display: flex;
        flex-wrap: wrap;
    }
}
</style>
