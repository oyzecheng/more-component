// 表格字段配置定义
export const TABLE_FIELD_CONFIGS = {
  // 基础配置
  basic: [
    { key: 'loading', label: '加载状态', type: 'switch' },
    { 
      key: 'size', 
      label: '表格尺寸', 
      type: 'select',
      options: [
        { label: '迷你', value: 'mini' },
        { label: '小', value: 'small' },
        { label: '中等', value: 'medium' },
        { label: '大', value: 'large' }
      ]
    },
    { key: 'tableLayoutFixed', label: '固定表格布局', type: 'switch' },
    { key: 'bordered', label: '显示边框', type: 'switch' },
    { key: 'hoverable', label: '悬停效果', type: 'switch' },
    { key: 'stripe', label: '斑马纹', type: 'switch' },
    { key: 'showHeader', label: '显示表头', type: 'switch' }
  ],

  // 分页配置
  pagination: [
    { key: 'pagination.current', label: '当前页', type: 'number' },
    { key: 'pagination.pageSize', label: '每页条数', type: 'number' },
    { key: 'pagination.total', label: '总条数', type: 'number' },
    { key: 'pagination.showTotal', label: '显示总数', type: 'switch' },
    { key: 'pagination.showJumper', label: '显示跳转', type: 'switch' },
    { key: 'pagination.showPageSize', label: '显示页面大小选择器', type: 'switch' },
    { key: 'pagination.simple', label: '简单分页', type: 'switch' },
    { key: 'pagination.hideOnSinglePage', label: '单页时隐藏', type: 'switch' }
  ],

  // 行选择配置
  rowSelection: [
    {
      key: 'rowSelection.type',
      label: '选择类型',
      type: 'select',
      options: [
        { label: '多选', value: 'checkbox' },
        { label: '单选', value: 'radio' }
      ]
    },
    { key: 'rowSelection.checkStrictly', label: '严格选择', type: 'switch' },
    { key: 'rowSelection.onlyCheckLeaf', label: '仅选择叶子节点', type: 'switch' },
    { key: 'rowSelection.showCheckedAll', label: '显示全选', type: 'switch' },
    { key: 'rowSelection.fixed', label: '固定选择列', type: 'switch' },
    { key: 'rowSelection.width', label: '选择列宽度', type: 'number' }
  ],

  // 展开行配置
  expandable: [
    { key: 'expandable.defaultExpandAllRows', label: '默认展开所有行', type: 'switch' },
    { key: 'expandable.expandRowByClick', label: '点击行展开', type: 'switch' },
    { key: 'expandable.width', label: '展开列宽度', type: 'number' },
    { key: 'expandable.title', label: '展开列标题', type: 'input' },
    { key: 'expandable.fixed', label: '固定展开列', type: 'switch' }
  ],

  // 滚动配置
  scroll: [
    { key: 'scroll.x', label: '水平滚动宽度', type: 'number' },
    { key: 'scroll.y', label: '垂直滚动高度', type: 'number' },
    { key: 'scroll.minWidth', label: '最小宽度', type: 'number' },
    { key: 'scroll.maxHeight', label: '最大高度', type: 'number' }
  ]
}

// 列配置字段定义
export const COLUMN_FIELD_CONFIGS = [
  { key: 'title', label: '列标题', type: 'input', required: true },
  { key: 'dataIndex', label: '数据字段', type: 'input', required: true },
  { key: 'key', label: '唯一标识', type: 'input' },
  { key: 'width', label: '列宽度', type: 'number' },
  { key: 'minWidth', label: '最小宽度', type: 'number' },
  { key: 'maxWidth', label: '最大宽度', type: 'number' },
  {
    key: 'align',
    label: '对齐方式',
    type: 'select',
    options: [
      { label: '左对齐', value: 'left' },
      { label: '居中', value: 'center' },
      { label: '右对齐', value: 'right' }
    ]
  },
  {
    key: 'fixed',
    label: '固定列',
    type: 'select',
    options: [
      { label: '不固定', value: '' },
      { label: '左固定', value: 'left' },
      { label: '右固定', value: 'right' }
    ]
  },
  { key: 'ellipsis', label: '超出省略', type: 'switch' },
  { key: 'tooltip', label: '显示提示', type: 'switch' },
  { key: 'sortable', label: '可排序', type: 'switch' },
  { key: 'filterable', label: '可筛选', type: 'switch' },
  { key: 'resizable', label: '可调整大小', type: 'switch' },
  { key: 'slotName', label: '插槽名称', type: 'input' }
]

// 表格配置分组
export const TABLE_CONFIG_GROUPS = [
  {
    label: '基础配置',
    key: 'basic',
    fields: TABLE_FIELD_CONFIGS.basic
  },
  {
    label: '分页配置',
    key: 'pagination',
    fields: TABLE_FIELD_CONFIGS.pagination
  },
  {
    label: '行选择配置',
    key: 'rowSelection',
    fields: TABLE_FIELD_CONFIGS.rowSelection
  },
  {
    label: '展开行配置',
    key: 'expandable',
    fields: TABLE_FIELD_CONFIGS.expandable
  },
  {
    label: '滚动配置',
    key: 'scroll',
    fields: TABLE_FIELD_CONFIGS.scroll
  }
]
