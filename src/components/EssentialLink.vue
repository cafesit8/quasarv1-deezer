<template>
  <q-item
    clickable
    @click="handleClick"
  >

    <q-item-section>
      <q-item-label>
        <RouterLink :to="link" exactActiveClass="active" class="item">
          {{ title }}
        </RouterLink>
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true
    },
    link: {
      type: String,
      default: '#'
    }
  },
  methods: {
    handleClick () {
      this.$router.push(this.link)
    }
  }
}
</script>

<style scoped lang="scss">
@import '../css/quasar.variables.scss';

.item {
  font-size: 15px;
  font-weight: 300;
}

.active {
  color: $red_principal !important;
  font-weight: 600;
  font-size: 16px;
}

.item {
  color: white;
  text-decoration: none;
  font-size: 16px;
}

</style>
