<template>
  <div class="component-list" @dragstart="handleDragStart">
    <div class="title">模块组件</div>

    <div v-for="(item, index) in componentList" :key="index" class="list" draggable :data-index="index">
      <span v-if="item.icon.substr(0, 2) === 'el'" :class="item.icon"></span>
      <span v-else class="iconfont" :class="'icon-' + item.icon"></span>
      <span>{{ item.label }}</span>
    </div>
  </div>
</template>

<script>
import componentList from '@/custom-component/component-list'

export default {
  data() {
    return {
      componentList,
      defaultProps: {
        children: 'children',
        label: 'label',
      },
    }
  },
  methods: {
    handleDragStart(e) {
      e.dataTransfer.setData('index', e.target.dataset.index)
    },
  },
}
</script>

<style lang="scss" scoped>
.component-list {
  opacity: 1;
  height: 65%;
  padding: 8px;
  //   display: grid;
  position: relative;
  grid-gap: 10px 19px;
  grid-template-columns: repeat(auto-fill, 80px);
  grid-template-rows: repeat(auto-fill, 40px);
  transition: opacity 0.5s 0.5s;
  color: #000;
  font-size: 15px;

  .list {
    width: 100%;
    height: 30px;
    cursor: grab;
    text-align: left;
    padding: 2px 5px;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    &:active {
      cursor: grabbing;
    }

    .iconfont {
      margin-right: 4px;
      font-size: 20px;
    }

    .icon-wenben,
    .icon-biaoge {
      font-size: 15px;
    }

    .icon-tupian {
      font-size: 16px;
    }
  }
}
</style>
