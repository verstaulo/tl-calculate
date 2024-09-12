<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    count: Number
});
const color = ref('#E7EBEEB2');

watch(
    () => props.count,
    (newValue, oldValue) => {
        if (newValue > oldValue) {
            color.value = '#40DD7AFF';
        } else if (newValue < oldValue) {
            color.value = '#D54B10FF';
        }
    }
);

const onBeforeEnter = (el) => {
    el.style.color = color.value;
};

const onAfterEnter = (el) => {
    el.style.color = '#E7EBEEB2';
};
</script>

<template>
    <div class="wrapper">
        <Transition @before-enter="onBeforeEnter" @after-enter="onAfterEnter" mode="out-in">
            <span ref="contentNode" :key="count">
                {{ count }}
            </span>
        </Transition>
    </div>
</template>
<style scoped>
.wrapper {
    position: relative;
}

.v-enter-from {
    display: inline-block;
    transform: scale(1.4);
}

.v-enter-to {
    display: inline-block;
    transform: scale(1);
}

.v-enter-active {
    transition: all 0.6s linear;
}

.v-leave-to {
    opacity: 0;
}
</style>
