<script>
export default {
  props: {
    label: String,
    model: [Array, Boolean],
    options: Array
  },
  data() {
    return {
      checkedOptions: this.model || []
    }
  },
  watch: {
    checkedOptions(newVal) {
      if (newVal !== this.model) {
        this.$emit('update:model', newVal)
      }
    },
    model(newVal) {
      if (newVal !== this.checkedOptions) {
        this.checkedOptions = newVal
      }
    }
  }
}
</script>

<template>
  <div class="v-checkbox">
    <label>{{ label }}</label>
    <div>
      <div v-for="(option, index) in options" :key="index">
        <input type="checkbox" :id="option" :value="option" v-model="checkedOptions" />
        <label :for="option">{{ option }}</label>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
