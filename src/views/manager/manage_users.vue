<template>
    <div class="center">
        <Icon type="arrow-left" />
    <a-page-header
      class="header"
      title="管理员中心 ｜ 管理用户"
      @back=" () => { this.$router.push({ path: '../manager_first/' }); } "
    />

        <!-- 在这里写东西 -->
        <div class="search_text">
            <el-col span="7">
                <el-input type="text" placeholder="请输入..."></el-input>
            </el-col>
            <el-col span="4">
                <el-button onclick="searchUser">搜索</el-button>
            </el-col>
        </div>
<!--        {{list}}-->
<!--        {{user_form.username}}-->

        <el-table :data="list" border stripe="">
            <el-table-column type="index" label="#"></el-table-column>
            <el-table-column label="用户名" prop="username">
            </el-table-column>
            <!--            <el-table-column label="头像" prop=img>-->
            <!--            </el-table-column>-->
            <el-table-column label="性别" prop="sex">
            </el-table-column>
            <el-table-column label="联系方式" prop="phone">
            </el-table-column>
            <el-table-column label="邮箱" prop="email">
            </el-table-column>
            <el-table-column label="注册时间" width="100px" prop="registerTime">
            </el-table-column>
            <el-table-column label="操作">
                <el-button type="text" @click="handleCreate(index)" :append-to-body="true">编辑</el-button>
                <!--                {{list[].username}}-->
                <!--删除按钮-->
                <!--                    <el-tooltip  effect="dark" content="删除此用户" placement="top" :enterable="false">-->
                <!--                        <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>-->
                <!--                    </el-tooltip>-->
            </el-table-column>
        </el-table>
        <el-dialog title="编辑" :visible.sync="dialogFormVisible" >
            <el-form :model="user_form" :rules="rules" ref="user_form">
                <el-form-item label="用户名" :label-width="formLabelWidth">
                    <el-input v-model="user_form.username" auto-complete="off" ></el-input>
                </el-form-item>
                <el-form-item label="性别" :label-width="formLabelWidth">
                    <el-input v-model="user_form.sex" auto-complete="off" property=""></el-input>
                </el-form-item>
                <el-form-item label="联系方式" :label-width="formLabelWidth">
                    <el-input v-model="user_form.phone" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" :label-width="formLabelWidth">
                    <el-input v-model="user_form.email" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="注册时间" :label-width="formLabelWidth">
                    <el-input v-model="user_form.registerTime" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="editData('user_form')" >确 定</el-button>
            </div>
        </el-dialog>
        <!--        <el-dialog title="收货地址" :visible.sync="dialogFormVisible" >-->
        <!--            <el-form :model="form">-->
        <!--                <el-form-item label="活动名称" :label-width="formLabelWidth">-->
        <!--                    <el-input v-model="form.name" auto-complete="off"></el-input>-->
        <!--                </el-form-item>-->
        <!--                <el-form-item label="活动区域" :label-width="formLabelWidth">-->
        <!--                    <el-select v-model="form.region" placeholder="请选择活动区域">-->
        <!--                        <el-option label="区域一" value="shanghai"></el-option>-->
        <!--                        <el-option label="区域二" value="beijing"></el-option>-->
        <!--                    </el-select>-->
        <!--                </el-form-item>-->
        <!--            </el-form>-->
        <!--            <div slot="footer" class="dialog-footer">-->
        <!--                <el-button @click="dialogFormVisible = false">取 消</el-button>-->
        <!--                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>-->
        <!--            </div>-->
        <!--        </el-dialog>-->

    </div>


</template>

