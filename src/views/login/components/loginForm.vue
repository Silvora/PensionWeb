<template>
  <Form ref="loginForm" :model="form" :rules="rule" @submit.prevent>
    <FormItem prop="identifier">
      <Input type="text" prefix="ios-person-outline" v-model="form.identifier" :placeholder="t('请输入') + t('用户名')"
        :size="size">
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input type="password" prefix="ios-lock-outline" v-model="form.password" password :placeholder="t('请输入') + t('密码')"
        :size="size">
      </Input>
    </FormItem>
    <FormItem>
      <div class="demo-auto-login">
        <Checkbox v-model="autoLogin" size="large">{{ t('记住密码') }}</Checkbox>
        <!-- <a @click="handleRePassword">{{ t('忘记密码') }}</a> -->
      </div>
    </FormItem>

    <FormItem>
      <Button type="primary" @click="handleSubmit" :size="size" style="width: 100%;"
        :loading="loading">{{ t('登录') }}</Button>
    </FormItem>
  </Form>
</template>

<script setup lang='ts'>
import { Form, FormItem, Input, Button, Checkbox, Message } from "view-ui-plus"
import { onMounted, ref } from "vue";
import { Login } from "@/api/Login/Login"
import { useRouter } from "vue-router";
import { clearItemToken, getToken, setToken } from "@/utils/token";
import { useAppStore } from "@/stores/modules/app"
import { useI18n } from "vue-i18n"
import { GetBaseSetting } from "@/api/Base/Base"
const { t } = useI18n()
import md5 from 'js-md5';
const appStore = useAppStore()
const size = 'large'
const emit = defineEmits(['update:loginTitle'])
const props = defineProps({
  autoDesc: {
    type: Boolean,
    default: false
  }
})
const loginForm = ref<any>(null)
const loading = ref(false)
const router = useRouter()
const form = ref({
  identifier: '',
  password: ''
})
const rule = {
  identifier: [
    { required: true, message: t('请输入') + t('用户名'), trigger: 'blur' }
  ],
  password: [
    { required: true, message: t('请输入') + t('密码'), trigger: 'blur' },
    // { type: 'string', min: 6, message: '密码长度不能小于6位!', trigger: 'blur' }
  ]
}
const autoLogin = ref(true)
const handleSubmit = () => {

  loginForm.value.validate((valid: boolean) => {
    if (valid) {
      if (!props.autoDesc) {
        Message.warning(t('请先阅读并同意隐私协议'))
        return
      }


      if (autoLogin) {
        setToken('identifier', form.value.identifier)
        setToken('password', form.value.password)
      } else {
        clearItemToken('identifier')
        clearItemToken('password')
      }
      setToken('ing-Token', "res.datas.access_token")
      setToken('ing-User', "res.datas.user")
      //router.push("/")

      const data = {
        identifier: form.value.identifier,
        password: md5(form.value.password)

      }


      loading.value = true
      Login(data).then((res: any) => {
        console.log(res)
        setToken('ing-Token', res.data)
        setToken('ing-User', form.value.identifier)

        appStore.setUserInfo(form.value.identifier)


        router.push("/")
        loading.value = false
        Message.success(t('登录成功'))

      }).finally(() => {
        loading.value = false
        //router.push("/")

        GetBaseSetting().then((res: any) => {
        console.log(res)
        // fileUrl.value.bgUrl = res.data?.background
        if (res.data?.background) {
            document.body.style.backgroundImage = `url(${res.data.background})`;
        }
        // if (res.data?.cockpitImageJson) {
        //     JSON.parse(res.data.cockpitImageJson).forEach((item: any, idx: any) => {
        //         fileUrl.value['driveUrl' + (idx + 1)] = item.u

        //     })
        // }
    })
      })
    }
  })



}

const handleRePassword = () => {
  emit('update:loginTitle', '修改密码')
}

onMounted(() => {
  getToken('identifier').then((res: any) => {
    console.log(res)
    form.value.identifier = res
  })
  getToken('password').then((res: any) => {
    console.log(res)
    form.value.password = res
  })
})
</script>

<style scoped lang='less'>
.demo-auto-login {
  text-align: left;
}

.demo-auto-login a {
  float: right;
}
</style>