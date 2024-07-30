<template>
  <input :value="value" @input="handleInput" type="range" :min="min" step="0.01" :max="max">
</template>
<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0,
      required: false
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    }
  },
  methods: {
    handleInput (event) {
      const newValue = parseFloat(event.target.value)
      this.$emit('updateRange', newValue)
    }
  }
}
</script>
