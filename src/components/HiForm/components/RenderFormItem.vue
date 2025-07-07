<script setup lang="ts">
import RenderInput from './RenderInput.vue'
import RenderSelect from './RenderSelect.vue'
import RenderCascader from './RenderCascader.vue'
import RenderColorPicker from './RenderColorPicker.vue'
import RenderDatePicker from './RenderDatePicker.vue'
import RenderRate from './RenderRate.vue'
import RenderSlider from './RenderSlider.vue'
import RenderSwitch from './RenderSwitch.vue'
import RenderTimePicker from './RenderTimePicker.vue'
import RenderTreeSelect from './RenderTreeSelect.vue'
import RenderUpload from './RenderUpload.vue'
import { defineProps, computed } from 'vue'

const props = defineProps({
  formItemConfig: {
    type: Object,
    required: true
  }
})
const { formItemConfig } = props

const renderComponent = computed(() => {
  const componentMap = {
    // Input components
    input: RenderInput,
    inputPassword: RenderInput,
    inputSearch: RenderInput,
    inputNumber: RenderInput,
    inputTextarea: RenderInput,
    inputTag: RenderInput,
    // Select components
    select: RenderSelect,
    radio: RenderSelect,
    checkbox: RenderSelect,
    // Date picker components
    datePicker: RenderDatePicker,
    monthPicker: RenderDatePicker,
    yearPicker: RenderDatePicker,
    quarterPicker: RenderDatePicker,
    weekPicker: RenderDatePicker,
    rangePicker: RenderDatePicker,
    // Other components
    cascader: RenderCascader,
    colorPicker: RenderColorPicker,
    rate: RenderRate,
    slider: RenderSlider,
    switch: RenderSwitch,
    timePicker: RenderTimePicker,
    treeSelect: RenderTreeSelect,
    upload: RenderUpload
  }

  return componentMap[formItemConfig.type] || null
})

</script>

<template>
	<component :is="renderComponent" :formItemConfig="formItemConfig" />
</template>
