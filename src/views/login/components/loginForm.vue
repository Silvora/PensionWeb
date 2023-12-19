<template>
  <Form ref="loginForm" :model="form" :rules="rule" @submit.prevent>
    <FormItem prop="username">
      <Input type="text" prefix="ios-person-outline" v-model="form.username" :placeholder="t('请输入') + t('用户名')"
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
        <Checkbox v-model="autoLogin" size="large">{{ t('自动登录') }}</Checkbox>
        <a @click="handleRePassword">{{ t('忘记密码') }}</a>
      </div>
    </FormItem>

    <FormItem>
      <Button type="primary" @click="handleSubmit" :size="size" style="width: 100%;"
        :loading="loading">{{ t('登录') }}</Button>
    </FormItem>
  </Form>
</template>

<script setup lang='ts'>
import { Form, FormItem, Input, Button, Checkbox } from "view-ui-plus"
import { onMounted, ref } from "vue";
import { Login } from "@/api/Login/Login"
import { useRouter } from "vue-router";
import { clearItemToken, getToken, setToken } from "@/utils/token";
import { useAppStore } from "@/stores/modules/app"
import { useI18n } from "vue-i18n"
const { t } = useI18n()
const appStore = useAppStore()
const size = 'large'
const emit = defineEmits(['update:loginTitle'])
const loading = ref(false)
const router = useRouter()
const form = ref({
  username: '',
  password: ''
})
const rule = {
  username: [
    { required: true, message: t('请输入') + t('用户名'), trigger: 'blur' }
  ],
  password: [
    { required: true, message: t('请输入') + t('密码'), trigger: 'blur' },
    // { type: 'string', min: 6, message: '密码长度不能小于6位!', trigger: 'blur' }
  ]
}
const autoLogin = ref(true)
const handleSubmit = () => {

  if (autoLogin) {
    setToken('username', form.value.username)
    setToken('password', form.value.password)
  } else {
    clearItemToken('username')
    clearItemToken('password')
  }
  setToken('meicePro-Token', "res.datas.access_token")
  setToken('meicePro-User', "res.datas.user")
  router.push("/")
  //loading.value = true
  // Login(form.value).then((res: any) => {
  //   console.log(res)
  //   setToken('meicePro-Token', res.datas.access_token)
  //   setToken('meicePro-User', res.datas.user)

  //   appStore.setUserInfo(res.datas.user)
  //   loading.value = false

  // }).finally(() => {
  //   loading.value = false
  //   router.push("/")
  // })
}

const handleRePassword = () => {
  emit('update:loginTitle', '修改密码')
}

onMounted(() => {
  getToken('username').then((res: any) => {
    console.log(res)
    form.value.username = res
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