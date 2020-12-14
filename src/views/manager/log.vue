<template>
<div class="center">
    <span>管理员中心 / 日志统计</span>
    <br/>
    <hr/>
<!--    {{logList}}-->
<!--    <el-table :data="list" border stripe="">-->
<!--        <el-table-column type="index" label="#"></el-table-column>-->
<!--        <el-table-column label="用户名" prop="username">-->
<!--        </el-table-column>-->
<!--        &lt;!&ndash;            <el-table-column label="头像" prop=img>&ndash;&gt;-->
<!--        &lt;!&ndash;            </el-table-column>&ndash;&gt;-->
<!--        <el-table-column label="性别" prop="sex">-->
<!--        </el-table-column>-->
<!--        <el-table-column label="联系方式" prop="phone">-->
<!--        </el-table-column>-->
<!--        <el-table-column label="邮箱" prop="email">-->
<!--        </el-table-column>-->
<!--        <el-table-column label="注册时间" width="100px" prop="registerTime">-->
<!--        </el-table-column>-->
<!--        <el-table-column label="操作">-->
<!--            <el-button type="text" @click="handleCreate" :append-to-body="true">编辑</el-button>-->
<!--        </el-table-column>-->
<!--    </el-table>-->
    <el-col span="7">
        <el-input placeholder="请输入日志类型类型" v-model="typeInput" clearable></el-input>
    </el-col>
    <el-col span="4">
        <el-button type="primary" @click="searchType">搜索</el-button>
    </el-col>
<!--    {{logList}}-->
    <el-table :data="logList" border stripe="" max-height="570">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="ID" prop="operId"></el-table-column>
        <el-table-column label="模式" prop="operModul"></el-table-column>
        <el-table-column label="类型" prop="operType"></el-table-column>
        <el-table-column label="详情" prop="operDesc"></el-table-column>
        <el-table-column label="用户" prop="operUserName"></el-table-column>
        <el-table-column label="IP" prop="operIp"></el-table-column>
        <el-table-column label="时间" prop="operCreateTime"></el-table-column>

    </el-table>
    <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage1"
            page-size="10"
            layout="prev, pager, next"
            :total="100">

    </el-pagination>
<!--    <div class="block">-->
<!--        <span class="demonstration"></span>-->
<!--        <el-pagination-->
<!--                layout="prev, pager, next"-->
<!--                :total="1000">-->
<!--        </el-pagination>-->
<!--    </div>-->
</div>

    
</template>

<script>
    export default {
        name:'log',
        mounted() {
            this.queryuser();
        },
        data(){
            return{
                typeInput:'',
                logList:[],
                currentPage1:1,
                currentPage2:5,
                currentPage3:5,
                cuurentPage4:4,
                page_index:1

            }
        },
        methods:{
            queryuser(){
                this.axios({
                    method:"get",
                    url:"http://121.36.57.122:8080/oper-log/get-all?pageIndex=1&size=5&startTime=2020-12-12 10:10:10&endTime=2020-12-14 10:10:10",
                   headers:{
              Authorization: sessionStorage.getItem("token"),
          },
                }).then(res =>{
                    console.log(res)
                    console.log(res.data)
                    this.logList = res.data.result
                })
            },
            searchType(){

            },
            handleCurrentChange(){
                this.page_index = this.page_index+1
                console.log('每页${val}条');
                this.axios({
                    method:"get",
                    url:"http://121.36.57.122:8080/logging/getAll",
                    params:{
                        pageIndex:this.page_index,
                        size:5
                    },
                      headers:{
              Authorization: sessionStorage.getItem("token"),
          },
                }).then(res =>{
                    console.log(res)
                    console.log(res.data)
                    this.logList = res.data.result
                })
            }
        }
    }
</script>
<style scoped>
.center{
    height: 100%;
    /* border: 1px solid black; */
    width: 90%;
    margin-left:5%;
}

span{
    font-size: 12px;
    font-family: sans-serif;
    color: grey;
}
</style>