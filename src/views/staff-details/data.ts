
const nursingTable: any = {
      defaultConfig: {
        DOMTool: false,
        DOMPage: false,
        stripe: false, //斑马线条纹
        border: 'inner', //边框样式
        seq: true, //排序
        checkbox:false,//复选框
        activeConfig: {
            active: false,
             width: 200,
        },
    },
    editConfig: {
        title: '编辑门店',
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
            title: '姓名',
            key: 'elderlyName',
            minWidth: 100,
        },
        {
            title: '档案号',
            key: 'elderlyFileNo',
            minWidth: 150,
        },
        {
            title: '护理等级',
            key: 'nursingGrade',
            slot: true,
            minWidth: 100,
        },

        // {
        //     title: '服务项目数量',
        //     key: 'serviceCount',
        //     minWidth: 100,
        // }
    ]
}

const nuresTable: any = {
      defaultConfig: {
        DOMTool: false,
        DOMPage: false,
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
        title: '编辑门店',
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
            title: '项目名称',
            key: 'nursingName',
            minWidth: 100,
            align: 'center'
        },
        // {
        //     title: '所属类别',
        //     key: 'nurseId',
        //     minWidth: 100,
        //     align: 'center'
        // },
        {
            title: '项目费用',
            key: 'price',
            minWidth: 100,
            align: 'center'
        },
        {
            title: '执行频次',
            key: 'repeatValue',
            minWidth: 100,
            align: 'center'
        },
        {
            title: '执行时间',
            key: 'nursingTime',
            minWidth: 100,
            align: 'center'
        },
        {
            title: '状态',
            key: 'status',
            slot: 'status',
            minWidth: 100,
            align: 'center'
        },
        {
            title: '操作',
            // key: 'active',
            slot: 'action',
            minWidth: 200,
            align: 'center'
        }
        
    ]
}


const editConfig: any = {
    title: '编辑门店',
    lableWidth: 100,
    rules: {},
    FormData: [
        {
            type: 'input',
            label: '护理名称',
            prop: "nursingName",
            //disabled: false,
            //childs: [],
            required: false,
            // default: "",
        },
        {
            type: 'time',
            label: '护理时间',
            prop: "nursingTimeStr",
            //disabled: false,
            //childs: [],
            required: false,
            // default: "",
        },
        {
            type: 'sort',
            label: '项目费用',
            prop: "price",
            //disabled: false,
            //childs: [],
            required: false,
            default: 0,
        },
        {
            type: 'input',
            label: '执行日期',
            prop: "repeatValue",
            //disabled: false,
            //childs: [],
            required: false,
            // default: "",
        },
        {
            type: 'select',
            label: '执行单位',
            prop: "unit",
            //disabled: false,
            childs: [
                {
                    label: "无",
                    value:"0"
                },
                {
                    label: "日",
                    value:"1"
                },
                {
                    label: "周",
                    value:"2"
                },
                {
                    label: "月",
                    value:"3"
                }
            ],
            required: false,
            // default: "",
        },
    ]
}


export {
    nursingTable,
    nuresTable,
    editConfig
}