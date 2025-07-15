<script setup>
import RenderFormItem from './components/RenderFormItem.vue'
import { defineProps, reactive, provide, useTemplateRef } from 'vue'

const props = defineProps({
  formInstance: {
    type: Object,
    required: true
  }
})
const { formInstance } = props

const formRules = formInstance.getFormRules()
const formConfigList = reactive(formInstance.getFormConfig())
const formData = reactive(formInstance.getFormData())
const formRef = useTemplateRef('form-ref')

provide('formData', formData)

formInstance._setFormRef(formRef)

const handleSubmit = () => {
  formInstance.validateFormData().then((res) => {
    if (!res) {
      if (formInstance.submitListener) {
        formInstance.callSubmitListener()
      } else {
        throw new Error('please set onSubmit in formInstance')
      }
    }
  })
}

const handleCancel = () => {
  console.log('cancel')
  formInstance.resetFields()
  formInstance.clearValidate()
}
</script>

<template>
  <a-form :model="formData" :rules="formRules" ref="form-ref">
    <template v-for="item in formConfigList" :key="item.model">
      <a-form-item
        :label="item.label"
        :field="item.model"
        :validate-trigger="item.validateTrigger"
        :tooltip="item.tooltip"
        :show-colon="item.showColon"
        v-if="typeof item.show === 'function' ? item.show(formData) : typeof item.show === 'boolean' ? item.show : true"
      >
        <RenderFormItem :formItemConfig="item" />
      </a-form-item>
    </template>
    <a-form-item>
      <a-space :size="16">
        <a-button type="primary" @click="handleSubmit">提交</a-button>
        <a-button @click="handleCancel">取消</a-button>
      </a-space>
    </a-form-item>
  </a-form>
</template>
