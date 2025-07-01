<script setup lang="ts">
import RenderInput from './RenderInput.vue'
import RenderSelect from './RenderSelect.vue'
import { defineProps, computed } from 'vue'

const props = defineProps({
  formItemConfig: {
    type: Object,
    required: true
  }
})
const { formItemConfig } = props

const renderComponent = computed(() => {
  const inputList = ['input', 'inputPassword', 'inputSearch', 'inputNumber', 'inputTextarea', 'inputTag']
  if (inputList.includes(formItemConfig.type)) {
    return RenderInput
  }
	const selectList = ['select', 'radio', 'checkbox']
	if (selectList.includes(formItemConfig.type)) {
		return RenderSelect
	}
  return null
})

</script>

<template>
	<component :is="renderComponent" :formItemConfig="formItemConfig" />
</template>