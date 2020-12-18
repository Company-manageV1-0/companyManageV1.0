<template>
  <div class="center">
    <a-page-header
      class="header"
      title="技术人员中心 ｜ 处理反馈"
      @back=" () => { this.$router.push({ path: '../manager_first/' }); } "
    />

    <el-table :data="showTableData" stripe style="width: 100%" border>
      <el-table-column prop="questionType" label="反馈问题类型" width="110"></el-table-column>
      <el-table-column prop="softwareName" label="软件名称" width="110"></el-table-column>
      <el-table-column prop="briefDescribe" label="问题简述" width="200"></el-table-column>
      <el-table-column prop="time" label="反馈时间" width="180"></el-table-column>
      <el-table-column prop="isdeal" label="状态" width="150">
        <template slot-scope="scope">
          <a-badge v-if="scope.row.isdeal === 1" status="error"  />
          <a-badge v-if="scope.row.isdeal === 2" status="warning"  />
          <a-badge v-if="scope.row.isdeal === 3" status="success"  />
          <font v-if="scope.row.isdeal === 1" color="red">未处理</font>
          <font v-else-if="scope.row.isdeal === 2" color="orange">正在处理</font>
          <font v-else-if="scope.row.isdeal === 3" color="green">已处理</font>
        </template>
      </el-table-column>
      <el-table-column prop="solution" label="解决方式" width="170"></el-table-column>
      <el-table-column fixed="right" label="操作" width="170">
        <template slot-scope="scope">
          <a-popover placement="left">
              <template slot="content">
                <a-descriptions  title="用户反馈详情" size="small" bordered>
                  <a-descriptions-item label="反馈问题类型" :span="1">
                    {{showTableData[scope.$index].questionType}}
                  </a-descriptions-item>
                  <a-descriptions-item label="软件名称" :span="2">
                    {{showTableData[scope.$index].softwareName}}
                  </a-descriptions-item>
                  
                  <a-descriptions-item label="反馈时间" :span="3">
                    {{showTableData[scope.$index].time}}
                  </a-descriptions-item>                  
                  <a-descriptions-item label="事件状态" :span="3">
                    <a-badge v-if="scope.row.isdeal === 1" status="error"  />
                    <a-badge v-if="scope.row.isdeal === 2" status="warning"  />
                    <a-badge v-if="scope.row.isdeal === 3" status="success"  />
                    <font v-if="scope.row.isdeal === 1" color="red">未处理</font>
                    <font v-else-if="scope.row.isdeal === 2" color="orange">正在处理</font>
                    <font v-else-if="scope.row.isdeal === 3" color="green">已处理</font>
                  </a-descriptions-item>
                  <a-descriptions-item label="问题简述" :span="3">
                    {{showTableData[scope.$index].briefDescribe}}
                  </a-descriptions-item>
                  <!-- TODO 详细反馈判断字符串长度 -->

                  <!-- DONE 添加解决方式 -->
                  <a-descriptions-item label="解决方式" :span="3">
                    {{showTableData[scope.$index].solution}}
                  </a-descriptions-item>
                  <a-descriptions-item label="详细反馈" :span="3">
                    {{showTableData[scope.$index].declareDescribe}}
                  </a-descriptions-item>
                </a-descriptions>
              </template>
              <a-button type="text" style="height: 30px;line-width: 50px;line-height: 30px;display: inline;">
                详情
              </a-button>
          </a-popover>
          <a-button type="primary" style="height: 30px;line-width: 50px;line-height: 30px;display: inline;margin-left: 10px;" @click="showDrawer(showTableData[scope.$index].id, (showTableData[scope.$index].solution?showTableData[scope.$index].solution:'无'))"> 处理 </a-button>
          <a-drawer title="用户反馈处理" :width="410" :visible="maskVisible" :mask="true" :maskStyle="{'opacity':'0.1','background':'rgba(0,0,0,0.25)','animation':'none'}"
            :maskClosable="true" :body-style="{ paddingBottom: '80px' }" @close="onClose" >
            <a-form :form="form" layout="vertical" hide-required-mark>
              <!-- TODO 解决方式 -->
              <a-row :gutter="16">
                <a-col :span="24">
                  <a-form-item label="解决方式">
                    <a-textarea
                      :value="solutionTextVal"
                      v-decorator="[
                        'description',
                        {
                          rules: [{ required: true, message: 'Please enter url description' }],
                        },
                      ]"
                      :auto-size="{ minRows: 3, maxRows: 9 }"
                      placeholder="请输入该反馈信息的解决方式"
                      @change="handleSolutiontextChange">
                    {{solutionText}}
                    </a-textarea>
                  </a-form-item>
                </a-col>
              </a-row>
            </a-form>
            <!-- TODO 提交的onpost操作 onclose的提示-->

            <div
              :style="{
                position: 'absolute',
                right: 0,
                bottom: 0,
                width: '100%',
                borderTop: '1px solid #e9e9e9',
                padding: '10px 16px',
                background: '#fff',
                textAlign: 'right',
                zIndex: 1,
              }"
            >
              <a-button :style="{ marginRight: '8px' }" @click="onClose(scope.$index)">
                取消
              </a-button>
              <a-button type="primary" @click="onPost(scope.$index)">
                提交
              </a-button>
            </div>
          </a-drawer>
          <!-- <a-button type="primary" style="height: 30px;line-width: 50px;line-height: 30px;display: inline;margin-left: 10px;" @click="showDrawer">
            编辑
          </a-button> -->
          
        </template>
      </el-table-column>
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
let showTableData = [];
let pagecount = Number;
let solutionTextVal = "";
console.log(solutionTextVal);
export default {
  props:{
    Value:Object,//v-model
  },
  methods: {
    //mask.show 
    //get engineerID
    showDrawer(feedBackId, solution) {
      this.maskVisible = true;
      console.log("feedbackid:" + feedBackId);
      this.solutionText = solution;
    },
    /**TODO onclose关掉的提醒 */ 
    //mask.cancel close
    onClose() {
      this.maskVisible = false;
      this.solutionText = '';
      console.log(this.solutionText)
      this.getAllFeedbackData();
    },
    /**TODO onpost的提交操作 */
    //submit ths updated form
    onPost(scopeIndex){
      this.postAllFeedbackData(this.showTableData[scopeIndex].id);
      this.onClose(scopeIndex);
    },

    handleSolutiontextChange(value){
      console.log(value)
      // console.log(this.solutionText)
      this.$emit('handleSolutiontextChange',value);
      
    },

    /**TODO 提交操作*/
    //post All Feedback data
    postAllFeedbackData(id){
      console.log(id)
      console.log(this.solutionTextVal)
      this.axios({
        method:"post",
        url:"http://121.36.57.122:8080/feedback",
        headers:{
              Authorization: sessionStorage.getItem("token"),
          },
        params:{
          id:id,
          solution:solutionTextVal
        }
      }).then((res)=>{
        console.log("post All Feedback data:",res);
      })
    },
    
    /**TODO 分页根据窗口高度动态显示*/

    //get All Feedback Data
    getAllFeedbackData() {
      this.axios({
        method: "GET",
        url: this.getUrl(1, 1000),
      headers:{
              Authorization: sessionStorage.getItem("token"),
          },
      }).then((res) => {
        //超出限制用... 和 修改日期
        this.testTableData = res.data.result.records;
        for (let TableData of this.testTableData) {
          TableData.briefDescribe = TableData.briefDescribe
            .toString()
            .substr(0, [11])
            .concat("...");
          TableData.time = TableData.time.replace(/T/g, "-");
        }
        //按照日期排序
        this.arrSortByTime(this.testTableData);
        console.log(this.testTableData.length);
        
        //计算page总数
        this.pagecount =
          this.testTableData.length % 8 === 0
            ? this.testTableData.length / 8
            : (this.testTableData.length - (this.testTableData.length % 8)) /
                8 +
              1;
        this.getTable(1);
      });
    },
    
    arrSortByTime(arr) {
      //升序排序
      arr.sort(function (a, b) {
        if (a.time < b.time) {
          return -1;
        } else if (a.time > b.time) {
          return 1;
        } else {
          if (a.time < b.time) {
            return 1;
          } else if (a.time > b.time) {
            return -1;
          }
          return 0;
        }
      });
    },
    getTable(currentPage) {
      this.pagesize = 8;
      //通过当前页数和每页限制条数 从总数组上分割要显示的数组
      this.showTableData = this.testTableData.slice(
        (currentPage - 1) * this.pagesize,
        currentPage * this.pagesize
      );
      console.log(this.showTableData);
    },

    getUrl(currentPage, size) {
      let url = "http://121.36.57.122:8080/feedback/";
      url = url.concat(
        "?pageIndex=" + currentPage.toString() + "&size=" + size
      );
      console.log(url);

      return url;
    },
  },



  mounted() {
    this.getAllFeedbackData();
  },
  data() {
    return {
      solutionText:{},
      solutionTextVal:[],
      form: this.$form.createForm(this),
      showTableData,
      //根据数据进行page页数分页
      pagecount,
      formLabelWidth: "120px",
      visible: true,
      maskVisible: false,
      
    };
  },
};
</script>
<style scoped>
.header {
  margin-left: -15px;
}
】 span {
  font-size: 12px;
  font-family: sans-serif;
  color: grey;
}
.center {
  width: 90%;
  margin-top: 10px;
  margin-left: 5%;
  height: 100%;
}
.pagination {
  text-align: center;
  /* position: absolute; */
  /* left: 50%; */
  /* bottom: 45px; */
  margin-top: 15px;
}
</style>
