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
const columns = computed(() => tableInstance?.getColumns() || [])
const tableData = computed(() => tableInstance?.getData() || [])
const tableConfig = reactive(tableInstance?.getConfig() || {})
const tableRef = useTemplateRef('table-ref')

// 设置table ref到实例中
tableInstance?._setTableRef(tableRef)

// 计算分页配置
const paginationConfig = computed(() => {
  if (tableConfig.pagination === false) {
    return false
  }

  return {
    current: tableInstance?.getCurrentPage() || 1,
    pageSize: tableInstance?.getPageSize() || 10,
    total: (tableData.value && Array.isArray(tableData.value)) ? tableData.value.length : 0,
    showTotal: true,
    showJumper: true,
    showPageSize: true,
    ...tableConfig.pagination
  }
})

// 计算行选择配置
const rowSelectionConfig = computed(() => {
  if (!tableConfig.rowSelection) {
    return undefined
  }

  return {
    selectedRowKeys: tableInstance?.getSelectedRowKeys() || [],
    ...tableConfig.rowSelection,
    onSelect: (rowKeys, rowKey, record) => {
      tableInstance?.setSelectedRowKeys(rowKeys)
      tableConfig.onSelect?.(rowKeys, rowKey, record)
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      const newRowKeys = selected ?
        tableData.value.map(item => {
          const keyField = tableConfig.rowKey || 'key'
          return typeof keyField === 'function' ? keyField(item) : item[keyField]
        }) : []
      tableInstance?.setSelectedRowKeys(newRowKeys)
      tableConfig.onSelectAll?.(selected, selectedRows, changeRows)
    },
    onChange: (rowKeys) => {
      tableInstance?.setSelectedRowKeys(rowKeys)
      tableConfig.onSelectionChange?.(rowKeys)
    }
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

  // 如果有自定义请求，重新加载数据
  if (tableConfig.customRequest) {
    tableInstance?.reload()
  }
}

const handlePageSizeChange = (pageSize) => {
  tableInstance?.setPageSize(pageSize)
  tableInstance?.setCurrentPage(1) // 重置到第一页
  tableConfig.onPageSizeChange?.(pageSize)

  // 如果有自定义请求，重新加载数据
  if (tableConfig.customRequest) {
    tableInstance?.reload()
  }
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
const handleRowClick = (record, ev) => {
  tableConfig.onRowClick?.(record, ev)
}

const handleRowDblclick = (record, ev) => {
  tableConfig.onRowDblclick?.(record, ev)
}

const handleRowContextmenu = (record, ev) => {
  tableConfig.onRowContextmenu?.(record, ev)
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
    :row-selection="rowSelectionConfig"
    :expandable="expandableConfig"
    :scroll="tableConfig.scroll"
    :virtual-list-props="tableConfig.virtualListProps"
    :row-key="tableConfig.rowKey"
    :row-class="tableConfig.rowClass"
    @page-change="handlePageChange"
    @page-size-change="handlePageSizeChange"
    @sorter-change="handleSorterChange"
    @filter-change="handleFilterChange"
    @row-click="handleRowClick"
    @row-dblclick="handleRowDblclick"
    @row-contextmenu="handleRowContextmenu"
  >
    <!-- 支持插槽透传 -->
    <template v-for="(_, name) in $slots" #[name]="slotData">
      <slot :name="name" v-bind="slotData" />
    </template>
  </a-table>
</template>
