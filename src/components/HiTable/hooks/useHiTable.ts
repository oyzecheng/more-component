import type {
  HiTableGeneralConfigType,
  HiTableSeparatedConfigType
} from '../types/table'
import type { HiTableColumnType } from '../types/column'
import HiTableConfig from '../instance'
import { reactive } from 'vue'

// 分离配置方式
const useHiTable = (
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

  return tableInstance
}

export default useHiTable
