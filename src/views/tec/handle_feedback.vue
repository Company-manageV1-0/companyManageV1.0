<template>
<div class="center">
    <Icon type="arrow-left" />
    <a-page-header
      class="header"
      title="技术人员中心 ｜ 处理反馈"
      @back=" () => { this.$router.push({ path: '../user_first/' }); } "
    />
    <!-- TODO 表格 列：username roleId auditStatus （详情button）（处理button） -->
    <!-- TODO 详情button弹出框  -->
    <!-- TODO 分页 -->

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
    
    
    
    /**TODO 页面加载进来获取所有申请数据*/
    getAllData(){
        this.getAllApplyData()
    },



    /**TODO 提交表单*/
    updateForm(){
        this.patchApplyData()
    },

  },
      
  mounted(){  
    /**TODO 页面加载进来获取所有数据*/
    this.getAllData;

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

span{
    font-size: 12px;
    font-family: sans-serif;
    color: grey;
}
</style>