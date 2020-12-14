<template>
<div class="center">
    <Icon type="arrow-left" />
    <a-page-header
      class="header"
      title="管理员中心 ｜ 我的日志"
      @back=" () => { this.$router.push({ path: '../manager_first/' }); } "
    />
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
    <el-table :data="showTableData" border stripe="">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="ID" prop="id"></el-table-column>
        <el-table-column label="信息" prop="message"></el-table-column>
        <el-table-column label="等级" prop="levelString"></el-table-column>
        <el-table-column label="创建时间" prop="createdTime"></el-table-column>
        <el-table-column label="所在类" prop="loggerName"></el-table-column>

    </el-table>
    <el-pagination
      class="pagination"
      background
      layout="prev, pager, next"
      :pager-count="5"
      :page-count="pagecount"
      @current-change="getTable"
    ></el-pagination>
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
                testTableData:[],
                showTableData:[],
            }
        },
        methods:{
            getTable(currentPage) {
                this.pagesize = 8;
                //通过当前页数和每页限制条数 从总数组上分割要显示的数组
                this.showTableData = this.testTableData.slice(
                    (currentPage - 1) * this.pagesize,
                    currentPage * this.pagesize
                );
                console.log(this.showTableData);
            },
            queryuser(){
                this.axios({
                    method:"get",
                    url:"http://121.36.57.122:8080/logging/getAll?pageIndex=1&size=5000",
                    headers: {'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzM4NCJ9.eyJpZCI6IjJmODMxYmIzLTYwNDktNDYwNy05Y2YzLTMxMGM0YmQyMjY0YSIsImV4cCI6MTYwNzU2MTUwMX0.wziYra0H-c0SAjnTWxgFb-pver4HFyjHJ3Nt0PBzQQx2m8KrcHbXnFscD8-Dq_QL'}
                }).then(res =>{
                    console.log(res)
                    console.log(res.data)
                    this.testTableData = res.data.result
                    for (let TableData of this.testTableData) {
                        TableData.message = TableData.message
                            .toString()
                            .substr(0, [11])
                            .concat("...");
                        TableData.createdTime = TableData.createdTime.replace(/T/g, "-");
                        TableData.questionType = "    ".concat(TableData.questionType);
                        // for(let i = 0;i<TableData.declareDescribe.length/20;i++){
                            // TableData.declareDescribe.substr(i,[(i+1)*20]).concat("<br />")
                        // }
                        // console.log(TableData.softwareName + TableData.id)
                    }
                    //计算page总数
                    this.pagecount =
                    this.testTableData.length % 8 === 0
                        ? this.testTableData.length / 8
                        : (this.testTableData.length - (this.testTableData.length % 8)) /
                            8 +
                        1;
                    // console.log(this.pagecount);


                    this.getTable(1);



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