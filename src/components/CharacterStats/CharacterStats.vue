<script setup>
import StatsGroup from './StatsGroup.vue';

const props = defineProps({ groupNames: Object });
</script>

<template>
    <ul class="characterStats">
        <li
            v-for="(groupStats, groupName) in groupNames"
            :class="{
                colspan: groupName === 'survival' || groupName === 'weapons' || groupName === 'defense',
                doubleCol: groupName === 'survival'
            }"
            class="characterStats__group">
            <StatsGroup
                v-if="groupName !== 'others'"
                :key="groupName"
                :group-name="groupName"
                :group-stats="groupStats"></StatsGroup>
        </li>
    </ul>
</template>

<style scoped>
.characterStats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    height: max-content;
}

.characterStats__group {
    min-width: 300px;
    border-radius: var(--base-border-radius);
    background-color: hsla(var(--neutral66), 0.4);
}

.colspan {
    grid-column: span 2;
}

.doubleCol :deep(.characterStats__list_stats) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
}

@media (max-width: 1330px) {
    .characterStats {
        grid-template-columns: 1fr;
    }

    .doubleCol :deep(.characterStats__list_stats) {
        grid-template-columns: unset;
    }

    .doubleCol {
        grid-column: unset;
    }
}
</style>
