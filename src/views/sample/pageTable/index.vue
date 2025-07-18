<script setup>
import JsonEditor from 'json-editor-vue'
import HiTable from '@/components/HiTable/index.vue'
import { TableConfig, TableData, TableColumns, generateNewData } from './config'
import useHiTable from '@/components/HiTable/hooks/useHiTable'
import TableConfigEditor from './components/TableConfigEditor.vue'
import { tablePresets } from './presets'
import {reactive, computed } from 'vue'

const fullTableConfig = reactive({ tableColumns: TableColumns, tableConfig: TableConfig })

// 使用新的分离配置Hook
const tableInstance = computed(() => {
  return useHiTable(fullTableConfig.tableColumns, TableData, fullTableConfig.tableConfig)
})


const selectedRowKeys = tableInstance.value.getSelectedRowKeys()

// 加载预设
const loadPreset = (presetName) => {
  const preset = tablePresets[presetName]
  if (preset) {
    const { columns, data, ...config } = preset
    TableColumns.splice(0, TableColumns.length, ...columns)
    TableData.splice(0, TableData.length, ...data)
    Object.assign(TableConfig, config)
  }
}

// 表格操作方法
const handleRefresh = () => {
  tableInstance.value.refresh()
}

const handleClearSelection = () => {
  tableInstance.value.clearSelectedRows()
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
  TableData.push(newRow)
  // 同步到表格实例
  tableInstance.value.setData(TableData)
}

const handleRemoveSelected = () => {
  // 从本地数据中删除
  selectedRowKeys.value.forEach(key => {
    const index = TableData.findIndex(item => {
      const keyField = TableConfig.rowKey || 'key'
      return typeof keyField === 'function' ? keyField(item) === key : item[keyField] === key
    })
    if (index > -1) {
      TableData.splice(index, 1)
    }
  })

  // 同步到表格实例
  tableInstance.value.setData(TableData)
  tableInstance.value.clearSelectedRows()
}

const handleRemoveRow = (rowKey) => {
  // 从本地数据中删除单行
  const index = TableData.findIndex(item => {
    const keyField = TableConfig.rowKey || 'key'
    return typeof keyField === 'function' ? keyField(item) === rowKey : item[keyField] === rowKey
  })

  if (index > -1) {
    TableData.splice(index, 1)
    // 同步到表格实例
    tableInstance.value.setData(TableData)

    // 如果删除的行在选中列表中，也要移除
    tableInstance.value.removeSelectedRow(rowKey)
  }
}

const handleConfigChange = (content) => {
  try {
    const newConfig = typeof content === 'string' ? JSON.parse(content) : content

    fullTableConfig.tableConfig = newConfig.tableConfig
    fullTableConfig.tableColumns = newConfig.tableColumns
  } catch (err) {
    console.error(err)
  }
}

const handleUpdateTableData = () => {
  TableData.splice(0, TableData.length, ...generateNewData())
  tableInstance.value.setData(TableData)
}
</script>

<template>
  <div class="flex h-screen">
    <!-- 左侧表格展示 -->
    <div class="w-1/2 p-4">
      <div class="mb-4">
        <h2 class="text-lg font-bold mb-2">HiTable 组件展示</h2>

        <!-- 操作按钮 -->
        <div class="flex flex-wrap gap-2 mb-4">
          <a-button @click="handleRefresh">刷新</a-button>
          <a-button @click="handleClearSelection">清空选择</a-button>
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
        <a-tab-pane key="1" title="表格配置器">
          <TableConfigEditor
            :table-config="fullTableConfig.tableConfig"
            :column-config="fullTableConfig.tableColumns"
            @update:tableData="handleUpdateTableData"
          />
        </a-tab-pane>
        <a-tab-pane key="2" title="表格JSON">
          <JsonEditor
            :modelValue="fullTableConfig"
            @update:modelValue="handleConfigChange"
            mode="text"
            :main-menu-bar="false"
            class="h-96"
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
