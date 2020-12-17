<template>
<div class="center">
    <Icon type="arrow-left" />
    <a-page-header
      class="header"
      title="用户中心 ｜ 我要申请"
      @back=" () => { this.$router.push({ path: '../user_first/' }); } "
    />


    <div class="container">
        <div class="role">选择申请的角色
            <!-- TODO 下拉列表：申请的角色 -->
            <el-form-item label="性别">
            <el-radio-group :value='userRole'>
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
              <el-radio label="其它"></el-radio>
            </el-radio-group>
          </el-form-item>
        </div>

        <!-- TODO 正反面照片 工作牌照片 -->



        <!-- TODO 提交的button -->
    </div>

</div>

    
</template>

<script>
export default {
  data() {
    return {
      //用户角色列表
      userRole:['user','programmer','admin'],
    };
  },
  methods:{
    
    handleButtonClick(e) {
      console.log('click left button', e);
    },
    handleMenuClick(e) {
      console.log('click', e);
    },
    
    /**TODO 页面加载进来获取角色数据*/
    getUserRole(){
        return this.userRole;
    },


    /**TODO 上传的图片操作 断点续传*/
    updateImg(){

    },



    /**TODO 提交表单*/
    updateForm(){
        this.updateImg;
    },



  },
      
  mounted(){  

    /**TODO 页面加载进来获取角色数据*/
    this.getUserRole;

  }
};
</script>


<style scoped>
.center{
    height: 100%;
    /* border: 1px solid black; */
    width: 90%;
    margin-left:5%;
}
.container{
    width: 80%;
    padding: 5%;
    background: #fff;
    border-radius: 5px;
    margin-left: 10%;
    margin-top: 2%;
    height: 80%;
}
.role{
    margin-left: 40%;
}

</style>