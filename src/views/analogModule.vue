<template>
  <div ref="container" class="bg">
    <div class="canvas-container">
      <div
        class="canvas"
        :style="{
          ...getCanvasStyle(canvasStyleData),
          width: changeStyleWithScale(canvasStyleData.width) + 'px',
          height: changeStyleWithScale(canvasStyleData.height) + 'px',
        }"
      >
        <table>
          <tbody>
            <tr v-for="(item, index) in 3">
              <td>12313</td>
              <td>123</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { getStyle, getCanvasStyle } from '@/utils/style'
import { mapState } from 'vuex'
import { changeStyleWithScale } from '@/utils/translate'
import { toPng } from 'html-to-image'
import { deepCopy } from '@/utils/utils'

export default {
  data() {
    return {
      copyData: [],
    }
  },
  computed: mapState(['componentData', 'canvasStyleData']),
  created() {
    console.log(this.$store, '111')

    this.$set(this, 'copyData', deepCopy(this.componentData))
  },
  methods: {
    getStyle,
    getCanvasStyle,
    changeStyleWithScale,

    close() {
      this.$emit('close')
    },

    htmlToImage() {
      toPng(this.$refs.container.querySelector('.canvas'))
        .then((dataUrl) => {
          const a = document.createElement('a')
          a.setAttribute('download', 'screenshot')
          a.href = dataUrl
          a.click()
        })
        .catch((error) => {
          console.error('oops, something went wrong!', error)
        })
        .finally(this.close)
    },
  },
}
</script>

<style lang="scss" scoped>
.bg {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: fixed;
  background: rgb(0, 0, 0, 0.5);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
  padding: 20px;

  .canvas-container {
    width: calc(100% - 40px);
    height: calc(100% - 120px);
    overflow: auto;

    .canvas {
      background: #fff;
      position: relative;
      margin: auto;
    }
  }

  .close {
    position: absolute;
    right: 20px;
    top: 20px;
  }
}
</style>
