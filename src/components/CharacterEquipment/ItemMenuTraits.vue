<script setup>
import { computed, ref, watchEffect } from 'vue';
import storeKeyToTitle from '../../utils/storeKeyToTitle.js';
import Select from '../UI/Select.vue';

const props = defineProps({
    mode: String,
    itemSelectedTraits: Object,
    itemAvailableTraits: Object
});
defineEmits(['traitSelected']);

const title = computed(() => {
    return !props.itemSelectedTraits && props.mode === 'info'
        ? 'Available Traits:'
        : props.itemSelectedTraits && props.mode === 'info'
          ? 'Selected Traits:'
          : 'Traits:';
});

const currentSelectedTraits = ref([]);
watchEffect(() => {
    if (props.itemSelectedTraits) {
        currentSelectedTraits.value = Object.entries(props.itemSelectedTraits);
    }
});
const updatedTraits = computed(() => {
    const result = [];
    if (currentSelectedTraits.value[0]) {
        result[0] = currentSelectedTraits.value[0];
    }
    if (currentSelectedTraits.value[1]) {
        result[1] = currentSelectedTraits.value[1];
    }
    if (currentSelectedTraits.value[2]) {
        result[2] = currentSelectedTraits.value[2];
    }
    return Object.fromEntries(result);
});

const availableTraits = computed(() => {
    const defaultTraitsList = Object.entries(props.itemAvailableTraits);
    return defaultTraitsList.reduce((acc, [key, value]) => {
        if (!props.itemSelectedTraits) {
            acc.push({ title: storeKeyToTitle(key) + ': ' + value * 4, value: [key, value * 4] });
        } else if (props.itemSelectedTraits && !props.itemSelectedTraits.hasOwnProperty(key)) {
            acc.push({ title: storeKeyToTitle(key) + ': ' + value * 4, value: [key, value * 4] });
        }
        return acc;
    }, []);
});
const statArrayToTitle = (stats) => {
    if (!stats) return null;
    return storeKeyToTitle(stats[0]) + ': ' + stats[1];
};
</script>
<template>
    <div class="itemMenuTraits">
        <p class="itemMenuTraits__title">{{ title }}</p>
        <div class="itemMenuTraits__body">
            <template v-if="!itemSelectedTraits && mode === 'info'">
                <div class="traits">
                    <ul>
                        <li v-for="(value, key) in itemAvailableTraits" :key="key">
                            <span>{{ storeKeyToTitle(key) }}: </span>
                            <span>{{ value }} ~ {{ value * 4 }}</span>
                        </li>
                    </ul>
                </div>
            </template>
            <template v-if="itemSelectedTraits && mode === 'info'">
                <div class="traits">
                    <ul>
                        <template v-for="index in 3">
                            <li v-if="currentSelectedTraits[index - 1]" :key="index" class="active">
                                <span>{{ storeKeyToTitle(currentSelectedTraits[index - 1][0]) }}: </span>
                                <span>{{ currentSelectedTraits[index - 1][1] }}</span>
                            </li>
                            <li v-else>Empty Trait slot...</li>
                        </template>
                    </ul>
                </div>
            </template>
            <template v-if="mode === 'edit'">
                <Select
                    :options="availableTraits"
                    :placeholder="statArrayToTitle(currentSelectedTraits[0]) || 'Select trait'"
                    :class="{ active: currentSelectedTraits[0] }"
                    @select="
                        (stats) => {
                            currentSelectedTraits[0] = stats;
                            $emit('traitSelected', updatedTraits);
                        }
                    " />
                <Select
                    :options="availableTraits"
                    :placeholder="statArrayToTitle(currentSelectedTraits[1]) || 'Select trait'"
                    :class="{ active: currentSelectedTraits[1] }"
                    @select="
                        (stats) => {
                            currentSelectedTraits[1] = stats;
                            $emit('traitSelected', updatedTraits);
                        }
                    " />
                <Select
                    :options="availableTraits"
                    :placeholder="statArrayToTitle(currentSelectedTraits[2]) || 'Select trait'"
                    :class="{ active: currentSelectedTraits[2] }"
                    @select="
                        (stats) => {
                            currentSelectedTraits[2] = stats;
                            $emit('traitSelected', updatedTraits);
                        }
                    " />
            </template>
        </div>
    </div>
</template>
<style scoped>
.itemMenuTraits__title {
    padding: 0.25rem;
    text-align: center;
}

.itemMenuTraits__body {
    border-radius: 0.2rem;
    background-color: hsla(var(--neutral77), 0.5);
}

.traits {
    padding: 0.5rem;
}

.active:deep(.select__button) {
    color: var(--secondary-muted);
}
</style>
