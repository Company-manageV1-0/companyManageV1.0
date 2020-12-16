<template>
<div class="center">
    <Icon type="arrow-left" />
    <a-page-header
      class="header"
      title="用户中心 ｜ 我要申请"
      @back=" () => { this.$router.push({ path: '../user_first/' }); } "
    />



    <!-- TODO 下拉列表：申请的角色 -->



    <!-- TODO 正反面照片 工作牌照片 -->


</div>

    
</template>

<script>
export default {
  data() {
    return {
      list:[],
    };
  },
  methods:{
    
    
    
    /**TODO 页面加载进来获取角色数据*/
    getUserRole(){

    },


    /**TODO 上传的图片操作*/
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

</style>