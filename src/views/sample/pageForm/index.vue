<script setup lang="ts">
import HiForm from '@/components/HiForm/index.vue'
import { testFormConfig } from './config'

const { formConfig, formInstance } = testFormConfig

formInstance.getFormItemInstance('name').changeConfig('maxLength', 1)

console.log('testFormConfig', formConfig)
</script>

<template>
  <div>
    <a-button>test</a-button>
    {{ JSON.stringify(formConfig) }}
    <a-input-password :max-length="2" />
    <HiForm :form-instance="formInstance" />
  </div>
</template>

<style scoped>

</style>
