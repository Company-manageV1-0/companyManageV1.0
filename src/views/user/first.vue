<template>
    <div class="block">
        <!--点击切换-->
        <el-carousel trigger="click" height="738px"> 
        <el-carousel-item v-for="item in imagesBox" :key="item.id">
            <img :src="item.idView" class="image">
        </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>

export default {
    data(){
      return{
        imagesBox:[{id:0,idView:require("../../assets/login-bg.jpg")},
          {id:1,idView:require("../../assets/2.jpg")},
          {id:2,idView:require("../../assets/3.jpg")},
          {id:3,idView:require("../../assets/4.jpg")},],
        fiveNews: []
      }
    }
}


</script>

<style>
 .el-carousel__item img {
  color: #475669;
  width: 100%;
  height: 100%;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
 }

 .el-carousel__item:nth-child(2n) {
   background-color: #99a9bf;
 }
 
 .el-carousel__item:nth-child(2n+1) {
   background-color: #d3dce6;
 }
    
</style>
