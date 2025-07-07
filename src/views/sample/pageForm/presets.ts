export const formPresets = {
  userInfo: [
    { type: 'input', label: '用户名', model: 'username', validate: true },
    { type: 'inputPassword', label: '密码', model: 'password', validate: true },
    { type: 'input', label: '邮箱', model: 'email', validate: true }
  ],
  addressForm: [
    { type: 'input', label: '收件人', model: 'receiver', validate: true },
    { type: 'input', label: '手机号', model: 'phone', validate: true },
    { type: 'cascader', label: '地区', model: 'region', validate: true, options: [] },
    { type: 'inputTextarea', label: '详细地址', model: 'address', validate: true }
  ],
  // 更多预设...
}