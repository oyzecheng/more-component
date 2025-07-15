
<script setup>
import { ref, watch, computed } from 'vue'
import { formPresets } from '../presets'
import { cloneDeep } from 'lodash-es'
import FieldRenderer from './FieldRenderer.vue'
import { FORM_FIELD_CONFIGS, FORM_TYPE_GROUPS } from './FormFieldConfig.js'

const props = defineProps({
  configList: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['update:config'])

const localConfig = ref(cloneDeep(props.configList))
const selectedItemIndex = ref(0)

watch(() => props.configList, (newVal) => {
  localConfig.value = cloneDeep(newVal)
}, { deep: true })

const updateConfig = () => {
  emit('update:config', JSON.stringify(localConfig.value))
}

const addFormItem = (type) => {
  const newItem = {
    type,
    label: `新${type}项`,
    model: `new${type}${Date.now()}`
  }

  // 为需要options的表单类型添加默认options
  if (['radio', 'checkbox', 'select'].includes(type)) {
    newItem.options = [
      { label: '选项1', value: '1' },
      { label: '选项2', value: '2' }
    ]
  }

  // 为cascader添加默认options
  if (type === 'cascader') {
    newItem.options = [
      {
        label: '选项1',
        value: '1',
        children: [
          { label: '子选项1-1', value: '1-1' },
          { label: '子选项1-2', value: '1-2' }
        ]
      },
      {
        label: '选项2',
        value: '2',
        children: [
          { label: '子选项2-1', value: '2-1' },
          { label: '子选项2-2', value: '2-2' }
        ]
      }
    ]
  }

  // 为treeSelect添加默认data
  if (type === 'treeSelect') {
    newItem.data = [
      {
        title: '节点1',
        key: '1',
        children: [
          { title: '子节点1-1', key: '1-1' },
          { title: '子节点1-2', key: '1-2' }
        ]
      },
      {
        title: '节点2',
        key: '2',
        children: [
          { title: '子节点2-1', key: '2-1' },
          { title: '子节点2-2', key: '2-2' }
        ]
      }
    ]
  }

  // 为rangePicker设置默认placeholder数组
  if (type === 'rangePicker') {
    newItem.placeholder = ['开始日期', '结束日期']
    newItem.separator = '至'
  }

  // 为upload设置默认配置
  if (type === 'upload') {
    newItem.action = 'https://www.example.com/upload'
    newItem.listType = 'text'
    newItem.showFileList = true
    newItem.showUploadButton = true
    newItem.showRemoveButton = true
    newItem.limit = 5
  }

  // 为inputPassword设置默认配置
  if (type === 'inputPassword') {
    newItem.visibility = false // 默认不可见（密码模式）
    newItem.allowClear = false
    newItem.invisibleButton = false // 默认显示可见性按钮
  }

  // 为switch设置默认配置
  if (type === 'switch') {
    newItem.checkedValue = true
    newItem.uncheckedValue = false
  }

  // 为其他需要布尔值默认值的类型设置
  if (['input', 'inputSearch', 'inputNumber', 'inputTextarea', 'inputTag'].includes(type)) {
    newItem.allowClear = false
  }

  // 为日期时间类型设置默认值
  if (['datePicker', 'monthPicker', 'yearPicker', 'quarterPicker', 'weekPicker', 'timePicker'].includes(type)) {
    newItem.allowClear = true
    newItem.readonly = false
  }

  // 为select、cascader设置默认值
  if (['select', 'cascader'].includes(type)) {
    newItem.allowClear = true
    newItem.allowSearch = false
    newItem.multiple = false
  }

  // 为treeSelect设置默认值
  if (type === 'treeSelect') {
    newItem.allowClear = true
    newItem.treeCheckable = false
  }

  // 为rate设置默认值
  if (type === 'rate') {
    newItem.allowClear = true
    newItem.allowHalf = false
    newItem.count = 5
  }

  // 为slider设置默认值
  if (type === 'slider') {
    newItem.min = 0
    newItem.max = 100
    newItem.step = 1
    newItem.showTooltip = true
  }

  // 为colorPicker设置默认值
  if (type === 'colorPicker') {
    newItem.showText = false
    newItem.showHistory = true
    newItem.showPreset = true
  }

  localConfig.value.push(newItem)
  selectedItemIndex.value = localConfig.value.length - 1
  updateConfig()
}

const removeFormItem = (index) => {
  localConfig.value.splice(index, 1)
  selectedItemIndex.value = Math.min(selectedItemIndex.value, localConfig.value.length - 1)
  updateConfig()
}

const loadPreset = (presetName) => {
  localConfig.value = cloneDeep(formPresets[presetName])
  selectedItemIndex.value = 0 // 重置选中项到第一个
  updateConfig()
}

// 获取当前选中项的字段配置
const currentFieldConfigs = computed(() => {
  if (localConfig.value.length === 0 || selectedItemIndex.value < 0) return []
  const currentItem = localConfig.value[selectedItemIndex.value]
  return FORM_FIELD_CONFIGS[currentItem.type] || []
})

// 获取/设置字段值的辅助函数
const getFieldValue = (fieldKey) => {
  const currentItem = localConfig.value[selectedItemIndex.value]
  if (fieldKey.includes('[') && fieldKey.includes(']')) {
    const [baseKey] = fieldKey.split('[')
    return currentItem[baseKey]
  }
  return currentItem[fieldKey]
}

const setFieldValue = (fieldKey, value) => {
  const currentItem = localConfig.value[selectedItemIndex.value]
  if (fieldKey.includes('[') && fieldKey.includes(']')) {
    const [baseKey] = fieldKey.split('[')
    currentItem[baseKey] = value
  } else {
    currentItem[fieldKey] = value
  }
  updateConfig()
}
</script>

<template>
  <!-- 在组件顶部添加 -->
  <div class="mb-4">
    <a-dropdown trigger="click">
      <a-button>加载预设模板</a-button>
      <template #content>
        <a-doption @click="loadPreset('userInfo')">用户信息表单</a-doption>
        <a-doption @click="loadPreset('addressForm')">地址表单</a-doption>
        <!-- 更多预设 -->
      </template>
    </a-dropdown>
  </div>
  <div class="form-config-editor">
    <div class="flex mb-4">
      <div class="w-1/3 pr-2">
        <h3 class="mb-2 font-bold">表单项列表</h3>
        <a-list>
          <a-list-item
            v-for="(item, index) in localConfig"
            :key="index"
            :class="{ 'bg-blue-100': selectedItemIndex === index }"
            @click="selectedItemIndex = index"
          >
            <div class="flex justify-between w-full items-center">
              <div>
                <div class="leading-none">{{ item.label }}</div>
                <span class="text-xs right-0 top-0 text-gray-600 leading-4 rounded-bl-md">{{ item.type }}</span>
              </div>
              <a-button type="text" status="danger" @click.stop="removeFormItem(index)">
                <icon-delete />
              </a-button>
            </div>
          </a-list-item>
        </a-list>

        <a-dropdown trigger="click" class="w-54">
          <div class="mt-4">
            <a-button type="primary" long>添加表单项</a-button>
          </div>
          <template #content>
            <template v-for="group in FORM_TYPE_GROUPS" :key="group.label">
              <a-dgroup :title="group.label">
                <a-doption
                  v-for="typeItem in group.types"
                  :key="typeItem.type"
                  @click="addFormItem(typeItem.type)"
                >
                  {{ typeItem.label }}
                </a-doption>
              </a-dgroup>
            </template>
          </template>
        </a-dropdown>
      </div>

      <div class="w-2/3 pl-4" v-if="localConfig.length > 0">
        <h3 class="mb-2 font-bold">属性编辑</h3>
        <a-form :model="localConfig[selectedItemIndex]" @submit="updateConfig">
          <!-- 基础属性 -->
          <a-form-item label="标签名">
            <a-input v-model="localConfig[selectedItemIndex].label" @change="updateConfig" />
          </a-form-item>

          <a-form-item label="字段名">
            <a-input v-model="localConfig[selectedItemIndex].model" @change="updateConfig" />
          </a-form-item>

          <a-form-item label="是否必填">
            <a-switch v-model="localConfig[selectedItemIndex].validate" @change="updateConfig" />
          </a-form-item>

          <!-- 动态字段配置 -->
          <FieldRenderer
            v-for="field in currentFieldConfigs"
            :key="field.key"
            :field="field"
            :model-value="getFieldValue(field.key, field.type)"
            @update:model-value="setFieldValue(field.key, $event)"
          />
        </a-form>
      </div>
    </div>
  </div>
</template>
