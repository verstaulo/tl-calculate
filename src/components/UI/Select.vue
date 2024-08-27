<script setup>
defineProps({
  isOpen: Boolean,
  title: String,
  options: Array,
})
</script>

<template>
  <div>
    <button>
      <span>{{ title }}</span>
      <!--      <img-->
      <!--          className={"h-full transition-all " + (isOpen ? "rotate-90" : "")}-->
      <!--      src={selectIcon}-->
      <!--      alt="arrow"-->
      <!--      />-->
    </button>

    <ul v-if="isOpen">
      <li v-for="([key,value]) in options" :key="key">
        <span>{{ key }}: </span>
        <span>{{ value }} ~ {{ value * 4 }}</span>
      </li>
    </ul>
  </div>
</template>
<style scoped>

</style>
