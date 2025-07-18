<script setup>
import { defineProps, reactive, useTemplateRef, computed, watch } from 'vue'

const props = defineProps({
  tableInstance: {
    type: Object,
    required: true
  }
})

const { tableInstance } = props

// 使用分离的配置获取方式
const columns = tableInstance?.getColumns()
const tableData = tableInstance?.getData()
const tableConfig = reactive(tableInstance?.getConfig() || {})
const tableRef = useTemplateRef('table-ref')

// 设置table ref到实例中
tableInstance?._setTableRef(tableRef)

const selectedRowKeys = tableInstance.getSelectedRowKeys()

// 计算分页配置
const paginationConfig = computed(() => {
  if (tableConfig.pagination === false) {
    return false
  }

  return {
    current: tableInstance?.getCurrentPage() || 1,
    pageSize: tableInstance?.getPageSize() || 10,
    total: tableInstance?.getTotalCount() || 0,
    showTotal: true,
    showJumper: true,
    showPageSize: true,
    ...tableConfig.pagination
  }
})

// 计算展开行配置
const expandableConfig = computed(() => {
  if (!tableConfig.expandable) {
    return undefined
  }

  return {
    expandedRowKeys: tableInstance.getExpandedRowKeys(),
    ...tableConfig.expandable,
    onExpand: (rowKey, record) => {
      tableConfig.onExpand?.(rowKey, record)
    },
    onExpandedChange: (rowKeys) => {
      tableInstance.setExpandedRowKeys(rowKeys)
      tableConfig.onExpandedChange?.(rowKeys)
    }
  }
})

// 分页事件处理
const handlePageChange = (page) => {
  tableInstance?.setCurrentPage(page)
  tableConfig.onPageChange?.(page)
}

const handlePageSizeChange = (pageSize) => {
  tableInstance?.setPageSize(pageSize)
  tableConfig.onPageSizeChange?.(pageSize)
}

// 排序事件处理
const handleSorterChange = (dataIndex, direction) => {
  tableConfig.onSorterChange?.(dataIndex, direction)
}

// 筛选事件处理
const handleFilterChange = (dataIndex, filteredValues) => {
  tableConfig.onFilterChange?.(dataIndex, filteredValues)
}

// 行点击事件处理
const handleRowClick = (rowKeys, rowKey, record) => {
  if (selectedRowKeys.value.includes(rowKey)) {
    tableInstance.removeSelectedRow(rowKey)
  } else {
    tableInstance.setSelectedRow(record)
  }
}
const handleSelectAll = (checked) => {
  if (checked) {
    tableData.value.forEach(item => {
      if (!tableInstance.hasSelectedRow(item)) {
        tableInstance.setSelectedRow(item)
      }
    })
  } else {
    tableData.value.forEach(item => {
      tableInstance.removeSelectedRow(item)
    })
  }
}

// 监听实例变化，重新获取配置
watch(() => props.tableInstance, (newInstance) => {
  if (newInstance) {
    Object.assign(tableConfig, newInstance.getConfig())
  }
}, { immediate: true })

</script>

<template>
  <a-table
    ref="table-ref"
    :columns="columns"
    :data="tableData"
    :loading="tableConfig.loading"
    :size="tableConfig.size"
    :table-layout-fixed="tableConfig.tableLayoutFixed"
    :bordered="tableConfig.bordered"
    :hoverable="tableConfig.hoverable"
    :stripe="tableConfig.stripe"
    :show-header="tableConfig.showHeader"
    :pagination="paginationConfig"
    :expandable="expandableConfig"
    :scroll="tableConfig.scroll"
    :virtual-list-props="tableConfig.virtualListProps"
    :row-key="tableConfig.rowKey"
    :row-class="tableConfig.rowClass"

    :row-selection="tableConfig.rowSelection"
    :selected-keys="selectedRowKeys"

    @page-change="handlePageChange"
    @page-size-change="handlePageSizeChange"
    @sorter-change="handleSorterChange"
    @filter-change="handleFilterChange"
    @select="handleRowClick"
    @select-all="handleSelectAll"
  >
    <!-- 支持插槽透传 -->
    <template v-for="(_, name) in $slots" #[name]="slotData">
      <slot :name="name" v-bind="slotData" />
    </template>
  </a-table>
</template>
