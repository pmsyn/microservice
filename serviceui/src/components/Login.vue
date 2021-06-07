<template>
    <div class="login-container">
        <div class="login-box">
            <el-form :model="ruleForm" :rules="rules"  class="login-form">
                <el-form-item><h1>登录</h1></el-form-item>
                <el-form-item  prop="username">
                    <el-input v-model="ruleForm.username" size="medium" prefix-icon="el-icon-user-solid" autofocus aria-placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="ruleForm.password" size="medium" show-password prefix-icon="el-icon-lock" aria-placeholder="密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data(){
                return{
                    ruleForm:{
                        username:'',
                        password:'',
                    },
                    rules:{
                        username: [
                            {required: true, message: '请输入用户名', trigger: 'blur'}
                        ],
                        password: [
                            {required: true, message: '请输入密码', trigger: 'blur'}
                        ]
                    }
                }
        },
        methods:{
            submitForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
        }
    }
</script>
<!--
scoped样式只在当前组件生效
-->

<style  scoped>
    .login-container{
        height: 100%;
        background-color: #7e9b9c;
    }
    .login-box{
        width: 500px;
        height: 350px;
        padding:20px;
        background-color: #fff;
        border-radius: 3px;
        position: absolute;
        left: 50%;
        top:50%;
        transform: translate(-50%,-50%);
    }
    .login-form{
        position: relative;
        text-align: center;
        width: 300px;
        left: 50%;
        top:50%;
        transform: translate(-50%,-50%);
    }
</style>