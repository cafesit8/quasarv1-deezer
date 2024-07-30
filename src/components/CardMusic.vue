<template>
  <article class="card">
    <q-btn-dropdown @click="toggleDialogOpen" color="" dropdown-icon="more_vert" unelevated>
      <div v-if="playList.length !== 0">
        <q-list>
          <q-item v-for="play in playList" :key="play.id" @click="addSongToThePlayList(play)" clickable v-close-popup>
            <q-item-section>
              <q-item-label>{{ play.name }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
      <CreatePlayListDialog v-else :isOpen="dialogOpen" :toggleDialogOpen="toggleDialogOpen" />
    </q-btn-dropdown>
    <picture @click="tooglePlay(album)">
      <img :src="album.album.cover_medium" alt="">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"
        class="icon icon-tabler icons-tabler-filled icon-tabler-player-play">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M6 4v16a1 1 0 0 0 1.524 .852l13 -8a1 1 0 0 0 0 -1.704l-13 -8a1 1 0 0 0 -1.524 .852z" />
      </svg>
    </picture>
    <div>
      <p>{{ album.title }}</p>
      <small v-if="album.artist.name">{{ album.artist.name }}</small>
    </div>
  </article>
</template>
<script>
import { defineComponent } from 'vue'
import CreatePlayListDialog from './CreatePlayListDialog.vue'

export default defineComponent({
  name: 'CardMusic',
  props: {
    album: {
      type: Object
    }
  },
  components: {
    CreatePlayListDialog
  },
  data () {
    return {
      dialogOpen: false
    }
  },
  computed: {
    isPlaying: {
      get () {
        return this.$store.state.music.isPlaying
      }
    },
    songInfo: {
      get () {
        return this.$store.state.music.songInfo
      }
    },
    playList: {
      get () {
        return this.$store.state.music.playList
      }
    }
  },
  methods: {
    tooglePlay (payload) {
      const { title, artist: { name: singer }, preview: song, album: { cover_medium: cover }, id, duration } = payload
      this.$store.commit('music/playSong') // Podemos llamar directamente a la mutacion sin necesidad de usar el isPlaying set del computed
      this.$store.commit('music/setSongInfo', { title, singer, song, cover, id, duration })
    },
    addSongToThePlayList (play) {
      const { title, artist: { name: singer }, preview: song, album: { cover_medium: cover }, id, duration } = this.album
      const item = { title, singer, song, cover, id, duration }
      const payload = { item, play }
      this.$store.commit('music/addSongToThePlayList', payload)
    },
    toggleDialogOpen () {
      if (this.playList.length === 0) {
        this.dialogOpen = !this.dialogOpen
      }
    }
  }
})
</script>

<style scoped lang="scss">
@import 'src/css/quasar.variables.scss';

.card {
  aspect-ratio: 1 / 1;
  display: flex;
  flex-direction: column;
  transition: .3s;
  cursor: pointer;
  position: relative;

  &:hover {
    transform: scale(1.1);
    transition: .3s;
  }

  button {
    position: absolute;
    top: 5px;
    right: 5px;
    background-color: transparent;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    z-index: 50;
    cursor: pointer;

    .icon {
      color: white;
    }
  }

  picture {
    position: relative;

    img {
      width: 100%;
    }

    .icon {
      position: absolute;
      inset: 0;
      margin: auto;
      color: white;
    }
  }

  p {
    color: $black-100;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  small {
    color: $black-70;
  }
}
</style>
