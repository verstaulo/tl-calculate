<script setup>
import attributesData from '../../constants/ATTRIBUTES_DATA.json';
import storeKeyToTitle from '../../utils/storeKeyToTitle.js';
import { useAttributeStore } from '../../store/attributeStore.js';
import { useEquipmentStore } from '../../store/equipmentStore.js';

const { attributeName } = defineProps({
    attributeName: String
});
const attributeStore = useAttributeStore();
const equipmentStore = useEquipmentStore();
</script>
<template>
    <div class="info">
        <p class="info__name">
            {{ attributeStore.attributeCount[attributeName] }} {{ storeKeyToTitle(attributeName) }}
        </p>
        <p class="info__description">{{ attributesData[attributeName].title }}</p>
        <ul class="info__bonuses">
            <li
                v-for="(bonusText, bonusCount) in attributesData[attributeName].bonusList"
                :key="bonusCount"
                class="info__bonusesItem"
                :class="{ active: attributeStore.attributeCount[attributeName] >= Number(bonusCount) }">
                {{ bonusText }}
            </li>
        </ul>
        <div class="info__statsSources">
            <div class="info__statSourcesItem">
                <span>Base</span><span>{{ attributeStore.addedAttributeCount[attributeName] + 10 }}</span>
            </div>
            <div v-if="equipmentStore.equipmentStats[attributeName] > 0" class="info__statSourcesItem">
                <span>Equipment</span><span>{{ equipmentStore.equipmentStats[attributeName] }}</span>
            </div>
        </div>
        <ul class="info__stats">
            <li v-for="(value, key) in attributeStore.attributeStats[attributeName]" :key="key" class="info__statsItem">
                <span>{{ storeKeyToTitle(key) }}</span
                ><span>{{ value }}</span>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.info {
    background-color: var(--neutral6);
    padding: var(--base-padding);
    width: 350px;
    text-align: left;
    font-size: 14px;
    color: var(--neutral4);
    border: 1px solid var(--neutral5);
    box-shadow: 0 0 20px var(--neutral7);
}

.info > * + * {
    margin-top: 0.625rem;
}

.active {
    color: var(--secondary-muted);
}

.info__name {
    color: white;
}

.info__stats {
    color: white;
}

.info__statsItem {
    position: relative;
    display: flex;
    justify-content: space-between;
    gap: 10px;
}

.info__bonusesItem {
    position: relative;
}

.info__bonusesItem.active::before {
    content: '';
    position: absolute;
    right: calc(100% + var(--base-padding) / 2);
    top: 50%;
    transform: translateY(-50%);
    border-radius: 100%;
    width: 0.625rem;
    height: 0.625rem;
    background-color: var(--secondary);
}

.info__statsSources {
    color: var(--primary-muted);
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.3125rem;
}

.info__statSourcesItem {
    flex-basis: 50%;
    flex-shrink: 1;
    display: inline-flex;
    justify-content: space-between;
    background-color: var(--neutral5);
    padding-left: var(--base-padding);
    padding-right: var(--base-padding);
    border-radius: var(--base-border-radius);
}
</style>
