
const modulesViews = import.meta.glob('../components/**/**.ts', {
  import: 'default',
  //import: 'setup',
  eager: true
})
const AppInstallView = (app:any)=>{

    Object.keys(modulesViews).forEach((item:any) => {
         app.use(modulesViews[item])
    })

}

export default AppInstallView