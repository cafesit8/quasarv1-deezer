<template>
  <q-footer none height-hint="100" style="position: absolute; bottom: 0; left: 0;">
    <q-toolbar class="flex column q-px-none">
      <footer>
        <div class="info">
          <div class="info_song">
            <picture>
              <img :src="songInfo ? songInfo.cover : '/default_cover.png'" alt="">
            </picture>
            <div class="info_song_details">
              <p>{{ songInfo ? songInfo.title : 'Title' }}</p>
              <small>{{ songInfo ? songInfo.singer : 'Singer' }}</small>
            </div>
          </div>
          <div class="controls">
            <div>
              <button @click="tooglePlay" v-if="isPlaying">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"
                  class="icon icon-tabler icons-tabler-filled icon-tabler-player-pause">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M9 4h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2z" />
                  <path d="M17 4h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2z" />
                </svg>
              </button>
              <button @click="tooglePlay" v-else>
                <svg width="25" height="25" viewBox="0 0 24 24" fill="currentColor"
                  class="icon icon-tabler icons-tabler-filled icon-tabler-player-play">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M6 4v16a1 1 0 0 0 1.524 .852l13 -8a1 1 0 0 0 0 -1.704l-13 -8a1 1 0 0 0 -1.524 .852z" />
                </svg>
              </button>
            </div>
            <div class="slider">
              <span>{{ formatTime(currentTime) }}</span>
              <!-- <input @input="handleChangeSong" :value="currentTime" type="range" min="0" step="0.5" :max="30"> -->
              <InputRange :value="currentTime" @updateRange="handleChangeSong($event)" :min="0" :max="30"/>
              <span>0:30</span>
              <audio ref="audio"></audio>
            </div>
          </div>
          <div class="info_volume">
            <!-- <input @input="handleChangeVolume" type="range" min="0" value="0.5" step="0.01" max="1"> -->
            <InputRange :value="1" @updateRange="handleChangeVolume" :min="0" :max="1" />
            <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round"
              class="icon icon-tabler icons-tabler-outline icon-tabler-volume">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M15 8a5 5 0 0 1 0 8" />
              <path d="M17.7 5a9 9 0 0 1 0 14" />
              <path d="M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a.8 .8 0 0 1 1.5 .5v14a.8 .8 0 0 1 -1.5 .5l-3.5 -4.5" />
            </svg>
          </div>
        </div>
        <audio ref="audio" @timeupdate="updateCurrentTime" @ended="handleAudioEnded"></audio>
      </footer>
    </q-toolbar>
  </q-footer>
</template>
<script>
import InputRange from 'components/inputs/InputRange'
import { formatTime } from 'src/helpers/convertTime'

export default {
  name: 'FooterComponent',
  components: {
    InputRange
  },
  data () {
    return {
      currentTime: 0,
      formatTime
    }
  },
  computed: {
    songInfo: {
      get () {
        return this.$store.state.music.songInfo
      }
    },
    isPlaying: {
      get () {
        return this.$store.state.music.isPlaying
      }
    }
  },
  methods: {
    tooglePlay () {
      this.$store.commit('music/isPlayingToggle')
    },
    loadSong () {
      const audio = this.$refs.audio
      audio.src = this.songInfo.song
      audio.load()
      this.playSong()
    },
    playSong () {
      const audio = this.$refs.audio
      audio.play()
    },
    pauseSong () {
      const audio = this.$refs.audio
      audio.pause()
    },
    handleChangeSong (e) {
      const audio = this.$refs.audio
      audio.currentTime = e
      this.currentTime = e
    },
    updateCurrentTime () {
      const audio = this.$refs.audio
      this.currentTime = audio.currentTime
    },
    handleAudioEnded () {
      this.$store.commit('music/isPlayingToggle')
    },
    handleChangeVolume (e) {
      const audio = this.$refs.audio
      audio.volume = e
    }
  },
  watch: {
    songInfo (newVal, oldVal) {
      if (oldVal === null) {
        this.loadSong()
      } else {
        if (newVal.id !== oldVal.id) {
          this.loadSong()
        }
      }
    },
    isPlaying () {
      if (this.isPlaying) {
        this.playSong()
      } else {
        this.pauseSong()
      }
    }
  }
}
</script>
<style scoped lang="scss">
footer {
  width: 100%;
  height: 100px;
  background-color: $light-red;
  color: white;
  position: sticky;
  bottom: 0;
  left: 0;
  display: flex;
  z-index: 9999;
  overflow: hidden;

  .info {
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 15px;
    align-items: center;

    &_song {
      display: flex;
      align-items: center;
      gap: 15px;

      picture {
        display: block;
        width: 100px;
        height: 100px;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      &_details {
        display: flex;
        flex-direction: column;

        p {
          font-size: 15px;
          font-weight: 500;
          margin: 0;
        }
      }
    }

    .controls {
      width: 400px;
      display: flex;
      flex-direction: column;
      align-items: center;

      button {
        background-color: rgba(255, 255, 255, 0.35);
        border: none;
        outline: none;
        cursor: pointer;
        display: grid;
        place-content: center;
        border-radius: 100%;
        width: 40px;
        height: 40px;

        .icon {
          color: white;
        }
      }

      .slider {
        width: 100%;
        display: flex;
        gap: 5px;

        input {
          width: 100%;
        }
      }
    }

    &_volume {
      width: 180px;
      display: flex;
      gap: 10px;
    }
  }
}
</style>
