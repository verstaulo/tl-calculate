<script setup>
import storeKeyToTitle from '../../utils/storeKeyToTitle.js';
import ItemMenuStats from './ItemMenuStats.vue';
import ItemMenuPerk from './ItemMenuPerk.vue';
import ItemMenuTraits from './ItemMenuTraits.vue';
import ItemMenuSetBonuses from './ItemMenuSetBonuses.vue';
import { useEquipmentStore } from '../../store/equipmentStore.js';
import ENCHANT_PATTERNS from '../../constants/ENCHANT_PATTERNS.json';
import { computed, onUnmounted, onUpdated, ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons/faPlusCircle';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons/faMinusCircle';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import ItemMenuResonance from './ItemMenuResonance.vue';

const props = defineProps({
    mode: String,
    item: Object,
    equipmentItemStateKey: String
});
const emit = defineEmits(['closeMenu']);
const equipmentStore = useEquipmentStore();

const menuRef = ref();
const currentItem = computed(() =>
    props.item ? props.item : equipmentStore.equipment[props.equipmentItemStateKey] || null
);
const titleStyles = computed(() => ({
    color: `var(--${currentItem.value.tier})`
}));
const menuWidth = computed(() => (!currentItem.value ? 'max-content' : '350px'));

const enchantedLevel = ref(currentItem.value?.level || 0);
const enchantedStats = ref([]);
const selectedTraits = ref(null);
const selectTraitHandler = (stats) => {
    selectedTraits.value = stats;
};
const selectedResonance = ref(null);
const selectResonanceHandler = (stats) => {
    selectedResonance.value = stats;
};
const _clickHandler = (event) => {
    if (menuRef.value && !menuRef.value.contains(event.target)) {
        emit('closeMenu');
    }
};
const increaseStatsHandler = () => {
    if (
        (enchantedLevel.value === 9 && currentItem.value.tier === 'epic' && !currentItem.value.source) ||
        enchantedLevel.value === 12
    )
        return;
    enchantedLevel.value++;
    const result = {};
    if (enchantedStats.value.length === 0) {
        Object.entries(currentItem.value.stats).forEach(([statKey, statValue]) => {
            const bonusValue = ENCHANT_PATTERNS[currentItem.value.type][statKey]
                ? ENCHANT_PATTERNS[currentItem.value.type][statKey][enchantedLevel.value - 1]
                : 0;
            if (statKey === 'attack_speed') {
                result[statKey] = statValue;
            } else {
                result[statKey] = Number(((result[statKey] || 0) + statValue + bonusValue).toFixed(2));
            }
        });
    } else {
        enchantedStats.value.forEach(([statKey, statValue]) => {
            const bonusValue = ENCHANT_PATTERNS[currentItem.value.type][statKey]
                ? ENCHANT_PATTERNS[currentItem.value.type][statKey][enchantedLevel.value - 1]
                : 0;
            if (statKey === 'attack_speed') {
                result[statKey] = statValue;
            } else {
                result[statKey] = Number(((result[statKey] || 0) + statValue + bonusValue).toFixed(2));
            }
        });
    }
    enchantedStats.value = Object.entries(result);
};
const decreaseStatsHandler = () => {
    if (enchantedLevel.value === 0) return;
    const result = {};
    if (enchantedStats.value.length === 0 && currentItem.value.level > 0) {
        Object.entries(currentItem.value.stats).forEach(([statKey, statValue]) => {
            const bonusValue = ENCHANT_PATTERNS[currentItem.value.type][statKey]
                ? ENCHANT_PATTERNS[currentItem.value.type][statKey][enchantedLevel.value - 1]
                : 0;
            if (statKey === 'attack_speed') {
                result[statKey] = statValue;
            } else {
                result[statKey] = Number((statValue - bonusValue).toFixed(2));
            }
        });
    } else {
        enchantedStats.value.forEach(([statKey, statValue]) => {
            const bonusValue = ENCHANT_PATTERNS[currentItem.value.type][statKey]
                ? ENCHANT_PATTERNS[currentItem.value.type][statKey][enchantedLevel.value - 1]
                : 0;
            if (statKey === 'attack_speed') {
                result[statKey] = statValue;
            } else {
                result[statKey] = Number((statValue - bonusValue).toFixed(2));
            }
        });
    }
    enchantedLevel.value--;
    enchantedStats.value = Object.entries(result);
};
const submitEnchantedStatsHandler = () => {
    if (enchantedStats.value.length > 0) {
        equipmentStore.equipment[props.equipmentItemStateKey].stats = Object.fromEntries(enchantedStats.value);
        equipmentStore.equipment[props.equipmentItemStateKey].level = enchantedLevel.value;
    }
    if (selectedTraits.value) {
        equipmentStore.equipment[props.equipmentItemStateKey].selectedTraits = selectedTraits.value;
        selectedTraits.value = null;
    }
    if (selectedResonance.value) {
        equipmentStore.equipment[props.equipmentItemStateKey].selectedResonance = selectedResonance.value;
        selectedResonance.value = null;
    }
    enchantedStats.value = [];
    enchantedLevel.value = currentItem.value.level;
};

onUpdated(() => {
    if (props.mode === 'edit') {
        document.body.addEventListener('click', _clickHandler);
    }
});
onUnmounted(() => {
    if (props.mode === 'edit') {
        document.body.removeEventListener('click', _clickHandler);
    }
});
</script>
<template>
    <div class="itemMenu" ref="menuRef" @click.stop>
        <template v-if="!currentItem">
            <span>Click to choose your {{ storeKeyToTitle(equipmentItemStateKey) }}</span>
        </template>
        <template v-else>
            <div>
                <h3 :style="titleStyles" class="itemMenu__title">
                    {{ currentItem.title }}
                </h3>
                <p :style="titleStyles" class="itemMenu__tier">Tier : {{ currentItem.tier }}</p>
                <p class="itemMenu__type">
                    {{ storeKeyToTitle(currentItem.type) }}
                </p>
            </div>
            <template v-if="mode === 'edit'">
                <div class="itemMenu__controls">
                    <div class="itemMenu__controls-level">
                        <button
                            class="itemMenu__button"
                            :class="{ 'itemMenu__button-minus': currentItem.level > 0 || enchantedLevel > 0 }"
                            @click="decreaseStatsHandler">
                            <FontAwesomeIcon :icon="faMinusCircle" />
                        </button>
                        <span class="itemMenu__level">{{ enchantedLevel }}</span>
                        <button
                            class="itemMenu__button"
                            :class="{
                                'itemMenu__button-plus':
                                    (enchantedLevel < 9 && currentItem.tier === 'epic' && !currentItem.source) ||
                                    (enchantedLevel < 12 && (currentItem.tier === 'epic2' || currentItem.source))
                            }"
                            @click="increaseStatsHandler">
                            <FontAwesomeIcon :icon="faPlusCircle" />
                        </button>
                    </div>

                    <button
                        :disabled="enchantedLevel === currentItem.level && !selectedTraits && !selectedResonance"
                        class="itemMenu__buttonConfirm"
                        @click="submitEnchantedStatsHandler">
                        <FontAwesomeIcon :icon="faCheck" />
                    </button>
                </div>
            </template>

            <ItemMenuStats
                :enchanted-stats="Object.fromEntries(enchantedStats)"
                :item-group="currentItem.itemGroup"
                :item-level="currentItem.level"
                :enchanted-level="enchantedLevel"
                :item-stats="currentItem.stats"
                :item-type="currentItem.type"
                :mode="mode" />
            <ItemMenuPerk
                v-if="currentItem.perk"
                :description="currentItem.perk.description"
                :image="currentItem.perk.image"
                :title="currentItem.perk.title" />
            <ItemMenuTraits
                :item-selected-traits="selectedTraits || currentItem.selectedTraits || null"
                :mode="mode"
                :item-available-traits="currentItem.traits"
                @trait-selected="selectTraitHandler" />
            <ItemMenuResonance
                :mode="mode"
                :item-type="currentItem.type"
                :item-source="currentItem.source"
                :item-tier="currentItem.tier"
                :selected-resonance-effect="selectedResonance || currentItem.selectedResonance"
                @resonance-selected="selectResonanceHandler" />
            <ItemMenuSetBonuses v-if="currentItem.setName" :item-set-name="currentItem.setName" />
        </template>
    </div>
</template>

<style scoped>
.itemMenu {
    display: grid;
    gap: 1rem;
    background-color: var(--neutral6);
    padding: var(--base-padding);
    width: v-bind(menuWidth);
    text-align: left;
    font-size: 14px;
    color: var(--neutral4);
    border: 1px solid var(--neutral5);
    border-radius: 0.2rem;
    box-shadow: 0 0 20px var(--neutral7);
    user-select: none;
}

.itemMenu__level {
    min-width: 2rem;
    text-align: center;
}

.itemMenu__controls {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
}

.itemMenu__controls > button {
    flex-grow: 1;
}

.itemMenu__controls-level {
    display: flex;
}

.itemMenu__button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 22px;
    height: 22px;
    padding: 2px;
    border-radius: 100%;
    background-color: var(--neutral7);
    color: var(--neutral6);
}

.itemMenu__button-minus {
    background-color: var(--primary-muted);
}

.itemMenu__button-plus {
    background-color: var(--secondary-muted);
}

.itemMenu__buttonConfirm {
    padding: 2px;
    border-radius: 0.25rem;
    background-color: var(--secondary-muted);
}

.itemMenu__buttonConfirm:disabled {
    background-color: var(--neutral5);
}
</style>
