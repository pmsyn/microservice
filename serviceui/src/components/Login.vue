<template>
    <div class="login-container">
        <div class="login-box">
            <el-form ref="loginRef" :model="login" :rules="loginRules"  class="login-form">
                <el-form-item><h1>登录</h1></el-form-item>
                <el-form-item  prop="username">
                    <el-input v-model="login.username" size="medium" prefix-icon="el-icon-user-solid" autofocus aria-placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="login.password" size="medium" show-password prefix-icon="el-icon-lock" aria-placeholder="密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('loginRef')">提交</el-button>
                    <el-button type="primary" @click="resetForm('loginRef')">重置</el-button>
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
                    login:{
                        username:'',
                        password:'',
                    },
                    loginRules:{
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
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        //await只能用在被async修饰的方法中
                        /*let {data:res} = await this.$http.post('login',this.login);
                        console.log(res);*/
                        this.$http.post('/login',this.login).then(res=>{
                            console.log(res);
                            //登录成功后将token保存到sessionStorage中
                            window.sessionStorage.setItem("token",res.data.token);
                            //跳转到home页面
                            this.$router.push('/home');
                        }).catch(error=>{
                           console.log(error);
                        });

                    } else {
                        this.$message.error('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
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