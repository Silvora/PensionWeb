// 基本信息
const baseInfo: any = {
    rules: {},
    FormData:
        [
            {
                type: 'input',
                label: '姓名',
                prop: "name",
                span: 1,
                //disabled: false,
                required: false,
                default: "",
            },
            {
                type: 'input',
                label: '身份证',
                prop: "idNumber",
                span: 2,
                //disabled: false,
                required: false,
                default: "",
            },
            {
                type: 'date',
                label: '生日',
                prop: "birthday",
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
                chils: [
                    {
                        label: '男',
                        value: '1'
                    },
                    {
                        label: '女',
                        value: '2'
                    }
                ],
                required: false,
                default: "",
            },
            {
                type: 'input',
                label: '联系电话',
                prop: "phone",
                span: 1,
                //disabled: false,
                required: false,
                default: "",
            },
            {
                type: 'select',
                label: '婚姻状况',
                prop: "maritalStatus",
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
                label: '是否是本地户籍',
                prop: "localDomicile",
                span: 1,
                //disabled: false,
                required: false,
                default: "",
                childs: [
                    {
                        label: '是',
                        value: '0'
                    },
                    {
                        label: '否',
                        value: '1'
                    }
                ]
            },
             {
                type: 'select',
                label: '血型',
                prop: "bloodType",
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
                label: '居住人情况',
                prop: "residentSituation",
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
                label: '家人人口',
                prop: "familyPopulation",
                span: 1,
                //disabled: false,
                required: false,
                default: "",
            },
             {
                type: 'input',
                label: '家庭地址',
                prop: "address",
                span: 1,
                //disabled: false,
                required: false,
                default: "",
            },
            {
                type: 'input',
                label: '户籍地址',
                prop: "domicileAddress",
                span: 1,
                //disabled: false,
                required: false,
                default: "",
            },
                {
                type: 'input',
                label: '饮食特点',
                prop: "dietary",
                span: 1,
                //disabled: false,
                required: false,
                default: "",
            },
                    {
                type: 'input',
                label: '爱好',
                prop: "personalHobbies",
                span: 1,
                //disabled: false,
                required: false,
                default: "",
            },
            
            {
                type: 'select',
                label: '经济来源',
                prop: "financial",
                span: 1,
                //disabled: false,
                required: false,
                default: "",
            },
            {
                type: 'select',
                label: '文化程度',
                prop: "oemIvd",
                span: 1,
                //disabled: false,
                required: false,
                default: "",
            },
               {
                type: 'select',
                label: '性格心理',
                prop: "personality",
                span: 1,
                //disabled: false,
                required: false,
                default: "",
            },
            {
                type: 'date',
                label: '签订合同日期',
                prop: "oemIasd",
                span: 1,
                //disabled: false,
                required: false,
                default: "",
            },
             {
                type: 'select',
                label: '医疗保障',
                prop: "healthCare",
                span: 1,
                //disabled: false,
                required: false,
                default: "",
            },
             {
                type: 'select',
                label: '劳动能力',
                prop: "laborCapacity",
                span: 1,
                //disabled: false,
                required: false,
                default: "",
            },
            {
                type: 'input',
                label: '经办人',
                prop: "operator",
                span: 1,
                //disabled: false,
                required: false,
                default: "",
            },
            {
                type: 'input',
                label: '医保卡号',
                prop: "medicalNumber",
                span: 1,
                //disabled: false,
                required: false,
                default: "",
            },
             {
                type: 'input',
                label: '档案号',
                prop: "oemqwId",
                span: 1,
                //disabled: false,
                required: false,
                default: "",
             },
              {
                type: 'input',
                label: '备注',
                prop: "notes",
                span: 3,
                //disabled: false,
                required: false,
                default: "",
            }
        ]
}

const toolBarConfig:any= {
        title: '添加家属',
        lableWidth: 100,
        rules: {},
        FormData: [
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
            title: '性别',
            key: 'deviceNo',
            minWidth: 150,
        },
        {
            title: '联系电话',
            key: 'freeObsNum',
            minWidth: 230,
        },
          {
            title: '是否监护人',
            key: 'freeObsNum',
            minWidth: 150,
        },
             {
            title: '联系地址',
            key: 'freeObsNum',
            minWidth: 230,
        },


       
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
                prop: "selfCareAbility",
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
                prop: "vision",
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
                prop: "hearing",
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
                prop: "attendingHospital",
                span: 1,
                //disabled: false,
                required: false,
                default: "",
            },
            {
                type: 'input',
                label: '主治医师',
                prop: "attendingPhysician",
                span: 1,
                //disabled: false,
                required: false,
                default: "",
            },
{
                type: 'input',
                label: '医院电话',
                prop: "attendingPhone",
                span: 1,
                //disabled: false,
                required: false,
                default: "",
            },
{
                type: 'input',
                label: '过敏药物',
                prop: "allergicDrugs",
                span: 3,
                //disabled: false,
                required: false,
                default: "",
            },


            {
                type: 'select',
                label: '主要疾病',
                prop: "majorDisease",
                span: 3,
                //disabled: false,
                multiple:true,
                childs: [
                    {
                        label: '高血压',
                        value: '高血压'
                    },
                    {
                        label: '糖尿病',
                        value: '糖尿病'
                    },
                    {
                        label: '冠心病',
                        value: '冠心病'
                    },
                    {
                        label: '慢性阻塞性肺疾病',
                        value: '慢性阻塞性肺疾病'
                    },
                    {
                        label: '恶性肿瘤',
                        value: '恶性肿瘤'
                    },
                    {
                        label: '脑卒中',
                        value: '脑卒中'
                    },
                    {
                        label: '严重精神障碍',
                        value: '严重精神障碍'
                    },
                    {
                        label: '结核病',
                        value: '结核病'
                    },
                    {
                        label: '肝炎',
                        value: '肝炎'
                    },
                    {
                        label: '高血栓',
                        value: '高血栓'
                    },
                    {
                        label: '心脏病',
                        value: '心脏病'
                    },
                    {
                        label: '高血栓',
                        value: '高血栓'
                    },
                       {
                        label: '脑血栓',
                        value: '脑血栓'
                    },
                       {
                        label: '关节炎',
                        value: '关节炎'
                    },
                       {
                        label: '风湿',
                        value: '风湿'
                    },
                ],
                required: false,
                default: "",
            },
              {
                type: 'input',
                label: '其他疾病',
                prop: "otherDisease",
                span: 3,
                //disabled: false,
                required: false,
                default: "",
            },
            
            {
                type: 'input',
                label: '病史',
                prop: "medicalHistory",
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
    toolBarConfig,
    baseInfo,
    familyInfo,
    healthyInfo,
    careInfo,
    foodInfo,
    bedInfo,
    contractInfo
}