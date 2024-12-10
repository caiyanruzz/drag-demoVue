export const styleData = [
  { key: 'fontFamily', label: '字体' },
  { key: 'fontSize', label: '字号' },

  { key: 'width', label: '宽' },
  { key: 'height', label: '高' },
  { key: 'synchronization', label: '同步' },
]

export const fontFamilyOptions = [
  {
    title: '模块设置',
    styleData: [
      { key: 'fontFamily', label: '字体' },
      { key: 'fontSize', label: '字号' },
      { key: 'width', label: '宽' },
      { key: 'height', label: '高' },
      { key: 'synchronization', label: '同步' },
    ],
  },
]
export const textAlignOptions = [
  {
    label: '左对齐',
    value: 'left',
  },
  {
    label: '居中',
    value: 'center',
  },
  {
    label: '右对齐',
    value: 'right',
  },
]

export const borderStyleOptions = [
  {
    label: '实线',
    value: 'solid',
  },
  {
    label: '虚线',
    value: 'dashed',
  },
]

export const verticalAlignOptions = [
  {
    label: '上对齐',
    value: 'top',
  },
  {
    label: '居中对齐',
    value: 'middle',
  },
  {
    label: '下对齐',
    value: 'bottom',
  },
]

export const selectKey = ['textAlign', 'borderStyle', 'verticalAlign']

export const optionMap = {
  textAlign: textAlignOptions,
  borderStyle: borderStyleOptions,
  verticalAlign: verticalAlignOptions,
}
