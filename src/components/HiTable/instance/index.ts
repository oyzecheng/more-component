import type {
  HiTableConfigType,
  HiTableGeneralConfigType,
  HiTableSeparatedConfigType,
  HiTableInstanceMethods
} from '../types/table'
import type { HiTableColumnType } from '../types/column'
import type { Ref } from 'vue'
import { uniqueId } from 'lodash-es'
import { reactive, ref } from 'vue'

class HiTableConfig implements HiTableInstanceMethods {
  // 分离的配置存储
  private _columns = ref<HiTableColumnType[]>([])
  private _data = ref<any[]>([])
  private _config = reactive<HiTableGeneralConfigType>({})

  // 内部状态
  private _tableRef: Ref<any> | null = null
  private selectedRowKeys: (string | number)[] = []
  private expandedRowKeys: (string | number)[] = []
  private currentPage: number = 1
  private pageSize: number = 10
  private total: number = 0
  readonly tableId: string

  constructor(config: HiTableConfigType | HiTableSeparatedConfigType) {
    this.tableId = uniqueId('table-')

    // 检查是否为分离配置模式
    if (this.isSeparatedConfig(config)) {
      // 分离配置模式
      this.initWithSeparatedConfig(config as HiTableSeparatedConfigType)
    } else {
      // 传统配置模式（向后兼容）
      this.initWithLegacyConfig(config as HiTableConfigType)
    }

    this.initTableConfig()
  }

  private isSeparatedConfig(config: any): config is HiTableSeparatedConfigType {
    return config &&
           typeof config === 'object' &&
           'columns' in config &&
           'data' in config &&
           'config' in config &&
           Array.isArray(config.columns) &&
           Array.isArray(config.data) &&
           typeof config.config === 'object'
  }

  private initWithSeparatedConfig(config: HiTableSeparatedConfigType) {
    this._columns.value = config.columns
    this._data.value = config.data
    Object.assign(this._config, config.config)
    this.total = config.data.length
  }

  private initWithLegacyConfig(config: HiTableConfigType) {
    const { columns, data, ...generalConfig } = config
    this._columns.value = columns
    this._data.value = data || []
    Object.assign(this._config, generalConfig)
    this.total = this._data.value.length
  }

  private initTableConfig() {
    // 初始化分页配置
    if (this._config.pagination !== false) {
      const pagination = this._config.pagination || {}
      this.currentPage = pagination.current || 1
      this.pageSize = pagination.pageSize || 10
      this.total = pagination.total || this._data.value.length
    }

    // 初始化行选择配置
    if (this._config.rowSelection) {
      this.selectedRowKeys = this._config.rowSelection.selectedRowKeys || []
    }

    // 初始化展开行配置
    if (this._config.expandable) {
      this.expandedRowKeys = this._config.expandable.expandedRowKeys ||
                            this._config.expandable.defaultExpandedRowKeys || []
    }
  }

  _setTableRef(ref: Ref<any>) {
    this._tableRef = ref
  }

  // 获取完整配置（向后兼容）
  getTableConfig(): HiTableConfigType {
    return {
      columns: this._columns.value,
      data: this._data.value,
      ...this._config
    }
  }

  // 获取配置的方法
  getColumns(): HiTableColumnType[] {
    return this._columns.value
  }

  getData(): any[] {
    return this._data.value
  }

  getConfig(): HiTableGeneralConfigType {
    return this._config
  }

  // 更新配置的方法
  setColumns(columns: HiTableColumnType[]) {
    this._columns.value = columns
  }

  setConfig(config: Partial<HiTableGeneralConfigType>) {
    Object.assign(this._config, config)
  }

  setData(data: any[]): void {
    this._data.value = data
    this.total = data.length
    if (this._config.pagination !== false) {
      this._config.pagination = {
        ...this._config.pagination,
        total: this.total
      }
    }
  }

  addRow(record: any, index?: number): void {
    if (index !== undefined) {
      this._data.value.splice(index, 0, record)
    } else {
      this._data.value.push(record)
    }
    this.total = this._data.value.length
  }

  removeRow(rowKey: string | number): void {
    const keyField = this._config.rowKey || 'key'
    const index = this._data.value.findIndex(item => {
      if (typeof keyField === 'function') {
        return keyField(item) === rowKey
      }
      return item[keyField] === rowKey
    })
    if (index > -1) {
      this._data.value.splice(index, 1)
      this.total = this._data.value.length
    }
  }

  updateRow(rowKey: string | number, record: any): void {
    const keyField = this._config.rowKey || 'key'
    const index = this._data.value.findIndex(item => {
      if (typeof keyField === 'function') {
        return keyField(item) === rowKey
      }
      return item[keyField] === rowKey
    })
    if (index > -1) {
      this._data.value[index] = { ...this._data.value[index], ...record }
    }
  }

  // 选择操作方法
  getSelectedRowKeys(): (string | number)[] {
    return this.selectedRowKeys
  }

  setSelectedRowKeys(rowKeys: (string | number)[]): void {
    this.selectedRowKeys = rowKeys
    if (this._config.rowSelection) {
      this._config.rowSelection.selectedRowKeys = rowKeys
    }
  }

  clearSelection(): void {
    this.selectedRowKeys = []
    if (this._config.rowSelection) {
      this._config.rowSelection.selectedRowKeys = []
    }
  }

  // 展开操作方法
  getExpandedRowKeys(): (string | number)[] {
    return this.expandedRowKeys
  }

  setExpandedRowKeys(rowKeys: (string | number)[]): void {
    this.expandedRowKeys = rowKeys
    if (this._config.expandable) {
      this._config.expandable.expandedRowKeys = rowKeys
    }
  }

  expandAll(): void {
    const keyField = this._config.rowKey || 'key'
    const allKeys = this._data.value.map(item => {
      if (typeof keyField === 'function') {
        return keyField(item)
      }
      return item[keyField]
    })
    this.setExpandedRowKeys(allKeys)
  }

  collapseAll(): void {
    this.setExpandedRowKeys([])
  }

  // 分页操作方法
  getCurrentPage(): number {
    return this.currentPage
  }

  getPageSize(): number {
    return this.pageSize
  }

  setCurrentPage(page: number): void {
    this.currentPage = page
    if (this._config.pagination !== false) {
      this._config.pagination = {
        ...this._config.pagination,
        current: page
      }
    }
  }

  setPageSize(pageSize: number): void {
    this.pageSize = pageSize
    if (this._config.pagination !== false) {
      this._config.pagination = {
        ...this._config.pagination,
        pageSize: pageSize
      }
    }
  }

  // 刷新操作
  refresh(): void {
    if (this._config.customRequest) {
      this.reload()
    }
  }

  async reload(): Promise<void> {
    if (this._config.customRequest) {
      try {
        const params = {
          current: this.currentPage,
          pageSize: this.pageSize
        }
        const response = await this._config.customRequest(params)

        if (this._config.transformResponse) {
          const { data, total } = this._config.transformResponse(response)
          this.setData(data)
          this.total = total
        } else {
          this.setData(response.data || response)
          this.total = response.total || response.length
        }
      } catch (error) {
        console.error('Table reload failed:', error)
      }
    }
  }

  // 排序和筛选
  clearSorter(): void {
    // 通过table ref调用原生方法
    this._tableRef?.value?.clearSorter?.()
  }

  clearFilters(): void {
    // 通过table ref调用原生方法
    this._tableRef?.value?.clearFilters?.()
  }

  // 滚动操作
  scrollTo(options: { top?: number; left?: number; index?: number; key?: string | number }): void {
    this._tableRef?.value?.scrollTo?.(options)
  }
}

export default HiTableConfig
