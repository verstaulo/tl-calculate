<script setup>
import { watch } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons/faClose';

const props = defineProps({
    isOpen: {
        type: Boolean,
        required: true
    }
});
defineEmits(['update:isOpen']);

watch(
    () => props.isOpen,
    (newValue) => {
        newValue ? (document.body.style.overflowY = 'hidden') : (document.body.style.overflowY = 'auto');
    }
);
</script>

<template>
    <Teleport to="body">
        <Transition name="fade">
            <div v-if="isOpen" class="modal" @click="$emit('update:isOpen', false)">
                <button class="modal_button">
                    <font-awesome-icon :icon="faClose"></font-awesome-icon>
                </button>
                <slot></slot>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
.modal {
    position: fixed;
    inset: 0;
    z-index: 99;
    padding: 1rem;
    background-color: hsla(var(--neutral77), 0.5);
    backdrop-filter: blur(10px);
}
.modal_button {
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
