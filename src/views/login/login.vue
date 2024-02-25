<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" :bordered="false">
        <div class="form-logo">
          <img src="@/assets/images/logo.png" alt="">
          <p>{{ t('养老平台登录') }}</p>
        </div>

        <div class="form-con" v-if="loginTitle == '登录'">
          <LoginForm v-model:loginTitle="loginTitle"></LoginForm>
          <div class="demo-auto-login">
            <Checkbox v-model="autoDesc" style="margin: 0;"></Checkbox>
            {{ t('我已阅读并同意') }}<a @click="modal = true">{{ t(`${'《用户隐私协议》'}`) }}</a>
            <!-- <span>{{ t("尚未拥有账户？") }}<a @click="handleSetLoginTitle('注册')">{{ t('注册') }}</a></span> -->
          </div>

          <div style="padding-top: 20px;text-align: center;">
            <a @click="() => loginTitle = '修改密码'">{{ t('忘记密码') }}</a>
          </div>
        </div>
        <div class="form-con" v-if="loginTitle == '注册'">
          <RegisterForm></RegisterForm>
          <p>{{ t('已经拥有账户？') }}<a @click="handleSetLoginTitle('登录')">{{ t('登录') }}</a></p>
        </div>

        <div class="form-con" v-if="loginTitle == '修改密码'">
          <RePasswordForm></RePasswordForm>
          <div class="demo-auto-login">
            <span>{{ t('尚未拥有账户？') }}<a @click="handleSetLoginTitle('注册')">{{ t('注册') }}</a></span>
            <p>{{ t('已经拥有账户？') }}<a @click="handleSetLoginTitle('登录')">{{ t('登录') }}</a></p>
          </div>
        </div>




        <p class="form-footer">{{ t('深圳海吉雅健康科技有限公司 技术支持') }}</p>
      </Card>
    </div>
    <Modal v-model="modal" :title="t('用户隐私协议')" :footer-hide="true">
      <p>Something...</p>
      <p>Something...</p>
      <p>Something...</p>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Checkbox, Modal } from "view-ui-plus"
import LoginForm from './components/loginForm.vue'
import RegisterForm from "./components/registerForm.vue";
import RePasswordForm from './components/rePasswordForm.vue';
import { useI18n } from "vue-i18n"
const { t } = useI18n()
const loginTitle = ref('登录')
const autoDesc = ref(false)
const modal = ref(false)

const handleSetLoginTitle = (value: string) => {
  loginTitle.value = value
}


</script>

<style scoped lang="less">
.login {
  width: 100%;
  height: 100vh;

  display: flex;
  justify-content: center;
  justify-items: center;
  align-items: center;

  &-con {

    width: 340px;

    .form-logo {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 20px;
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      color: #1C1B1B;

      img {
        width: 120px;
        margin-top: 34px;
      }

      p {
        margin: 20px 0;
      }

    }

    &-header {
      font-size: 16px;
      font-weight: 300;
      text-align: center;
      padding: 30px 0;
    }

    .form-con {
      padding: 10px 0 0;
    }

    .form-footer {
      font-size: 10px;
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      color: #1C1B1B;
      margin-top: 30px;
      text-align: center;
    }

    .login-tip {
      font-size: 10px;
      text-align: center;
      color: #c3c3c3;
    }
  }
}

.demo-auto-login {
  text-align: left;
}

.demo-auto-login span {
  float: right;
}
</style>
