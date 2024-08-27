<script setup>
defineProps({
  filtersList: Array,
  modelValue: String,
});
defineEmits(["update:modelValue"]);
</script>
<template>
  <ul class="filter" @click.stop>
    <li v-for="filter in filtersList" :key="filter">
      <label :class="{selected:filter===modelValue}" class="filter__item">
        <input
            :key="filter"
            :checked="modelValue===filter"
            :name="filtersList[0]"
            :value="filter"
            hidden
            type="radio"
            @change="$emit('update:modelValue',$event.target.value)"
        />
        {{ filter }}
      </label>
    </li>
  </ul>
</template>

<style>
.filter {
  display: flex;
  justify-content: center;
  gap: 0.3rem;
  flex-wrap: wrap;
}

.filter__item {
  transition: all 300ms ease;
  display: inline-block;
  border-radius: 0.5rem;
  text-transform: capitalize;
  padding-left: var(--base-padding);
  padding-right: var(--base-padding);
  cursor: pointer;
  user-select: none;
}

.filter__item:hover {
  background-color: var(--neutral5);
}

.selected {
  background-color: var(--neutral7);
}
</style>
