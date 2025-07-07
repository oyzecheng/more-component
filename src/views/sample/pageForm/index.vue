
<script setup>
import JsonEditor from 'json-editor-vue'
import HiForm from '@/components/HiForm/index.vue'
import { RawFormConfigList } from './config'
import HiFormConfig from '@/components/HiForm/instance'
import FormConfigEditor from './components/FormConfigEditor.vue'
import { computed } from 'vue'
import { cloneDeep } from 'lodash-es'

const formInstance = computed(() => {
  return new HiFormConfig(cloneDeep(RawFormConfigList))
})

formInstance.value.onSubmit((formData) => {
  console.log('formData', formData)
})

const handleAddConfig = () => {
  RawFormConfigList.push({ type: 'input', label: 'age', model: 'age', validate: true })
  console.log('RawFormConfigList', RawFormConfigList)
}

const handleChangeConfig = (content) => {
  try {
    const newConfig = typeof content === 'string' ? JSON.parse(content) : content
    // 清空原有配置
    RawFormConfigList.splice(0, RawFormConfigList.length)
    // 添加新配置
    RawFormConfigList.push(...newConfig)
  } catch (err) {
    console.error(err)
  }
}
</script>

<template>
  <div class="flex">
    <div class="w-1/2">
      <HiForm :form-instance="formInstance" :key="formInstance.formId" />
    </div>
    <div class="w-1/2 flex justify-center flex-col px-4">
      <a-tabs>
        <a-tab-pane key="1" title="表单预览">
          <a-button @click="handleAddConfig" class="mb-4">添加配置</a-button>
          <JsonEditor :modelValue="RawFormConfigList" @update:modelValue="handleChangeConfig" mode="text" />
        </a-tab-pane>
        <a-tab-pane key="2" title="表单配置器">
          <FormConfigEditor :config-list="RawFormConfigList" @update:config="handleChangeConfig" />
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<style scoped>

</style>
