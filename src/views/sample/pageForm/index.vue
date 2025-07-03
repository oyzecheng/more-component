<script setup lang="ts">
import JsonEditor from 'json-editor-vue'
import HiForm from '@/components/HiForm/index.vue'
import { RawFormConfigList } from './config'
import HiFormConfig from '@/components/HiForm/instance'
import { computed } from 'vue'
import { cloneDeep, assign } from 'lodash-es'

const formInstance = computed(() => {
  return new HiFormConfig(cloneDeep(RawFormConfigList))
})

formInstance.value.onSubmit((formData) => {
	console.log('formData', formData)
})



const handleAddConfig = () => {
  testFormConfigList.push({ type: 'input', label: 'age', model: 'age', validate: true })

  console.log('testFormConfigList', testFormConfigList)
}

const handleChangeConfig = (content: any) => {
  try {
    const newConfig = JSON.parse(content)
    assign(RawFormConfigList, newConfig)
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
      <a-button @click="handleAddConfig">添加配置</a-button>
      <JsonEditor :modelValue="RawFormConfigList" @update:modelValue="handleChangeConfig" mode="text" />
    </div>
  </div>
</template>

<style scoped>

</style>
