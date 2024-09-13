<script setup>
import CounterProgress from './CounterProgress.vue';
import AttributeInfo from './AttributeInfo.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { computed } from 'vue';
import Tooltip from '../UI/Tooltip.vue';

const props = defineProps({
    attributeName: String,
    attributeImage: String,
    attributeCount: Number,
    addedAttributeCount: Number
});
defineEmits(['increase', 'decrease']);
const fine = computed(() => {
    return props.addedAttributeCount >= 20 && props.addedAttributeCount < 30
        ? 2
        : props.addedAttributeCount >= 30
          ? 4
          : 0;
});

const background = computed(() => {
    return {
        backgroundImage: `url(${props.attributeImage})`,
        backgroundSize: '65%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
    };
});
</script>
<template>
    <div class="attributeCounter">
        <div :style="attributeImage ? background : ''">
            <tooltip>
                <template #tooltip__trigger>
                    <CounterProgress :attributeCount="attributeCount" />
                </template>
                <template #tooltip__content>
                    <AttributeInfo :attribute-name="attributeName" />
                </template>
            </tooltip>
        </div>
        <div class="attributeCounter__controls">
            <button class="attributeCounter__button" @click="$emit('decrease')">
                <FontAwesomeIcon :icon="faMinus" />
            </button>
            <p class="attributeCounter__title">{{ attributeName }}</p>
            <button class="attributeCounter__button attributeCounter__button-plus" @click="$emit('increase')">
                <FontAwesomeIcon :icon="faPlus" />
                <span class="attributeCounter__fine" v-if="fine > 0">- {{ fine }}</span>
            </button>
        </div>
    </div>
</template>

<style scoped>
.attributeCounter {
    padding: var(--base-padding);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    min-width: 2.19rem;
}

.attributeCounter__title {
    text-transform: capitalize;
}

.attributeCounter__controls {
    display: flex;
    gap: 0.5rem;
}

.attributeCounter__button {
    width: 22px;
    height: 22px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 50%;
    padding: calc(var(--base-padding) / 2);
    background-color: var(--baseForeGroundColor);
    align-self: flex-end;
    line-height: 0.5;
    cursor: pointer;
}

.attributeCounter__fine {
    position: absolute;
    bottom: 100%;
    left: 100%;
    width: max-content;
    padding: 0.25rem;
    color: rgba(255, 0, 0, 0.5);
    font-weight: bold;
}

.attributeCounter__button:hover {
    background-color: var(--neutral5);
}

.attributeCounter__button:active {
    background-color: var(--baseForeGroundColor);
}

.attributeCounter__button-plus {
    background-color: var(--primary-muted);
}

.attributeCounter__button-plus:hover {
    background-color: var(--primary);
}

.attributeCounter__button-plus:active {
    background-color: var(--primary-muted);
}
</style>
