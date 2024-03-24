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
                type: 'date',
                label: '出生日期',
                // prop: "birthday",
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
                        value:2
                    }
                ],
                required: false,
                default: "",
            },
            {
                type: 'input',
                label: '身份证',
                prop: "idNumber",
                span: 1,
                //disabled: false,
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
                type: 'input',
                label: '血型',
                prop: "bloodType",
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
                        label: '未婚',
                        value: '0'
                    },
                    {
                        label: '已婚',
                        value: '1'
                    },
                         {
                        label: '丧偶',
                        value: '2'
                    }  
                    
                ]
            },
             {
                type: 'select',
                label: '学业水平',
                prop: "educationLevel",
                span: 2,
                //disabled: false,
                required: false,
                default: "",
                 childs: [
                    {
                        label: '中学以下',
                        value: '0'
                    },
                    {
                        label: '中学',
                        value: '1'
                    },
                         {
                        label: '大学',
                        value: '2'
                     }  ,
                      {
                        label: '大学以上',
                        value: '3'
                    }  
                    
                ]
            },
            //  {
            //     type: 'select',
            //     label: '是否是本地户籍',
            //     prop: "localDomicile",
            //     span: 1,
            //     //disabled: false,
            //     required: false,
            //     default: "",
            //     childs: [
            //         {
            //             label: '是',
            //             value: '0'
            //         },
            //         {
            //             label: '否',
            //             value: '1'
            //         }
            //     ]
            // },
        
            //  {
            //     type: 'select',
            //     label: '血型',
            //     prop: "bloodType",
            //     span: 1,
            //     //disabled: false,
            //     required: false,
            //     default: "",
            //     childs: [
            //         {
            //             label: '是',
            //             value: '1'
            //         },
            //         {
            //             label: '否',
            //             value: '0'
            //         }
            //     ]
            // },
            // {
            //     type: 'sort',
            //     label: '家人人口',
            //     prop: "familyPopulation",
            //     span: 1,
            //     //disabled: false,
            //     required: false,
            //     default: "",
            // },
            {
                type: 'input',
                label: '家庭住址',
                prop: "address",
                span: 3,
                //disabled: false,
                required: false,
                default: "",
            },
            // {
            //     type: 'input',
            //     label: '户籍地址',
            //     prop: "domicileAddress",
            //     span: 3,
            //     //disabled: false,
            //     required: false,
            //     default: "",
            // },
            
            //  {
            //     type: 'input',
            //     label: '居住人情况',
            //     prop: "residentSituation",
            //     span: 3,
            //     //disabled: false,
            //     required: false,
            //     default: "",
            // },
            //   {
            //     type: 'select',
            //     label: '居住人情况',
            //     prop: "residentSituation",
            //     span: 1,
            //     //disabled: false,
            //     required: false,
            //     default: "",
            //     childs: [
            //         {
            //             label: '是',
            //             value: '1'
            //         },
            //         {
            //             label: '否',
            //             value: '0'
            //         }
            //     ]
            // },
     
             
           
                {
                type: 'input',
                label: '饮食特点',
                prop: "dietary",
                span: 3,
                //disabled: false,
                required: false,
                default: "",
            },
                    {
                type: 'input',
                label: '爱好',
                prop: "personalHobbies",
                span: 3,
                //disabled: false,
                required: false,
                default: "",
            },
            
            // {
            //     type: 'input',
            //     label: '经济来源',
            //     prop: "financial",
            //     span: 3,
            //     //disabled: false,
            //     required: false,
            //     default: "",
            // },
           
            //    {
            //     type: 'input',
            //     label: '性格心理',
            //     prop: "personality",
            //     span: 3,
            //     //disabled: false,
            //     required: false,
            //     default: "",
            // },
           
            //  {
            //     type: 'input',
            //     label: '医疗保障',
            //     prop: "healthCare",
            //     span: 3,
            //     //disabled: false,
            //     required: false,
            //     default: "",
            // },
            //  {
            //     type: 'input',
            //     label: '劳动能力',
            //     prop: "laborCapacity",
            //     span: 3,
            //     //disabled: false,
            //     required: false,
            //     default: "",
            // },
            
            // {
            //     type: 'input',
            //     label: '医保卡号',
            //     prop: "medicalNumber",
            //     span: 1,
            //     //disabled: false,
            //     required: false,
            //     default: "",
            // },
            // {
            //     type: 'date',
            //     label: '签订合同日期',
            //     // prop: "contractDateStr",
            //     prop: "contractDate",
            //     span: 1,
            //     //disabled: false,
            //     required: false,
            //     default: "",
            // },
            
           
            //  {
            //     type: 'input',
            //     label: '档案号',
            //     prop: "oemqwId",
            //     span: 1,
            //     //disabled: false,
            //     required: false,
            //     default: "",
            //  },
              {
                type: 'input',
                label: '备注',
                prop: "notes",
                span: 3,
                //disabled: false,
                required: false,
                default: "",
              },
               {
                type: 'input',
                label: '经办人',
                prop: "operator",
                span: 3,
                //disabled: false,
                required: false,
                default: "",
            },
        ]
}


