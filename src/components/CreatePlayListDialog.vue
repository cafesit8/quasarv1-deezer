<template>
  <DialogComponente :isOpen="dialogOpen" :toggleDialogOpen="toggleDialogOpen">
    <template>
      <div class="dialog flex column">
        <p class="subtitle text-h6">Crear Playlist</p>
        <p>¡Crea tu propia banda sonora! Crea una playlist personalizada con tus canciones favoritas.</p>
        <InputText v-model="namePLayList" />
        <button @click="addPlayList()">Crear</button>
      </div>
    </template>
  </DialogComponente>
</template>
<script>
import DialogComponente from './DialogComponente.vue'
import InputText from './inputs/InputText.vue'

export default {
  name: 'CreatePlayListDialog',
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    toggleDialogOpen: Function
  },
  components: {
    DialogComponente,
    InputText
  },
  data () {
    return {
      dialogOpen: this.isOpen,
      namePLayList: ''
    }
  },
  watch: {
    isOpen (newVal) {
      this.dialogOpen = newVal
    }
  },
  methods: {
    addPlayList () {
      if (this.namePLayList.trim() !== '') {
        this.$store.commit('music/setPlayList', { id: crypto.randomUUID(), name: this.namePLayList, songs: [] })
        this.dialogOpen = false
        this.namePLayList = ''
      }
      this.toggleDialogOpen()
    }
  }
}
</script>
<style scoped lang="scss">
.dialog {

  .subtitle {
    color: $red_principal;
  }

  p {
    color: $black-70;
  }

  button {
    background-color: $red_principal;
    color: white;
    border: none;
    padding: 7px;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 5px;
  }
}
</style>
