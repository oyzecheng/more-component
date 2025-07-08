<script setup>
import JsonEditor from 'json-editor-vue'
import HiTable from '@/components/HiTable/index.vue'
import { RawTableConfig } from './config'
import { useHiTableSeparated } from '@/components/HiTable/hooks/useHiTable'
import TableConfigEditor from './components/TableConfigEditor.vue'
import { tablePresets } from './presets'
import { ref, reactive, watch, computed } from 'vue'
import { cloneDeep } from 'lodash-es'

// 分离配置：从 RawTableConfig 中提取
const columns = ref(cloneDeep(RawTableConfig.columns))
const tableData = ref(cloneDeep(RawTableConfig.data || []))

// 通用配置（排除 columns 和 data）
const { columns: _, data: __, ...generalConfigData } = RawTableConfig
const generalConfig = reactive(cloneDeep(generalConfigData))

const selectedRowKeys = ref([])

// 监听选择变化
const handleSelectionChange = (rowKeys) => {
  selectedRowKeys.value = rowKeys
  console.log('选中的行:', rowKeys)
}

// 设置选择变化回调
generalConfig.onSelectionChange = handleSelectionChange

// 使用新的分离配置Hook
const { tableInstance } = useHiTableSeparated(
  columns.value,
  tableData.value,
  generalConfig
)

// 创建完整配置的计算属性（用于编辑器显示）
const fullTableConfig = computed(() => ({
  columns: columns.value,
  data: tableData.value,
  ...generalConfig
}))

// 处理配置变化
const handleConfigChange = (content) => {
  try {
    const newConfig = typeof content === 'string' ? JSON.parse(content) : content

    // 分离新配置
    const { columns: newColumns, data: newData, ...newGeneralConfig } = newConfig

    // 更新分离的配置
    columns.value = newColumns || []
    tableData.value = newData || []

    // 清空并更新通用配置
    Object.keys(generalConfig).forEach(key => {
      delete generalConfig[key]
    })
    Object.assign(generalConfig, newGeneralConfig)

    // 保留选择变化回调
    generalConfig.onSelectionChange = handleSelectionChange

    // 同步到表格实例
    tableInstance.setColumns(columns.value)
    tableInstance.setData(tableData.value)
    tableInstance.setConfig(generalConfig)

    // 同步到原始配置对象（用于编辑器）
    Object.keys(RawTableConfig).forEach(key => {
      delete RawTableConfig[key]
    })
    Object.assign(RawTableConfig, newConfig)

    // 重置选择状态
    selectedRowKeys.value = []
  } catch (err) {
    console.error('配置解析错误:', err)
  }
}

// 加载预设
const loadPreset = (presetName) => {
  const preset = tablePresets[presetName]
  if (preset) {
    handleConfigChange(preset)
  }
}

// 表格操作方法
const handleRefresh = () => {
  tableInstance.refresh()
}

const handleClearSelection = () => {
  tableInstance.clearSelection()
  selectedRowKeys.value = []
}

const handleSelectAll = () => {
  const allKeys = tableInstance.getData().map(item => {
    const keyField = tableInstance.getConfig().rowKey || 'key'
    return typeof keyField === 'function' ? keyField(item) : item[keyField]
  })
  tableInstance.setSelectedRowKeys(allKeys)
  selectedRowKeys.value = allKeys
}

const handleAddRow = () => {
  const newRow = {
    key: Date.now(),
    id: Date.now(),
    name: '新用户',
    age: 25,
    email: 'new@example.com',
    phone: '13800000000',
    address: '新地址',
    status: 'active',
    createTime: new Date().toISOString().split('T')[0],
    department: '新部门',
    salary: 10000
  }

  // 添加到本地数据
  tableData.value.push(newRow)
  // 同步到表格实例
  tableInstance.setData(tableData.value)
}

