
const LogTable:any = {
    defaultConfig: {
      DOMTool: false,
      DOMPage: true,
      stripe: false, //斑马线条纹
      border: 'inner', //边框样式
      seq: true, //排序
      checkbox:false,//复选框
      activeConfig: null,
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
    //   {
    //     type: 'input',
    //     label: '账号',
    //     prop: "account",
    //     disabled: true,
    //     //childs: [],
    //     required: false,
    //     // default: "",
    // },
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
        required: true,
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
          title: '日志内容',
          key: 'notes',
          minWidth: 150,
      },
      {
        title: '设备名称',
        key: 'deviceName',
        // slot: true,
        minWidth: 150,
    },
      {
          title: '设备Id',
          key: 'deviceId',
          minWidth: 150,
      },
      {
          title: '时间',
          key: 'createTime',
          minWidth: 200,
      },

      {
        title: '床位',
        key: 'roomBedNumber',
        minWidth: 150,
    },
      {
          title: '护理员名称',
          key: 'nursingName',
          minWidth: 150,
      },
      {
        title: '老人名称',
        key: 'elderlyName',
        minWidth: 150,
    }
  ]
}


 export {LogTable}
