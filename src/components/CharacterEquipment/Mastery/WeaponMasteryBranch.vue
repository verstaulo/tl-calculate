<script setup>
import storeKeyToTitle from '../../../utils/storeKeyToTitle.js';
import { useMasteryStore } from '../../../store/masteryStore.js';
import { computed } from 'vue';
import Tooltip1 from '../../UI/Tooltip.vue';

const props = defineProps({
    branch: Object,
    branchPosition: String,
    source: String
});
defineEmits(['select']);
const masteryStore = useMasteryStore();

const activeIndex = computed(() => {
    return masteryStore.branchesStats[props.source][props.branchPosition].length - 1;
});
const availableMasteryPoints = computed(() => {
    return masteryStore.availableMasteryPoints[props.source];
});
const addRemoveBonusHandler = (index, stats) => {
    if (index === activeIndex.value) {
        masteryStore.removeMasteryStats(props.source, props.branchPosition);
    } else masteryStore.addMasteryStats(props.source, props.branchPosition, stats);
};
</script>
<template>
    <div class="branch">
        <p class="branch__title">{{ branch.branch_title }}</p>
        <ul class="branch__list">
            <template v-for="(bonus, index) in branch.branch_bonuses" :key="index">
                <li>
                    <tooltip1>
                        <template #tooltip__trigger>
                            <div class="branch__item">
                                <div class="branch__button-wrapper">
                                    <button
                                        class="branch__button"
                                        :class="{
                                            selectedButton: index <= activeIndex
                                        }"
                                        :disabled="
                                            index <= activeIndex - 1 ||
                                            index > activeIndex + 1 ||
                                            (index > activeIndex && availableMasteryPoints === 0)
                                        "
                                        @click.stop="addRemoveBonusHandler(index, bonus.stats)">
                                        <img :src="bonus.img" alt="" class="branch__img" :draggable="false" />
                                    </button>
                                </div>
                                <p
                                    class="branch__itemTitle"
                                    :class="{
                                        top: index % 2 === 0
                                    }">
                                    {{ bonus.title }}
                                </p>
                            </div>
                        </template>
                        <template #tooltip__content>
                            <ul class="branch__tooltip">
                                <li v-for="[key, value] of Object.entries(bonus.stats)">
                                    <span>{{ storeKeyToTitle(key) }}</span> :
                                    <span>{{ value }}</span>
                                </li>
                            </ul>
                        </template>
                    </tooltip1>
                </li>
            </template>
        </ul>
    </div>
</template>

<style scoped>
.branch {
    display: flex;
    align-items: center;
}

.branch__list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    flex-grow: 1;
}

.branch__list > li:nth-child(2n) {
    margin-top: 4rem;
}

.branch__title {
    width: 150px;
    padding: 0.5rem;
    text-align: center;
}

.branch__button-wrapper {
    width: 60px;
    height: 60px;
    background-color: var(--neutral5);
    padding: 0.125rem;
    clip-path: polygon(8% 25%, 8% 75%, 50% 100%, 92% 75%, 92% 25%, 50% 0%);
}

.branch__button {
    width: 56px;
    height: 56px;
    background-color: var(--baseForeGroundColor);
    clip-path: polygon(8% 25%, 8% 75%, 50% 100%, 92% 75%, 92% 25%, 50% 0%);
}

.branch__item {
    position: relative;
}

.branch__itemTitle {
    position: absolute;
    font-size: 0.75rem;
    width: max-content;
    top: calc(100% + 0.5rem);
    left: 50%;
    transform: translateX(-50%);
}

.branch__itemTitle.top {
    bottom: calc(100% + 0.5rem);
    top: unset;
}

.branch *:nth-of-type(3n) .branch__button-wrapper {
    width: 80px;
    height: 80px;
}

.branch *:nth-of-type(3n) .branch__button-wrapper > button {
    width: 76px;
    height: 76px;
}

.branch__img {
    max-width: 100%;
}

.branch__button-wrapper.selectedButton > .branch__button {
    background-color: var(--neutral4);
}

.selectedButton {
    background-color: var(--neutral4);
}

.branch__tooltip {
    border-radius: var(--base-border-radius);
    padding: 0.5rem;
    width: max-content;
    pointer-events: none;
    background-color: var(--neutral5);
}

.branch__tooltip > li {
    font-size: 0.75rem;
}

button:disabled {
    cursor: unset;
}

@media (max-width: 992px) {
    .branch {
        flex-direction: column;
    }

    .branch__list {
        display: flex;
        flex-direction: column;
        gap: 4rem;
    }

    .branch__itemTitle {
        top: calc(100% + 0.5rem);
        left: 50%;
        transform: translateX(-50%);
    }

    .branch__itemTitle.top {
        bottom: unset;
    }

    .branch__list > li:nth-child(2n) {
        margin-top: unset;
    }
}

@media (max-width: 600px) {
    .branch__list {
        padding: 1rem 0;
    }

    .branch__title {
        width: 100px;
        padding: 0.5rem;
        text-align: center;
    }

    .branch__itemTitle {
        width: 80px;
        text-align: center;
        word-break: break-word;
    }
}
</style>
