<script setup>
import { computed } from 'vue';

const props = defineProps({ attributeCount: { type: Number } });

const circleLength = computed(() => 2 * Math.PI * 40);
const progressValue = computed(() => `${props.attributeCount * (circleLength.value / 100)} ${circleLength.value}`);
</script>
<template>
    <svg width="100px" height="100px" viewBox="0 0 100 100">
        <defs>
            <filter id="active" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow id="shadow" dx="0" dy="0" flood-color="var(--secondary)" />
            </filter>
            <animate
                xlink:href="#shadow"
                attributeName="stdDeviation"
                values="0;5;0"
                dur="2s"
                begin="1s"
                repeatCount="indefinite" />
        </defs>
        <circle
            r="40"
            cx="50"
            cy="50"
            fill="none"
            stroke-width="4"
            stroke="var(--neutral6)"
            stroke-linecap="round"></circle>
        <circle
            id="progress"
            r="40"
            cx="50"
            cy="50"
            fill="none"
            stroke-width="2"
            stroke="var(--secondary-muted)"
            stroke-linecap="round"
            :stroke-dasharray="progressValue"></circle>
        <circle
            class="checkPoint"
            :filter="props.attributeCount >= 30 ? 'url(#active)' : 'none'"
            r="40"
            cx="50"
            cy="50"
            fill="none"
            stroke-width="10"
            :stroke="props.attributeCount >= 30 ? 'var(--secondary)' : 'var(--neutral6)'"
            stroke-linecap="round"
            :stroke-dasharray="`0 ${circleLength}`"
            :stroke-dashoffset="(circleLength / 100) * 70"></circle>

        <circle
            class="checkPoint"
            :filter="attributeCount >= 40 ? 'url(#active)' : 'none'"
            r="40"
            cx="50"
            cy="50"
            fill="none"
            stroke-width="10"
            :stroke="attributeCount >= 40 ? 'var(--secondary)' : 'var(--neutral6)'"
            stroke-linecap="round"
            :stroke-dasharray="`${0} ${circleLength}`"
            :stroke-dashoffset="`${(circleLength / 100) * 60}`"></circle>
        <circle
            class="checkPoint"
            :filter="attributeCount >= 50 ? 'url(#active)' : 'none'"
            r="40"
            cx="50"
            cy="50"
            fill="none"
            stroke-width="10"
            :stroke="attributeCount >= 50 ? 'var(--secondary)' : 'var(--neutral6)'"
            stroke-linecap="round"
            :stroke-dasharray="`${0} ${circleLength}`"
            :stroke-dashoffset="`${(circleLength / 100) * 50}`"></circle>
        <circle
            class="checkPoint"
            :filter="attributeCount >= 60 ? 'url(#active)' : 'none'"
            r="40"
            cx="50"
            cy="50"
            fill="none"
            stroke-width="10"
            :stroke="attributeCount >= 60 ? 'var(--secondary)' : 'var(--neutral6)'"
            stroke-linecap="round"
            :stroke-dasharray="`${0} ${circleLength}`"
            :stroke-dashoffset="`${(circleLength / 100) * 40}`"></circle>
        <circle
            class="checkPoint"
            :filter="attributeCount >= 70 ? 'url(#active)' : 'none'"
            r="40"
            cx="50"
            cy="50"
            fill="none"
            stroke-width="10"
            :stroke="attributeCount >= 70 ? 'var(--secondary)' : 'var(--neutral6)'"
            stroke-linecap="round"
            :stroke-dasharray="`${0} ${circleLength}`"
            :stroke-dashoffset="`${(circleLength / 100) * 30}`"></circle>
        <text x="50" y="60" font-family="Arial" font-size="24" text-anchor="middle" fill="var(--neutral5)">
            {{ attributeCount }}
        </text>
    </svg>
</template>

<style scoped>
svg #progress {
    transform: rotate(90deg);
    transform-origin: center;
    transition: all 0.5s linear;
}

.checkPoint {
    transform: rotate(90deg);
    transform-origin: center;
}
</style>
