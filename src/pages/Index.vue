<template>
  <q-page class="q-px-md" style="min-height: 0px">
    <AlbumSection />
  </q-page>
</template>

<script>
import AlbumSection from 'src/section/indexPage/AlbumSection.vue'

export default {
  name: 'PageIndex',
  components: {
    AlbumSection
  }
}
</script>
