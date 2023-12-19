const defaultRules = {
  "account": [
    { "required": true, "message": "请输入登录账户", "trigger": "blur" }
  ],
  "accountName": [
    { "required": true, "message": "请输入账号名称", "trigger": "blur" }
  ],
  "oemId": [
    { "required": true, "message": "请输入组织机构", "trigger": "blur" }
  ],
  "roleId": [
    { "required": true, "message": "请选择角色", "trigger": "change" }
  ],
  "compName": [
    { "required": true, "message": "请输入公司名称", "trigger": "blur" }
  ],
  "phone": [
    { "required": true, "message": "请输入手机号", "trigger": "blur" },
    {
                        required: true,
                        pattern:
                            /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
                        message: '请输入正确手机号'
   }
  ],
  "password": [
    { "required": true, "message": "请输入密码", "trigger": "blur" }
  ],
  "checkPassword": [
    { "required": true, "message": "请输入密码确认", "trigger": "blur" },
  ]
}
const ruleList = [
  {
    label: '登录账户',
    value: 'account',
    require: true,
    trigger: 'blur'
  },
  {
    label: '账号名称',
    value: 'accountName',
    require: true,
    trigger: 'blur'
  },
  {
    label: '公司名称',
    value: 'compName',
    require: true,
    trigger: 'blur'
  },
  {
    label: '组织机构',
    value: 'oemId',
    require: true,
    trigger: 'change'
  },
  {
    label: '角色',
    value: 'roleId',
    require: true,
    trigger: 'change'
  },

  {
    label: '密码',
    value: 'password',
    require: true,
    trigger: 'blur'
  },
  {
    label: '密码确认',
    value: 'checkPassword',
    require: true,
    trigger: 'blur'
  },
  {
    label: '密码更新',
    value: 'checkUpdatePassword',
    require: true,
    trigger: 'blur'
  },
  {
    label: '手机号',
    value: 'phone',
    require: true,
    trigger: 'blur'
  },
  {
    label: '角色名称',
    value: 'name',
    require: true,
    trigger: 'blur'
  },
  {
    label: '角色描述',
    value: 'description',
    require: true,
    trigger: 'blur'
  },
  {
    label: '组织机构',
    value: 'oemId',
    require: true,
    trigger: 'blur'
  },
  {
    label: '门店名称',
    value: 'shopName',
    require: true,
    trigger: 'blur'
  },
  {
    label: '联系人',
    value: 'contactName',
    require: true,
    trigger: 'blur'
  },
  {
    label: '联系电话',
    value: 'contactPhone',
    require: true,
    trigger: 'blur'
  },
  {
    label: '城市',
    value: 'city',
    require: true,
    trigger: 'blur'
  },
  {
    label: '地址',
    value: 'address',
    require: true,
    trigger: 'blur'
  },
  // {
  //   label: '上传图片',
  //   value: 'caseImg',
  //   require: true,
  //   trigger: 'change'
  // },
  // {
  //   label: '案例描述',
  //   value: 'caseDesc',
  //   require: true,
  //   trigger: 'blur'
  // },
  {
    label: '产品类型',
    value: 'productType',
    require: true,
    trigger: 'change'
  },
  {
    label: '产品名称',
    value: 'productName',
    require: true,
    trigger: 'change'
  },
  // {
  //   label: '治疗周期',
  //   value: 'treatmentCycle',
  //   require: true,
  //   trigger: 'change'
  // },
  {
    label: '设备名称',
    value: 'deviceName',
    require: true,
    trigger: 'blur'
  },
  {
    label: '设备号',
    value: 'deviceNo',
    require: true,
    trigger: 'blur'
  },
  {
    label: '原始密码',
    value: 'oldPwd',
    require: true,
    trigger: 'blur'
  },
  {
    label: '新密码',
    value: 'newPwd',
    require: true,
    trigger: 'blur'
  },
  {
    label: '新密码',
    value: 'pwd',
    require: true,
    trigger: 'blur'
  },
  {
    label: '确认新密码',
    value: 'checkPass',
    require: true,
    trigger: 'blur'
  },
  {
    label: '形成原因',
    value: 'reason',
    require: true,
    trigger: 'blur'
  },
  // {
  //   label: '产品图片',
  //   value: 'productImg',
  //   require: true,
  //   trigger: 'blur'
  // },
  {
    label: '语言',
    value: 'language',
    require: true,
    trigger: 'change'
  }
  // {
  //   label: '原因图标',
  //   value: 'reasonIcon',
  //   require: true,
  //   trigger: 'blur'
  // }
]
// caseImg: '',
//   caseDesc: '',
//   productType: '',
//   productName: '',
//   treatmentCycle: ''
const ruleValidate: any = {}

ruleList.forEach((item: any) => {
  ruleValidate[item.value] = [
    {
      required: item.require,
      message: `请${item.trigger == 'blur' ? '输入' : '选择'}${item.label}`,
      trigger: item.trigger
    }
  ]
})


// const rules: any = {}


// const getRules = (list:any) => {
//   list.forEach((item: any) => {
//     let ruleItem = ruleList.find(it => it.value == item)
//     if (ruleItem) {
//       rules[item] = {
//             required: true,
//             message: `请${ruleItem.trigger == 'blur' ? '输入' : '选择'}${ruleItem.label}`,
//             trigger: ruleItem.trigger
//       }
//     }
//   })

//   return rules
// }


export default ruleValidate
