<template>
  <section class="section-album">
    <h3><span>{{ data && (data.artist ? 'Album' : 'Playlist') }}</span> - {{ data && (data.artist ? data.artist.name : data.creator.name) }}</h3>
    <div class="container">
      <CardMusic v-for="album in data && (data.tracks.data)" :key="album.id" :album="album" />
    </div>
  </section>
</template>
<script>
import CardMusic from 'src/components/CardMusic.vue'
import { axiosApi } from 'src/config'

export default {
  name: 'ListCardMusic',
  props: {
    url: {
      type: String
    }
  },
  components: {
    CardMusic
  },
  data () {
    return {
      data: null
    }
  },
  mounted: async function () {
    const response = await axiosApi(this.url)
    this.data = response.data
  }
}
</script>

<style scoped lang="scss">
@import 'src/css/quasar.variables.scss';

.loading_section {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
}

.section-album {
  // width: 100%;
  max-width: 900px;
  margin: 0 auto;
  // padding-bottom: 100px;

  h3 {
    color: $light-red;
    font-size: 20px;
    font-weight: 500;
    line-height: normal;
  }

  .container {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 20px;
  }
}
</style>
