<script setup>
import { defineProps, reactive } from 'vue'

const props = defineProps({
  formInstance: {
    type: Object,
    required: true
  }
})
const { formInstance } = props

const formConfigList = reactive(formInstance.getFormConfig())
const formData = reactive(formInstance.getFormData())

console.log(formConfigList, formData)
</script>