const urgentInforms:any= {
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
                label: '关系',
                prop: "name",
                span: 1,
                //disabled: false,
                required: false,
                default: "",
            },
            {
                type: 'input',
                label: '联系电话',
                prop: "name",
                span: 1,
                //disabled: false,
                required: false,
                default: "",
            },
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
                label: '关系',
                prop: "name",
                span: 1,
                //disabled: false,
                required: false,
                default: "",
            },
            {
                type: 'input',
                label: '联系电话',
                prop: "name",
                span: 1,
                //disabled: false,
                required: false,
                default: "",
            },
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
                label: '关系',
                prop: "name",
                span: 1,
                //disabled: false,
                required: false,
                default: "",
            },
            {
                type: 'input',
                label: '联系电话',
                prop: "name",
                span: 1,
                //disabled: false,
                required: false,
                default: "",
            },
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
            prop: "name",
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
            label: '身份证号',
            prop: "idNumber",
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
                },
            ],
            required: false,
            // default: "",
            },
               {
            type: 'input',
            label: '与老人关系',
            prop: "relationship",
            //disabled: false,
            //childs: [],
            required: false,
            // default: "",
            },
                  {
            type: 'select',
            label: '是否监护人',
            prop: "guardian",
            //disabled: false,
            childs: [
                {
                    label: '是',
                    value: 1
                },
                {
                    label: '否',
                    value: 0
                }
            ],
            required: false,
            // default: "",
        },
        
                  {
            type: 'textarea',
            label: '家庭地址',
            prop: "address",
            //disabled: false,
           // childs: [],
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
                prop: "name",
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
                label: '身份证号',
                prop: "idNumber",
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
                        label: '男',
                        value: 1
                    },
                    {
                        label: '女',
                        value: 2
                    },
                    {
                label: "未知",
                value:0
            }
                ],
                required: false,
                // default: "",
                },
                   {
                type: 'input',
                label: '与老人关系',
                prop: "relationship",
                //disabled: false,
                //childs: [],
                required: false,
                // default: "",
                },
                      {
                type: 'select',
                label: '是否监护人',
                prop: "guardian",
                //disabled: false,
                childs: [
                    {
                        label: '是',
                        value: 1
                    },
                    {
                        label: '否',
                        value: 0
                    }
                ],
                required: false,
                // default: "",
            },
            
                      {
                type: 'textarea',
                label: '家庭地址',
                prop: "address",
                //disabled: false,
               // childs: [],
                required: false,
                // default: "",
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
            slot:'gender',
            minWidth: 100,
        },
        {
            title: '联系电话',
            key: 'phone',
            minWidth: 230,
        },
          {
            title: '是否监护人',
            key: 'guardian',
            slot:'guardian',
            minWidth: 100,
        },
             {
            title: '联系地址',
            key: 'address',
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
                type: 'sort',
                label: '入院身高(cm)',
                prop: "height",
                span: 1,
                //disabled: false,
                required: false,
                default: "",
            },
            
            {
                type: 'sort',
                label: '入院体重(kg)',
                prop: "weight",
                span: 1,
                //disabled: false,
                required: false,
                default: "",
            },
            
            {
                type: 'select',
                label: '表达能力',
                prop: "expressiveAbility",
                span: 1,
                //disabled: false,
                required: false,
                default: "",
                childs: [
                    {
                        label: '正常',
                        value: '0'
                    },
                    {
                        label: '一般',
                        value: '1'
                    },
                    {
                        label: '困难',
                        value: '2'
                    }
                ]
            },
            {
                type: 'select',
                label: '行动能力',
                prop: "mobility",
                span: 1,
                //disabled: false,
                required: false,
                default: "",
                childs: [
                    {
                        label: '正常',
                        value: '0'
                    },
                    {
                        label: '失能',
                        value: '1'
                    },
                    {
                        label: '半失能',
                        value: '2'
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
                        label: '正常',
                        value: '0'
                    },
                    {
                        label: '一般',
                        value: '1'
                    },
                    {
                        label: '失明',
                        value: '2'
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
                        label: '正常',
                        value: '0'
                    },
                    {
                        label: '一般',
                        value: '1'
                    },
                    {
                        label: '失聪',
                        value: '2'
                    }
                ]
            },
