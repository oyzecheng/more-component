import { reactive } from 'vue'
import type { HiTableConfigType } from '@/components/HiTable/types/table'

// 模拟数据
const generateMockData = (count: number = 50) => {
  const data = []
  for (let i = 1; i <= count; i++) {
    data.push({
      key: i,
      id: i,
      name: `用户${i}`,
      age: 18 + Math.floor(Math.random() * 50),
      email: `user${i}@example.com`,
      phone: `138${String(Math.floor(Math.random() * 100000000)).padStart(8, '0')}`,
      address: `北京市朝阳区某某街道${i}号`,
      status: Math.random() > 0.5 ? 'active' : 'inactive',
      createTime: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      department: ['技术部', '产品部', '运营部', '市场部'][Math.floor(Math.random() * 4)],
      salary: Math.floor(Math.random() * 50000) + 5000
    })
  }
  return data
}

export const RawTableConfig: HiTableConfigType = reactive({
  columns: [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 80,
      sortable: true,
      fixed: 'left'
    },
    {
      title: '姓名',
      dataIndex: 'name',
      width: 120,
      ellipsis: true,
      tooltip: true
    },
    {
      title: '年龄',
      dataIndex: 'age',
      width: 80,
      sortable: true
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      width: 200,
      ellipsis: true
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      width: 140
    },
    {
      title: '地址',
      dataIndex: 'address',
      width: 250,
      ellipsis: true,
      tooltip: true
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 100,
      filterable: {
        filters: [
          { text: '激活', value: 'active' },
          { text: '未激活', value: 'inactive' }
        ]
      },
      render: (record) => {
        return record.status === 'active' ?
          '<span style="color: green;">激活</span>' :
          '<span style="color: red;">未激活</span>'
      }
    },
    {
      title: '部门',
      dataIndex: 'department',
      width: 120,
      filterable: {
        filters: [
          { text: '技术部', value: '技术部' },
          { text: '产品部', value: '产品部' },
          { text: '运营部', value: '运营部' },
          { text: '市场部', value: '市场部' }
        ]
      }
    },
    {
      title: '薪资',
      dataIndex: 'salary',
      width: 120,
      sortable: true,
      render: (record) => `¥${record.salary?.toLocaleString()}`
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      width: 120,
      sortable: true
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: 150,
      fixed: 'right',
      slotName: 'action'
    }
  ],
  data: generateMockData(),
  loading: false,
  size: 'medium',
  bordered: true,
  hoverable: true,
  stripe: true,
  showHeader: true,
  pagination: {
    current: 1,
    pageSize: 10,
    showTotal: true,
    showJumper: true,
    showPageSize: true,
    pageSizeOptions: [10, 20, 50, 100]
  },
  rowSelection: {
    type: 'checkbox',
    selectedRowKeys: [],
    showCheckedAll: true
  },
  scroll: {
    x: 1200,
    y: 400
  },
  rowKey: 'key',
  onPageChange: (page: number) => {
    console.log('页码变化:', page)
  },
  onPageSizeChange: (pageSize: number) => {
    console.log('页面大小变化:', pageSize)
  },
  onSorterChange: (dataIndex: string, direction: string) => {
    console.log('排序变化:', dataIndex, direction)
  },
  onFilterChange: (dataIndex: string, filteredValues: any[]) => {
    console.log('筛选变化:', dataIndex, filteredValues)
  },
  onRowClick: (record: any) => {
    console.log('行点击:', record)
  },
  onSelectionChange: (rowKeys: (string | number)[]) => {
    console.log('选择变化:', rowKeys)
  }
})

// 生成新数据的函数
export const generateNewData = () => {
  return generateMockData()
}
