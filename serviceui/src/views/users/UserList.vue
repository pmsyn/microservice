<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card shadow="always">
            <!--gutter col间隙-->
            <el-row :gutter=20>
                <el-col :span="9">
                    <el-input placeholder="请输入内容" v-model="searchText" class="input-with-select" clearable @clear="getUserList">
                        <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="2">
                    <el-button type="primary" @click="addUser">添加用户</el-button>
                </el-col>
            </el-row>
            <el-table :data="getUserList"   :default-sort = "{prop: 'date', order: 'descending'}"  highlight-current-row>
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column  type="index" label="序号"  ></el-table-column>
                <el-table-column  prop="date" label="日期" sortable width="180"></el-table-column>
                <el-table-column prop="name" label="姓名" sortable width="120"></el-table-column>
                <el-table-column prop="address" label="地址" width="300"></el-table-column>
                <el-table-column  label="状态" width="60">
                    <template slot-scope="scope">
                        <!--作用域插槽 scope.row获取当前行数据-->
                        <el-switch v-model="scope.row.status"></el-switch>
                    </template>
                </el-table-column>
                <el-table-column  label="操作" >
                    <template slot-scope="scope">
                        <el-button @click="update(scope.row.name)"  size="mini" icon="el-icon-edit"></el-button>
                        <el-button @click="removeUserInfo(scope.row.name)" type="danger" size="mini" icon="el-icon-delete"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage4"
                    :page-sizes="[100, 200, 300, 400]"
                    :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </el-card>
        <el-dialog title="用户信息" :visible.sync="addUserVisible" width="50%" @close="handleClose">
            <el-form :model="userInfo" :rules="userInfoRules" ref="userInfoRef" label-width="100px" class="demo-ruleForm">
                <el-form-item label="名称" prop="name">
                    <el-input v-model="userInfo.name"></el-input>
                </el-form-item>
                <el-form-item label="地址" prop="address">
                    <el-input v-model="userInfo.address"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addUserVisible = false">取 消</el-button>
                <el-button type="primary"  @click="saveUserInfo('userInfoRef')" >保存</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "UserList",
        data() {
            return {
                getUserList: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                    status:true,
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄',
                    status: false
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄',
                    status: true
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄',
                    status: false
                }],
                total:300,
                currentPage4:1,
                searchText:'',
                addUserVisible:false,
                userInfo:{
                    name:'',
                    address:''
                },
                userInfoRules:{
                    name: [
                        { required: true, message: '请输入名称', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    address:[
                        { required: true, message: '请输入地址', trigger: 'blur'}
                    ]
                }

            }
        },
        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            addUser(){
                this.addUserVisible = true
            },
            handleClose() {
                this.$refs.userInfoRef.resetFields();
            },
            saveUserInfo(formName){
                this.$refs[formName].validate((valid)=>{
                   if(valid){
                       this.$message.success("成功")
                       this.addUserVisible = false
                   }else{
                       this.$message.error("失败")
                   }

                });
            },
            async removeUserInfo(id){
                let res =  await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示'
                    , {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).catch((error)=>error)//返回错误
                if(res == 'confirm'){
                    console.log(id);
                    this.$message.success({type:"success",message:"删除成功"})
                }else{
                    console.error(res);
                }
            }
        }
    }
</script>

<style scoped>
    .el-breadcrumb{
        margin-bottom: 20px;
    }
    .el-pagination{
        margin-top: 20px;
    }
</style>