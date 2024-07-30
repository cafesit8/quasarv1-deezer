<template>
  <input class="input" :value="value" @input="$emit('input', $event.target.value)" type="text">
</template>
<script>
export default {
  props: ['value']
}
</script>
<style scoped lang="scss">
.input {
  width: 100%;
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 6px;
  resize: vertical;
}
</style>
