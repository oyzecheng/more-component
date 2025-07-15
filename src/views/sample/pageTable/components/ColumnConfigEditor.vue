<script setup>
import { ref, computed } from 'vue'
import { COLUMN_FIELD_CONFIGS } from './TableFieldConfig.js'

const props = defineProps({
  columns: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['update:columns'])

const selectedColumnIndex = ref(0)

const currentColumn = computed(() => {
  return props.columns[selectedColumnIndex.value] || {}
})

const updateColumns = () => {
  emit('update:columns', [...props.columns])
}

const addColumn = () => {
  const newColumn = {
    title: '新列',
    dataIndex: `column_${Date.now()}`,
    width: 120
  }
  props.columns.push(newColumn)
  selectedColumnIndex.value = props.columns.length - 1
  updateColumns()
}

const removeColumn = (index) => {
  if (props.columns.length <= 1) {
    return
  }
  props.columns.splice(index, 1)
  if (selectedColumnIndex.value >= props.columns.length) {
    selectedColumnIndex.value = props.columns.length - 1
  }
  updateColumns()
}

const moveColumn = (fromIndex, toIndex) => {
  if (toIndex < 0 || toIndex >= props.columns.length) {
    return
  }
  const column = props.columns.splice(fromIndex, 1)[0]
  props.columns.splice(toIndex, 0, column)
  selectedColumnIndex.value = toIndex
  updateColumns()
}

const updateColumnField = (key, value) => {
  if (props.columns[selectedColumnIndex.value]) {
    // 处理嵌套字段
    if (key.includes('.')) {
      const keys = key.split('.')
      let target = props.columns[selectedColumnIndex.value]
      for (let i = 0; i < keys.length - 1; i++) {
        if (!target[keys[i]]) {
          target[keys[i]] = {}
        }
        target = target[keys[i]]
      }
      target[keys[keys.length - 1]] = value
    } else {
      props.columns[selectedColumnIndex.value][key] = value
    }
    updateColumns()
  }
}

const getFieldValue = (key) => {
  if (!props.columns[selectedColumnIndex.value]) {
    return undefined
  }

  if (key.includes('.')) {
    const keys = key.split('.')
    let value = props.columns[selectedColumnIndex.value]
    for (const k of keys) {
      value = value?.[k]
    }
    return value
  }

  return props.columns[selectedColumnIndex.value][key]
}
</script>

<template>
  <div class="column-config-editor">
    <div class="flex mb-4">
      <!-- 列列表 -->
      <div class="w-1/2 pr-4">
        <div class="flex justify-between items-center mb-2">
          <h4 class="font-bold">列配置</h4>
          <a-button size="small" @click="addColumn">添加列</a-button>
        </div>

        <a-list>
          <a-list-item
            v-for="(column, index) in columns"
            :key="index"
            :class="{ 'bg-blue-100': selectedColumnIndex === index }"
            @click="selectedColumnIndex = index"
          >
            <div class="flex justify-between items-center w-full">
              <div class="flex items-center">
                <span>{{ column.title || '未命名' }}</span>
                <span class="text-gray-500 text-sm ml-2">({{ column.dataIndex }})</span>
              </div>

              <div class="flex items-center space-x-1">
                <!-- 上移 -->
                <a-button
                  type="text"
                  size="mini"
                  :disabled="index === 0"
                  @click.stop="moveColumn(index, index - 1)"
                >
                  ↑
                </a-button>

                <!-- 下移 -->
                <a-button
                  type="text"
                  size="mini"
                  :disabled="index === columns.length - 1"
                  @click.stop="moveColumn(index, index + 1)"
                >
                  ↓
                </a-button>

                <!-- 删除 -->
                <a-button
                  type="text"
                  status="danger"
                  size="mini"
                  :disabled="columns.length <= 1"
                  @click.stop="removeColumn(index)"
                >
                  ×
                </a-button>
              </div>
            </div>
          </a-list-item>
        </a-list>
      </div>

      <!-- 列属性编辑 -->
      <div class="w-1/2 pl-4" v-if="columns.length > 0">
        <h4 class="font-bold mb-2">列属性编辑</h4>

        <a-form :model="currentColumn">
          <a-form-item
            v-for="field in COLUMN_FIELD_CONFIGS"
            :key="field.key"
            :label="field.label"
            :required="field.required"
          >
            <!-- 输入框 -->
            <a-input
              v-if="field.type === 'input'"
              :model-value="getFieldValue(field.key)"
              @update:model-value="updateColumnField(field.key, $event)"
              :placeholder="field.label"
            />

            <!-- 数字输入框 -->
            <a-input-number
              v-else-if="field.type === 'number'"
              :model-value="getFieldValue(field.key)"
              @update:model-value="updateColumnField(field.key, $event)"
              :placeholder="field.label"
            />

            <!-- 开关 -->
            <a-switch
              v-else-if="field.type === 'switch'"
              :model-value="getFieldValue(field.key)"
              @update:model-value="updateColumnField(field.key, $event)"
            />

            <!-- 下拉选择 -->
            <a-select
              v-else-if="field.type === 'select'"
              :model-value="getFieldValue(field.key)"
              @update:model-value="updateColumnField(field.key, $event)"
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
      </div>
    </div>
  </div>
</template>

<style scoped>
.column-config-editor {
  max-height: 500px;
  overflow-y: auto;
}
</style>
