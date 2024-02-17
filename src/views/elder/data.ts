//机构信息
const agencyData: any = {
    rules: {},
    FormData:
        [
            {
                type: 'input',
                label: '建档日期',
                prop: "nadsadme",
                span: 1,
                //disabled: false,
                required: false,
                default: "",
            },
            {
                type: 'input',
                label: '机构地址',
                prop: "descdsription",
                span: 2,
                //disabled: false,
                required: false,
                default: "",
            },
            {
                type: 'input',
                label: '注册名称',
                prop: "oemvfdId",
                span: 1,
                //disabled: false,
                required: false,
                default: "",
            },
            {
                type: 'input',
                label: '统一信用代码',
                prop: "namdae",
                span: 1,
                //disabled: false,
                required: false,
                default: "",
            },
            {
                type: 'select',
                label: '所属区域',
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
                type: 'input',
                label: '运营模式',
                prop: "oemIad",
                span: 1,
                //disabled: false,
                required: false,
                default: "",
            },
            {
                type: 'select',
                label: '是否公建民营',
                prop: "oemIvd",
                span: 1,
                //disabled: false,
                required: false,
                default: "",
            },
            {
                type: 'input',
                label: '邮政编码',
                prop: "oemIasd",
                span: 1,
                //disabled: false,
                required: false,
                default: "",
            },
            {
                type: 'input',
                label: '联系电话',
                prop: "oemIvfd",
                span: 1,
                //disabled: false,
                required: false,
                default: "",
            },
            {
                type: 'input',
                label: '机构介绍',
                prop: "oemqwId",
                span: 2,
                //disabled: false,
                required: false,
                default: "",
            }
        ]
}
//法人信息
const legalData = {
    rules: {},
    FormData:
        [
            {
                type: 'input',
                label: '负责人电话',
                prop: "nadsadme",
                span: 1,
                //disabled: false,
                required: false,
                default: "",
            },
            {
                type: 'sort',
                label: '机构床位总数',
                prop: "descdsription",
                span: 1,
                //disabled: false,
                required: false,
                default: "",
            },
            {
                type: 'sort',
                label: '床位使用总数',
                prop: "oemvfdId",
                span: 1,
                //disabled: false,
                required: false,
                default: "",
            },
            {
                type: 'sort',
                label: '护理床位数量',
                prop: "namdae",
                span: 1,
                //disabled: false,
                required: false,
                default: "",
            },
            {
                type: 'sort',
                label: '家庭床位数量',
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
                label: '入住人员总数',
                prop: "oemIad",
                span: 1,
                //disabled: false,
                required: false,
                default: "",
            },
            {
                type: 'sort',
                label: '入住率',
                prop: "oemIvd",
                span: 1,
                //disabled: false,
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
            title: '姓名',
            key: 'name',
            minWidth: 150,
        },
        {
            title: '性别',
            key: 'gender',
            minWidth: 150,
        },
        {
            title: '生日',
            key: 'birthDate',
            minWidth: 150,
        },

        // {
        //     title: '入住时间',
        //     key: 'birthday',
        //     minWidth: 150,
        // },

    ]
}


export {
    agencyData,
    legalData,
    constructData,
    serveData,
    roleTable
}