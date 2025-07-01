<script setup lang="ts">
import { Input, InputPassword, InputSearch, InputNumber } from '@arco-design/web-vue'
import { defineProps, inject, computed } from 'vue'

const props = defineProps({
  formItemConfig: {
    type: Object,
    required: true
  }
})
const { formItemConfig } = props

const formData = inject('formData')

const renderComponent = computed(() => {
  switch (formItemConfig.type) {
    case 'input':
      return Input
    case 'inputPassword':
      return InputPassword
    case 'inputSearch':
      return InputSearch
    case 'inputNumber':
      return InputNumber
  }
})
</script>

<template>
	<component
		:is="renderComponent"
		v-model="formData[formItemConfig.model]"
		:size="formItemConfig.size"
		:placeholder="formItemConfig.placeholder"
		:max-length="formItemConfig.maxLength"
		:show-word-limit="formItemConfig.showWordLimit"
		:allow-clear="formItemConfig.allowClear"
		:disabled="formItemConfig.disabled"
		:readonly="formItemConfig.readonly"
		:input-attrs="formItemConfig.inputAttrs"
		:prepend="formItemConfig.prepend"
		:append="formItemConfig.append"
		:visibility="formItemConfig.visibility"
		:invisible-button="formItemConfig.invisibleButton"
		:loading="formItemConfig.loading"
		:button-text="formItemConfig.buttonText"
		:button-props="formItemConfig.buttonProps"
	/>
</template>