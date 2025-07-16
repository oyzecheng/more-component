import type {
  HiTableGeneralConfigType,
  HiTableSeparatedConfigType,
  HiTableInstanceMethods,
  LoadDataFunction,
  LoadDataParams
} from '../types/table'
import type { HiTableColumnType } from '../types/column'
import type { Ref } from 'vue'
import { uniqueId, isPlainObject } from 'lodash-es'
import { reactive, ref, computed } from 'vue'

class HiTableConfig implements HiTableInstanceMethods {
  // 分离的配置存储
  private _columns = ref<HiTableColumnType[]>([])
  private _data = ref<any[]>([])
  private _config = reactive<HiTableGeneralConfigType>({})

  private selectedRows = ref<any[]>([])

  // 内部状态
  private _tableRef: Ref<any> | null = null
  private selectedRowKeys = ref<(string | number)[]>([])
  private expandedRowKeys = ref<(string | number)[]>([])
  private currentPage: number = 1
  private pageSize: number = 10
  private total: number = 0
  private loadDataFunction: LoadDataFunction | null = null
  private isStaticData: boolean = true
  readonly tableId: string

  constructor(config: HiTableSeparatedConfigType) {
    this.tableId = uniqueId('table-')
    this.initWithSeparatedConfig(config)
    this.initTableConfig()
  }

  private initWithSeparatedConfig(config: HiTableSeparatedConfigType) {
    this._columns.value = config.columns
    this._data.value = config.data
    Object.assign(this._config, config.config)
    this.total = config.data.length
    this.isStaticData = true
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
      this.selectedRowKeys.value = this._config.rowSelection.selectedRowKeys || []
    }

    // 初始化展开行配置
    if (this._config.expandable) {
      this.expandedRowKeys.value = this._config.expandable.expandedRowKeys ||
                            this._config.expandable.defaultExpandedRowKeys || []
    }
  }

  _setTableRef(ref: Ref<any>) {
    this._tableRef = ref
  }

  // selected
  setSelectedRow(row: Record<string, any>) {
    this.selectedRows.value.push(row)
  }

  getSelectedRows() {
    return this.selectedRows
  }

  removeSelectedRow(rowKey: string | number) {
    const index = this.selectedRows.value.findIndex(item => item === rowKey)
    if (index > -1) {
      return this.selectedRows.value.splice(index, 1)
    }
    const i = this.selectedRows.value.findIndex(item => item[this._config.rowKey || 'id'] === rowKey)
    if (i > -1) {
      return this.selectedRows.value.splice(i, 1)
    }
    throw new Error(`removeSelectedRow failed: rowKey not found in selectedRows. rowKey: ${rowKey}`)
  }

  getSelectedRowKeys() {
    return computed(() => {
      return this.selectedRows.value.map(item => {
        if (isPlainObject(item)) {
          return item[this._config.rowKey || 'id']
        }
        return item
      })
    })
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
    if (this.isStaticData) {
      this.total = data.length
      if (this._config.pagination !== false) {
        this._config.pagination = {
          ...this._config.pagination,
          total: this.total
        }
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


  clearSelection(): void {
    this.selectedRowKeys.value = []
    if (this._config.rowSelection) {
      this._config.rowSelection.selectedRowKeys = []
    }
  }

  // 展开操作方法
  getExpandedRowKeys(): (string | number)[] {
    return this.expandedRowKeys.value
  }

  setExpandedRowKeys(rowKeys: (string | number)[]): void {
    this.expandedRowKeys.value = rowKeys
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
    // 如果是动态数据，重新加载数据
    if (!this.isStaticData && this.loadDataFunction) {
      this.loadData()
    }
  }

  setPageSize(pageSize: number): void {
    this.pageSize = pageSize
    this.currentPage = 1 // 重置到第一页
    if (this._config.pagination !== false) {
      this._config.pagination = {
        ...this._config.pagination,
        current: 1,
        pageSize: pageSize
      }
    }
    // 如果是动态数据，重新加载数据
    if (!this.isStaticData && this.loadDataFunction) {
      this.loadData()
    }
  }

  // 刷新操作
  refresh(): void {
    if (this.loadDataFunction || this._config.customRequest) {
      this.reload()
    }
  }

  async reload(): Promise<void> {
    if (this.loadDataFunction) {
      await this.loadData()
    } else if (this._config.customRequest) {
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

  // 数据加载方法
  onLoadData(loadDataFunction: LoadDataFunction): void {
    this.loadDataFunction = loadDataFunction
    this.isStaticData = false
    // 立即加载第一页数据
    this.loadData()
  }

  private async loadData(): Promise<void> {
    if (!this.loadDataFunction) return

    try {
      // 设置加载状态
      this._config.loading = true

      const params: LoadDataParams = {
        page: this.currentPage,
        pageSize: this.pageSize
      }

      const response = await this.loadDataFunction(params)

      // 更新数据和分页信息
      this._data.value = response.list
      this.total = response.totalCount
      this.currentPage = response.page
      this.pageSize = response.pageSize

      // 更新分页配置
      if (this._config.pagination !== false) {
        this._config.pagination = {
          ...this._config.pagination,
          current: this.currentPage,
          pageSize: this.pageSize,
          total: this.total
        }
      }
    } catch (error) {
      console.error('Load data failed:', error)
    } finally {
      // 清除加载状态
      this._config.loading = false
    }
  }

  getTotalCount(): number {
    return this.total
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
