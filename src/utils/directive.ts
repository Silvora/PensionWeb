import { useAppStore } from '@/stores/modules/app'

export default function createDirective(app: any) {
  app.directive('has', {
    mounted(el: any, binding: any) {
      const appStore = useAppStore()
      //console.log(app.permissions)
      if (!appStore.permissions.includes(binding.value)) {
        //el.style.display = 'none'
        el.parentNode && el.parentNode.removeChild(el)
      }
      // console.log(el, binding)
      // el.style.display = binding.value ? '' : 'none'
    }
  })

  //  app.directive('fit-columns', {
  //    mounted(el: any, binding: any,vnode: any, prevVnode: any) {
       
  //       setTimeout(() => {
  //          console.log(el, binding,el.style.width,vnode,prevVnode)
  //       }, 300);
     
  //      // el.style.display = binding.value ? '' : 'none'
       
  //      el.style.background = 'red !important'
  //   }
  // })
}
