//机构信息
const agencyData: any = {
    rules: {},
    FormData:
        [
            {
                type: 'date',
                label: '建档日期',
                prop: "createDate",
                span: 1,
                //disabled: false,
                required: false,
                default: "",
            },
            {
                type: 'input',
                label: '机构地址',
                prop: "address",
                span: 2,
                //disabled: false,
                required: false,
                default: "",
            },
            {
                type: 'input',
                label: '注册名称',
                prop: "name",
                span: 3,
                //disabled: false,
                required: false,
                default: "",
            },
            // {
            //     type: 'input',
            //     label: '统一信用代码',
            //     prop: "namdae",
            //     span: 1,
            //     //disabled: false,
            //     required: false,
            //     default: "",
            // },
            {
                type: 'input',
                label: '所属区域',
                prop: "region",
                span: 3,
                //disabled: false,
                required: false,
                default: "",
                // childs: [
                //     {
                //         label: '是',
                //         value: '1'
                //     },
                //     {
                //         label: '否',
                //         value: '0'
                //     }
                // ]
            },
            {
                type: 'select',
                label: '运营模式',
                prop: "operationMode",
                span: 1,
                //disabled: false,
                required: false,
                default: "",
                childs: [
                    {
                        label: '公立',
                        value: '0',

                    },
                    {
                        label: '民营',
                        value: '1',
                    },
                    {
                        label: '共建民营',
                        value: '2',
                    }
                ]
            },
            // {
            //     type: 'select',
            //     label: '是否公建民营',
            //     prop: "oemIvd",
            //     span: 1,
            //     //disabled: false,
            //     required: false,
            //     default: "",
            // },
            {
                type: 'input',
                label: '邮政编码',
                prop: "postalCode",
                span: 1,
                //disabled: false,
                required: false,
                default: "",
            },
            {
                type: 'input',
                label: '联系电话',
                prop: "telephone",
                span: 1,
                //disabled: false,
                required: false,
                default: "",
            },
             {
                type: 'input',
                label: '负责人电话',
                prop: "directorPhone",
                span: 3,
                //disabled: false,
                required: false,
                default: "",
            },
            // {
            //     type: 'textarea',
            //     label: '机构介绍',
            //     prop: "oemqwId",
            //     span: 3,
            //     //disabled: false,
            //     required: false,
            //     default: "",
            // }
        ]
}
//法人信息
const legalData = {
    rules: {},
    FormData:
        [
            // {
            //     type: 'input',
            //     label: '负责人电话',
            //     prop: "directorPhone",
            //     span: 1,
            //     //disabled: false,
            //     required: false,
            //     default: "",
            // },
            {
                type: 'sort',
                label: '机构床位总数',
                prop: "totalOrgBeds",
                span: 1,
                disabled: true,
                required: false,
                default: "",
            },
            {
                type: 'sort',
                label: '床位使用总数',
                prop: "totalBedsUsed",
                span: 1,
                disabled: true,

                required: false,
                default: "",
            },
            {
                type: 'sort',
                label: '护理床位数量',
                prop: "nursingBedsCount",
                span: 1,
                disabled: true,

                required: false,
                default: "",
            },
            // {
            //     type: 'sort',
            //     label: '家庭床位数量',
            //     prop: "descrviption",
            //     span: 1,
            //     disabled: true,

            //     required: false,
            //     default: "",
            //     // childs: [
            //     //     {
            //     //         label: '是',
            //     //         value:'1'
            //     //     },
            //     //      {
            //     //         label: '否',
            //     //         value:'0'
            //     //     }
            //     // ]
            // },
            {
                type: 'sort',
                label: '入住人员总数',
                prop: "totalCheckIn",
                span: 1,
                disabled: true,

                required: false,
                default: "",
            },
            {
                type: 'input',
                label: '入住率',
                prop: "occupancyRate",
                span: 1,
                disabled: true,

                required: false,
                default: "",
                max: 100
            },
            // {
            //     type: 'input',
            //     label: '邮政编码',
            //     prop: "oemIasd",
            //     span:1,
            //     //disabled: false,
            //     required: false,
            //     default: "",
            // },
            //  {
            //     type: 'input',
            //     label: '联系电话',
            //     prop: "oemIvfd",
            //     span:1,
            //     //disabled: false,
            //     required: false,
            //     default: "",
            // },
            //   {
            //     type: 'input',
            //     label: '机构介绍',
            //     prop: "oemqwId",
            //     span:2,
            //     //disabled: false,
            //     required: false,
            //     default: "",
            // }
        ]
}
//建设信息
const constructData = {
    labelHeight: '64',
    rules: {},
    FormData:
        [
            {
                type: 'select',
                label: '是否为特困救助供养机构',
                prop: "nadsadme",
                span: 1,
                //disabled: false,
                required: false,
                default: "",
            },
            {
                type: 'input',
                label: '享受政府扶持优惠政策内容',
                prop: "descdsription",
                span: 2,
                //disabled: false,
                required: false,
                default: "",
            },

            {
                type: 'select',
                label: '是否开展居家和社区养老服务',
                prop: "descrviption",
                span: 1,
                //disabled: false,
                required: false,
                default: "",
                childs: [
                    {
                        label: '是',
                        value: '1'
                    },
                    {
                        label: '否',
                        value: '0'
                    }
                ]
            },
            {
                type: 'select',
                label: '是否具备医疗资质',
                prop: "descrviption",
                span: 1,
                //disabled: false,
                required: false,
                default: "",
                childs: [
                    {
                        label: '是',
                        value: '1'
                    },
                    {
                        label: '否',
                        value: '0'
                    }
                ]
            },
            {
                type: 'select',
                label: '是否具备医保定点资质',
                prop: "descrviption",
                span: 1,
                //disabled: false,
                required: false,
                default: "",
                childs: [
                    {
                        label: '是',
                        value: '1'
                    },
                    {
                        label: '否',
                        value: '0'
                    }
                ]
            },
        ]
}
//服务信息
const serveData = {
    labelHeight: '64',
    rules: {},
    FormData:
        [
            {
                type: 'select',
                label: '是否接受失智老人',
                prop: "nadsadme",
                span: 1,
                //disabled: false,
                required: false,
                default: "",
            },
            {
                type: 'sort',
                label: '无自理能力老人数量',
                prop: "descdsription",
                span: 1,
                //disabled: false,
                required: false,
                default: "",
            },

            {
                type: 'select',
                label: '收费方式',
                prop: "descrviption",
                span: 1,
                //disabled: false,
                required: false,
                default: "",
                childs: [
                    {
                        label: '是',
                        value: '1'
                    },
                    {
                        label: '否',
                        value: '0'
                    }
                ]
            },
            {
                type: 'select',
                label: '是否采用会员制收费',
                prop: "descrviption",
                span: 1,
                //disabled: false,
                required: false,
                default: "",
                childs: [
                    {
                        label: '是',
                        value: '1'
                    },
                    {
                        label: '否',
                        value: '0'
                    }
                ]
            },
            {
                type: 'sort',
                label: '押金/备用金',
                prop: "descrviption",
                span: 1,
                //disabled: false,
                required: false,
                default: "",
                // childs: [
                //     {
                //         label: '是',
                //         value:'1'
                //     },
                //      {
                //         label: '否',
                //         value:'0'
                //     }
                // ]
            },
            {
                type: 'sort',
                label: '总收费',
                prop: "descdsription",
                span: 1,
                //disabled: false,
                required: false,
                default: "",
            },
            {
                type: 'sort',
                label: '床位费',
                prop: "descdsription",
                span: 1,
                //disabled: false,
                required: false,
                default: "",
            },
            {
                type: 'sort',
                label: '膳食费',
                prop: "descdsription",
                span: 1,
                //disabled: false,
                required: false,
                default: "",
            },
            {
                type: 'sort',
                label: '其他费用',
                prop: "descdsription",
                span: 1,
                //disabled: false,
                required: false,
                default: "",
            },
        ]
}

