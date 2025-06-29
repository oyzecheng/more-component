<script setup lang="ts">
import { testFormConfig } from './config'

const { formConfig, formInstance } = testFormConfig

formInstance.getFormItemInstance('name').changeConfig('maxLength', 1)

console.log('testFormConfig', formConfig)
</script>

<template>
  <div>
    <a-button>test</a-button>
    {{ JSON.stringify(formConfig) }}
  </div>
</template>

<style scoped>

</style>
