<script setup>
import { ref, watch } from 'vue'
import { cloneDeep } from 'lodash-es'
import ColumnConfigEditor from './ColumnConfigEditor.vue'
import { TABLE_CONFIG_GROUPS } from './TableFieldConfig.js'

const props = defineProps({
  tableConfig: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:config'])

const localConfig = ref(cloneDeep(props.tableConfig))
const activeTab = ref('basic')

watch(() => props.tableConfig, (newVal) => {
  localConfig.value = cloneDeep(newVal)
}, { deep: true })

const updateConfig = () => {
  emit('update:config', JSON.stringify(localConfig.value))
}

const updateColumns = (columns) => {
  localConfig.value.columns = columns
  updateConfig()
}

const getFieldValue = (key) => {
  if (key.includes('.')) {
    const keys = key.split('.')
    let value = localConfig.value
    for (const k of keys) {
      value = value?.[k]
    }
    return value
  }
  return localConfig.value[key]
}

const setFieldValue = (key, value) => {
  if (key.includes('.')) {
    const keys = key.split('.')
    let target = localConfig.value

    // 确保嵌套对象存在
    for (let i = 0; i < keys.length - 1; i++) {
      if (!target[keys[i]]) {
        target[keys[i]] = {}
      }
      target = target[keys[i]]
    }

    target[keys[keys.length - 1]] = value
  } else {
    localConfig.value[key] = value
  }
  updateConfig()
}

// 重置配置
const resetConfig = () => {
  localConfig.value = cloneDeep(props.tableConfig)
  updateConfig()
}

// 生成新数据
const generateNewData = () => {
  const newData = []
  for (let i = 1; i <= 20; i++) {
    newData.push({
      key: i,
      id: i,
      name: `新用户${i}`,
      age: 20 + Math.floor(Math.random() * 40),
      email: `newuser${i}@example.com`,
      phone: `139${String(Math.floor(Math.random() * 100000000)).padStart(8, '0')}`,
      address: `上海市浦东新区某某路${i}号`,
      status: Math.random() > 0.5 ? 'active' : 'inactive',
      createTime: new Date().toISOString().split('T')[0],
      department: ['研发部', '设计部', '测试部'][Math.floor(Math.random() * 3)],
      salary: Math.floor(Math.random() * 30000) + 8000
    })
  }
  localConfig.value.data = newData
  updateConfig()
}

// 切换分页
const togglePagination = () => {
  if (localConfig.value.pagination === false) {
    localConfig.value.pagination = {
      current: 1,
      pageSize: 10,
      showTotal: true,
      showJumper: true,
      showPageSize: true
    }
  } else {
    localConfig.value.pagination = false
  }
  updateConfig()
}

// 切换行选择
const toggleRowSelection = () => {
  if (localConfig.value.rowSelection) {
    localConfig.value.rowSelection = undefined
  } else {
    localConfig.value.rowSelection = {
      type: 'checkbox',
      selectedRowKeys: [],
      showCheckedAll: true
    }
  }
  updateConfig()
}
</script>

<template>
  <div class="table-config-editor">
    <!-- 快捷操作 -->
    <div class="mb-4 flex flex-wrap gap-2">
      <a-button size="small" @click="generateNewData">生成新数据</a-button>
      <a-button size="small" @click="togglePagination">
        {{ localConfig.pagination === false ? '启用分页' : '禁用分页' }}
      </a-button>
      <a-button size="small" @click="toggleRowSelection">
        {{ localConfig.rowSelection ? '禁用行选择' : '启用行选择' }}
      </a-button>
      <a-button size="small" @click="resetConfig">重置配置</a-button>
    </div>

    <a-tabs v-model:active-key="activeTab">
      <!-- 列配置 -->
      <a-tab-pane key="columns" title="列配置">
        <ColumnConfigEditor
          :columns="localConfig.columns"
          @update:columns="updateColumns"
        />
      </a-tab-pane>

      <!-- 表格配置 -->
      <a-tab-pane
        v-for="group in TABLE_CONFIG_GROUPS"
        :key="group.key"
        :title="group.label"
      >
        <a-form :model="localConfig">
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
