<template>
    <el-container>
        <el-header >
            <el-button type="info" @click="logout" size="mini">退出</el-button>
        </el-header>
        <el-container>
            <el-aside >
                <el-menu active-text-color="#03A9F4"   >
                    <div v-for="(item,index) in menutress" :key="index">
                        <el-submenu v-if="item.children" :index="item.id+''" :key="item.id" >
                            <!--一级菜单-->
                            <template slot="title" >
                                <i class="el-icon-location"></i>
                                <span>{{item.name}}</span>
                            </template>
                            <!--二级菜单-->
                            <el-menu-item :index="sub.id+''" v-for="sub in item.children" :key="sub.id">
                                {{sub.name}}
                            </el-menu-item>
                            <!--三级菜单
                            <el-submenu index="1-4">
                                <template slot="title">选项4</template>
                                <el-menu-item index="1-4-1">选项1</el-menu-item>
                            </el-submenu>-->
                        </el-submenu>
                        <el-menu-item :index="item.id+''" v-else>{{item.name}}</el-menu-item>
                    </div>
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
        data(){
            return{
                menutress:[
                    {id:'1',name:'菜单1',children:[
                            {id:'1-1',name:'菜单1-1'},
                            {id:'1-2',name:'菜单1-2'},
                        ]},
                    {id:'2',name:'菜单2',children:[
                            {id:'2-1',name:'菜单2-1'},
                            {id:'2-2',name:'菜单2-2'},
                        ]},
                    {id:'3',name:'菜单3'}

                ]
            }
        },
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