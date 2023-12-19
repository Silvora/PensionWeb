<template>
    <div class="demo-upload-list" v-for="item in uploadList">
        <template v-if="item.status === 'finished'">
            <Image :src="item.url" fit="cover" width="100%" height="100%" :alt="JSON.stringify(item)" />
            <div class="demo-upload-list-cover">
                <Icon type="ios-eye-outline" @click="handleView(item.name)"></Icon>
                <Icon type="ios-trash-outline" @click="handleRemove(item)"></Icon>
            </div>
        </template>
        <template v-else>
            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
        </template>
    </div>

    <!-- :max-size="2048" -->
    <!-- :on-success="handleSuccess" -->
    <Badge :size="'large'" text="" :offset="[2, 2]">
        <template #count v-if="props.config.tips">
            <Icon type="md-information-circle" color="#f90" size="18" />
        </template>
        <Tooltip placement="bottom" :disabled="!props.config.tips">
            <template #content>
                <p>{{ props.config.desc }}</p>
                {{ props.config.tips }}
            </template>
            <Upload ref="upload" :show-upload-list="false" :default-file-list="defaultList" :accept="props.config.accept"
                :format="props.config.format" :multiple="props.config.multiple" :max-size="props.config.maxSize"
                :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload"
                type="drag" action="" with-credentials style="display: inline-block">
                <div style="width: 58px; height: 58px; line-height: 58px" v-if="defaultList.length == 0">
                    <Icon type="md-cloud-upload" size="24"></Icon>
                </div>
            </Upload>
        </Tooltip>

    </Badge>

    <ImagePreview v-model="visible" :preview-list="[imgName]" />
</template>

<script setup lang="ts">
import { OssGetCredential } from '@/api/Oss/Oss'
import UploadFile from '@/utils/ossUpload'
import { Message, Notice } from 'view-ui-plus'
import { onMounted, ref, watch } from 'vue'
import { useAppStore } from '@/stores/modules/app'
import { useI18n } from "vue-i18n"
const { t } = useI18n()
const appStore = useAppStore()
//const percentage = ref(0)
const props = defineProps({
    defineImg: {
        type: String,
        default: ""
    },
    config: {
        type: Object,
        default: {
            multiple: false,
            accept: ".jpg,.jpeg,.png",
            format: ['jpg', 'jpeg', 'png'],
            maxSize: 1024 * 10
        }
    }
})
const emit = defineEmits(['uploadImgName'])

const ossUrl = import.meta.env.VITE_APP_OSS_URL
const region = import.meta.env.VITE_APP_OSS_REGION
const bucket = import.meta.env.VITE_APP_BUCKECT
//console.log('=============', ossUrl, region, bucket, import.meta)
//const imgPath = process.env.VUE_APP_OBJECTNAME_RELASE
// console.log('//////', url)
const defaultList = ref<any>([
    // {
    //   name: 'image-demo-1.jpg',
    //   url: 'https://file.iviewui.com/images/image-demo-1.jpg'
    // },
    // {
    //   name: 'image-demo-2.jpg',
    //   url: 'https://file.iviewui.com/images/image-demo-2.jpg'
    // }
])


const visible = ref(false)
const imgName = ref('')
const uploadList = ref<any>([])
const upload = ref<any>(null)

watch(
    () => props.defineImg,

    (newVal) => {
        //defaultList.value = newVal
        // console.log('first', newVal ? 1 : 2, newVal)

        let imgList = [
            {
                name: 'image-demo-1.jpg',
                url: props.defineImg,
                status: 'finished',
                percentage: 100,
                uid: Date.now()
            }
        ]
        if (newVal) {
            defaultList.value = imgList
            uploadList.value = imgList
        } else {
            defaultList.value = []
            uploadList.value = []
        }

    },
    {
        immediate: true,
        deep: true
    }
)



const prefix = appStore.userInfo.uid + '/' + appStore.userInfo.oemId + '/'

onMounted(() => {
    //console.log('/////', upload.value.fileList, props)
    //upload.value.clearFiles()
    uploadList.value = upload.value.fileList
})