const handleRemoveSelected = () => {
  // 从本地数据中删除
  selectedRowKeys.value.forEach(key => {
    const index = tableData.value.findIndex(item => {
      const keyField = generalConfig.rowKey || 'key'
      return typeof keyField === 'function' ? keyField(item) === key : item[keyField] === key
    })
    if (index > -1) {
      tableData.value.splice(index, 1)
    }
  })

  // 同步到表格实例
  tableInstance.setData(tableData.value)
  selectedRowKeys.value = []
}

const handleRemoveRow = (rowKey) => {
  // 从本地数据中删除单行
  const index = tableData.value.findIndex(item => {
    const keyField = generalConfig.rowKey || 'key'
    return typeof keyField === 'function' ? keyField(item) === rowKey : item[keyField] === rowKey
  })

  if (index > -1) {
    tableData.value.splice(index, 1)
    // 同步到表格实例
    tableInstance.setData(tableData.value)

    // 如果删除的行在选中列表中，也要移除
    const selectedIndex = selectedRowKeys.value.indexOf(rowKey)
    if (selectedIndex > -1) {
      selectedRowKeys.value.splice(selectedIndex, 1)
    }
  }
}

// 监听数据变化，同步到 RawTableConfig
watch(
  () => tableData.value,
  (newData) => {
    RawTableConfig.data = newData
  },
  { deep: true }
)

// 监听列配置变化，同步到 RawTableConfig
watch(
  () => columns.value,
  (newColumns) => {
    RawTableConfig.columns = newColumns
  },
  { deep: true }
)

// 监听通用配置变化，同步到 RawTableConfig
watch(
  () => generalConfig,
  (newConfig) => {
    Object.assign(RawTableConfig, newConfig)
  },
  { deep: true }
)
</script>

<template>
  <div class="flex h-screen">
    <!-- 左侧表格展示 -->
    <div class="w-1/2 p-4 border-r">
      <div class="mb-4">
        <h2 class="text-lg font-bold mb-2">HiTable 组件展示</h2>

        <!-- 操作按钮 -->
        <div class="flex flex-wrap gap-2 mb-4">
          <a-button @click="handleRefresh">刷新</a-button>
          <a-button @click="handleClearSelection">清空选择</a-button>
          <a-button @click="handleSelectAll">全选</a-button>
          <a-button @click="handleAddRow">添加行</a-button>
          <a-button
            status="danger"
            :disabled="selectedRowKeys.length === 0"
            @click="handleRemoveSelected"
          >
            删除选中 ({{ selectedRowKeys.length }})
          </a-button>
        </div>

        <!-- 预设模板 -->
        <div class="mb-4">
          <a-dropdown trigger="click">
            <a-button>加载预设模板</a-button>
            <template #content>
              <a-doption @click="loadPreset('userManagement')">用户管理表格</a-doption>
              <a-doption @click="loadPreset('productList')">产品列表表格</a-doption>
              <a-doption @click="loadPreset('orderManagement')">订单管理表格</a-doption>
              <a-doption @click="loadPreset('simpleTable')">简单表格</a-doption>
            </template>
          </a-dropdown>
        </div>
      </div>

      <!-- 表格组件 -->
      <HiTable :table-instance="tableInstance" :key="tableInstance.tableId">
        <!-- 操作列插槽 -->
        <template #action="{ record }">
          <a-space>
            <a-button size="mini" @click="console.log('编辑', record)">编辑</a-button>
            <a-button
              size="mini"
              status="danger"
              @click="handleRemoveRow(record.key)"
            >
              删除
            </a-button>
          </a-space>
        </template>
      </HiTable>
    </div>

    <!-- 右侧配置编辑 -->
    <div class="w-1/2 p-4">
      <a-tabs>
        <a-tab-pane key="1" title="表格预览">
          <JsonEditor
            :modelValue="fullTableConfig"
            @update:modelValue="handleConfigChange"
            mode="text"
            :main-menu-bar="false"
            class="h-96"
          />
        </a-tab-pane>

        <a-tab-pane key="2" title="表格配置器">
          <TableConfigEditor
            :table-config="fullTableConfig"
            @update:config="handleConfigChange"
          />
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<style scoped>
.h-screen {
  height: 100vh;
}

.h-96 {
  height: 24rem;
}
</style>
