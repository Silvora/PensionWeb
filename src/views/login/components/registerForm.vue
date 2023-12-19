<template>
    <Form ref="gisterForm" :model="form" :rules="rule" @submit.prevent>
        <FormItem prop="username">
            <Input type="text" prefix="ios-person-outline" v-model="form.username" placeholder="请输入用户名" :size="size">
            </Input>
        </FormItem>
        <FormItem prop="password">
            <Input type="password" prefix="ios-lock-outline" v-model="form.password" password placeholder="请输入密码"
                :size="size">
            </Input>
        </FormItem>

        <FormItem prop="phone">
            <Row :gutter="8">
                <Col span="8">
                <Select v-model="select" style="width:100%" :size="size">
                    <Option value="beijing">New York</Option>
                    <Option value="shanghai" disabled>London</Option>
                    <Option value="shenzhen">Sydney</Option>
                </Select>
                </Col>
                <Col span="16">
                <Input style="width: 100%;" type="text" prefix="ios-lock-outline" v-model="form.phone" placeholder="请输入手机号"
                    :size="size">
                </Input>
                </Col>
            </Row>
        </FormItem>


        <FormItem prop="yzm">
            <Row :gutter="8">
                <Col span="16">
                <Input style="width: 100%;" type="text" prefix="ios-lock-outline" v-model="form.yzm" placeholder="请输入验证码"
                    :size="size">
                </Input>
                </Col>
                <Col span="8">
                <Button @click="handleTimeVerify" :size="size" style="width: 100%;"
                    :disabled="time != 60">{{ time == 60 ? '获取验证码' : time + 's' }}</Button>
                </Col>
            </Row>
        </FormItem>

        <FormItem>
            <Button type="primary" @click="handleSubmit" :size="size" style="width: 100%;">注册</Button>
        </FormItem>
    </Form>
</template>

<script setup lang='ts'>
import { Form, FormItem, Input, Button, Row, Col, Select, Option } from "view-ui-plus"
import * as _ from 'lodash'
import { ref } from "vue";
const size = 'large'
const form = ref({
    username: '',
    password: '',
    phone: '',
    yzm: ''
})
const gisterForm = ref<any>(null)
const select = ref('beijing')
const time = ref(60)
const rule = {
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        // { type: 'string', min: 6, message: '密码长度不能小于6位!', trigger: 'blur' }
    ],
    phone: [
        { required: true, message: '请输入手机号', trigger: 'blur' }
    ],
    yzm: [
        { required: true, message: '请输入验证码', trigger: 'blur' }
    ],
}
const handleSubmit = () => {

}

const handleTimeVerify = _.throttle(() => {
    console.log('获取验证码', gisterForm.value)

    gisterForm.value.validateField('phone', (valid: any) => {
        //console.log(valid)
        if (!valid) {
            let timeInterval = setInterval(() => {
                time.value -= 1

                if (time.value < 0) {
                    clearInterval(timeInterval)
                    time.value = 60
                }
            }, 1000)
        }
    })

}, 3000, {
    leading: true,
    trailing: false
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