<template>
    <el-container>
            <el-aside :width="isCollapse?'65px':'300px'">

                <el-menu active-text-color="#03A9F4"
                         :collapse="isCollapse" :collapse-transition="false" router :default-active="activePath">
                    <div v-for="(item,index) in menuTress" :key="index">
                        <el-submenu v-if="item.children" :index="item.id+''" :key="item.id" >
                            <!--一级菜单-->
                            <template slot="title" >
                                <i class="el-icon-location"></i>
                                <span>{{item.name}}</span>
                            </template>
                            <!--二级菜单-->
                            <el-menu-item :index="'/'+sub.path" v-for="sub in item.children" :key="sub.id" @click="menuClick('/'+sub.path)">
                                {{sub.name}}
                            </el-menu-item>
                        </el-submenu>
                        <el-menu-item :index="item.id+''" v-else>{{item.name}}</el-menu-item>
                    </div>
                </el-menu>
            </el-aside>
            <el-container class="main">

                <el-header >
                    <el-row>
                        <el-col :span="12">
                            <span @click="collapseMenu" :class="isCollapse?'el-icon-s-unfold':'el-icon-s-fold'"></span>
                        </el-col>
                        <el-col :span="12" >
                            <el-tooltip class="item" content="注销" placement="bottom">
                                <span type="info" @click="logout" size="mini" style="float: right;" class="iconfont icon-logout"></span>
                            </el-tooltip>
                        </el-col>
                    </el-row>
                </el-header>
                <el-main >
                    <router-view></router-view>
                </el-main>
                <el-footer >footer</el-footer>
            </el-container>
    </el-container>
</template>

<script>
    export default {
        name: "Home",
        data(){
            return{
                menuTress:[
                    {id:'1',name:'用户管理',children:[
                            {id:'1-1',name:'用户列表',path:'UserList'},
                            {id:'1-2',name:'菜单1-2'},
                        ]},
                    {id:'2',name:'菜单2',children:[
                            {id:'2-1',name:'菜单2-1'},
                            {id:'2-2',name:'菜单2-2'},
                        ]},
                    {id:'3',name:'菜单3'}

                ],
                isCollapse:false,
                activePath:''
            }



        },
        methods:{
            logout(){
                window.sessionStorage.clear()
                this.$router.push("/login");
            },
            collapseMenu(){
                this.isCollapse = !this.isCollapse;
            },
            menuClick(path){
                this.activePath = path;
            }
        }
    }
</script>

<style   scoped>
    .el-icon-s-fold,.el-icon-s-unfold,.icon-logout{
        cursor: pointer;
        color: #fff;
        font-size: 20px;
    }
    .el-container{
        height: 100%;
    }
    .main{
        border-left: 1px solid rgba(128, 128, 128, 0.25);
    }
    .el-header{
        background-color: #03A9F4;
        padding: 5px;
    }
    .el-row{
        line-height: 35px;
    }
    .el-footer{
        background-color: rgba(236, 231, 231, 0.96);
    }
    .el-footer,.el-header {
        height: 45px !important;

    }
    .el-menu{
        border-right:none !important;
    }
</style>