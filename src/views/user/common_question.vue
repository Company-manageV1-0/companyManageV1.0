<template>
  <div class="center">
    <a-page-header
      class="header"
      title="用户中心 ｜ 知识库"
      @back=" () => { this.$router.push({ path: '../user_first/first' }); } "
    />
   
    <div class="pic">
      <div class="search">
      <div class="search_input">
      <el-input  v-model="mohuinput" placeholder="请输入内容进行搜索" ></el-input>
      </div>
      <div class="search_button">
      <el-button type="primary" icon="search" @click="search"><i class="el-icon-search"></i>搜索</el-button>
      </div>
      </div>
    </div>
    <div class="big">
      <h1>公共社区</h1>
      <div class="con">

        <el-table :data="tableData"  height="100%" style="width:100%" >
          <el-table-column prop="title" label="版本发布" width="">
          </el-table-column>

         <el-table-column
      fixed="right"
      label=""
      width="">

      <template scope="scope">
        <el-button
          @click="detail(scope.row.title)"
          type="text"
          size="small">
          查看详情
        </el-button>
         </template>
    </el-table-column> 
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list:[],
      tableData:[],
      // tableData: [
      //   {
      //     title: "办公软件专业版9.0.0发布，主要提高性能",
      //   },
      // ],
      mohuinput:''
    };
  },
  methods:{
      detail(data){
          console.log(data)
           this.$store.commit('download',data);
           this.$router.push({ path:'/user_first/download'})
      },


//根据搜索框搜索相关信息 全部信息就不输入
      search(){
        if(this.mohuinput == ''){
            this.axios({
          url:'http://121.36.57.122:8080/edition',
          headers:{
                 'Authorization':sessionStorage.getItem("token")
                //  localStorage.getItem('token')
             },
        }).then(res=>{
           console.log(res);
           this.list = res.data.result 
           // console.log("list" + this.list);
           this.tableData = this.list
          //  console.log("re"+res.data.result)
          //  alert(+res.data.result[0].username)
        }).catch(err=>{
            console.log(err);
            this.$router.push({ path:'/user_first/four'})
        });
        }else{
            this.axios({
          url:"http://121.36.57.122:8080/edition/vague-select/"+this.mohuinput,
          headers:{
                 'Authorization':sessionStorage.getItem("token")
                //  localStorage.getItem('token')
             },
          params:{
            title:this.mohuinput
          },
        }).then(res=>{
           console.log(res);
           this.list = res.data.result 
           // console.log("list" + this.list);
           this.tableData = this.list
          //  console.log("re"+res.data.result)
          //  alert(+res.data.result[0].username)
        }).catch(err=>{
            console.log(err);
            this.$message.error('err.response.message！');
        });
        }
       
      }
  },

  
//进入页面显示全部文章
  mounted(){
     this.axios({
          url:'http://121.36.57.122:8080/edition',
          headers:{
                 'Authorization':sessionStorage.getItem("token")
                //  localStorage.getItem('token')
             },
        }).then(res=>{
           console.log(res);
           this.list = res.data.result 
           // console.log("list" + this.list);
           this.tableData = this.list
          //  console.log("re"+res.data.result)
          //  alert(+res.data.result[0].username)
        }).catch(err=>{
            console.log(err);
            this.$router.push({ path:'/user_first/four'})
        });
  }
};
</script>

<style scoped>
a{
  text-decoration: none;
  color: black;
  font-size: 14px;
  /* margin-left:30%; */
}

a:hover {
  color: #409eff;
}

.center {
  height: 100%;
  /* border: 1px solid black; */
  width: 90%;
  margin-left: 5%;
}

span {
  font-size: 12px;
  font-family: sans-serif;
  color: grey;
}

.big {
  width: 100%;
  height: 80%;
  /* margin-top:; */
  /* border: 1px solid black; */
  background-color: white;
}

.con {
  float: left;
  height:90%;
  width: 100%;
  /* border: 1px solid black; */
  margin-top: 10px;
}

.pic {
  /* border: 1px solid black; */
  width: 100%;
  height:10%;
}

.search{
  float: left;
  /* border: 1px solid black; */
  height: 100%;
  width: 50%;
  margin-left: 25%;
}
.search_input{
  float: left;
  /* border: 1px solid black; */
  height: 100%;
  width: 80%;
}
.search_button{
   float: right;
   /* border: 1px solid black; */
   height: 100%;
    width: 20%;
}
.conone {
  height:100%;
}
</style>