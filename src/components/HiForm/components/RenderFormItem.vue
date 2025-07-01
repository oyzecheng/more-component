<script setup lang="ts">
import RenderInput from './RenderInput.vue'
import { defineProps, computed } from 'vue'

const props = defineProps({
  formItemConfig: {
    type: Object,
    required: true
  }
})
const { formItemConfig } = props

const renderComponent = computed(() => {
  const inputList = ['input', 'inputPassword', 'inputSearch', 'inputNumber']
  if (inputList.includes(formItemConfig.type)) {
    return RenderInput
  }
  return null
})

</script>

<template>
	<component :is="renderComponent" :formItemConfig="formItemConfig" />
</template>