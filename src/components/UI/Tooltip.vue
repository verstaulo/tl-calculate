<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    withFixedMode: { type: Boolean, default: false },
    fixedModeStyles: { type: Object, default: null },
    onClose: { Function, default: null }
});
const tooltipContainer = ref(null);
const tooltipContent = ref(null);
const tooltipStyle = ref({ left: 'unset', top: 'unset', right: 'unset', bottom: 'unset' });
const isTooltipVisible = ref(false);
const isTooltipPositionFreeze = ref(false);
const _clickHandler = (event) => {
    if (tooltipContent.value && !tooltipContent.value.contains(event.target)) {
        isTooltipPositionFreeze.value = false;
        isTooltipVisible.value = false;
        if (props.onClose) {
            props.onClose();
        }
        window.removeEventListener('click', _clickHandler);
    }
};
const hideTooltip = () => {
    if (!isTooltipPositionFreeze.value) {
        isTooltipVisible.value = false;
    }
};

const showTooltip = () => {
    if (!isTooltipPositionFreeze.value) {
        isTooltipVisible.value = true;
    }
};

const freezeTooltipPosition = () => {
    if (props.withFixedMode && isTooltipPositionFreeze.value) {
        isTooltipPositionFreeze.value = false;
        isTooltipVisible.value = false;
        window.removeEventListener('click', _clickHandler);
    } else if (props.withFixedMode && !isTooltipPositionFreeze.value) {
        isTooltipPositionFreeze.value = true;
        window.addEventListener('click', _clickHandler);
    }
};

const updateTooltipPosition = (event) => {
    if (isTooltipPositionFreeze.value) return;
    if (tooltipContent.value) {
        const { clientX, clientY } = event;
        const { width: tooltipWidth, height: tooltipHeight } = tooltipContent.value.getBoundingClientRect();
        const hasBottomSpace = clientY + tooltipHeight < window.innerHeight;
        const hasRightSpace = clientX + tooltipWidth < window.innerWidth;
        const hasTopSpace = clientY > tooltipHeight;
        const hasLeftSpace = clientX > tooltipWidth;

        const x = clientX;
        const y = clientY + 10;

        if (hasRightSpace) {
            tooltipStyle.value.left = `${x + 10}px`;
        } else if (hasLeftSpace) {
            tooltipStyle.value.left = `${x - tooltipWidth - 10}px`;
        }
        if (hasBottomSpace) {
            tooltipStyle.value.top = `${y + 10}px`;
        } else if (hasTopSpace) {
            tooltipStyle.value.top = `${y - tooltipHeight - 10}px`;
        } else {
            tooltipStyle.value.top = `${10}px`;
        }
    }
};
</script>
<template>
    <div
        class="tooltip-container"
        ref="tooltipContainer"
        @mousemove="updateTooltipPosition"
        @mouseenter="showTooltip"
        @mouseleave="hideTooltip"
        @click.stop="freezeTooltipPosition">
        <slot name="tooltip__trigger"></slot>
    </div>
    <div
        @click.stop
        class="tooltip__content"
        ref="tooltipContent"
        :style="fixedModeStyles && isTooltipPositionFreeze ? { ...tooltipStyle, ...fixedModeStyles } : tooltipStyle"
        v-if="isTooltipVisible">
        <slot name="tooltip__content"></slot>
    </div>
</template>
<style scoped>
.tooltip-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.tooltip__content {
    position: fixed;
    z-index: 99;
}
</style>
