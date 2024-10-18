<template>
  <div v-if="showPopup" class="popup-container">
    <slot></slot>
  </div>
</template>
<script setup>
// eslint-disable-next-line no-undef
defineProps(['showPopup']);

</script>
<style scoped>
  .popup-container {
    position: absolute;
    width: 200px;
    background-color: #fff;
    box-shadow: 0px 3px 18px #00000029;
    border: 1px solid #43425D;
    border-radius: 10px;
    z-index: 10;
  }
  .popup-container::after {
    content: " ";
    position: absolute;
    bottom: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent #43425D transparent;
  }
</style>