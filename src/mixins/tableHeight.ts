import { OemInfoQueryAll } from '@/api/OemInfo/OemInfo'
import { ref } from 'vue'

/**
 *
 *
 * @returns {} ["对应map数据-oemIdData","原始数据-oemIdList", "函数方法-getOmeId"]
 */
export default function TableHeightMixin(): any {
  const tableH = ref<any>(0)
  const tableRef = ref<any>(null)
  /**
   *
   * @param tableRef {HTMLElement}
   */
  const setTableHeight = (tableRef, h) => {
    tableH.value = h
    //tableRef.value = tableRef.value
    window.addEventListener('resize', () => {
      console.log(tableRef.value)
      // console.log('first', editTable.value.offsetHeight)
      tableH.value = tableRef.value.offsetHeight - 60
      console.log(tableH.value)
    })
  }

  return {
    setTableHeight,
    tableH
  }
}
