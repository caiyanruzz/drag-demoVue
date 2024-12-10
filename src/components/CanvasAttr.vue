<template>
  <div v-if="curComponent" class="canvas-attr">
    <moniliang v-if="curComponent.label == '模拟量模块'"></moniliang>
  </div>
</template>

<script>
import moniliang from './moniliang.vue'

export default {
  name: '',
  components: {
    moniliang,
  },
  data() {
    return {}
  },
  computed: {
    curComponent() {
      return this.$store.state.curComponent
    },
  },

  methods: {},
}
</script>
<style lang="scss" scoped>
.canvas-attr {
  height: 100%;
}
</style>
