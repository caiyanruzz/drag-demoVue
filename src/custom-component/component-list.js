import { color } from 'echarts'

// 公共样式
export const commonStyle = {
  rotate: 0,
  opacity: 1,
}

export const commonAttr = {
  animations: [],
  events: {},
  groupStyle: {}, // 当一个组件成为 Group 的子组件时使用
  isLock: false, // 是否锁定组件
  collapseName: 'style', // 编辑组件时记录当前使用的是哪个折叠面板，再次回来时恢复上次打开的折叠面板，优化用户体验
  linkage: {
    duration: 0, // 过渡持续时间
    data: [
      // 组件联动
      {
        id: '', // 联动的组件 id
        label: '', // 联动的组件名称
        event: '', // 监听事件
        style: [{ key: '', value: '' }], // 监听的事件触发时，需要改变的属性
      },
    ],
  },
}

// 编辑器左侧组件列表
const list = [
  {
    component: 'VTable',
    label: '模拟量模块',
    icon: 'biaoge',
    propValue: {
      data: [
        [
          {
            label: '变量名',
            style: {
              width: 200,
              height: 40,
              textAlign: 'center',
              fontSize: '',
              color: '',
              fontFamily: '宋体',
            },
          },
          {
            label: '数据显示',
            style: {
              width: 200,
              height: 40,
              textAlign: 'center',
              fontSize: '',
              color: '',
              fontFamily: '宋体',
            },
          },
          {
            label: '单位',
            style: {
              width: 100,
              height: 40,
              textAlign: 'center',
              fontSize: '',
              color: '',
              fontFamily: '宋体',
            },
          },
        ],
      ],
      dataRow: [
        [
          {
            label: '上上限',
            prop: 'limit',
            limit: true,
          },
          {
            label: '变量1',
            prop: 'variable',
            variable: '变量1',
          },
          {
            label: '数据显示',
            prop: 'name',
            name: '100',
          },
          {
            label: '颜色',
            prop: 'color',
            color: '',
          },
          {
            label: '闪烁',
            prop: 'twinkle',
            twinkle: true,
          },
        ],
        [
          {
            label: '上限',
            prop: 'limit',
            limit: false,
          },
          {
            label: '变量2',
            prop: 'variable',
            variable: '变量2',
          },
          {
            label: '数据显示',
            prop: 'name',
            name: '10',
          },
          {
            label: '颜色',
            prop: 'color',
            color: '',
          },
          {
            label: '闪烁',
            prop: 'twinkle',
            twinkle: false,
          },
        ],
        [
          {
            label: '下限',
            prop: 'limit',
            limit: false,
          },
          {
            label: '变量3',
            prop: 'variable',
            variable: '变量3',
          },
          {
            label: '数据显示',
            prop: 'name',
            name: '0',
          },
          {
            label: '颜色',
            prop: 'color',
            color: '',
          },
          {
            label: '闪烁',
            prop: 'twinkle',
            twinkle: false,
          },
        ],
        [
          {
            label: '下下限',
            prop: 'limit',
            limit: false,
          },
          {
            label: '变量4',
            prop: 'variable',
            variable: '变量4',
          },
          {
            label: '数据显示',
            prop: 'name',
            name: '-100',
          },
          {
            label: '颜色',
            prop: 'color',
            color: '',
          },
          {
            label: '闪烁',
            prop: 'twinkle',
            twinkle: false,
          },
        ],
      ],
      //   stripe: true,
      //   thBold: true,
    },
    request: {
      method: 'GET',
      data: [],
      url: '',
      series: false,
      time: 1000,
      paramType: '', // string object array
      requestCount: 0, // 请求次数限制，0 为无限
    },
    style: {
      fontFamily: '宋体',
      width: 500,
      height: 40,
      fontSize: 16,
      fontWeight: 400,
      textAlign: 'center',
      color: '',
      backgroundColor: 'rgba(255, 255, 255, 1)',
    },
  },
  //   {
  //     component: 'VTable',
  //     label: '表格1',
  //     icon: 'biaoge',
  //     propValue: {
  //       data: [
  //         ['表头2', '表头2', '表头3'],
  //         ['内容2', '内容2', '内容3'],
  //       ],
  //       stripe: true,
  //       thBold: true,
  //     },
  //     request: {
  //       method: 'GET',
  //       data: [],
  //       url: '',
  //       series: false,
  //       time: 1000,
  //       paramType: '', // string object array
  //       requestCount: 0, // 请求次数限制，0 为无限
  //     },
  //     style: {
  //       width: 600,
  //       height: 200,
  //       fontSize: 14,
  //       fontWeight: 400,
  //       textAlign: 'center',
  //       color: '',
  //       backgroundColor: 'rgba(255, 255, 255, 1)',
  //     },
  //   },
]

for (let i = 0, len = list.length; i < len; i++) {
  const item = list[i]
  item.style = { ...commonStyle, ...item.style }
  list[i] = { ...commonAttr, ...item }
}

export default list
