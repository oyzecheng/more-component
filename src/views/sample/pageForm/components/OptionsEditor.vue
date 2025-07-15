<script setup>
import { ref } from 'vue'

const props = defineProps({
  options: {
    type: Array,
    default: () => []
  },
  type: {
    type: String,
    default: 'simple' // simple | cascader | tree
  }
})

const emit = defineEmits(['update:options'])

const localOptions = ref(props.options || [])

const updateOptions = () => {
  emit('update:options', localOptions.value)
}

const addOption = () => {
  if (props.type === 'cascader') {
    localOptions.value.push({
      label: '',
      value: '',
      children: []
    })
  } else if (props.type === 'tree') {
    localOptions.value.push({
      title: '',
      key: '',
      children: []
    })
  } else {
    localOptions.value.push({
      label: '',
      value: ''
    })
  }
  updateOptions()
}

const removeOption = (index) => {
  localOptions.value.splice(index, 1)
  updateOptions()
}

const addChild = (parentIndex) => {
  if (!localOptions.value[parentIndex].children) {
    localOptions.value[parentIndex].children = []
  }

  if (props.type === 'tree') {
    localOptions.value[parentIndex].children.push({
      title: '',
      key: ''
    })
  } else {
    localOptions.value[parentIndex].children.push({
      label: '',
      value: ''
    })
  }
  updateOptions()
}

const removeChild = (parentIndex, childIndex) => {
  localOptions.value[parentIndex].children.splice(childIndex, 1)
  updateOptions()
}
</script>

<template>
  <div class="options-editor">
    <div v-if="localOptions.length === 0" class="text-center py-4">
      <a-button @click="addOption">添加选项</a-button>
    </div>

    <div v-else>
      <div v-for="(option, index) in localOptions" :key="index" class="mb-4 p-3 border border-gray-200 rounded">
        <!-- 简单选项 -->
        <template v-if="type === 'simple'">
          <div class="flex gap-2 items-center">
            <a-input v-model="option.label" placeholder="标签" @change="updateOptions" />
            <a-input v-model="option.value" placeholder="值" @change="updateOptions" />
            <a-button type="text" status="danger" @click="removeOption(index)">
              <icon-delete />
            </a-button>
          </div>
        </template>

        <!-- 级联选项 -->
        <template v-if="type === 'cascader'">
          <div class="flex gap-2 items-center mb-2">
            <a-input v-model="option.label" placeholder="标签" @change="updateOptions" />
            <a-input v-model="option.value" placeholder="值" @change="updateOptions" />
            <a-button size="small" @click="addChild(index)">添加子项</a-button>
            <a-button type="text" status="danger" @click="removeOption(index)">
              <icon-delete />
            </a-button>
          </div>

          <div v-if="option.children && option.children.length > 0" class="ml-4 border-l-2 border-gray-200 pl-3">
            <div v-for="(child, childIndex) in option.children" :key="childIndex" class="flex gap-2 items-center mb-1">
              <a-input v-model="child.label" placeholder="子标签" size="small" @change="updateOptions" />
              <a-input v-model="child.value" placeholder="子值" size="small" @change="updateOptions" />
              <a-button type="text" status="danger" size="small" @click="removeChild(index, childIndex)">
                <icon-delete />
              </a-button>
            </div>
          </div>
        </template>

        <!-- 树形选项 -->
        <template v-if="type === 'tree'">
          <div class="flex gap-2 items-center mb-2">
            <a-input v-model="option.title" placeholder="标题" @change="updateOptions" />
            <a-input v-model="option.key" placeholder="键值" @change="updateOptions" />
            <a-button size="small" @click="addChild(index)">添加子项</a-button>
            <a-button type="text" status="danger" @click="removeOption(index)">
              <icon-delete />
            </a-button>
          </div>

          <div v-if="option.children && option.children.length > 0" class="ml-4 border-l-2 border-gray-200 pl-3">
            <div v-for="(child, childIndex) in option.children" :key="childIndex" class="flex gap-2 items-center mb-1">
              <a-input v-model="child.title" placeholder="子标题" size="small" @change="updateOptions" />
              <a-input v-model="child.key" placeholder="子键值" size="small" @change="updateOptions" />
              <a-button type="text" status="danger" size="small" @click="removeChild(index, childIndex)">
                <icon-delete />
              </a-button>
            </div>
          </div>
        </template>
      </div>

      <a-button @click="addOption" class="w-full">添加选项</a-button>
    </div>
  </div>
</template>

<style scoped>
.options-editor {
  max-height: 300px;
  overflow-y: auto;
}
</style>
