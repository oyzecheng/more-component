<script setup>
import { computed } from 'vue'
import OptionsEditor from './OptionsEditor.vue'

const props = defineProps({
  field: {
    type: Object,
    required: true
  },
  modelValue: {
    type: [String, Number, Boolean, Array, Object],
    default: undefined
  }
})

const emit = defineEmits(['update:modelValue'])

const localValue = computed({
  get() {
    // 处理嵌套属性，如 placeholder[0]
    if (props.field.key.includes('[') && props.field.key.includes(']')) {
      const [baseKey, indexStr] = props.field.key.split('[')
      const index = parseInt(indexStr.replace(']', ''))
      const baseValue = props.modelValue || []
      return baseValue[index]
    }
    return props.modelValue
  },
  set(value) {
    // 处理嵌套属性
    if (props.field.key.includes('[') && props.field.key.includes(']')) {
      const [baseKey, indexStr] = props.field.key.split('[')
      const index = parseInt(indexStr.replace(']', ''))
      const baseValue = props.modelValue || []
      const newValue = [...baseValue]
      newValue[index] = value
      emit('update:modelValue', newValue)
    } else {
      emit('update:modelValue', value)
    }
  }
})

const handleOptionsUpdate = (value) => {
  emit('update:modelValue', value)
}
</script>

<template>
  <a-form-item :label="field.label">
    <!-- 输入框 -->
    <a-input
      v-if="field.type === 'input'"
      v-model="localValue"
    />

    <!-- 数字输入框 -->
    <a-input-number
      v-else-if="field.type === 'number'"
      v-model="localValue"
    />

    <!-- 开关 -->
    <a-switch
      v-else-if="field.type === 'switch'"
      v-model="localValue"
    />

    <!-- 下拉选择 -->
    <a-select
      v-else-if="field.type === 'select'"
      v-model="localValue"
    >
      <a-option
        v-for="option in field.options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </a-option>
    </a-select>

    <!-- 选项编辑器 -->
    <OptionsEditor
      v-else-if="field.type === 'options'"
      :options="modelValue || []"
      :type="field.optionsType"
      @update:options="handleOptionsUpdate"
    />

    <!-- 默认输入框 -->
    <a-input
      v-else
      v-model="localValue"
    />
  </a-form-item>
</template>
