import type { HiTableConfigType } from '@/components/HiTable/types/table'

// 生成模拟数据的辅助函数
const generateUserData = (count: number = 20) => {
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
      createTime: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    })
  }
  return data
}

const generateProductData = (count: number = 15) => {
  const categories = ['电子产品', '服装', '食品', '图书', '家居']
  const data = []
  for (let i = 1; i <= count; i++) {
    data.push({
      key: i,
      id: i,
      name: `产品${i}`,
      category: categories[Math.floor(Math.random() * categories.length)],
      price: Math.floor(Math.random() * 1000) + 10,
      stock: Math.floor(Math.random() * 100),
      sales: Math.floor(Math.random() * 500),
      rating: (Math.random() * 2 + 3).toFixed(1),
      createTime: new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    })
  }
  return data
}

const generateOrderData = (count: number = 25) => {
  const statuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled']
  const data = []
  for (let i = 1; i <= count; i++) {
    data.push({
      key: i,
      orderNo: `ORD${String(i).padStart(6, '0')}`,
      customer: `客户${i}`,
      amount: Math.floor(Math.random() * 5000) + 100,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      paymentMethod: Math.random() > 0.5 ? '支付宝' : '微信支付',
      createTime: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      deliveryTime: Math.random() > 0.3 ? new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] : null
    })
  }
  return data
}

export const tablePresets = {
  // 用户管理表格
  userManagement: {
    columns: [
      { title: 'ID', dataIndex: 'id', width: 80, sortable: true, fixed: 'left' },
      { title: '姓名', dataIndex: 'name', width: 120, ellipsis: true },
      { title: '年龄', dataIndex: 'age', width: 80, sortable: true },
      { title: '邮箱', dataIndex: 'email', width: 200, ellipsis: true },
      { title: '手机号', dataIndex: 'phone', width: 140 },
      { title: '地址', dataIndex: 'address', width: 250, ellipsis: true, tooltip: true },
      {
        title: '状态',
        dataIndex: 'status',
        width: 100,
        filterable: {
          filters: [
            { text: '激活', value: 'active' },
            { text: '未激活', value: 'inactive' }
          ]
        }
      },
      { title: '创建时间', dataIndex: 'createTime', width: 120, sortable: true },
      { title: '操作', dataIndex: 'action', width: 150, fixed: 'right', slotName: 'action' }
    ],
    data: generateUserData(),
    size: 'medium',
    bordered: true,
    hoverable: true,
    stripe: true,
    pagination: {
      current: 1,
      pageSize: 10,
      showTotal: true,
      showJumper: true,
      showPageSize: true
    },
    rowSelection: {
      type: 'checkbox',
      selectedRowKeys: [],
      showCheckedAll: true
    },
    scroll: { x: 1200, y: 400 }
  } as HiTableConfigType,

  // 产品列表表格
  productList: {
    columns: [
      { title: 'ID', dataIndex: 'id', width: 80, sortable: true },
      { title: '产品名称', dataIndex: 'name', width: 150, ellipsis: true },
      {
        title: '分类',
        dataIndex: 'category',
        width: 120,
        filterable: {
          filters: [
            { text: '电子产品', value: '电子产品' },
            { text: '服装', value: '服装' },
            { text: '食品', value: '食品' },
            { text: '图书', value: '图书' },
            { text: '家居', value: '家居' }
          ]
        }
      },
      { title: '价格', dataIndex: 'price', width: 100, sortable: true },
      { title: '库存', dataIndex: 'stock', width: 100, sortable: true },
      { title: '销量', dataIndex: 'sales', width: 100, sortable: true },
      { title: '评分', dataIndex: 'rating', width: 100, sortable: true },
      { title: '创建时间', dataIndex: 'createTime', width: 120, sortable: true },
      { title: '操作', dataIndex: 'action', width: 120, slotName: 'action' }
    ],
    data: generateProductData(),
    size: 'small',
    bordered: false,
    hoverable: true,
    stripe: false,
    pagination: {
      current: 1,
      pageSize: 15,
      showTotal: true,
      simple: false
    },
    scroll: { x: 1000 }
  } as HiTableConfigType,

  // 订单管理表格
  orderManagement: {
    columns: [
      { title: '订单号', dataIndex: 'orderNo', width: 140, fixed: 'left' },
      { title: '客户', dataIndex: 'customer', width: 120 },
      { title: '金额', dataIndex: 'amount', width: 120, sortable: true },
      {
        title: '状态',
        dataIndex: 'status',
        width: 120,
        filterable: {
          filters: [
            { text: '待处理', value: 'pending' },
            { text: '处理中', value: 'processing' },
            { text: '已发货', value: 'shipped' },
            { text: '已送达', value: 'delivered' },
            { text: '已取消', value: 'cancelled' }
          ]
        }
      },
      { title: '支付方式', dataIndex: 'paymentMethod', width: 120 },
      { title: '下单时间', dataIndex: 'createTime', width: 120, sortable: true },
      { title: '预计送达', dataIndex: 'deliveryTime', width: 120 },
      { title: '操作', dataIndex: 'action', width: 150, fixed: 'right', slotName: 'action' }
    ],
    data: generateOrderData(),
    size: 'medium',
    bordered: true,
    hoverable: true,
    stripe: true,
    pagination: {
      current: 1,
      pageSize: 20,
      showTotal: true,
      showJumper: true,
      showPageSize: true,
      pageSizeOptions: [10, 20, 50]
    },
    rowSelection: {
      type: 'checkbox',
      selectedRowKeys: []
    },
    scroll: { x: 1100, y: 500 }
  } as HiTableConfigType,

  // 简单表格
  simpleTable: {
    columns: [
      { title: '姓名', dataIndex: 'name', width: 120 },
      { title: '年龄', dataIndex: 'age', width: 80 },
      { title: '邮箱', dataIndex: 'email', width: 200 }
    ],
    data: generateUserData(5).map(item => ({
      key: item.key,
      name: item.name,
      age: item.age,
      email: item.email
    })),
    size: 'medium',
    bordered: false,
    hoverable: false,
    stripe: false,
    pagination: false
  } as HiTableConfigType
}
