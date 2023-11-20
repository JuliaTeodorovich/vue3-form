<script>
export default {
  props: {
    label: String,
    modelValue: String,
    type: {
      type: String,
      default: 'text'
    },
    inputClass: String
  },
  computed: {
    inputType() {
      return this.type === 'password' ? 'password' : this.type
    }
  },
  methods: {
    updateModel(value) {
      this.$emit('update:modelValue', value)
    }
  }
}
</script>

<template>
  <div class="v-input">
    <label>{{ label }}</label>
    <input
      :value="modelValue"
      :type="inputType"
      :class="inputClass"
      @input="($event) => updateModel($event.target.value)"
    />
  </div>
</template>

<style scoped>
.v-input {
  margin: 5px;
  display: flex;
  flex-direction: column;
}
</style>