const handleView = (name: any) => {
    //console.log('handleView', name, name.includes('image-demo-1.jpg'))

    if (name.includes('image-demo-1.jpg')) {
        imgName.value = uploadList.value[0].url
    } else {
        imgName.value = ossUrl + name
    }
    //imgName.value = name
    visible.value = true
}

const handleRemove = (file: any) => {
    const fileList = upload.value.fileList
    upload.value.fileList.splice(fileList.indexOf(file), 1)
    defaultList.value.splice(fileList.indexOf(file), 1)
    console.log('handleRemove', file, fileList, defaultList.value, defaultList.value.length)
}
// const handleSuccess = (res: any, file: any) => {
//   console.log('handleSuccess', res, file)
//   file.url = 'https://file.iviewui.com/images/image-demo-3.jpg'
//   file.name = 'image-demo-3.jpg'
// }
const handleFormatError = (file: any) => {
    console.log('handleFormatError', file)
    Notice.warning({
        title: t('文件后缀不匹配'),
        desc: t('文件不匹配,请重新选择')
    })
}
const handleMaxSize = (file: any) => {
    console.log('handleMaxSize', file)
    Notice.warning({
        title: t('提示'),
        desc: t('文件超过最大限制')
    })
}

//获取oss信息
const getOssUpload = (file: any): any => {
    OssGetCredential({}).then((res: any) => {
        let ossInfo = {
            region: region,
            accessKeyId: res.datas.accessKeyId,
            accessKeySecret: res.datas.accessKeySecret,
            stsToken: res.datas.securityToken,
            requestId: res.datas.requestId,
            // 填写Bucket名称
            bucket: `${bucket}`
        }
        defaultList.value.push({
            name: res.name,
            url: ''
        })
        uploadList.value.push({
            name: res.name,
            url: '',
            status: 'pending',
            showProgress: true,
            percentage: 0,
            uid: Date.now()
        })

        //const fileName = ""

        console.log(ossInfo)

        //发起上传请求
        UploadFile(ossInfo, prefix, file.name, file, {
            //回调方法 当前上传进度
            progress: function (p: any) {
                console.log(p, p * 100)
                uploadList.value[0].percentage = p * 100
            }
        }).then((res: any) => {

            console.log(res)

            let imgUrl = `http://${res.bucket}.oss-cn-shanghai.aliyuncs.com/${res.name}`
            defaultList.value[0].url = imgUrl
            uploadList.value[0].url = imgUrl
            uploadList.value[0].showProgress = false
            uploadList.value[0].status = 'finished'
            // defaultList.value.push({
            //   name: res.name,
            //   url: imgUrl
            // })
            // uploadList.value.push({
            //   name: res.name,
            //   url: imgUrl,
            //   status: 'finished',
            //   percentage: 100,
            //   uid: Date.now()
            // })
            //imgName.value = imgUrl
            emit('uploadImgName', imgUrl)
        })
        //     .catch(() => {
        //     Message.error(t('上传文件失败'))
        //     defaultList.value.pop()
        //     uploadList.value.pop()
        // })

        // let client = new OSS(ossInfo)
        // console.log(ossInfo)

        // client
        //   .multipartUpload('/test/' + file.name, file, {
        //     mime: file.type
        //   })
        //   .then((res: any) => {
        //     console.log('......', res)
        //   })
    })
}

const handleBeforeUpload = (file: any) => {
    //console.log(file)
    const check = uploadList.value.length >= 1
    //console.log('first', check)
    if (check) {
        Message.warning(t('只能上传一张图片'))
        // Notice.warning({
        //     title: t('只能上传一张图片')
        // })
    }
    if (check) {
        return false
    } else {
        getOssUpload(file)
    }

    //   UploadFile(ossData.value, file.name, file).then((res: any) => {
    //     console.log('......', res)
    //   })

    return false
}
</script>

<style lang="less" scoped>
.demo-upload-list {
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
    margin-right: 4px;
}

.demo-upload-list img {
    width: 100%;
    height: 100%;
}

.demo-upload-list-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
}

.demo-upload-list:hover .demo-upload-list-cover {
    display: block;
}

.demo-upload-list-cover i {
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
}
</style>
