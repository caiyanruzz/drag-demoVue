<template>
  <div v-show="menuShow" class="contextmenu" :style="{ top: menuTop + 'px', left: menuLeft + 'px' }">
    <ul @mouseup="handleMouseUp">
      <template v-if="curComponent">
        <template v-if="!curComponent.isLock">
          <!-- <li @click="copy">复制</li>
          <li @click="paste">粘贴</li>
          <li @click="cut">剪切</li>
          <li @click="deleteComponent">删除</li>
          <li @click="lock">锁定</li>
          <li @click="topComponent">置顶</li>
          <li @click="bottomComponent">置底</li>
          <li @click="upComponent">上移</li>
          <li @click="downComponent">下移</li> -->
          <!-- <li @click="attributeComponent">属性</li> -->
        </template>
        <li v-else @click="unlock">解锁</li>
      </template>
      <li v-else @click="paste">粘贴</li>
    </ul>
    <el-dialog
      v-if="showAttributeComponent"
      v-dialogDrag
      title="设置限值"
      append-to-body
      :visible.sync="showAttributeComponent"
      width="45%"
      :modal-append-to-body="false"
    >
      <div>
        <!-- <el-button size="small" @click="addRow">添加新行</el-button> -->
        <!-- <el-button size="small" @click="addCol">添加新列</el-button> -->
        <!-- <el-button size="small" @click="deleteRow">删除行</el-button> -->
        <!-- <el-button size="small" @click="deleteCol">删除列</el-button> -->
      </div>
      <table class="mnlmk-table" @dblclick="onDblclick">
        <tbody>
          <!-- :style="{ backgroundColor: item.color }"  -->
          <tr v-for="(item, row) in tableData" :key="row" style="text-align: left">
            <td
              v-for="(e, col) in item"
              :key="col"
              :class="{ selected: curTd === row + ',' + col }"
              @click="onClick(row, col)"
            >
              <!-- {{ tableData[row][col].limit }} -->
              <el-checkbox v-if="e.prop == 'limit'" v-model="e.limit">{{ e.label }}</el-checkbox>
              <el-input v-if="e.prop == 'variable'" v-model="e.variable" size="mini"></el-input>
              <el-input v-if="e.prop == 'name'" v-model="e.name" size="mini"></el-input>
              <el-color-picker
                v-if="e.prop == 'color'"
                v-model="e.color"
                size="mini"
                show-alpha
                @change="(value) => updateRowColor(row, col, value)"
              ></el-color-picker>
              <el-checkbox
                v-if="e.prop == 'twinkle'"
                v-model="e.twinkle"
                @change="(value) => toggleTwinkle(row, col, value)"
                >{{ e.label }}</el-checkbox
              >
            </td>
          </tr>
        </tbody>
      </table>
      <span slot="footer" class="dialog-footer" style="display: flex; justify-content: center">
        <el-button size="small" type="primary" @click.stop.prevent="showAttributeComponent = false">确 定</el-button>
        <el-button size="small" @click.stop.prevent="showAttributeComponent = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      copyData: null,
      showAttributeComponent: false,
      curProperty: '',
      curTd: '',
      canEdit: false,
      preCurTd: '', // 失焦时 curTd 值为空，这时删除会读不到值，因此用这个变量来代替，用于删除行列
    }
  },

  computed: {
    ...mapState(['menuTop', 'menuLeft', 'menuShow', 'curComponent']),
    tableData() {
      return this.$store.state.curComponent.propValue.dataRow
    },
  },
  methods: {
    attributeComponent() {
      //   this.$store.commit('showAttributeComponent')
      console.log(this.$store.state.curComponent.propValue.dataRow, '模拟量模块', 'showAttributeComponent')
      let label = this.$store.state.curComponent.label
      if (label === '模拟量模块') {
        this.showAttributeComponent = true
      }
    },
    updateRowColor(row, col, color) {
      // 更新对应行的颜色属性
      this.tableData[row].color = color
      console.log('触发闪烁动画', this.tableData[row][4].twinkle)
      this.tableData[row].twinkle = this.tableData[row][4].twinkle
      // 如果 twinkle 是 true，强制 Vue 重新渲染以更新动画
      //   if (this.tableData[row].twinkle) {
      //     this.triggerTwinkle(row)
      //   }
    },
    toggleTwinkle(row, col, twinkle) {
      console.log(row, col, twinkle)
      //   const isTwinkling = twinkle
      //   this.tableData[row][4].twinkle = isTwinkling
      //   console.log('触发闪烁动画', isTwinkling, row)
      //   if (isTwinkling) {
      //     this.triggerTwinkle(row)
      //   } else {
      //     const color = this.tableData[row].color
      //     const style = document.createElement('style')
      //     style.innerHTML = `
      //     .twinkle-${row} {
      //       animation: none; /* 应用动态动画 */
      //     }
      //   `
      //     document.head.appendChild(style)
      //     // 设置显示的 twinkle 类，保证更新的动画
      //     document.querySelector(`tr:nth-child(${row + 1})`).classList.add(`twinkle-${row}`)
      //   }
    },
    triggerTwinkle(row) {
      // 这里可以使用动态生成的 CSS 样式来创建动态的闪烁动画
      const color = this.tableData[row].color
      //   const style = document.createElement('style')
      //   style.innerHTML = `
      //     @keyframes flash-${row} {
      //       0% {
      //         background-color: ${color}; /* 动态背景颜色 */
      //       }
      //       50% {
      //         background-color: rgba(${this.hexToRgb(color)}, 0.5); /* 半透明的同色 */
      //       }
      //       100% {
      //         background-color: ${color}; /* 动态背景颜色 */
      //       }
      //     }
      //     .twinkle-${row} {
      //       animation: flash-${row} 1s infinite alternate; /* 应用动态动画 */
      //     }
      //   `
      //   document.head.appendChild(style)

      //   // 设置显示的 twinkle 类，保证更新的动画
      //   document.querySelector(`tr:nth-child(${row + 1})`).classList.add(`twinkle-${row}`)
    },
    // 辅助函数，用于将 hex 颜色转为 rgb
    hexToRgb(hex) {
      let r = 0,
        g = 0,
        b = 0
      // 3位颜色格式
      if (hex.length === 4) {
        r = parseInt(hex[1] + hex[1], 16)
        g = parseInt(hex[2] + hex[2], 16)
        b = parseInt(hex[3] + hex[3], 16)
      }
      // 6位颜色格式
      else if (hex.length === 7) {
        r = parseInt(hex[1] + hex[2], 16)
        g = parseInt(hex[3] + hex[4], 16)
        b = parseInt(hex[5] + hex[6], 16)
      }
      return `${r}, ${g}, ${b}` // 返回 rgb 字符串
    },
    onDblclick() {
      this.canEdit = true
    },
    onClick(row, col) {
      console.log('点击', row, col)
      this.curTd = `${row},${col}`
      this.preCurTd = this.curTd
    },

    onBlur() {
      this.canEdit = false
      this.curTd = ''
    },
    addRow() {
      this.tableData.push(new Array(this.tableData[0]?.length || 5).fill('123 '))
    },
    addCol() {
      if (this.tableData.length) {
        this.tableData.forEach((item) => item.push(' '))
      } else {
        this.tableData.push([' '])
      }
    },
    deleteRow() {
      if (!this.preCurTd) {
        this.$message.warning('请先选择要删除的行')
        return
      }
      if (this.isFirstCharacterZero(this.preCurTd)) {
        this.$message.warning('当前为第一行，不能删除')
        return
      }
      const row = this.preCurTd.split(',')[0]
      this.tableData.splice(row, 1)
    },
    deleteCol() {
      if (!this.preCurTd) {
        this.$message.warning('请先选择要删除的列')
        return
      }

      const col = this.preCurTd.split(',')[1]
      this.tableData.forEach((item) => {
        item.splice(col, 1)
      })
    },
    isFirstCharacterZero(str) {
      // 检查字符串是否为空
      if (str.length === 0) {
        return false // 字符串为空，返回 false
      }

      // 检查第一个字符
      return str.charAt(0) === '0' // 或者 str[0] === '0'
    },

    lock() {
      this.$store.commit('lock')
    },

    unlock() {
      this.$store.commit('unlock')
    },

    // 点击菜单时不取消当前组件的选中状态
    handleMouseUp() {
      this.$store.commit('setClickComponentStatus', true)
    },

    cut() {
      this.$store.commit('cut')
    },

    copy() {
      this.$store.commit('copy')
    },

    paste() {
      this.$store.commit('paste', true)
      this.$store.commit('recordSnapshot')
    },

    deleteComponent() {
      this.$store.commit('deleteComponent')
      this.$store.commit('recordSnapshot')
    },

    upComponent() {
      this.$store.commit('upComponent')
      this.$store.commit('recordSnapshot')
    },

    downComponent() {
      this.$store.commit('downComponent')
      this.$store.commit('recordSnapshot')
    },

    topComponent() {
      this.$store.commit('topComponent')
      this.$store.commit('recordSnapshot')
    },

    bottomComponent() {
      this.$store.commit('bottomComponent')
      this.$store.commit('recordSnapshot')
    },
  },
}
</script>

<style lang="scss" scoped>
.contextmenu {
  position: absolute;
  z-index: 1000;

  ul {
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    margin: 5px 0;
    padding: 6px 0;

    li {
      font-size: 14px;
      padding: 0 20px;
      position: relative;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #606266;
      height: 34px;
      line-height: 34px;
      box-sizing: border-box;
      cursor: pointer;

      &:hover {
        background-color: #f5f7fa;
      }
    }
  }
}
table {
  width: 100%;
  margin-top: 10px;
  border-collapse: collapse;
  word-break: break-all;
  word-wrap: break-word;
  text-align: center;
  font-size: 12px;

  td {
    border: 1px solid #ebeef5;
    height: 40px;
    min-width: 60px;
    max-width: 80px;
    padding: 10px;
  }
}
// .selected {
//   background: #ecf5ff;
//   color: #409eff;
// }
</style>