//角色管理
const roleTable: any = {
      defaultConfig: {
        DOMTool: false,
        DOMPage: true,
        stripe: false, //斑马线条纹
        border: 'inner', //边框样式
        seq: true, //排序
        checkbox:true,//复选框
        activeConfig: {
            active: true,
             width: 300,
        },
    },
    editConfig: {
        title: '编辑角色',
        lableWidth: 100,
        rules: {},
        FormData: [
        // {
        //     type: 'select',
        //     label: '所属区域',
        //     prop: "meiceRegionId",
        //     //disabled: false,
        //     childs: [
        //         {
        //             label: "中国",
        //             value:"CN"
        //         },
        //          {
        //             label: "亚太",
        //             value:"AP"
        //         },
        //          {
        //             label: "欧洲",
        //             value:"EU"
        //         }
        //     ],
        //     required: false,
        //     // default: "",
        // },
        {
            type: 'input',
            label: '角色名称',
            prop: "name",
            //disabled: false,
            //childs: [],
            required: false,
            // default: "",
        },
           {
            type: 'input',
            label: '角色说明',
            prop: "description",
            //disabled: false,
            //childs: [],
            required: false,
            // default: "",
        },
        {
            type: 'switch',
            label: '状态',
            prop: "status",
            //disabled: false,
            //childs: [],
            required: false,
            open: '启用',
            close: '禁用',
            
            
            // default: "",
        }
        

            // {
            //     type: 'sort',
            //     label: '赠送数量',
            //     prop: "freeObsNum",
            //     //disabled: false,
            //     default: 0,
            // },

    
        ]
    },
    columns: [
        {
            title: '角色',
            key: 'name',
            minWidth: 150,
        },
        {
            title: '角色说明',
            key: 'description',
            minWidth: 250,
        },
        // {
        //     title: '创建时间',
        //     key: 'freeObsNum',
        //     minWidth: 230,
        // },


        {
            title: '角色状态',
            key: 'status',
            slot: true,
            minWidth: 100,
        }
    ]
}
// 创建角色
const createRole: any = {
    rules:[],
    FormData: [
        {
            type: 'input',
            label: '角色名称',
            prop: "name",
            //disabled: false,
            //childs: [],
            //password: true,
            required: true,
            // default: 0,
        },
        //  {
        // type: 'radio',
        // label: '性别',
        // prop: "gender",
        // //disabled: false,
        // childs: [
        //     {
        //         label: "男",
        //         value:"1"
        //     },
        //     {
        //         label: "女",
        //         value:"2"
        //     },
        //     {
        //         label: "未知",
        //         value:"0"
        //     }
        // ],
        // required: true,
        // // default: "",
        // },
        // {
        //     type: 'input',
        //     label: '手机号',
        //     prop: "phone",
        //     //disabled: false,
        //     //childs: [],
        //     //password: true,
        //     required: true,
        //     // default: 0,
        // },
        {
            type: 'input',
            label: '说明',
            prop: "description",
            //disabled: false,
            //childs: [],
            //password: true,
            required: true,
            // default: 0,
        },
        {
            type: 'switch',
            label: '状态',
            prop: "status",
            //disabled: false,
            //childs: [],
            //password: true,
            //required: true,
            open: '启用',
            close: '禁用',
        }
    ],
}

