<template>
  <q-page class="q-px-md" style="min-height: 0px">
    <PlayListSection />
  </q-page>
</template>

<script>
import PlayListSection from 'src/section/ElectronicPage/PlayListSection.vue'

export default {
  name: 'PopPage',
  components: {
    PlayListSection
  }
}
</script>
