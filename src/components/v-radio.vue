<script>
export default {
  props: {
    label: String,
    modelValue: String,
    options: Array
  },
  methods: {
    updateModel(option) {
      this.$emit('update:modelValue', option)
    },
    getOptionId(option) {
      return `radio_${option.replace(/\s+/g, '_')}`
    }
  }
}
</script>

<template>
  <div class="v-radio">
    <label>{{ label }}</label>
    <div>
      <div v-for="(option, index) in options" :key="index">
        <input
          type="radio"
          :id="getOptionId(option)"
          :value="option"
          :checked="modelValue === option"
          @change="updateModel(option)"
        />
        <label :for="getOptionId(option)">{{ option }}</label>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
