<script setup>
import { computed } from 'vue';
import Select from '../UI/Select.vue';
import storeKeyToTitle from '../../utils/storeKeyToTitle.js';
import itemTypeToResonanceKey from '../../utils/itemTypeToResonanceKey.js';
import RESONANCE_EFFECTS from '../../constants/RESONANCE_EFFECTS.json';

const props = defineProps({
    mode: String,
    itemTier: String,
    itemType: String,
    itemSource: String,
    selectedResonanceEffect: Object
});
const emit = defineEmits(['resonance-selected']);

const resonanceItemType = computed(() => itemTypeToResonanceKey(props.itemType));
const title = computed(() => {
    return props.mode === 'info' && !props.selectedResonanceEffect
        ? 'Available Resonance Effects:'
        : props.mode === 'info' && props.selectedResonanceEffect
          ? 'Selected Resonance Effect:'
          : 'Resonance Effect:';
});

const resonanceEffectTitle = computed(() => {
    if (props.selectedResonanceEffect) {
        return (
            storeKeyToTitle(Object.keys(props.selectedResonanceEffect)[0]) +
            ': ' +
            Object.values(props.selectedResonanceEffect)[0]
        );
    }
});

const availableResonanceEffects = computed(() => {
    return props.itemSource && props.itemSource === 'arch_boss'
        ? Object.entries(RESONANCE_EFFECTS.epic2[resonanceItemType.value])
        : Object.entries(RESONANCE_EFFECTS[props.itemTier][resonanceItemType.value]);
});

const filteredResonanceEffects = computed(() => {
    return availableResonanceEffects.value.reduce((acc, [key, value]) => {
        if (!props.selectedResonanceEffect) {
            acc.push({ title: storeKeyToTitle(key) + ': ' + value, value: { [key]: value } });
        } else if (props.selectedResonanceEffect && !props.selectedResonanceEffect[key]) {
            acc.push({ title: storeKeyToTitle(key) + ': ' + value, value: { [key]: value } });
        }
        return acc;
    }, []);
});
</script>
<template>
    <div class="resonance">
        <p class="resonance__title">{{ title }}</p>
        <div class="resonance__body" :class="{ active: selectedResonanceEffect }">
            <template v-if="mode === 'info' && !selectedResonanceEffect">
                <ul>
                    <li
                        v-for="[effectKey, effectValue] of availableResonanceEffects"
                        :key="effectKey"
                        class="resonance__listItem">
                        <span> {{ storeKeyToTitle(effectKey) }}: </span>
                        <span>
                            {{ effectValue }}
                        </span>
                    </li>
                </ul>
            </template>
            <template v-else-if="mode === 'info' && selectedResonanceEffect">
                <ul>
                    <li
                        v-for="(effectValue, effectKey) of selectedResonanceEffect"
                        :key="effectKey"
                        class="resonance__listItem active">
                        <span> {{ storeKeyToTitle(effectKey) }}: </span>
                        <span>
                            {{ effectValue }}
                        </span>
                    </li>
                </ul>
            </template>
            <template v-else>
                <Select
                    :defaultPlaceholder="resonanceEffectTitle || 'Select Effect'"
                    :options="filteredResonanceEffects"
                    @select="(args) => emit('resonance-selected', args)" />
            </template>
        </div>
    </div>
</template>

<style scoped>
.resonance__body {
    background-color: hsla(var(--neutral77), 0.5);
    border-radius: 0.25rem;
}

.resonance__title {
    padding: 0.25rem;
    text-align: center;
}

.resonance__listItem {
    padding: 0 0.5rem;
}

.resonance__listItem:first-child {
    padding-top: 0.5rem;
}

.resonance__listItem:last-child {
    padding-bottom: 0.5rem;
}

.resonance__body.active:deep(.select__button) {
    color: var(--secondary-muted);
}

.active {
    color: var(--secondary-muted);
}
</style>
