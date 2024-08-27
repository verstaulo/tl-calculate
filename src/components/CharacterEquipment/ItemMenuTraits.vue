<script setup>
import { computed, ref } from 'vue';
import storeKeyToTitle from '../../utils/storeKeyToTitle.js';
import ItemMenuTraitSelect from './ItemMenuTraitSelect.vue';

const props = defineProps({
    mode: String,
    itemSelectedTraits: Array,
    itemAvailableTraits: Array
});
defineEmits(['traitSelected']);
const currentSelectedTraits = ref([]);

const traitsToSubmit = computed(() => {
    const result = props.itemSelectedTraits ? [...props.itemSelectedTraits] : [];

    if (currentSelectedTraits.value[0]) {
        result[0] = currentSelectedTraits.value[0];
    }
    if (currentSelectedTraits.value[1]) {
        result[1] = currentSelectedTraits.value[1];
    }
    if (currentSelectedTraits.value[2]) {
        result[2] = currentSelectedTraits.value[2];
    }
    return result;
});

const currentAvailableTraits = computed(() => {
    if (currentSelectedTraits.value.length === 0 && !props.itemSelectedTraits) {
        return props.itemAvailableTraits;
    } else {
        const selectedTraitsKeys =
            traitsToSubmit.value.length === 0
                ? props.itemSelectedTraits.map(([keyName]) => keyName)
                : traitsToSubmit.value.map(([keyName]) => keyName);
        return props.itemAvailableTraits.filter(([key]) => !selectedTraitsKeys.includes(key));
    }
});
</script>
<template>
    <div class="itemMenuTraits">
        <template v-if="!itemSelectedTraits && mode === 'info'">
            <div class="traits">
                <p>Available Traits:</p>
                <ul>
                    <li v-for="[key, value] in itemAvailableTraits" :key="key">
                        <span>{{ storeKeyToTitle(key) }}: </span>
                        <span>{{ value }} ~ {{ value * 4 }}</span>
                    </li>
                </ul>
            </div>
        </template>

        <template v-if="itemSelectedTraits && itemSelectedTraits.length > 0 && mode === 'info'">
            <div class="traits">
                <p>Selected Traits:</p>
                <ul>
                    <template v-for="index in 3">
                        <li v-if="itemSelectedTraits[index - 1]" :key="index" class="hasTraits">
                            <span>{{ storeKeyToTitle(itemSelectedTraits[index - 1][0]) }}: </span>
                            <span>{{ itemSelectedTraits[index - 1][1] }}</span>
                        </li>
                        <li v-else>Empty Trait Slot...</li>
                    </template>
                </ul>
            </div>
        </template>
        <template v-if="mode === 'edit'">
            <ItemMenuTraitSelect
                :availableTraits="currentAvailableTraits"
                :title="
                    currentSelectedTraits[0]
                        ? currentSelectedTraits[0][0] + ': ' + currentSelectedTraits[0][1]
                        : itemSelectedTraits
                          ? itemSelectedTraits[0][0] + ': ' + itemSelectedTraits[0][1]
                          : 'Select Trait'
                "
                @traitSelected="
                    (args) => {
                        currentSelectedTraits[0] = args;
                        $emit('traitSelected', traitsToSubmit);
                    }
                " />
            <ItemMenuTraitSelect
                :availableTraits="currentAvailableTraits"
                :title="
                    currentSelectedTraits[1]
                        ? currentSelectedTraits[1][0] + ': ' + currentSelectedTraits[1][1]
                        : itemSelectedTraits && itemSelectedTraits[1]
                          ? itemSelectedTraits[1][0] + ': ' + itemSelectedTraits[1][1]
                          : 'Select Trait'
                "
                @traitSelected="
                    (args) => {
                        currentSelectedTraits[1] = args;
                        $emit('traitSelected', traitsToSubmit);
                    }
                " />
            <ItemMenuTraitSelect
                :availableTraits="currentAvailableTraits"
                :title="
                    currentSelectedTraits[2]
                        ? currentSelectedTraits[2][0] + ': ' + currentSelectedTraits[2][1]
                        : itemSelectedTraits && itemSelectedTraits[2]
                          ? itemSelectedTraits[2][0] + ': ' + itemSelectedTraits[2][1]
                          : 'Select Trait'
                "
                @traitSelected="
                    (args) => {
                        currentSelectedTraits[2] = args;
                        $emit('traitSelected', traitsToSubmit);
                    }
                " />
        </template>
    </div>
</template>
<style scoped>
.itemMenuTraits {
    border-radius: 0.2rem;
    background-color: hsla(var(--neutral77), 0.5);
}

.traits {
    padding: 0.5rem;
}

.hasTraits {
    color: var(--secondary-muted);
}
</style>
