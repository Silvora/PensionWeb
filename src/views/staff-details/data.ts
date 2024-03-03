
const roleTable: any = {
      defaultConfig: {
        DOMTool: false,
        DOMPage: true,
        stripe: false, //斑马线条纹
        border: 'inner', //边框样式
        seq: true, //排序
        checkbox:true,//复选框
        activeConfig: {
            active: false,
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
            title: '姓名',
            key: 'elderlyName',
            minWidth: 150,
        },
        {
            title: '档案号',
            key: 'elderlyFileNo',
            minWidth: 250,
        },
        {
            title: '护理等级',
            key: 'nurseLevel',
            minWidth: 230,
        },

        {
            title: '服务项目',
            key: 'serviceCount',
            minWidth: 100,
        }
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
            key: 'nurseName',
            minWidth: 100,
        },
        {
            title: '所属类别',
            key: 'nurseId',
            minWidth: 100,
        },
        {
            title: '项目费用',
            key: 'price',
            minWidth: 80,
        },
        {
            title: '执行频次',
            key: 'repeatValue',
            minWidth: 80,
        },
        {
            title: '执行时间',
            key: 'nurseTimeStr',
            minWidth: 230,
        },
        {
            title: '状态',
            key: 'status',
            // slot: true,
            minWidth: 100,
        }
    ]
}


export {
    roleTable,
    nuresTable
}