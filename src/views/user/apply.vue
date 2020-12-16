<template>
<div class="center">
    <Icon type="arrow-left" />
    <a-page-header
      class="header"
      title="用户中心 ｜ 我要申请"
      @back=" () => { this.$router.push({ path: '../user_first/' }); } "
    />
</div>
    
    
</template>

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