//             {
//                 type: 'input',
//                 label: '主治医院',
//                 prop: "attendingHospital",
//                 span: 1,
//                 //disabled: false,
//                 required: false,
//                 default: "",
//             },
//             {
//                 type: 'input',
//                 label: '主治医师',
//                 prop: "attendingPhysician",
//                 span: 1,
//                 //disabled: false,
//                 required: false,
//                 default: "",
//             },
// {
//                 type: 'input',
//                 label: '医院电话',
//                 prop: "attendingPhone",
//                 span: 1,
//                 //disabled: false,
//                 required: false,
//                 default: "",
//             },
{
                type: 'input',
                label: '过敏药物或食物',
                prop: "allergen",
                span: 3,
                //disabled: false,
                required: false,
                default: "",
            },


            // {
            //     type: 'input',
            //     label: '主要疾病',
            //     prop: "majorDisease",
            //     span: 3,
            //     //disabled: false,
            //     multiple:true,
            //     // childs: [
            //     //     {
            //     //         label: '高血压',
            //     //         value: '高血压'
            //     //     },
            //     //     {
            //     //         label: '糖尿病',
            //     //         value: '糖尿病'
            //     //     },
            //     //     {
            //     //         label: '冠心病',
            //     //         value: '冠心病'
            //     //     },
            //     //     {
            //     //         label: '慢性阻塞性肺疾病',
            //     //         value: '慢性阻塞性肺疾病'
            //     //     },
            //     //     {
            //     //         label: '恶性肿瘤',
            //     //         value: '恶性肿瘤'
            //     //     },
            //     //     {
            //     //         label: '脑卒中',
            //     //         value: '脑卒中'
            //     //     },
            //     //     {
            //     //         label: '严重精神障碍',
            //     //         value: '严重精神障碍'
            //     //     },
            //     //     {
            //     //         label: '结核病',
            //     //         value: '结核病'
            //     //     },
            //     //     {
            //     //         label: '肝炎',
            //     //         value: '肝炎'
            //     //     },
            //     //     {
            //     //         label: '高血栓',
            //     //         value: '高血栓'
            //     //     },
            //     //     {
            //     //         label: '心脏病',
            //     //         value: '心脏病'
            //     //     },
            //     //     {
            //     //         label: '高血栓',
            //     //         value: '高血栓'
            //     //     },
            //     //        {
            //     //         label: '脑血栓',
            //     //         value: '脑血栓'
            //     //     },
            //     //        {
            //     //         label: '关节炎',
            //     //         value: '关节炎'
            //     //     },
            //     //        {
            //     //         label: '风湿',
            //     //         value: '风湿'
            //     //     },
            //     // ],
            //     required: false,
            //     default: "",
            // },
              {
                type: 'input',
                label: '目前疾病',
                prop: "disease",
                span: 3,
                //disabled: false,
                required: false,
                default: "",
            },
            
            {
                type: 'input',
                label: '过往病史',
                prop: "medicalHistory",
                span: 3,
                //disabled: false,
                required: false,
                default: "",
            },
      
        ]
}

