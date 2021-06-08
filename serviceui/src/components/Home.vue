<template>
    <el-container>
        <el-header >
            <el-button type="info" @click="logout" size="mini">退出</el-button>
        </el-header>
        <el-container>
            <el-aside >
                <el-menu active-text-color="#03A9F4" unique-opened="true">
                    <el-submenu index="1">
                        <!--一级菜单-->
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>导航一</span>
                        </template>
                        <!--二级菜单-->
                        <el-menu-item index="1-1">选项1</el-menu-item>
                        <el-menu-item index="1-2">选项2</el-menu-item>
                        <el-menu-item index="1-3">选项3</el-menu-item>
                        <!--三级菜单-->
                        <el-submenu index="1-4">
                            <template slot="title">选项4</template>
                            <el-menu-item index="1-4-1">选项1</el-menu-item>
                        </el-submenu>
                    </el-submenu>
                    <el-menu-item index="2">
                        <i class="el-icon-menu"></i>
                        <span slot="title">导航二</span>
                    </el-menu-item>
                    <el-menu-item index="3" >
                        <i class="el-icon-document"></i>
                        <span slot="title">导航三</span>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <i class="el-icon-setting"></i>
                        <span slot="title">导航四</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-container>
                <el-main >main</el-main>
                <el-footer >footer</el-footer>
            </el-container>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        name: "Home",
        methods:{
            logout(){
                window.sessionStorage.clear()
                this.$router.push("/login");
            },
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style   scoped>
    .el-container{
        height: 100%;
    }
    .el-header{
        background-color: #03A9F4;
        padding: 5px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
    .el-footer{
        background-color: rgba(236, 231, 231, 0.96);
    }
</style>