<script setup>
import storeKeyToTitle from '../../utils/storeKeyToTitle.js';
import { ref, watchEffect } from 'vue';

defineProps({
    title: String,
    availableTraits: Array
});
defineEmits(['traitSelected']);
const isListOpen = ref(false);
</script>
<template>
    <div class="select">
        <button
            class="select__button"
            :class="title === 'Select Trait' ? 'notActiveItem' : 'activeItem'"
            @click="isListOpen = !isListOpen">
            {{ storeKeyToTitle(title) }}
        </button>
        <ul v-if="isListOpen" class="select__list">
            <template v-for="[traitName, traitValue] in availableTraits">
                <li>
                    <button
                        @click="
                            () => {
                                isListOpen = false;
                                $emit('traitSelected', [traitName, traitValue * 4]);
                            }
                        ">
                        {{ storeKeyToTitle(traitName) }}: {{ traitValue * 4 }}
                    </button>
                </li>
            </template>
        </ul>
    </div>
</template>
<style scoped>
.select__list {
    display: grid;
    justify-items: start;
    background-color: hsla(var(--neutral77), 0.95);
    border-radius: 0.2rem;
    padding: 0.5rem;
}

.select__button {
    padding: 0.5rem;
}

.select__list button {
    color: var(--neutral4);
}

.select__button.notActiveItem {
    color: var(--neutral4);
}

.select__button.activeItem {
    color: var(--secondary-muted);
}
</style>
