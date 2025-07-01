<script setup lang="ts">
import HiForm from '@/components/HiForm/index.vue'
import { testFormConfig, testInstance, testFormConfigList } from './config'

const { formConfig, formInstance } = testFormConfig

formInstance.getFormItemInstance('name').changeConfig('test', 1)

formInstance.onSubmit((formData) => {
	console.log('formData', formData)
})

console.log('testFormConfig', formConfig)

const handleAddConfig = () => {
  testFormConfigList.push({ type: 'input', label: 'age', model: 'age', validate: true })

  console.log('testFormConfigList', testFormConfigList)
}
</script>

<template>
  <div class="flex">
    <div class="w-1/2">
      <HiForm :form-instance="formInstance" :key="testInstance.getFormConfig().length" />
    </div>
    <div class="w-1/2 flex justify-center">
      <a-button @click="handleAddConfig">添加配置</a-button>
    </div>
  </div>
</template>

<style scoped>

</style>
