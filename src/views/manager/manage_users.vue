<template>
    <div class="center">
      
        <a-page-header
            class="header"
            title="管理员中心 ｜ 管理用户"
            @back=" () => { this.$router.push({ path: '../user_first/' }); } "
        />

        <!-- 在这里写东西 -->
        <div class="search_text">
            <el-col span="7">
                <el-input type="text" id="usernameSearch" value="username_value" v-model="searchUsername" placeholder="请输入完整的用户名..."></el-input>
            </el-col>
            <el-col span="1" class="search_bottom">
                <el-button @click="searchUser" type="primary">搜索</el-button>
            </el-col>
            <el-col span="4">
                <el-button @click="addUserVisible=true" type="primary">添加</el-button>
            </el-col>
        </div>

        <div class="table_style">
        <el-table 
        :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        :row-style="{height:'25px'}"
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}"
        stripe
        style="width:100%"
       >
            <el-table-column type="index" label="#"></el-table-column>
            <el-table-column label="用户名" prop="username" width="">
            </el-table-column>
          
            <el-table-column label="角色" prop="name" width="">
            </el-table-column>
            <el-table-column label="性别" prop="sex"  width="">
            </el-table-column>
            <el-table-column label="联系方式" prop="phone"  width="">
            </el-table-column>
            <el-table-column label="邮箱" prop="email"  width="200">
            </el-table-column>
            <el-table-column label="注册时间" width="200px" prop="registerTime" >
            </el-table-column>
            <el-table-column label="操作"  width="">
            <template slot-scope="scope">
                <el-button type="text" @click="handleCreate(scope.row.username,scope.row.id)" :append-to-body="true"> <i class="el-icon-edit"></i></el-button>
                <el-button type="text" @click="delUser(scope.row.id)"> <i class="el-icon-delete"></i></el-button>
            </template>


            </el-table-column>
        </el-table>
        </div>
        <div class="page">
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[6]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length" class="fy">
      </el-pagination>
 </div>


        <el-dialog title="编辑" :visible.sync="dialogFormVisible" :data="currentUser">
            <el-form :model="user_form" :rules="rules" ref="user_form">
                <el-form-item label="用户名" :label-width="formLabelWidth">
                    <el-input v-model="currentUser.username" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="性别" :label-width="formLabelWidth">
                    <el-input v-model="currentUser.sex" auto-complete="off" property=""></el-input>
                </el-form-item>
                <el-form-item label="联系方式" :label-width="formLabelWidth">
                    <el-input v-model="currentUser.phone" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" :label-width="formLabelWidth">
                    <el-input v-model="currentUser.email" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="注册时间" :label-width="formLabelWidth">
                    <el-input v-model="currentUser.registerTime" auto-complete="off"></el-input>
                </el-form-item>
                <div class="role_text">
                    <p>角色</p>
                    <el-select v-model="role_value" placeholder="请选择" ref="selection">
                        <el-option
                                v-for="item in options"
                                :key="item.id"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                     
                    </el-select>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="editData('user_form',currentUser.username,currentUser.sex,currentUser.phone,currentUser.email,role_value)" >确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="添加用户" :visible.sync="addUserVisible">
            <el-form :model="user_form" :rules="rules" ref="user_form">
                <el-form-item label="用户名" :label-width="formLabelWidth">
                    <el-input v-model="user_form.username" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="性别" :label-width="formLabelWidth">
                    <el-input v-model="user_form.sex" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系方式" :label-width="formLabelWidth">
                    <el-input v-model="user_form.phone" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" :label-width="formLabelWidth">
                    <el-input v-model="user_form.email" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                    <el-input v-model="user_form.password" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addUserVisible=false">取 消</el-button>
                <el-button @click="addUser">确定</el-button>
            </div>

        </el-dialog>
        <el-dialog title="该用户的信息" :visible.sync="UserVisible" :data="currentUser">
            <el-form :model="user_form" :rules="rules" ref="user_form">
                <el-form-item label="用户名" :label-width="formLabelWidth">
                    <el-input v-model="currentUser.username" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="性别" :label-width="formLabelWidth">
                    <el-input v-model="currentUser.sex" auto-complete="off" property=""></el-input>
                </el-form-item>
                <el-form-item label="联系方式" :label-width="formLabelWidth">
                    <el-input v-model="currentUser.phone" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" :label-width="formLabelWidth">
                    <el-input v-model="currentUser.email" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="注册时间" :label-width="formLabelWidth">
                    <el-input v-model="currentUser.registerTime" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>

        </el-dialog>

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
                   
                


                
                 // 当前页
      currentPage: 1,
      // 每页多少条
      pageSize: 6,
      date: '',
      tableData: [],
      search: '',
    //   options: [],
      value: '',
      list: '',
      componentlist: [],
      statuslist: [],

                currentUser:[],
                total_username: null,
                total_id: null,
                total_roleId:0,
                searchUsername:'',
                dialogTableVisible: false,
                dialogFormVisible: false,
                addUserVisible: false,
                UserVisible: false,
                // confirmDel: false,
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
                    remark:'',
                    sex:'',
                    phone:'',
                    email:'',
                    password:'',
                    registerTime:'',
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
                formLabelWidth: '120px',
                options: [{
                    value: 1,
                    label: 'admin',
                    id: 1
                }, {
                    value: 2,
                    label: 'user',
                    id: 2
                }, {
                    value: 3,
                    label: 'programmer/校园一卡通',
                    id: 3
                }, {
                    value: 4,
                    label: 'programmer/王者荣耀',
                    id: 4
                }, {
                    value: 5,
                    label: 'programmer/原神',
                    id: 5
                },
                    {
                        value: 6,
                        label: 'programmer/英雄联盟',
                        id: 6
                    },
                    {
                        value: 7,
                        label: 'programmer/皇室战争',
                        id: 7
                    },
                      {
                        value: 8,
                        label: 'programmer/骑马与砍杀',
                        id: 8
                    }],
                role_value:''

            }
        },
        methods:{
               handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
            queryuser(){
                this.axios({
                    method:"get",
                    url:"http://121.36.57.122:8080/user",
                   headers:{
              'Authorization':sessionStorage.getItem("token")
                   },
                })
                    .then(res => {
                        console.log(res)
                        console.log(res.data)
                        this.tableData = res.data.result
                    })

            },
            // 搜索
            searchUser(){
                // alert("搜索用户")
                this.axios({
                    method:"get",
                    url:"http://121.36.57.122:8080/user/accurate-select/"+this.searchUsername,
                    // params:{
                    //     username: this.searchUsername
                    // },
                     headers:{
              'Authorization':sessionStorage.getItem("token")
        },
                }).then(res => {
                    console.log(res)
                    console.log(res.data)
                    this.currentUser = res.data.result
                    // alert(this.currentUser.name)
                })
                this.UserVisible = true;
            },


            addUser(){
                this.axios({
                    method:"post",
                    url:"http://121.36.57.122:8080/user",
                    headers:{
                     'Authorization':sessionStorage.getItem("token")
                    },
                    params:{
                        username:this.user_form.username,
                        sex:this.user_form.sex,
                        phone:this.user_form.phone,
                        email:this.user_form.email,
                        password:this.user_form.password
                    },
                
                }).then(res=>{
                    console.log(res)
                    alert("添加成功，请刷新界面查看");
                }).catch(err=>{
                    console.log(err)
                })
                
                this.addUserVisible=false;
            },



            delUser(user_id){
                // alert("确认删除？ \n 若不想删除，则按F5刷新此页面")

                this.axios({
                    method:"delete",
                    url:"http://121.36.57.122:8080/user/"+user_id,
                    params:{
                        id:user_id
                    },
                    headers:{
              'Authorization':sessionStorage.getItem("token")
                    },
                })
                this.$message.success('删除成功！');

            },

            edit_user(){
                var element = document.getElementById("user_duty");
                element.setAttribute()
            },

            
            handleCreate(usernameOfUser,indexOfUser){
                this.dialogFormVisible = true;
                this.total_username = usernameOfUser;
                this.total_id = indexOfUser;
                // alert(this.total_username)
                this.axios({
                    method:"get",
                    url:"http://121.36.57.122:8080/user/accurate-select/"+this.total_username,
                     headers:{
              'Authorization':sessionStorage.getItem("token")
        },
                    params:{
                        username:this.total_username
                    }
                }).then(res => {
                    console.log(res)
                    console.log(res.data)
                    this.currentUser = res.data.result
                })
                // alert(something)
                // console.log(something)
            },
            editData(formName,username_input,sex_input,phone_input,email_input,roleId_input){
                // alert(this.options.id);
                // alert(roleId_input)
                // alert(this.total_id)
                // this.axios({
                //     method: "put",
                //     url: "http://121.36.57.122:8080/user-role",
                //     headers: {'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzM4NCJ9.eyJuYW1lIjoi5p2o6L6-IiwiaWQiOiIyZjgzMWJiMy02MDQ5LTQ2MDctOWNmMy0zMTBjNGJkMjI2NGEiLCJleHAiOjE2MDgzOTEzOTl9.c36dDtCYu--rGC5J_OzwbY8ejI6R4uyrPNRBj9Zv4wxcjPunJcXtEWUdcG7TpiYD'},
                //     params:{
                //         roleId: roleId_input,
                //         userID: this.total_id
                //     }
                // }).then(res=>{
                //     console.log(res);
                //     console.log('token:'+res.data.result);
                //     //获取后端token
                //     this.userToken = 'Bearer ' + res.data.result;
                //     //储存到vuex
                //     localStorage.setItem('token',this.userToken);
                //     // this.$router.push({ path:'user/update'})
                // })

                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // alert(this.total_id);
                        alert('修改成功，请刷新页面查看');
                        this.dialogFormVisible = false;
                        // this.list[2].sex='女';
                        // this.edit=this.list[2];
                        this.axios({
                            method: "put",
                            url: "http://121.36.57.122:8080/user-role",
                                 headers:{
                                    'Authorization':sessionStorage.getItem("token")
                                 },
                            params:{
                                roleId: roleId_input,
                                userId: this.total_id
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

                        this.axios({
                            method:"put",
                            url:"http://121.36.57.122:8080/user",
                            headers: {'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzM4NCJ9.eyJuYW1lIjoi5p2o6L6-IiwiaWQiOiIyZjgzMWJiMy02MDQ5LTQ2MDctOWNmMy0zMTBjNGJkMjI2NGEiLCJleHAiOjE2MDgzOTEzOTl9.c36dDtCYu--rGC5J_OzwbY8ejI6R4uyrPNRBj9Zv4wxcjPunJcXtEWUdcG7TpiYD'},
                            params:{
                                id:this.total_id,
                                username:username_input,
                                sex:sex_input,
                                phone:phone_input,
                                email:email_input,
                            },
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
            },

            // confirmRoleId(input_roleId){
            //     alert(this.role_value)
            //     alert(input_roleId)
            // }
            // editData(formName,username_input,sex_input,phone_input,email_input){
            //     this.$refs[formName].validate((valid) => {
            //         if (valid) {
            //             // alert(this.total_id);
            //             alert('修改成功，请刷新页面查看');
            //             // this.list[2].sex='女';
            //             // this.edit=this.list[2];
            //             this.axios.put("http://121.36.57.122:8080/user",{id:this.total_id,username:username_input,email:email_input,phone:phone_input},{headers:{'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzM4NCJ9.eyJuYW1lIjoi5p2o6L6-IiwiaWQiOiIyZjgzMWJiMy02MDQ5LTQ2MDctOWNmMy0zMTBjNGJkMjI2NGEiLCJleHAiOjE2MDgzOTEzOTl9.c36dDtCYu--rGC5J_OzwbY8ejI6R4uyrPNRBj9Zv4wxcjPunJcXtEWUdcG7TpiYD'}})
            //             alert("???")
            //         } else {
            //             console.log('error submit!!');
            //             return false;
            //         }
            //     });
            // }
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
.el-table{
    font-size: 12px;
}
 .page{
     position: absolute;
     top: 95%;
 }
  .table_style{
      /* border: 1px solid black; */
      height: 65%;
      /* background-color: white; */
      margin-top: 1%;
  }
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
    .search_bottom{
        padding-right: 75px;
    }
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
        padding-bottom: 60px;

    }
    .role_text{
        padding-left: 80px;
    }
    span{
        font-size: 12px;
        font-family: sans-serif;
        color: grey;
    }

</style>