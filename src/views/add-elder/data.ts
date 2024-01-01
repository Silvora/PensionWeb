// 基本信息
const baseInfo: any = {
    rules: {},
    FormData:
        [
            {
                type: 'date',
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
//家属信息
const familyInfo: any = {
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
        title: '编辑家属',
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
            label: '姓名',
            prop: "deviceName",
            //disabled: false,
            //childs: [],
            required: false,
            // default: "",
        },
           {
            type: 'input',
            label: '联系电话',
            prop: "deviceNo",
            //disabled: false,
            //childs: [],
            required: false,
            // default: "",
            },
        
             {
            type: 'input',
            label: '身份证号',
            prop: "deviceNo",
            //disabled: false,
            //childs: [],
            required: false,
            // default: "",
            },
             
              {
            type: 'select',
            label: '性别',
            prop: "deviceNo",
            //disabled: false,
            childs: [],
            required: false,
            // default: "",
            },
               {
            type: 'select',
            label: '与老人关系',
            prop: "deviceNo",
            //disabled: false,
            childs: [],
            required: false,
            // default: "",
            },
                  {
            type: 'select',
            label: '是否监护人',
            prop: "deviceNo",
            //disabled: false,
            childs: [],
            required: false,
            // default: "",
        },
        
                  {
            type: 'textarea',
            label: '联系地址',
            prop: "deviceNo",
            //disabled: false,
            childs: [],
            required: false,
            // default: "",
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
// 健康信息
const healthyInfo: any = {
    rules: {},
    FormData:
        [
            {
                type: 'select',
                label: '自理情况',
                prop: "nadsadme",
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
                label: '视力',
                prop: "nadsadme",
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
                label: '听力',
                prop: "nadsadme",
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
                label: '主治医院',
                prop: "oemvfdId",
                span: 1,
                //disabled: false,
                required: false,
                default: "",
            },
            {
                type: 'input',
                label: '主治医师',
                prop: "namdae",
                span: 1,
                //disabled: false,
                required: false,
                default: "",
            },
{
                type: 'input',
                label: '医院电话',
                prop: "namdae",
                span: 1,
                //disabled: false,
                required: false,
                default: "",
            },
{
                type: 'input',
                label: '过敏药物',
                prop: "namdae",
                span: 3,
                //disabled: false,
                required: false,
                default: "",
            },


            {
                type: 'input',
                label: '主要疾病',
                prop: "oemIad",
                span: 2,
                //disabled: false,
                required: false,
                default: "",
            },
              {
                type: 'input',
                label: '其他疾病',
                prop: "oemIad",
                span: 1,
                //disabled: false,
                required: false,
                default: "",
            },
            
            {
                type: 'input',
                label: '病史',
                prop: "oemIad",
                span: 3,
                //disabled: false,
                required: false,
                default: "",
            }
        ]
}

// 健康信息
const careInfo: any = {
    rules: {},
    FormData:
        [
            {
                type: 'select',
                label: '护理级别',
                prop: "nadsadme",
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
                label: '备注',
                prop: "oemvfdId",
                span: 2,
                //disabled: false,
                required: false,
                default: "",
            },
            {
                type: 'input',
                label: '护理级别费用',
                prop: "oemvfdId",
                span: 1,
                //disabled: false,
                required: false,
                default: "",
            },
            {
                type: 'input',
                label: '私人定制',
                prop: "oemvfdId",
                span: 1,
                //disabled: false,
                required: false,
                default: "",
            },
            {
                type: 'input',
                label: '护理总费用',
                prop: "oemvfdId",
                span: 1,
                //disabled: false,
                required: false,
                default: "",
            },
        ]
}
//餐饮
const foodInfo: any = {
    rules: {},
    FormData:
        [
            {
                type: 'select',
                label: '选择套餐',
                prop: "nadsadme",
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
                label: '套餐费用',
                prop: "oemvfdId",
                span: 1,
                //disabled: false,
                required: false,
                default: "",
            },
            {
                type: 'input',
                label: '档案编号',
                prop: "oemvfdId",
                span: 1,
                //disabled: false,
                required: false,
                default: "",
            },
            {
                type: 'input',
                label: '备注说明',
                prop: "oemvfdId",
                span: 3,
                //disabled: false,
                required: false,
                default: "",
            },
        ]
}
//床位
const bedInfo: any = {

    rules: {},
     FormData:
        [
             {
                type: 'select',
                label: '入住日期',
                prop: "nadsadme",
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
                label: '入住楼栋',
                prop: "nadsadme",
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
                label: '入住楼层',
                prop: "nadsadme",
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
                label: '入住房号',
                prop: "nadsadme",
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
                label: '入住床位',
                prop: "nadsadme",
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
                label: '床位费',
                prop: "oemvfdId",
                span: 1,
                //disabled: false,
                required: false,
                default: "",
            },
                 {
                type: 'input',
                label: '备注说明',
                prop: "oemvfdId",
                span: 3,
                //disabled: false,
                required: false,
                default: "",
            },
        ]
}

//合同
const contractInfo: any = {

    rules: {},
     FormData:
        [
             
              {
                type: 'input',
                label: '客户姓名',
                prop: "oemvfdId",
                span: 1,
                //disabled: false,
                required: false,
                default: "",
            },
                 {
                type: 'input',
                label: '联系地址',
                prop: "oemvfdId",
                span: 2,
                //disabled: false,
                required: false,
                default: "",
             },
                 {
                type: 'select',
                label: '入住房型',
                prop: "nadsadme",
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
                label: '到期时间',
                prop: "nadsadme",
                span: 2,
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
                label: '入院押金',
                prop: "oemvfdId",
                span: 1,
                //disabled: false,
                required: false,
                default: "",
            },
                 {
                type: 'input',
                label: '医疗保证金',
                prop: "oemvfdId",
                span: 1,
                //disabled: false,
                required: false,
                default: "",
             },
        ]
}


export {
    baseInfo,
    familyInfo,
    healthyInfo,
    careInfo,
    foodInfo,
    bedInfo,
    contractInfo
}