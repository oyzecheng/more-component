<script setup>
import { ref, defineEmits } from 'vue'
import ColumnConfigEditor from './ColumnConfigEditor.vue'
import { TABLE_CONFIG_GROUPS } from './TableFieldConfig.js'

const props = defineProps({
  tableConfig: {
    type: Object,
    required: true
  },
  columnConfig: {
    type: Array,
    required: true
  }
})

const { tableConfig, columnConfig } = props
const emit = defineEmits(['update:tableData'])

const activeTab = ref('basic')


const getFieldValue = (key) => {
  if (key.includes('.')) {
    const keys = key.split('.')
    let value = props.tableConfig
    for (const k of keys) {
      value = value?.[k]
    }
    return value
  }
  return props.tableConfig[key]
}

const setFieldValue = (key, value) => {
  if (key.includes('.')) {
    const keys = key.split('.')
    let target = tableConfig

    // 确保嵌套对象存在
    for (let i = 0; i < keys.length - 1; i++) {
      if (!target[keys[i]]) {
        target[keys[i]] = {}
      }
      target = target[keys[i]]
    }

    target[keys[keys.length - 1]] = value
  } else {
    tableConfig[key] = value
  }
}

// 切换分页
const togglePagination = () => {
  if (tableConfig.pagination === false) {
    tableConfig.pagination = {
      current: 1,
      pageSize: 10,
      showTotal: true,
      showJumper: true,
      showPageSize: true
    }
  } else {
    tableConfig.pagination = false
  }
}

// 切换行选择
const toggleRowSelection = () => {
  if (tableConfig.rowSelection) {
    tableConfig.rowSelection = undefined
  } else {
    tableConfig.rowSelection = {
      type: 'checkbox',
      selectedRowKeys: [],
      showCheckedAll: true
    }
  }
}

const generateNewData = () => {
  emit('update:tableData')
}
</script>

<template>
  <div class="table-config-editor">
    <!-- 快捷操作 -->
    <div class="mb-4 flex flex-wrap gap-2">
      <a-button size="small" @click="generateNewData">生成新数据</a-button>
      <a-button size="small" @click="togglePagination">
        {{ tableConfig.pagination === false ? '启用分页' : '禁用分页' }}
      </a-button>
      <a-button size="small" @click="toggleRowSelection">
        {{ tableConfig.rowSelection ? '禁用行选择' : '启用行选择' }}
      </a-button>
    </div>

    <a-tabs v-model:active-key="activeTab">
      <!-- 列配置 -->
      <a-tab-pane key="columns" title="列配置">
        <ColumnConfigEditor
          :columns="columnConfig"
        />
      </a-tab-pane>

      <!-- 表格配置 -->
      <a-tab-pane
        v-for="group in TABLE_CONFIG_GROUPS"
        :key="group.key"
        :title="group.label"
      >
        <a-form :model="tableConfig">
          <a-form-item
            v-for="field in group.fields"
            :key="field.key"
            :label="field.label"
          >
            <!-- 输入框 -->
            <a-input
              v-if="field.type === 'input'"
              :model-value="getFieldValue(field.key)"
              @update:model-value="setFieldValue(field.key, $event)"
              :placeholder="field.label"
            />

            <!-- 数字输入框 -->
            <a-input-number
              v-else-if="field.type === 'number'"
              :model-value="getFieldValue(field.key)"
              @update:model-value="setFieldValue(field.key, $event)"
              :placeholder="field.label"
            />

            <!-- 开关 -->
            <a-switch
              v-else-if="field.type === 'switch'"
              :model-value="getFieldValue(field.key)"
              @update:model-value="setFieldValue(field.key, $event)"
            />

            <!-- 下拉选择 -->
            <a-select
              v-else-if="field.type === 'select'"
              :model-value="getFieldValue(field.key)"
              @update:model-value="setFieldValue(field.key, $event)"
              :placeholder="field.label"
              allow-clear
            >
              <a-option
                v-for="option in field.options"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }}
              </a-option>
            </a-select>
          </a-form-item>
        </a-form>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<style scoped>
.table-config-editor {
  height: 100%;
  overflow-y: auto;
}
</style>
