<template>
  <q-drawer v-model="drawerOpen" show-if-above bordered>
    <aside class="sidebar">
      <img class="logo" src="/foxbel-music-2dc607d4.png" alt="logo">
      <q-list>
        <q-item-label class="q-px-none" header>
          <span class="header_list">Mi Librería</span>
        </q-item-label>
        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" :title="link.title"
          :link="link.link" />
      </q-list>
      <q-list class="playlist">
        <q-item-label class="q-px-none" header>
          <span class="header_list">PlayList</span>
        </q-item-label>
        <div v-if="playList.length !== 0">
          <q-item v-for="play in playList" :key="play.id">
            <q-item-section class="playlist_item">
              <q-item-label @click="tooglePlayListDialog(play)">
                <div>
                  <span>{{ play.name }}</span>
                </div>
              </q-item-label>
              <button @click="deletePlayList(play.id)" class="delete_btn">X</button>
            </q-item-section>
          </q-item>
        </div>
        <button class="playlist_btn" @click="toggleDialogOpen">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="icon icon-tabler icons-tabler-outline icon-tabler-plus">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 5l0 14" />
            <path d="M5 12l14 0" />
          </svg>
          Crear PlayList
        </button>
      </q-list>
    </aside>
    <CreatePlayListDialog :isOpen="dialogOpen" :toggleDialogOpen="toggleDialogOpen" />
    <DialogComponente :isOpen="playListOpenDialog" :toggleDialogOpen="tooglePlayListDialog">
      <template>
        <div class="dialog flex column">
          <p class="subtitle text-h6">{{ playListSelected.name }}</p>
          <article v-for="song in playListSelected.songs" :key="song.id" class="flex">
            <img :src="song.cover" style="width: 50px; margin-right: 10px; margin-bottom: 5px;" alt="">
            <div>
              <p>{{ song.title }}</p>
              <p>{{ song.singer }}</p>
            </div>
          </article>
        </div>
      </template>
    </DialogComponente>
  </q-drawer>
</template>
<script>
import EssentialLink from 'components/EssentialLink.vue'
import CreatePlayListDialog from './CreatePlayListDialog.vue'
import DialogComponente from './DialogComponente.vue'

const linksData = [
  {
    title: 'Inicio',
    link: '/'
  },
  {
    title: 'Pop Musicoll',
    link: '/pop'
  },
  {
    title: 'Electronic Musicoll',
    link: '/electronic'
  }
]

export default {
  name: 'MainLayout',
  props: {
    leftDrawerOpen: {
      type: Boolean,
      default: false
    }
  },
  components: {
    EssentialLink,
    CreatePlayListDialog,
    DialogComponente
  },
  data () {
    return {
      linksList: linksData,
      drawerOpen: this.leftDrawerOpen,
      dialogOpen: false,
      playListOpenDialog: false,
      namePLayList: '',
      playListSelected: {
        id: '',
        name: '',
        songs: []
      }
    }
  },
  computed: {
    playList: {
      get () {
        return this.$store.state.music.playList
      }
    }
  },
  methods: {
    toggleDialogOpen () {
      this.dialogOpen = !this.dialogOpen
    },
    tooglePlayListDialog (play) {
      this.playListOpenDialog = !this.playListOpenDialog
      this.playListSelected = play
    },
    addPlayList () {
      if (this.namePLayList.trim() !== '') {
        this.$store.commit('music/setPlayList', { id: crypto.randomUUID(), name: this.namePLayList, songs: [] })
        this.dialogOpen = false
        this.namePLayList = ''
      }
    },
    deletePlayList (id) {
      this.$store.commit('music/deletePlayList', id)
    }
  },
  watch: {
    leftDrawerOpen (newVal) {
      this.drawerOpen = newVal
    }
  }
}
</script>
<style scoped lang="scss">
@import '../css/quasar.variables.scss';

.sidebar {
  background-color: $dark-red;
  color: white;
  width: 100%;
  height: 100%;
  padding: 35px;

  .logo {
    width: 100%;
    margin-top: 10px;
  }

  .header_list {
    color: white;
    font-size: 25px;
    font-weight: 600;
    padding: 0;

    ._item {
      color: red;
      font-size: 20px;
      font-weight: 600;
    }
  }

  .playlist {

    &_item {
      display: flex;
      flex-direction: row !important;
      justify-content: space-between;
      align-items: center;

      button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        color: $red_principal;
        font-size: 20px;
      }
    }

    &_btn {
      width: 100%;
      background-color: transparent;
      color: $red_principal;
      font-size: 17px;
      font-weight: 500;
      padding: 10px;
      border-radius: 15px;
      border: none;
      display: flex;
      gap: 10px;
      cursor: pointer;

      &:hover {
        background-color: #eb575769;
      }
    }
  }
}
.subtitle {
  color: $red-principal;
}
</style>
