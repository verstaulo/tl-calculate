<script setup>
import { ref } from 'vue';

const props = defineProps({
    isOpen: Boolean,
    placeholder: String,
    defaultPlaceholder: String,
    options: Array
});
const emit = defineEmits(['select']);

const isOpen = ref(false);
const toggleOpenListHandler = () => {
    isOpen.value = !isOpen.value;
};
const selectHandler = (data) => {
    isOpen.value = false;
    emit('select', data);
};
</script>

<template>
    <div class="select">
        <button class="select__button" @click="toggleOpenListHandler">
            <span>{{ placeholder || defaultPlaceholder }}</span>
        </button>

        <ul v-if="isOpen" class="select__list">
            <li v-for="option in options" :key="option.title">
                <button @click="selectHandler(option.value)">
                    <span>{{ option.title }} </span>
                </button>
            </li>
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

.select__button span {
    text-transform: capitalize;
}
</style>
