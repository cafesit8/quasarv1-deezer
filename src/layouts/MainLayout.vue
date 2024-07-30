<template>
  <q-layout view="lHh Lpr lFf">
    <HeaderComponent :toggleLeftDrawer="toggleLeftDrawer" />
    <DrawerComponent :leftDrawerOpen="leftDrawerOpen" />
    <q-page-container style="padding-bottom: 150px;">
      <router-view />
    </q-page-container>
    <FooterComponent />
  </q-layout>
</template>

<script>
import FooterComponent from 'components/FooterComponent.vue'
import DrawerComponent from 'src/components/DrawerComponent.vue'
import HeaderComponent from 'src/components/HeaderComponent.vue'

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
    title: 'Electronic',
    link: '/electronic'
  }
]

export default {
  name: 'MainLayout',
  components: {
    FooterComponent,
    HeaderComponent,
    DrawerComponent
  },
  data () {
    return {
      leftDrawerOpen: false,
      linksList: linksData
    }
  },
  methods: {
    toggleLeftDrawer () {
      this.leftDrawerOpen = !this.leftDrawerOpen
    }
  }
}
</script>
