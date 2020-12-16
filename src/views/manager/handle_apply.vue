<template>
<div class="center">
    <Icon type="arrow-left" />
    <a-page-header
      class="header"
      title="管理员中心 ｜ 处理申请"
      @back=" () => { this.$router.push({ path: '../user_first/' }); } "
    />
    <!-- TODO 表格 列：username roleId auditStatus （详情button）（处理button） -->
    <!-- TODO 详情button弹出框 username roleId auditStatus sex （IMG：staffImg idCardFrontImg idCardBackImg） -->
    <!-- TODO 处理button下拉列表 auditStatus 对应 1 2 3 （弹出确认框）-->
    <!-- TODO 确认框 绑定patchApplyData进行提交 -->
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