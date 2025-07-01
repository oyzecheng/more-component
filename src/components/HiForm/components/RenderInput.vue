<script setup lang="ts">
import {
	Input,
	InputPassword,
	InputSearch,
	InputNumber,
	Textarea,
	InputTag
} from '@arco-design/web-vue'
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
    case 'inputTextarea':
      return Textarea
    case 'inputTag':
      return InputTag
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
		:auto-size="formItemConfig.autoSize"
		:textarea-attrs="formItemConfig.textareaAttrs"
		:max-tag-count="formItemConfig.maxTagCount"
		:unique-value="formItemConfig.uniqueValue"
		@change="formItemConfig.onChange"
	/>
</template>