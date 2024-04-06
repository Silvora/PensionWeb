
const elderTable: any = {
    defaultConfig: {
        DOMTool: false,
        DOMPage: true,
        stripe: false, //斑马线条纹
        border: 'inner', //边框样式
        seq: true, //排序
        checkbox: false,//复选框
        activeConfig: {
            active: true,
            width: 150,
        },
    },
    editConfig: {
        title: '编辑长者',
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
            minWidth: 100,
        },
        {
            title: '性别',
            slot: 'gender',
            key: 'gender',
            minWidth: 80,
        },
        {
            title: '联系电话',
            key: 'phone',
            minWidth: 150,
        },

        {
            title: '生日',
            key: 'birthDate',
            minWidth: 130,
        },

        // {
        //     title: '入住时间',
        //     key: 'birthDate',
        //     minWidth: 150,
        // }
        {
            title: '经办人',
            key: 'operator',
            minWidth: 100,
        },

    ]
}

const memoData: any = {
    rules: [],
    FormData: [
        {
            type: 'input',
            label: '标题',
            prop: "name",
            required: true,
            default: "",
        },
        {
            type: 'textarea',
            label: '内容',
            prop: "content",
            required: true,
            default: "",
        }
    ]
}




export {
    elderTable,
    memoData
}