<script>
    // import { saveSubject } from "@/api/content";
    export default {
        name:'manager_users',
        mounted() {
            this.queryuser();
        },
        data(){

            return {
                list:[],
                total_index: 0,
                dialogTableVisible: false,
                dialogFormVisible: false,
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                user_form:{
                    user_index:'',
                    username:'',
                    sex:'',
                    phone:'',
                    email:'',
                    registerTime:''
                },
                new_user:[],
                edit:{},
                rules:{
                    username: [{required: true,message: "请输入用户名",trigger: 'blur'},],
                    sex: [{required: true,message: "请输入性别",trigger: 'blur'}],
                    phone: [{required: true,message: "请输入联系方式",trigger: 'blur'}],
                    email: [{required: true,message: "请输入邮箱",trigger: 'blur'}],
                    registerTime: [{required: true,message: "请输入注册时间",trigger: 'blur'}]
                },
                formLabelWidth: '120px'
            }
        },
        methods:{
            queryuser(){
                this.axios({
                    method:"get",
                    url:"http://121.36.57.122:8080/user/getAllUser",
                    headers: {'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzM4NCJ9.eyJpZCI6IjJmODMxYmIzLTYwNDktNDYwNy05Y2YzLTMxMGM0YmQyMjY0YSIsImV4cCI6MTYwNzU2MTUwMX0.wziYra0H-c0SAjnTWxgFb-pver4HFyjHJ3Nt0PBzQQx2m8KrcHbXnFscD8-Dq_QL'}
                })
                    .then(res => {
                        console.log(res)
                        console.log(res.data)
                        this.list = res.data.result
                    })

            },
            // 搜索
            searchUser(){

            },

            edit_user(){
                var element = document.getElementById("user_duty");
                element.setAttribute()
            },
            handleCreate(indexOfUser){
                this.dialogFormVisible = true;
                var something = indexOfUser
                alert(something)
            },
            editData(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                        this.list[2].sex='男';
                        this.edit=this.list[2];
                        this.axios({
                            method:"post",
                            url:"http://121.36.57.122:8080/user/update",
                            headers: {'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzM4NCJ9.eyJpZCI6IjJmODMxYmIzLTYwNDktNDYwNy05Y2YzLTMxMGM0YmQyMjY0YSIsImV4cCI6MTYwNzU2MTUwMX0.wziYra0H-c0SAjnTWxgFb-pver4HFyjHJ3Nt0PBzQQx2m8KrcHbXnFscD8-Dq_QL'},
                            params:{
                                id:'d9e7986c-6df9-40dc-b17d-94ebe35feac3',
                                sex:'女'
                            }
                        }).then(res=>{
                            console.log(res);
                            console.log('token:'+res.data.result);
                            //获取后端token
                            this.userToken = 'Bearer ' + res.data.result;
                            //储存到vuex
                            localStorage.setItem('token',this.userToken);
                            // this.$router.push({ path:'user/update'})
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
//             editData() {
//                 var that = this.user_form;
//                 this.$refs['user_form'].validate((valid) => {
//                     if(valid) {
//                         console.log('-------------success');
//                         //console.log('-----------------添加商品提交的数据');
// //                        console.log(that.type)
//                         that.user_form.username = parseFloat(that.user_form.username);
//                         that.staffinfoForm.enterpriseId = that.staffinfoForm.enterpriseId;
//                         that.staffinfoForm.type = that.type;
//                         console.log(that.staffinfoForm);
//                         //return
//                         that.$http(
//                             "/commodity/addCommodity",
//                             that.staffinfoForm,
//                             'POST',
//                             0
//                         ).then(function(res) {
//
//                             if(res.code == 200) {
//                                 alert("数据添加成功");
//                                 that.$router.go(-1)
//
//                             }
//                         });
//                     } else {
//
//                         console.log('-------------error');
//                         return false;
//                     }
//                 });
//             }
            // handleCreate() {
            //     this.user_form = {
            //         username: "",
            //         sex: "",
            //         phone: "",
            //         email: "",
            //         registerTime: "",
            //     };
            //     this.dialogFormVisible = true;
            // },
            // async createData() //{
            //     let form = null;
            //     form = this.user_form;
            //     const params = form;
            //     const res = await saveSubject(params);
            //     console.log(res);
            //     if (res.code === "0000") {
            //         this.$message({
            //             type: "info",
            //             message: "保存成功",
            //         });
            //         this.dialogFormVisible = false;
            //         this.getQuerySubjectList();
            //         return;
            //     }
            //     this.$message({
            //         type: "error",
            //         message: "保存失败",
            //     });
            // },

        },

        //
        // del(id){    //删除
        //     this.$http.get('api/delproduct/'+id).then(result=>{
        //         if (result.body.status === 0) {
        //             //成功
        //             this.getAllList()
        //         } else {
        //             alert('获取数据失败')
        //         }
        //     })
        // }

    }
</script>

<style scoped>

    .center{
        height: 100%;
        /* border: 1px solid black; */
        width: 90%;
        margin-left:5%;
    }
    table,td{
        border:solid;

    }
    /*.user_head{*/
    /*    padding-right: 50px;*/
    /*}*/
    .user_data{
        padding-top:50px;
    }
    .user_msg{
        padding-right: 50px;
    }
    .user_msg1{
        padding-right: 10px;
    }
    .search_text{
        padding-top: 10px;
        padding-bottom: 10px;
    }
    span{
        font-size: 12px;
        font-family: sans-serif;
        color: grey;
    }

</style>