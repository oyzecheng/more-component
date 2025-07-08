export interface HiTableColumnType {
  title: string
  dataIndex: string
  key?: string
  width?: number | string
  minWidth?: number
  maxWidth?: number
  align?: 'left' | 'center' | 'right'
  fixed?: 'left' | 'right'
  ellipsis?: boolean
  tooltip?: boolean | object
  sortable?: boolean | object
  filterable?: boolean | object
  resizable?: boolean
  render?: (record: any, column: HiTableColumnType, rowIndex: number) => any
  slotName?: string
  children?: HiTableColumnType[]
}

export interface HiTablePaginationType {
  current?: number
  pageSize?: number
  total?: number
  showTotal?: boolean | ((total: number, range: [number, number]) => string)
  showJumper?: boolean
  showPageSize?: boolean
  pageSizeOptions?: number[]
  simple?: boolean
  size?: 'mini' | 'small' | 'medium' | 'large'
  hideOnSinglePage?: boolean
  baseSize?: number
  bufferSize?: number
}

export interface HiTableRowSelectionType {
  type?: 'checkbox' | 'radio'
  selectedRowKeys?: (string | number)[]
  checkStrictly?: boolean
  onlyCheckLeaf?: boolean
  checkboxProps?: (record: any) => object
  title?: string | ((checkAll: boolean, indeterminate: boolean) => any)
  width?: number
  fixed?: boolean
  showCheckedAll?: boolean
}

export interface HiTableExpandableType {
  expandedRowKeys?: (string | number)[]
  defaultExpandedRowKeys?: (string | number)[]
  defaultExpandAllRows?: boolean
  expandRowByClick?: boolean
  expandIcon?: (record: any, expanded: boolean) => any
  width?: number
  title?: string
  fixed?: boolean
}

export interface HiTableScrollType {
  x?: number | string
  y?: number | string
  minWidth?: number
  maxHeight?: number | string
}