// 健康信息
const careInfo: any = {
    rules: {},
    FormData:
        [
        // let list = ["(三级)", "(二级)", "(一级)", "(特一级)", "(特二级)", "(特三级)", "(专需护理)"]
            //
            {
                type: 'select',
                label: '护理设备',
                prop: "nursingDeviceType",
                span: 1,
                //disabled: false,
                required: false,
                default: "",
                childs: [
                    {
                        label: '睡眠雷达',
                        value: '0'
                    },
                    {
                        label: '呼吸机',
                        value: '1'
                    },
                    {
                        label: '心电图机',
                        value: '2'
                    },
                    // {
                    //     label: '特一级',
                    //     value: '3'
                    // },
                    // {
                    //     label: '特二级',
                    //     value: '4'
                    // },
                    // {
                    //     label: '特三级',
                    //     value: '5'
                    // },
                    // {
                    //     label: '专需护理',
                    //     value: '6'
                    // },
                ]
            },
            // {
            //     type: 'select',
            //     label: '周期',
            //     prop: "unit",
            //     span: 1,
            //     //disabled: false,
            //     required: false,
            //     childs:[
            //         {
            //             label: '无',
            //             value: '0'
            //         },
            //         {
            //             label: '天',
            //             value: '1'
            //         },
            //         {
            //             label: '周',
            //             value: '2'
            //         },
            //         {
            //             label: '月',
            //             value: '3'
            //         },
            //         {
            //             label: '年',
            //             value: '4'
            //         },
            //     ],
            //     default: "",
            // },
            
            // {
            //     type: 'sort',
            //     label: '护理级别费用',
            //     prop: "price",
            //     span: 1,
            //     //disabled: false,
            //     required: false,
            //     default: "",
            // },
            {
                type: 'sort',
                label: '房费',
                prop: "roomCosts",
                span: 1,
                //disabled: false,
                required: false,
                default: "",
            },
            {
                type: 'sort',
                label: '额外服务费用',
                prop: "serviceFee",
                span: 1,
                //disabled: false,
                required: false,
                default: "",
            },
            
            {
                type: 'input',
                label: '护理备注',
                prop: "nursingNotes",
                span: 3,
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
                prop: "dietId",
                span: 1,
                //disabled: false,
                required: false,
                default: "",
                childs: [
                    // {
                    //     label: '是',
                    //     value: '1'
                    // },
                    // {
                    //     label: '否',
                    //     value: '0'
                    // }
                ]
            },
            // {
            //     type: 'sort',
            //     label: '套餐费用',
            //     prop: "price",
            //     span: 2,
            //     //disabled: false,
            //     required: false,
            //     default: "",
            // },
            // {
            //     type: 'sort',
            //     label: '套餐费用',
            //     prop: "oemvfdId",
            //     span: 2,
            //     //disabled: false,
            //     required: false,
            //     default: "",
            // },
            // {
            //     type: 'input',
            //     label: '档案编号',
            //     prop: "oemvfdId",
            //     span: 1,
            //     //disabled: false,
            //     required: false,
            //     default: "",
            // },
            {
                type: 'input',
                label: '备注说明',
                prop: "dietNotes",
                span: 2,
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
                type: 'date',
                label: '入住日期',
                prop: "startTimeStr",
                span: 3,
                //disabled: false,
                required: false,
                default: "",
                // childs: [
                //     {
                //         label: '是',
                //         value: '1'
                //     },
                //     {
                //         label: '否',
                //         value: '0'
                //     }
                // ]
             },
            //  {
            //     type: 'date',
            //     label: '结束日期',
            //     prop: "endTimeStr",
            //     span: 1,
            //     //disabled: false,
            //     required: false,
            //     default: "",
 
            //  },
            //  {
            //     type: 'select',
            //     label: '入住楼栋',
            //     prop: "hostelId",
            //     span: 1,
            //     //disabled: false,
            //     required: false,
            //     default: "",
            //     childs: [
            //         {
            //             label: '是',
            //             value: '1'
            //         },
            //         {
            //             label: '否',
            //             value: '0'
            //         }
            //     ]
            //  },
            //   {
            //     type: 'select',
            //     label: '入住楼层',
            //     prop: "floorId",
            //     span: 1,
            //     //disabled: false,
            //     required: false,
            //     default: "",
            //     childs: [
            //         {
            //             label: '是',
            //             value: '1'
            //         },
            //         {
            //             label: '否',
            //             value: '0'
            //         }
            //     ]
            //  },
            //    {
            //     type: 'select',
            //     label: '入住房号',
            //     prop: "roomId",
            //     span: 1,
            //     //disabled: false,
            //     required: false,
            //     default: "",
            //     childs: [
            //         {
            //             label: '是',
            //             value: '1'
            //         },
            //         {
            //             label: '否',
            //             value: '0'
            //         }
            //     ]
            //  },
            //     {
            //     type: 'select',
            //     label: '入住床位',
            //     prop: "bedId",
            //     span: 1,
            //     //disabled: false,
            //     required: false,
            //     default: "",
            //     childs: [
            //         {
            //             label: '是',
            //             value: '1'
            //         },
            //         {
            //             label: '否',
            //             value: '0'
            //         }
            //     ]
            //  },
            //   {
            //     type: 'input',
            //     label: '床位费',
            //     prop: "oemvfdId",
            //     span: 1,
            //     //disabled: false,
            //     required: false,
            //     default: "",
            // },
            //      {
            //     type: 'input',
            //     label: '房间选择',
            //     prop: "notes",
            //     span: 1,
            //     //disabled: false,
            //     required: false,
            //     default: "",
            // },
        ]
}

