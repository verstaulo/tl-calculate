<script setup>
import CharacterAttributeCounter from './CharacterAttributesCounter.vue';
import { useAttributeStore } from '../../store/attributeStore';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faRotate } from '@fortawesome/free-solid-svg-icons/faRotate';
import str_img from '../../assets/images/attributesLogos/str_img.webp';
import dex_img from '../../assets/images/attributesLogos/dex_img.webp';
import wis_img from '../../assets/images/attributesLogos/wis_img.webp';
import perc_img from '../../assets/images/attributesLogos/perc_img.webp';

const attributeStore = useAttributeStore();
</script>

<template>
    <section class="characterAttributes">
        <div class="characterAttributes__title">
            <span>Available Stat Points: </span>
            <p>
                {{ attributeStore.availableAttributesPoints }}
            </p>
            <button v-show="attributeStore.availableAttributesPoints < 54" @click="attributeStore.resetAttributes">
                <FontAwesomeIcon :icon="faRotate" />
            </button>
        </div>
        <CharacterAttributeCounter
            attributeName="strength"
            :attributeImage="str_img"
            :attributeCount="attributeStore.attributeCount.strength"
            :addedAttributeCount="attributeStore.addedAttributeCount.strength"
            @increase="attributeStore.increaseAttributeCount('strength')"
            @decrease="attributeStore.decreaseAttributeCount('strength')" />
        <CharacterAttributeCounter
            attributeName="dexterity"
            :attributeImage="wis_img"
            :attributeCount="attributeStore.attributeCount.dexterity"
            :addedAttributeCount="attributeStore.addedAttributeCount.dexterity"
            @increase="attributeStore.increaseAttributeCount('dexterity')"
            @decrease="attributeStore.decreaseAttributeCount('dexterity')" />
        <CharacterAttributeCounter
            attributeName="wisdom"
            :attributeImage="dex_img"
            :attributeCount="attributeStore.attributeCount.wisdom"
            :addedAttributeCount="attributeStore.addedAttributeCount.wisdom"
            @increase="attributeStore.increaseAttributeCount('wisdom')"
            @decrease="attributeStore.decreaseAttributeCount('wisdom')" />
        <CharacterAttributeCounter
            attributeName="perception"
            :attributeImage="perc_img"
            :attributeCount="attributeStore.attributeCount.perception"
            :addedAttributeCount="attributeStore.addedAttributeCount.perception"
            @increase="attributeStore.increaseAttributeCount('perception')"
            @decrease="attributeStore.decreaseAttributeCount('perception')" />
    </section>
</template>

<style scoped>
.characterAttributes {
    user-select: none;
    border-radius: var(--base-border-radius);
    display: flex;
    flex-direction: column;
    gap: 2rem;
    min-width: 15rem;
}

.characterAttributes__title {
    padding: var(--base-padding);
    margin: 0;
    width: 100%;
    text-align: center;
    position: relative;
}

.characterAttributes__title button {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: rgba(255, 0, 0, 0.65);
}
</style>
