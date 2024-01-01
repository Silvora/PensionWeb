
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
            title: '角色',
            key: 'deviceName',
            minWidth: 150,
        },
        {
            title: '角色说明',
            key: 'deviceNo',
            minWidth: 250,
        },
        {
            title: '创建时间',
            key: 'freeObsNum',
            minWidth: 230,
        },


        {
            title: '角色状态',
            key: 'deviceStatus',
            slot: true,
            minWidth: 100,
        }
    ]
}


export {
    roleTable
}