//用户管理
const accountTable: any = {
    defaultConfig: {
      DOMTool: false,
      DOMPage: true,
      stripe: false, //斑马线条纹
      border: 'inner', //边框样式
      seq: true, //排序
      checkbox:true,//复选框
      activeConfig: {
          active: true,
           width: 300,
      },
  },
  editConfig: {
      title: '编辑角色',
      lableWidth: 100,
      rules: {},
      FormData: [
      // {
      //     type: 'select',
      //     label: '所属区域',
      //     prop: "meiceRegionId",
      //     //disabled: false,
      //     childs: [
      //         {
      //             label: "中国",
      //             value:"CN"
      //         },
      //          {
      //             label: "亚太",
      //             value:"AP"
      //         },
      //          {
      //             label: "欧洲",
      //             value:"EU"
      //         }
      //     ],
      //     required: false,
      //     // default: "",
    //   // },
      {
        type: 'input',
        label: '账号',
        prop: "account",
        disabled: true,
        //childs: [],
        required: false,
        // default: "",
    },
    {
        type: 'input',
        label: '手机号',
        prop: "phone",
        disabled: true,
        //childs: [],
        required: true,
        // default: "",
    },
      {
          type: 'input',
          label: '用户姓名',
          prop: "name",
          //disabled: false,
          //childs: [],
          required: true,
          // default: "",
      },

      {
        type: 'select',
        label: '性别',
        prop: "gender",
        //disabled: false,
        childs: [
            {
                label: "男",
                value:1
            },
            {
                label: "女",
                value:2
            },
            {
                label: "未知",
                value:0
            }
        ],
        // required: true,
        // default: "",
        },
       

         {
          type: 'input',
          label: '角色说明',
          prop: "description",
          //disabled: false,
          //childs: [],
          required: false,
          // default: "",
      },
    //   {
    //       type: 'switch',
    //       label: '状态',
    //       prop: "status",
    //       //disabled: false,
    //       //childs: [],
    //       required: false,
    //       open: "启用",
    //       close: "禁用",
    //   }
      

          // {
          //     type: 'sort',
          //     label: '赠送数量',
          //     prop: "freeObsNum",
          //     //disabled: false,
          //     default: 0,
          // },

  
      ]
  },
  columns: [
      {
          title: '姓名',
          key: 'name',
          minWidth: 150,
      },
      {
        title: '性别',
        key: 'gender',
        slot: true,
        minWidth: 100,
    },
      {
          title: '手机号',
          key: 'phone',
          minWidth: 250,
      },
      // {
      //     title: '创建时间',
      //     key: 'freeObsNum',
      //     minWidth: 230,
      // },


      {
          title: '角色状态',
          key: 'status',
          slot: true,
          minWidth: 100,
      }
  ]
}

