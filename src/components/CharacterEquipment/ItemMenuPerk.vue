<script setup>
import frame from '../../assets/images/skill_frame_passive.webp';

defineProps({
    image: String,
    title: String,
    description: String
});
</script>
<template>
    <div class="perk">
        <div class="perk__wrapper">
            <img :src="image" alt="perkImage" class="perk__image" />
            <img :src="frame" alt="frame" class="frame" />
        </div>
        <p>{{ title }}</p>
        <p class="perk__description">{{ description }}</p>
    </div>
</template>
<style scoped>
.perk {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    border-radius: 0.2rem;
    gap: 0.5rem;
    background-color: var(--baseBackgroundColor);
}

.perk__wrapper {
    width: 4rem;
    height: 4rem;
    position: relative;
}

.frame {
    position: absolute;
    width: 100%;
    height: 100%;
    inset: 0;
}

.perk__description {
    text-align: center;
}

.perk__image {
    width: 4rem;
    height: 4rem;
    clip-path: polygon(8% 25%, 8% 75%, 50% 100%, 92% 75%, 92% 25%, 50% 0%);
    object-fit: cover;
}
</style>
