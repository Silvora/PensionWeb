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

const elderTable: any = {
    defaultConfig: {
        DOMTool: false,
        DOMPage: true,
        stripe: false, //斑马线条纹
        border: 'inner', //边框样式
        seq: true, //排序
        checkbox: true,//复选框
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
        {
                type: 'input',
                label: '姓名',
                prop: "name",
                //disabled: false,
                //childs: [],
                required: false,
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
                        value: 1
                    },
                    {
                        label: "女",
                        value: 2
                    },
                    {
                        label: "未知",
                        value: 0
                    }
                ],
                required: false,
                // default: "",
            },
             {
                type: 'date',
                label: '生日',
                prop: "birthday",
                //disabled: false,
                //childs: [],
                required: false,
                // default: "",
            },
            {
                type: 'input',
                label: '联系电话',
                prop: "phone",
                //disabled: false,
                //childs: [],
                required: false,
                // default: "",
            },
           
             {
                type: 'input',
                label: '血型',
                prop: "bloodType",
                //disabled: false,
                //childs: [],
                required: false,
                // default: "",
            },
             
            {
                type: 'input',
                label: '身份证号',
                prop: "idNumber",
                //disabled: false,
                //childs: [],
                required: false,
                // default: "",
            },
              {
                type: 'sort',
                label: '家庭人口',
                prop: "familyPopulation",
                //disabled: false,
                //childs: [],
                required: false,
                // default: "",
            },
            {
                type: 'input',
                label: '家庭地址',
                prop: "address",
                //disabled: false,
                //childs: [],
                required: false,
                // default: "",
            },
             {
                type: 'input',
                label: '户籍地址',
                prop: "domicileAddress",
                //disabled: false,
                //childs: [],
                required: false,
                // default: "",
            },
            {
                type: 'input',
                label: '经济来源',
                prop: "financial",
                //disabled: false,
                //childs: [],
                required: false,
                // default: "",
            },
             {
                type: 'select',
                label: '是否本地户籍',
                prop: "localDomicile",
                //disabled: false,
                childs: [
                     {
                        label: "是",
                        value: 0
                    },
                     {
                        label: "否",
                        value: 1
                    },
                ],
                required: false,
                // default: "",
            },
            {
                type: 'input',
                label: '婚姻状况',
                prop: "maritalStatus",
                //disabled: false,
                //childs: [],
                required: false,
                // default: "",
            },
            {
                type: 'input',
                label: '医保卡号',
                prop: "medicalNumber",
                //disabled: false,
                //childs: [],
                required: false,
                // default: "",
            },
                     {
                type: 'input',
                label: '医疗保障',
                prop: "healthCare",
                //disabled: false,
                //childs: [],
                required: false,
                // default: "",
            },
            {
                type: 'input',
                label: '饮食特点',
                prop: "dietary",
                //disabled: false,
                //childs: [],
                required: false,
                // default: "",
            },
   
           
           
            {
                type: 'input',
                label: '劳动能力',
                prop: "laborCapacity",
                //disabled: false,
                //childs: [],
                required: false,
                // default: "",
            },

            {
                type: 'input',
                label: '个人爱好',
                prop: "personalHobbies",
                //disabled: false,
                //childs: [],
                required: false,
                // default: "",
            },
            {
                type: 'input',
                label: '性格心理',
                prop: "personality",
                //disabled: false,
                //childs: [],
                required: false,
                // default: "",
            },
            
             {
                type: 'input',
                label: '居住人情况',
                prop: "residentSituation",
                //disabled: false,
                //childs: [],
                required: false,
                // default: "",
            },
             
            {
                type: 'input',
                label: '备注',
                prop: "notes",
                //disabled: false,
                //childs: [],
                required: false,
                // default: "",
            },


         

            {
                type: 'input',
                label: '经办人',
                prop: "operator",
                disabled: true,
                //childs: [],
                required: false,
                // default: "",
            },
               {
                type: 'input',
                label: '图片',
                prop: "photo",
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
            slot: 'gender',
            key: 'gender',
            minWidth: 150,
        },
        {
            title: '联系电话',
            key: 'phone',
            minWidth: 200,
        },

        {
            title: '生日',
            key: 'birthDate',
            minWidth: 150,
        },

        // {
        //     title: '入住时间',
        //     key: 'birthDate',
        //     minWidth: 150,
        // }
        {
            title: '经办人',
            key: 'operator',
            minWidth: 150,
        },

    ]
}


export {
    agencyData,
    legalData,
    constructData,
    serveData,
    elderTable
}