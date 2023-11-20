<script>
export default {
  props: {
    type: {
      type: String,
      default: 'button'
    }
  }
}
</script>

<template>
  <button :type="type" class="v-button">
    <span><slot></slot></span>
  </button>
</template>

<style scoped>
.v-button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.v-button:hover {
  background-color: #2980b9;
}
</style>
