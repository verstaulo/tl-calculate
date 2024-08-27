<script setup>
import WeaponMasteryBranch from './WeaponMasteryBranch.vue';
import { useMasteryStore } from '../../../store/masteryStore.js';
import storeKeyToTitle from '../../../utils/storeKeyToTitle.js';
import Tooltip1 from '../../UI/Tooltip.vue';

const props = defineProps({
    tree: Object,
    source: String
});
const masteryStore = useMasteryStore();
</script>

<template>
    <div class="masteryTree">
        <div class="masteryTree__imageWrapper">
            <tooltip1>
                <template #tooltip__trigger="{ toggle }">
                    <img
                        @mouseenter="toggle"
                        @mouseleave="toggle"
                        class="masteryTree__image"
                        :src="tree.rootBonus.img"
                        alt="" />
                </template>
                <template #tooltip__content>
                    <ul class="branch__tooltip">
                        <li v-for="[key, value] of Object.entries(tree.rootBonus.stats)">
                            <span>{{ storeKeyToTitle(key) }}</span> :
                            <span>{{ value }}</span>
                        </li>
                    </ul>
                </template>
            </tooltip1>
            <p class="masteryTree__points">{{ masteryStore.availableMasteryPoints[source] }}</p>
        </div>
        <div class="masteryTree__branches">
            <weapon-mastery-branch :branch="tree.branches[0]" :source="source" :branch-position="'firstBranch'" />
            <weapon-mastery-branch :branch="tree.branches[1]" :source="source" :branch-position="'secondBranch'" />
            <weapon-mastery-branch :branch="tree.branches[2]" :source="source" :branch-position="'thirdBranch'" />
        </div>
    </div>
</template>

<style scoped>
.masteryTree {
    display: flex;
    border: 1px solid var(--baseForeGroundColor);
    border-radius: var(--base-border-radius);
    gap: 1rem;
    padding: 1rem 3rem;
    background-color: var(--baseBackgroundColor);
    overflow-x: hidden;
    overflow-y: auto;
}

.masteryTree__imageWrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    margin: 0 auto;
}

.masteryTree__imageWrapper img {
    width: 4rem;
    height: 4rem;
}

.masteryTree__image {
    width: 100%;
    object-fit: contain;
}

.masteryTree > div:nth-child(2) {
    flex-grow: 1;
}

.masteryTree__points {
    text-align: center;
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

@media (max-width: 992px) {
    .masteryTree {
        flex-direction: column;
    }

    .masteryTree__branches {
        display: flex;
        margin: 0 auto;
    }
}

@media (max-width: 600px) {
    .masteryTree {
        padding: 1rem;
    }
}
</style>
