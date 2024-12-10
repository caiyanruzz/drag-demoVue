<template>
  <div class="moniliang_container" @mousedown="setInitial(curComponent.style)">
    <div class="title">{{ curComponent.label }}</div>
    <div class="mkContainer">
      <!-- 固定的模块设置 -->
      <div v-for="(item, index) in mainContent" :key="index" class="content">
        <div class="item">
          <div class="item_icon"></div>
          <div class="item_title">{{ item.title }}</div>
        </div>
        <div class="itemcontent">
          <el-form label-position="left" label-width="80px">
            <el-form-item v-for="({ key, label }, index) in item.styleData" :key="index">
              <span slot="label" class="item_label">{{ label }}</span>
              <el-color-picker
                v-if="isIncludesColor(key)"
                v-model="curComponent.style[key]"
                show-alpha
                size="mini"
              ></el-color-picker>
              <el-select v-else-if="selectKey.includes(key)" v-model="curComponent.style[key]" size="mini">
                <el-option
                  v-for="item in optionMap[key]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-input
                v-else-if="key == 'fontSize'"
                v-model.number="curComponent.style[key]"
                type="number"
                size="mini"
                @input="setFontSize()"
              />
              <el-input
                v-else-if="key == 'fontFamily' || key == 'synchronization'"
                v-model="curComponent.style[key]"
                size="mini"
              />
              <el-input
                v-else-if="key == 'width'"
                v-model.number="curComponent.style[key]"
                size="mini"
                type="number"
                @input="setWidth(curComponent.style[key], 'mokuai')"
              />
              <el-input v-else v-model.number="curComponent.style[key]" size="mini" type="number" />
            </el-form-item>
          </el-form>
        </div>
      </div>
      <!-- 可变的模块设置 -->
      <div v-for="(item, index1) in variableContent" :key="index1" class="content">
        <div class="item">
          <div class="item_icon"></div>
          <div class="item_title">{{ item.title }}</div>
        </div>
        <div class="itemcontent">
          <el-form label-position="left" label-width="120px">
            <el-form-item v-for="({ key, label }, index) in item.styleData" :key="index">
              <span slot="label" class="item_label">{{ label }}</span>

              <el-color-picker
                v-if="isIncludesColor(key)"
                v-model="curComponent.propValue.data[0][index1].style[key]"
                show-alpha
                size="mini"
              ></el-color-picker>
              <el-select
                v-else-if="selectKey.includes(key)"
                v-model="curComponent.propValue.data[0][index1].style[key]"
                size="mini"
              >
                <el-option
                  v-for="item in optionMap[key]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-input
                v-else-if="key == 'fontSize'"
                v-model.number="curComponent.propValue.data[0][index1].style[key]"
                type="number"
                size="mini"
                @input="setFontSize(curComponent.propValue.data[0])"
              />
              <el-input
                v-else-if="key == 'fontFamily' || key == 'synchronization'"
                v-model="curComponent.propValue.data[0][index1].style[key]"
                size="mini"
              />
              <el-input
                v-else-if="key == 'width'"
                v-model.number="curComponent.propValue.data[0][index1].style[key]"
                size="mini"
                type="number"
                @input="setWidth(curComponent.propValue.data[0][index1].style[key], 'bian', index1)"
              />
              <el-input v-else-if="key == 'label'" v-model="curComponent.propValue.data[0][index1].label" size="mini">
                <i slot="suffix" class="el-icon-more" @click="handleIconClick"> </i>
              </el-input>
              <el-input
                v-else
                v-model.number="curComponent.propValue.data[0][index1].style[key]"
                size="mini"
                type="number"
              />
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <!-- 弹窗 -->
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
import {
  styleData,
  textAlignOptions,
  borderStyleOptions,
  verticalAlignOptions,
  selectKey,
  optionMap,
} from '@/utils/moniliang'
import { mapState } from 'vuex'