// 更新密码
const accountUpdate = {
    rules:[],
    FormData: [
        {
            type: 'input',
            label: '旧密码',
            prop: "oldPassword",
            password: true,
            //disabled: false,
            //childs: [],
            required: true,
            // default: 0,
        },
        {
            type: 'input',
            label: '新密码',
            prop: "newPassword",
            //disabled: false,
            //childs: [],
            password: true,
            required: true,
            // default: 0,
        }
    ],
}

// 添加管理员
const accountCreateAdmin = {
    rules:[],
    FormData: [
        {
            type: 'input',
            label: '账号',
            prop: "account",
            //password: true,
            //disabled: false,
            //childs: [],
            required: true,
            // default: 0,
        },
        {
            type: 'input',
            label: '手机号',
            prop: "phone",
            //disabled: false,
            //childs: [],
            //password: true,
            required: true,
            // default: 0,
        },
        {
            type: 'input',
            label: '用户姓名',
            prop: "name",
            //disabled: false,
            //childs: [],
            //password: true,
            required: true,
            // default: 0,
        },
         {
        type: 'select',
        label: '性别',
        prop: "gender",
        //disabled: false,
        childs: [
            {
                label: "男",
                value:"1"
            },
            {
                label: "女",
                value:"2"
            },
            {
                label: "未知",
                value:"0"
            }
        ],
        required: true,
        // default: "",
        },
        {
            type: 'select',
            label: '角色',
            prop: "roleIds",
            //disabled: false,
            childs: [],
            //password: true,
            required: true,
            // default: 0,
        },
   
        {
            type: 'input',
            label: '账号密码',
            prop: "password",
            //disabled: false,
            //childs: [],
            password: true,
            required: true,
            // default: 0,
        },
        {
            type: 'input',
            label: '备注',
            prop: "description",
            //disabled: false,
            //childs: [],
            //password: true,
            required: true,
            // default: 0,
        },
        {
            type: 'switch',
            label: '状态',
            prop: "status",
            //disabled: false,
            //childs: [],
            //password: true,
            //required: true,
            open: '启用',
            close: '禁用',
        }
    ],
}


export {
    agencyData,
    legalData,
    constructData,
    serveData,
    roleTable,
    createRole,
    accountTable,
    accountUpdate,
    accountCreateAdmin
}