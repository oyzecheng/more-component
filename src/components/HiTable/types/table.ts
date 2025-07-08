import type {
  HiTableColumnType,
  HiTablePaginationType,
  HiTableRowSelectionType,
  HiTableExpandableType,
  HiTableScrollType
} from './column'

// 表格通用配置（不包含columns和data）
export interface HiTableGeneralConfigType {
  // 基础配置
  loading?: boolean
  size?: 'mini' | 'small' | 'medium' | 'large'
  tableLayoutFixed?: boolean
  bordered?: boolean | { wrapper?: boolean; cell?: boolean }
  hoverable?: boolean
  stripe?: boolean
  showHeader?: boolean

  // 分页配置
  pagination?: false | HiTablePaginationType

  // 行选择配置
  rowSelection?: HiTableRowSelectionType

  // 展开行配置
  expandable?: HiTableExpandableType

  // 滚动配置
  scroll?: HiTableScrollType

  // 虚拟滚动
  virtualListProps?: object

  // 行配置
  rowKey?: string | ((record: any) => string)
  rowClass?: string | ((record: any, rowIndex: number) => string)

  // 事件回调
  onPageChange?: (page: number) => void
  onPageSizeChange?: (pageSize: number) => void
  onSorterChange?: (dataIndex: string, direction: string) => void
  onFilterChange?: (dataIndex: string, filteredValues: any[]) => void
  onRowClick?: (record: any, ev: Event) => void
  onRowDblclick?: (record: any, ev: Event) => void
  onRowContextmenu?: (record: any, ev: Event) => void
  onSelect?: (rowKeys: (string | number)[], rowKey: string | number, record: any) => void
  onSelectAll?: (selected: boolean, selectedRows: any[], changeRows: any[]) => void
  onSelectionChange?: (rowKeys: (string | number)[]) => void
  onExpand?: (rowKey: string | number, record: any) => void
  onExpandedChange?: (rowKeys: (string | number)[]) => void

  // 自定义配置
  customRequest?: (params: any) => Promise<any>
  transformResponse?: (response: any) => { data: any[]; total: number }
}

// 完整的表格配置（兼容旧版本）
export interface HiTableConfigType extends HiTableGeneralConfigType {
  columns: HiTableColumnType[]
  data?: any[]
}

// 分离的配置结构
export interface HiTableSeparatedConfigType {
  columns: HiTableColumnType[]
  data: any[]
  config: HiTableGeneralConfigType
}

export type HiTableDataType = any[]

// 表格实例方法接口
export interface HiTableInstanceMethods {
  // 数据操作
  getData: () => any[]
  setData: (data: any[]) => void
  addRow: (record: any, index?: number) => void
  removeRow: (rowKey: string | number) => void
  updateRow: (rowKey: string | number, record: any) => void
  
  // 选择操作
  getSelectedRowKeys: () => (string | number)[]
  setSelectedRowKeys: (rowKeys: (string | number)[]) => void
  clearSelection: () => void
  
  // 展开操作
  getExpandedRowKeys: () => (string | number)[]
  setExpandedRowKeys: (rowKeys: (string | number)[]) => void
  expandAll: () => void
  collapseAll: () => void
  
  // 分页操作
  getCurrentPage: () => number
  getPageSize: () => number
  setCurrentPage: (page: number) => void
  setPageSize: (pageSize: number) => void
  
  // 刷新操作
  refresh: () => void
  reload: () => void
  
  // 排序和筛选
  clearSorter: () => void
  clearFilters: () => void
  
  // 滚动操作
  scrollTo: (options: { top?: number; left?: number; index?: number; key?: string | number }) => void
}
