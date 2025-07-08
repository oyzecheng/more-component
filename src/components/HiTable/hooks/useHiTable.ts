import type {
  HiTableConfigType,
  HiTableGeneralConfigType,
  HiTableSeparatedConfigType
} from '../types/table'
import type { HiTableColumnType } from '../types/column'
import HiTableConfig from '../instance'
import { reactive } from 'vue'

// 传统方式（向后兼容）
const useHiTable = (tableConfig: HiTableConfigType) => {
  const tableInstance = new HiTableConfig(tableConfig)

  return {
    tableConfig: reactive(tableInstance.getTableConfig()),
    tableInstance
  }
}

// 新的分离配置方式（推荐）
export const useHiTableSeparated = (
  columns: HiTableColumnType[],
  data: any[],
  config: HiTableGeneralConfigType = {}
) => {
  const separatedConfig: HiTableSeparatedConfigType = {
    columns,
    data,
    config
  }

  const tableInstance = new HiTableConfig(separatedConfig)

  return {
    columns: tableInstance.getColumns(),
    data: tableInstance.getData(),
    config: reactive(tableInstance.getConfig()),
    tableInstance
  }
}

export default useHiTable
