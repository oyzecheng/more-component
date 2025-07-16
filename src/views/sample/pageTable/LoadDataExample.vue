<template>
  <div class="load-data-example">
    <h3>HiTable 动态数据加载示例</h3>

    <div class="controls" style="margin-bottom: 16px;">
      <a-button @click="refreshData" type="primary">刷新数据</a-button>
      <a-button @click="clearSelection" style="margin-left: 8px;">清除选择</a-button>
      <a-button @click="getSelectedRows">获取选中行</a-button>
    </div>

    <HiTable :table-instance="tableInstance" />

    <div class="info" style="margin-top: 16px;">
      <p>当前页: {{ tableInstance.getCurrentPage() }}</p>
      <p>页大小: {{ tableInstance.getPageSize() }}</p>
      <p>总数: {{ tableInstance.getTotalCount() }}</p>
      <p>选中行: {{ selectedRowKeys.join(', ') }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import HiTable from '@/components/HiTable/index.vue'
import useHiTable from '@/components/HiTable/hooks/useHiTable'

// 模拟服务端数据
const mockServerData = Array.from({ length: 100 }, (_, index) => ({
  id: `${index + 1}`,
  name: `用户${index + 1}`,
  age: 20 + (index % 50),
  city: ['北京', '上海', '广州', '深圳', '杭州'][index % 5],
  department: ['技术部', '产品部', '运营部', '市场部'][index % 4],
  status: index % 3 === 0 ? '在线' : '离线'
}))

// 模拟服务端请求
const mockLoadData = async (params) => {
  console.log('加载数据参数:', params)

  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 500))

  const { page, pageSize } = params
  const start = (page - 1) * pageSize
  const end = start + pageSize

  return {
    page,
    pageSize,
    totalCount: mockServerData.length,
    list: mockServerData.slice(start, end)
  }
}

// 列配置
const columns = [
  { title: '姓名', dataIndex: 'name', key: 'name', width: 120 },
  { title: '年龄', dataIndex: 'age', key: 'age', width: 80 },
  { title: '城市', dataIndex: 'city', key: 'city', width: 100 },
  { title: '部门', dataIndex: 'department', key: 'department', width: 120 },
  { title: '状态', dataIndex: 'status', key: 'status', width: 80 }
]

// 选中行状态
const selectedRowKeys = ref([])

// 表格配置
const config = reactive({
  rowSelection: {
    type: 'checkbox'
  },
  rowKey: 'id',
  pagination: {
    pageSize: 10,
    current: 1
  },
  onSelectionChange: (rowKeys) => {
    selectedRowKeys.value = rowKeys
    console.log('选中的行:', rowKeys)
  }
})

// 创建表格实例（初始为空数据）
const { tableInstance } = useHiTable(columns, [], config)

const getSelectedRows = () => {
  console.log('rows', tableInstance.getSelectedRows())
  console.log('rowKeys', tableInstance.getSelectedRowKeys().value)
}

// 设置动态数据加载
tableInstance.onLoadData(mockLoadData)

// 刷新数据
const refreshData = () => {
  tableInstance.refresh()
}

// 清除选择
const clearSelection = () => {
  tableInstance.clearSelection()
  selectedRowKeys.value = []
}
</script>

<style scoped>
.load-data-example {
  padding: 20px;
}

.controls {
  display: flex;
  gap: 8px;
}

.info {
  background: #f5f5f5;
  padding: 12px;
  border-radius: 4px;
}

.info p {
  margin: 4px 0;
  font-size: 14px;
}
</style>
