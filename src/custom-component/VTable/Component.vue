<template>
  <table class="v-table">
    <tbody>
      <tr
        v-for="(item, index) in propValue.data"
        :key="index"
        :class="{
          stripe: propValue.stripe && index % 2,
          bold: propValue.thBold && index === 0,
        }"
      >
        <td v-for="(e, i) in item" :key="i" :style="getStyle(e.style)">{{ e.label }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import request from '@/utils/request'
import OnEvent from '../common/OnEvent'
import { getStyle } from '@/utils/style'

export default {
  extends: OnEvent,
  props: {
    propValue: {
      type: Object,
      default: () => {},
    },
    request: {
      type: Object,
      default: () => {},
    },
    element: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      cancelRequest: null,
    }
  },
  created() {
    if (this.request) {
      this.cancelRequest = request(this.request, this.propValue, 'data')
    }
  },
  beforeDestroy() {
    this.request && this.cancelRequest()
  },
  methods: {
    getStyle,
  },
}
</script>

<style lang="scss" scoped>
.v-table {
  border-collapse: collapse;
  table-layout: fixed;
  word-break: break-all;
  word-wrap: break-word;
  box-sizing: border-box;
  width: 100%;

  td {
    border: 1px solid #ebeef5;
  }
  tr td:nth-child(2) {
    border-right: 1px solid #ebeef5;
    border-left: 1px solid #ebeef5;
  }
  .bold {
    font-weight: bold;
  }

  .stripe {
    background-color: #fafafa;
  }
}
.table1-cell {
  display: table-cell;
  vertical-align: middle;
}
</style>
