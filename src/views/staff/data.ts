
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
             width: 200,
        },
    },
    
    editConfig: {
        title: '编辑员工',
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
            label: '设备名称',
            prop: "deviceName",
            //disabled: false,
            //childs: [],
            required: false,
            // default: "",
        },
           {
            type: 'input',
            label: '设备号',
            prop: "deviceNo",
            //disabled: false,
            //childs: [],
            required: false,
            // default: "",
        },
        

    {
                type: 'sort',
                label: '赠送数量',
                prop: "freeObsNum",
                //disabled: false,
                default: 0,
            },

    
        ]
    },
    columns: [
        {
            title: '员工姓名',
            key: 'name',
            minWidth: 100,
        },
        {
            title: '性别',
            key: 'gender',
            minWidth: 80,
            slot:'gender',
        },
        {
            title: '工种',
            key: 'roleName',
            minWidth: 100,
        },
        {
            title: '入职时间',
            key: 'entryTime',
            minWidth: 150,
        },

        // {
        //     title: '角色状态',
        //     key: 'superiorId',
        //     slot: true,
        //     minWidth: 100,
        // }
    ]
}

// 添加用户
const roleData: any = {
    rules: {},
    FormData: [
        {
            type: 'input',
            label: '员工姓名',
            prop: "name",
                span: 1,
                //disabled: false,
                required: false,
                default: "",
        },
        {
            type: 'input',
            label: '英文名',
            prop: "englishName",
            //disabled: false,
            span: 1,
                //disabled: false,
                required: false,
                default: "",
        },
        {
                 type: 'select',
            label: '性别',
            prop: "gender",
                span: 1,
                //disabled: false,
            childs: [
                {
                    label: '未知',
                    value: 0
                },
                {
                    label: '男',
                    value: 1
                },
                {
                    label: '女',
                    value: 2
                }
            ],
                required: false,
                default: "",
        },


         {
            type: 'date',
            label: '生日',
            prop: "birthday",
            //disabled: false,
            span: 1,
                //disabled: false,
                required: false,
                default: "",
        },
         {
            type: 'input',
            label: '身份证号',
            prop: "idNumber",
            //disabled: false,
            span: 1,
                //disabled: false,
                required: false,
                default: "",
        },
         
         {
            type: 'input',
            label: '联系电话',
            prop: "phone",
            //disabled: false,
            span: 1,
                //disabled: false,
                required: false,
                default: "",
        },
 
         
         
         {
            type: 'select',
            label: '文化程度',
            prop: "educationLevel",
            //disabled: false,
            childs: [
                {
                    label: '中学以下',
                    value: '中学以下'
                },
                {
                    label: '中学',
                    value: '中学'
                },
                     {
                    label: '大学',
                    value: '大学'
                 }  ,
                  {
                    label: '大学以上',
                    value: '大学以上'
                }  
            ],
            span: 1,
                //disabled: false,
                required: false,
                default: "",
        },

   
          
          {
            type: 'select',
            label: '职业等级',
            prop: "jobLevel",
            //disabled: false,
            childs: [
                {
                    label: '三级',
                    value: 0
                },
                {
                    label: '二级',
                    value: 1
                },
                {
                    label: '一级',
                    value: 2,

                },
                {
                    label: '特一级',
                    value: 3
                },
                {
                    label: '特二级',
                    value: 4
                },
                {
                    label: '特三级',
                    value: 5
                },
                {
                    label: '专需护理',
                    value: 6
                }
            ],
            span: 1,
                //disabled: false,
                required: false,
                default: "",
        },
                      {
            type: 'select',
            label: '角色',
            prop: "roleId",
            //disabled: false,
            childs: [
                {
                    label: '管理员',
                    value: '管理员'
                }
            ],
            span: 1,
                //disabled: false,
                required: false,
                default: "",
        },

        //  {
        //     type: 'select',
        //     label: '所属小组',
        //     prop: "groupId",
        //     //disabled: false,
        //     childs: [
        //         {
        //             label: '管理员',
        //             value: '管理员'
        //         }
        //     ],
        //     span: 1,
        //         //disabled: false,
        //         required: false,
        //         default: "",
        // },
          
        //    {
        //     type: 'select',
        //     label: '直属上级',
        //     prop: "superiorId",
        //     //disabled: false,
        //     childs: [
        //         {
        //             label: '管理员',
        //             value: '管理员'
        //         }
        //     ],
        //     span: 1,
        //         //disabled: false,
        //         required: false,
        //         default: "",
        // },
          

    ]
}

export {
    roleData,
    roleTable
}