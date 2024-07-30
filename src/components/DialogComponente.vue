<template>
  <q-dialog v-model="dialogOpen" persistent>
    <q-card class="dialog">
      <q-card-section class="row items-center">
        <slot></slot>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn @click="toggleDialogOpen" flat label="ok" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
export default {
  name: 'DialogComponente',
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    toggleDialogOpen: Function
  },
  data () {
    return {
      dialogOpen: this.isOpen
    }
  },
  watch: {
    isOpen (newVal) {
      this.dialogOpen = newVal
    }
  }
}
</script>
<style scoped lang="scss">
.dialog {
  width: 400px;
}
</style>
