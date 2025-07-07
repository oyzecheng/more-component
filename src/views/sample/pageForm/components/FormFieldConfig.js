// 表单字段配置定义
export const FORM_FIELD_CONFIGS = {
  // 输入类
  input: [
    { key: 'placeholder', label: '占位符', type: 'input' },
    { key: 'maxLength', label: '最大长度', type: 'number' },
    { key: 'allowClear', label: '允许清空', type: 'switch' },
    { key: 'showWordLimit', label: '显示字数限制', type: 'switch' }
  ],

  inputPassword: [
    { key: 'placeholder', label: '占位符', type: 'input' },
    { key: 'allowClear', label: '允许清空', type: 'switch' },
    { key: 'visibility', label: '显示密码（默认隐藏）', type: 'switch' },
    { key: 'invisibleButton', label: '隐藏可见性按钮', type: 'switch' }
  ],

  inputSearch: [
    { key: 'placeholder', label: '占位符', type: 'input' },
    { key: 'allowClear', label: '允许清空', type: 'switch' },
    { key: 'searchButton', label: '搜索按钮', type: 'switch' },
    { key: 'buttonText', label: '按钮文本', type: 'input' },
    { key: 'loading', label: '加载状态', type: 'switch' }
  ],

  inputNumber: [
    { key: 'placeholder', label: '占位符', type: 'input' },
    { key: 'min', label: '最小值', type: 'number' },
    { key: 'max', label: '最大值', type: 'number' },
    { key: 'step', label: '步长', type: 'number' },
    { key: 'precision', label: '精度', type: 'number' },
    { key: 'allowClear', label: '允许清空', type: 'switch' }
  ],

  inputTextarea: [
    { key: 'placeholder', label: '占位符', type: 'input' },
    { key: 'maxLength', label: '最大长度', type: 'number' },
    { key: 'showWordLimit', label: '显示字数限制', type: 'switch' },
    { key: 'allowClear', label: '允许清空', type: 'switch' },
    { key: 'autoSize', label: '自动调整高度', type: 'switch' }
  ],

  inputTag: [
    { key: 'placeholder', label: '占位符', type: 'input' },
    { key: 'allowClear', label: '允许清空', type: 'switch' },
    { key: 'readonly', label: '只读', type: 'switch' },
    { key: 'maxTagCount', label: '最大标签数', type: 'number' },
    { key: 'uniqueValue', label: '唯一值', type: 'switch' }
  ],

  // 选择类
  select: [
    { key: 'placeholder', label: '占位符', type: 'input' },
    { key: 'multiple', label: '多选', type: 'switch' },
    { key: 'allowClear', label: '允许清空', type: 'switch' },
    { key: 'allowSearch', label: '允许搜索', type: 'switch' },
    { key: 'options', label: '选项配置', type: 'options', optionsType: 'simple' }
  ],

  radio: [
    {
      key: 'radioType',
      label: '单选类型',
      type: 'select',
      options: [
        { label: '普通单选', value: 'radio' },
        { label: '按钮单选', value: 'button' }
      ]
    },
    {
      key: 'direction',
      label: '排列方向',
      type: 'select',
      options: [
        { label: '水平', value: 'horizontal' },
        { label: '垂直', value: 'vertical' }
      ]
    },
    { key: 'options', label: '选项配置', type: 'options', optionsType: 'simple' }
  ],

  checkbox: [
    { key: 'max', label: '最大选择数', type: 'number' },
    {
      key: 'direction',
      label: '排列方向',
      type: 'select',
      options: [
        { label: '水平', value: 'horizontal' },
        { label: '垂直', value: 'vertical' }
      ]
    },
    { key: 'options', label: '选项配置', type: 'options', optionsType: 'simple' }
  ],

  cascader: [
    { key: 'placeholder', label: '占位符', type: 'input' },
    { key: 'multiple', label: '多选', type: 'switch' },
    { key: 'allowClear', label: '允许清空', type: 'switch' },
    { key: 'allowSearch', label: '允许搜索', type: 'switch' },
    {
      key: 'expandTrigger',
      label: '展开触发方式',
      type: 'select',
      options: [
        { label: '点击', value: 'click' },
        { label: '悬停', value: 'hover' }
      ]
    },
    { key: 'options', label: '选项配置', type: 'options', optionsType: 'cascader' }
  ],

  treeSelect: [
    { key: 'allowClear', label: '允许清空', type: 'switch' },
    { key: 'treeCheckable', label: '可勾选', type: 'switch' },
    { key: 'data', label: '数据配置', type: 'options', optionsType: 'tree' }
  ],

  // 开关类
  switch: [
    {
      key: 'switchType',
      label: '开关类型',
      type: 'select',
      options: [
        { label: '圆形', value: 'circle' },
        { label: '圆角', value: 'round' },
        { label: '线条', value: 'line' }
      ]
    },
    { key: 'checkedValue', label: '选中值', type: 'input' },
    { key: 'uncheckedValue', label: '未选中值', type: 'input' },
    { key: 'checkedText', label: '选中文本', type: 'input' },
    { key: 'uncheckedText', label: '未选中文本', type: 'input' }
  ],

  // 日期时间类
  datePicker: [
    { key: 'placeholder', label: '占位符', type: 'input' },
    { key: 'allowClear', label: '允许清空', type: 'switch' },
    { key: 'readonly', label: '只读', type: 'switch' },
    { key: 'showTime', label: '显示时间', type: 'switch' },
    { key: 'format', label: '格式', type: 'input' }
  ],

  monthPicker: [
    { key: 'placeholder', label: '占位符', type: 'input' },
    { key: 'allowClear', label: '允许清空', type: 'switch' },
    { key: 'readonly', label: '只读', type: 'switch' },
    { key: 'format', label: '格式', type: 'input' }
  ],

  yearPicker: [
    { key: 'placeholder', label: '占位符', type: 'input' },
    { key: 'allowClear', label: '允许清空', type: 'switch' },
    { key: 'readonly', label: '只读', type: 'switch' },
    { key: 'format', label: '格式', type: 'input' }
  ],

  quarterPicker: [
    { key: 'placeholder', label: '占位符', type: 'input' },
    { key: 'allowClear', label: '允许清空', type: 'switch' },
    { key: 'readonly', label: '只读', type: 'switch' },
    { key: 'format', label: '格式', type: 'input' }
  ],

  weekPicker: [
    { key: 'placeholder', label: '占位符', type: 'input' },
    { key: 'allowClear', label: '允许清空', type: 'switch' },
    { key: 'readonly', label: '只读', type: 'switch' },
    { key: 'format', label: '格式', type: 'input' }
  ],

  rangePicker: [
    { key: 'placeholder[0]', label: '开始占位符', type: 'input' },
    { key: 'placeholder[1]', label: '结束占位符', type: 'input' },
    { key: 'allowClear', label: '允许清空', type: 'switch' },
    { key: 'showTime', label: '显示时间', type: 'switch' },
    { key: 'separator', label: '分隔符', type: 'input' },
    { key: 'format', label: '格式', type: 'input' }
  ],

  timePicker: [
    { key: 'placeholder', label: '占位符', type: 'input' },
    { key: 'allowClear', label: '允许清空', type: 'switch' },
    { key: 'format', label: '格式', type: 'input' },
    { key: 'step', label: '步长', type: 'number' }
  ],

  colorPicker: [
    { key: 'showText', label: '显示文本', type: 'switch' },
    { key: 'showHistory', label: '显示历史', type: 'switch' },
    { key: 'showPreset', label: '显示预设', type: 'switch' }
  ],

  // 其他类
  rate: [
    { key: 'allowClear', label: '允许清空', type: 'switch' },
    { key: 'allowHalf', label: '允许半选', type: 'switch' },
    { key: 'count', label: '总数', type: 'number' }
  ],

  slider: [
    { key: 'min', label: '最小值', type: 'number' },
    { key: 'max', label: '最大值', type: 'number' },
    { key: 'step', label: '步长', type: 'number' },
    { key: 'showTooltip', label: '显示提示', type: 'switch' }
  ],

  upload: [
    { key: 'action', label: '上传地址', type: 'input' },
    { key: 'accept', label: '接受文件类型', type: 'input' },
    { key: 'multiple', label: '多选', type: 'switch' },
    { key: 'draggable', label: '拖拽上传', type: 'switch' },
    { key: 'directory', label: '文件夹上传', type: 'switch' },
    {
      key: 'listType',
      label: '列表类型',
      type: 'select',
      options: [
        { label: '文本', value: 'text' },
        { label: '图片', value: 'picture' },
        { label: '图片卡片', value: 'picture-card' }
      ]
    },
    { key: 'limit', label: '上传限制', type: 'number' },
    { key: 'tip', label: '提示文本', type: 'input' },
    { key: 'showFileList', label: '显示文件列表', type: 'switch' },
    { key: 'showUploadButton', label: '显示上传按钮', type: 'switch' },
    { key: 'showRemoveButton', label: '显示删除按钮', type: 'switch' },
    { key: 'showPreviewButton', label: '显示预览按钮', type: 'switch' }
  ]
}

