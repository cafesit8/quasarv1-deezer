<template>
  <ListCardMusic url="/playlist/13"/>
</template>
<script>
import { defineComponent } from 'vue'
import ListCardMusic from 'src/components/ListCardMusic.vue'

export default defineComponent({
  name: 'PlayLisSection',
  components: {
    ListCardMusic
  }
})
</script>