export default {
  name: 'Moniliang',
  data() {
    return {
      optionMap,
      styleData,
      textAlignOptions,
      borderStyleOptions,
      verticalAlignOptions,
      selectKey,
      showAttributeComponent: false,
      canEdit: false,
      mainContent: [
        {
          title: '模块设置',
          styleData: [
            { key: 'fontFamily', label: '字体' },
            { key: 'fontSize', label: '字号' },
            { key: 'color', label: '颜色' },
            // { key: 'backgroundColor', label: '颜色' },
            { key: 'width', label: '宽' },
            { key: 'height', label: '高' },
          ],
        },
      ],
      variableContent: [
        {
          title: '变量名',
          styleData: [
            { key: 'width', label: '宽' },
            { key: 'fontFamily', label: '字体' },
            { key: 'fontSize', label: '字号' },
            { key: 'textAlign', label: '对齐' },
            { key: 'color', label: '颜色' },
            { key: 'label', label: '当前值变量' },
          ],
        },
        {
          title: '数据显示',
          styleData: [
            { key: 'width', label: '宽' },
            { key: 'fontFamily', label: '字体' },
            { key: 'fontSize', label: '字号' },
            { key: 'textAlign', label: '对齐' },
            { key: 'color', label: '颜色' },
            { key: 'label', label: '当前值变量' },
          ],
        },
        {
          title: '单位',
          styleData: [
            { key: 'width', label: '宽' },
            { key: 'fontFamily', label: '字体' },
            { key: 'fontSize', label: '字号' },
            { key: 'textAlign', label: '对齐' },
            { key: 'color', label: '颜色' },
            { key: 'label', label: '当前值变量' },
          ],
        },
      ],
    }
  },
  computed: {
    ...mapState(['menuTop', 'menuLeft', 'menuShow', 'curComponent']),
    tableData() {
      return this.$store.state.curComponent.propValue.dataRow
    },
    styleKeys() {
      if (this.curComponent) {
        const curComponentStyleKeys = Object.keys(this.curComponent.style)
        return this.styleData.filter((item) => curComponentStyleKeys.includes(item.key))
      }
      return []
    },
    curComponent() {
      return this.$store.state.curComponent
    },
  },
  methods: {
    handleIconClick() {
      //   this.$store.commit('showAttributeComponent')
      console.log(this.$store.state.curComponent.propValue.dataRow, '模拟量模块', 'showAttributeComponent')
      let label = this.$store.state.curComponent.label
      if (label === '模拟量模块') {
        this.showAttributeComponent = true
      }
    },
    queding() {},
    setInitial(style) {
      //   console.log('curComponent is null', this.styleKeys)
      this.initialStyle = JSON.parse(JSON.stringify(style))
    },
    setWidth(width, type, index) {
      console.log('width', width, 'type', type, 'index', index)
      if (type === 'mokuai') {
        this.curComponent.style.width = width
        let proportion = (width / 3).toFixed(2)
        this.curComponent.propValue.data[0][0].style.width = proportion
        this.curComponent.propValue.data[0][1].style.width = proportion
        this.curComponent.propValue.data[0][2].style.width = proportion
      } else {
        this.curComponent.propValue.data[0][index].style.width = width
        let proportion1 =
          this.curComponent.propValue.data[0][0].style.width +
          this.curComponent.propValue.data[0][1].style.width +
          this.curComponent.propValue.data[0][2].style.width
        this.curComponent.style.width = proportion1
      }
    },
    setFontSize() {
      //   const proportion = this.curComponent.style.fontSize / this.initialStyle.fontSize
      //   const updatedStyle = {
      //     width: (proportion * this.initialStyle.width).toFixed(4),
      //     height: (proportion * this.initialStyle.height).toFixed(4),
      //     padding: (proportion * this.initialStyle.padding).toFixed(4),
      //   }
      //   this.curComponent.style = { ...this.curComponent.style, ...updatedStyle }
      this.$store.commit('setShapeStyle', this.curComponent.style)
      this.$store.commit('recordSnapshot')
    },
    isIncludesColor(str) {
      return str.toLowerCase().includes('color')
    },
    onDblclick() {
      this.canEdit = true
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
    onClick(row, col) {
      console.log('点击', row, col)
      this.curTd = `${row},${col}`
      this.preCurTd = this.curTd
    },
  },
}
</script>
<style lang="scss" scoped>
.moniliang_container {
  padding: 10px;
  width: 100%;
  height: 100%;

  .title {
    color: #000;
    font-size: 21px;
  }
  .item {
    color: #333;
    font-size: 15px;
  }
}
.mkContainer {
  height: calc(100% - 95px);
  overflow: auto;
}
.item_title {
  margin-left: 10px;
}
.itemcontent {
  padding: 10px;
}
.item_label {
  padding: 10px;
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
</style>
<style>
.itemcontent .el-form-item__label {
  background: #fff;
  border-right: 1px solid #ccc;
  padding: 5px;
}
.itemcontent .el-form-item {
  margin-bottom: 0 !important;
  border: 1px solid #ccc;
}
.itemcontent .el-input__inner {
  border: none;
}
.itemcontent .el-form-item__content {
  background: #fff;
}
.itemcontent .el-form-item--small .el-form-item__content,
.el-form-item--small .el-form-item__label {
  line-height: 28px;
}
/* .home main .right .el-form-item__label {
  padding: 5px;
} */
</style>