//合同
const contractInfo: any = {

    rules: {},
     FormData:
         [
            {
                type: 'date',
                label: '合约签订日期',
                prop: "contractDateStr",
                span: 2,
                //disabled: false,
                required: false,
                default: "",
             },
            
                   {
                type: 'sort',
                label: '合计费用',
                prop: "admissionDeposit",
                span: 1,
                disabled: true,
                required: false,
                default: "",
             },

           
             
            //   {
            //     type: 'input',
            //     label: '客户姓名',
            //     prop: "oemvfdId",
            //     span: 1,
            //     //disabled: false,
            //     required: false,
            //     default: "",
            // },
            // {
            //     type: 'select',
            //     label: '入住房型',
            //     prop: "nadsadme",
            //     span: 1,
            //     //disabled: false,
            //     required: false,
            //     default: "",
            //     childs: [
            //         {
            //             label: '是',
            //             value: '1'
            //         },
            //         {
            //             label: '否',
            //             value: '0'
            //         }
            //     ]
            //  },
            //  {
            //     type: 'date',
            //     label: '到期时间',
            //     prop: "nadsadme",
            //     span: 1,
            //     //disabled: false,
            //     required: false,
            //     default: "",
            //     // childs: [
            //     //     {
            //     //         label: '是',
            //     //         value: '1'
            //     //     },
            //     //     {
            //     //         label: '否',
            //     //         value: '0'
            //     //     }
            //     // ]
            //  },
            //      {
            //     type: 'input',
            //     label: '联系地址',
            //     prop: "address",
            //     span: 1,
            //     //disabled: false,
            //     required: false,
            //     default: "",
            //  },
                   
                  
            //       {
            //     type: 'sort',
            //     label: '入院押金',
            //     prop: "admissionDeposit",
            //     span: 1,
            //     //disabled: false,
            //     required: false,
            //     default: "",
            // },
            //      {
            //     type: 'sort',
            //     label: '医疗保证金',
            //     prop: "medicalBond",
            //     span: 1,
            //     //disabled: false,
            //     required: false,
            //     default: "",
            //  },
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
    contractInfo,
    urgentInforms
}