// 表单类型分组配置
export const FORM_TYPE_GROUPS = [
  {
    label: '输入类',
    types: [
      { type: 'input', label: '输入框' },
      { type: 'inputPassword', label: '密码框' },
      { type: 'inputSearch', label: '搜索框' },
      { type: 'inputNumber', label: '数字输入框' },
      { type: 'inputTextarea', label: '文本域' },
      { type: 'inputTag', label: '标签输入' }
    ]
  },
  {
    label: '选择类',
    types: [
      { type: 'select', label: '下拉选择' },
      { type: 'radio', label: '单选框' },
      { type: 'checkbox', label: '复选框' },
      { type: 'cascader', label: '级联选择' },
      { type: 'treeSelect', label: '树选择' }
    ]
  },
  {
    label: '日期时间类',
    types: [
      { type: 'datePicker', label: '日期选择' },
      { type: 'monthPicker', label: '月份选择' },
      { type: 'yearPicker', label: '年份选择' },
      { type: 'quarterPicker', label: '季度选择' },
      { type: 'weekPicker', label: '周选择' },
      { type: 'rangePicker', label: '日期范围' },
      { type: 'timePicker', label: '时间选择' }
    ]
  },
  {
    label: '其他类',
    types: [
      { type: 'switch', label: '开关' },
      { type: 'rate', label: '评分' },
      { type: 'slider', label: '滑动条' },
      { type: 'colorPicker', label: '颜色选择' },
      { type: 'upload', label: '文件上传' }
    ]
  }
]
