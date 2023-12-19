import { OemInfoQueryAll } from '@/api/OemInfo/OemInfo'
import { ref } from 'vue'

/**
 *
 *
 * @returns {} ["对应map数据-oemIdData","原始数据-oemIdList", "函数方法-getOmeId"]
 */
export default function OemIdMixin(): any {
  const oemIdData = ref<any>({
    '0': '平台用户',
    '1000': '生活美容'
  })
  const oemIdList = ref<any>([
    { cid: '0', name: '平台用户', label: '平台用户', value: '0' },
    { cid: '1000', name: '生活美容', label: '生活美容', value: '1000' }
    // { id: '1', name: '测试' },
    // { id: '2', name: 'OEM-以色美科' },
    // { id: '3', name: '美测客户' },
    // { id: '4', name: '管理员' },
    // { id: '5', name: '系统管理员' }
  ])

  //const initDatakey = []

  const getOmeId = () => {
    console.log(oemIdList.value.length)
    if (oemIdList.value.length > 2) {
      console.log('first=======', oemIdList)

      return
    }
    OemInfoQueryAll().then((res) => {
      //console.log('==========================', res.datas)
      //oemIdList.value = res.datas
      res.datas.forEach((item: any) => {
        item['label'] = item.name
        item['value'] = String(item.cid)
        oemIdList.value.push(item)
        oemIdData.value[item.cid] = item.name
      })
    })
  }

  return {
    oemIdData,
    oemIdList,
    getOmeId
  }
}
