<script>
import { ref } from 'vue'
const loading = ref(false)
export default {
  props: ['loading']
}
</script>

<template>
  <div v-if="loading" class="v-loader">
    <svg class="circular" viewBox="25 25 50 50">
      <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" />
    </svg>
  </div>
</template>

<style scoped>
.v-loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
}
.v-loader::before {
  content: '';
  display: block;
  padding-top: 100%;
}
.circular {
  animation: rotate 2s linear infinite;
  height: 100%;
  transform-origin: center center;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
.path {
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  animation:
    dash 1.5s ease-in-out infinite,
    color 6s ease-in-out infinite;
  stroke-linecap: round;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124px;
  }
}

@keyframes color {
  0%,
  100%,
  40%,
  66%,
  80%,
  90% {
    stroke: var(--color-text);
  }
}
</style>
