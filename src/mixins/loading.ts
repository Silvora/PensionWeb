import { ref } from 'vue'
/**
 *
 * @returns {TableLoading, OkTextLoading} /table表格loading状态，okText确认按钮loading状态/
 */
export default function LoadingStatus(): any {
  const TableLoading = ref(false)
  const OkTextLoading = ref(false)

  return {
    TableLoading,
    OkTextLoading
  }
}
