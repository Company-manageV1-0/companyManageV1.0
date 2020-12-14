<template>
  <div class="center">
    <Icon type="arrow-left" />
    <a-page-header
      class="header"
      title="管理员中心 ｜ 我的工单"
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
      <el-table-column prop="solution" label="解决方式" width="100"></el-table-column>
      <el-table-column fixed="right" label="操作" width="170">
        <template slot-scope="scope">
          <a-popover placement="left">
              <template slot="content">
                <a-descriptions  title="用户反馈详情" size="small" bordered={true}>
                  <a-descriptions-item label="反馈问题类型" :span="1">
                    {{showTableData[scope.$index].questionType}}
                  </a-descriptions-item>
                  <a-descriptions-item label="软件名称" :span="2">
                    {{showTableData[scope.$index].softwareName}}
                  </a-descriptions-item>
                  
                  <a-descriptions-item label="反馈时间" :span="1">
                    {{showTableData[scope.$index].time}}
                  </a-descriptions-item>
                  <a-descriptions-item label="用户ID" :span="2">
                    {{showTableData[scope.$index].userId}}
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
                  <a-descriptions-item label="详细反馈" :span="3">
                    {{showTableData[scope.$index].declareDescribe}}
                  </a-descriptions-item>
                </a-descriptions>
              </template>
              <a-button type="text" style="height: 30px;line-width: 50px;ine-height: 30px;display: inline;margin-left: -5px">
                详情
              </a-button>
          </a-popover>
          <a-button type="primary" style="height: 30px;line-width: 50px;line-height: 30px;display: inline;margin-left: 10px;" @click="showDrawer(showTableData[scope.$index].id)"> 处理 </a-button>
          <a-drawer title="用户反馈处理" :width="410" :visible="maskVisible" :mask="true" :maskStyle="{'opacity':'0.1','background':'rgba(0,0,0,0.25)','animation':'none'}"
            :maskClosable="true" :body-style="{ paddingBottom: '80px' }" @close="onClose" >
            <a-form :form="form" layout="vertical" hide-required-mark>
              <a-row :gutter="16">
                <a-col :span="24">
                  <a-form-item label="问题类型修改">
                    <a-select
                      v-decorator="[
                        'questionType',
                        {
                          rules: [{ required: true, message: '请选择问题类型' }],
                        },
                      ]"
                      placeholder="请选择问题类型"
                      @change="handleQuestionTypeSelectChange"
                    >
                      <a-select-option v-for="engineer in engineer_options" :key="engineer.key">
                        
                      </a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                
              </a-row>
              <a-row :gutter="16">
                <a-col :span="24">
                  <a-form-item label="分配技术人员">
                    <a-select
                      default-value="杨龙"
                      v-decorator="[
                        'owner',
                        {
                          rules: [{ required: true, message: '请选择分配的技术人员' }],
                        },
                      ]"
                      placeholder="请选择分配的技术人员"
                      @change="handleEngineerIDSelectChange"
                    >
                      <a-select-option v-for="engineer of engineer_options" :key="engineer.value">
                        {{engineer.value}}
                      </a-select-option>
            
                    </a-select>
                  </a-form-item>
                </a-col>
                
              </a-row>
              
              <a-row :gutter="16">
                <a-col :span="24">
                  <a-form-item label="解决方式">
                    <a-textarea
                      v-decorator="[
                        'description',
                        {
                          rules: [{ required: true, message: 'Please enter url description' }],
                        },
                      ]"
                      :rows="4"
                      placeholder="请输入该反馈信息的解决方式"
                    />
                  </a-form-item>
                </a-col>
              </a-row>
            </a-form>
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
              <a-button :style="{ marginRight: '8px' }" @click="onClose">
                取消
              </a-button>
              <a-button type="primary" @click="onPost()">
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
let showTableData = [
  {
    briefDescribe: "",
    dealUserId: "",
    declareDescribe: "",
    id: "",
    isdeal: "",
    questionType: "",
    softwareName: "",
    solution: "",
    time: "",
    uploadFile: "",
    userId: "",
  },
];
let pagecount = Number;
export default {
  methods: {
    //mask.show 
    //get engineerID
    showDrawer(feedBackId) {
      this.maskVisible = true;
      console.log("feedbackid:" + feedBackId);
      this.getAllEngineer(feedBackId);
    },
    //mask.cancel close
    onClose() {
      this.maskVisible = false;
    },
    //submit ths updated form
    onPost(){

    },
    //
    handleEngineerIDSelectChange(value){
      console.log("ENGINEER" + value);//engineer selected option
      
    },
    //post All Feedback data
    postAllData(){
      this.axios({
        method:"POST",
        url:"http://121.36.57.122:8080/feedBack/update",
       headers:{
              Authorization: sessionStorage.getItem("token"),
          },
      }).then((res)=>{
        console.log(res);
      })
    },

    //ger All engineer
    getAllEngineer(feedBackId){
      this.axios({
        method: "GET",
        url: "http://121.36.57.122:8080/feedBack/getUserByid?feedBackId=" + feedBackId,
       headers:{
              Authorization: sessionStorage.getItem("token"),
          },
      }).then((res)=>{
        // this.engineer_options = res.data.result;
        var allResults = res.data.result;
        console.log(allResults)
        allResults.forEach(allResult => {
          console.log(allResult);
          this.engineer_options.push({
            value:allResult.username,
          })
        });
        console.log(this.engineer_options);
      })
    },

    //get All Feedback Data
    getAllData() {
      this.axios({
        method: "POST",
        url: this.getUrl(1, 5000),
      headers:{
              Authorization: sessionStorage.getItem("token"),
          },
      }).then((res) => {
        //超出限制用... 和 修改日期
        this.testTableData = res.data.result;
        for (let TableData of this.testTableData) {
          TableData.briefDescribe = TableData.briefDescribe
            .toString()
            .substr(0, [11])
            .concat("...");
          TableData.time = TableData.time.replace(/T/g, "-");
          TableData.questionType = "    ".concat(TableData.questionType);
          // for(let i = 0;i<TableData.declareDescribe.length/20;i++){
              // TableData.declareDescribe.substr(i,[(i+1)*20]).concat("<br />")
          // }
          // console.log(TableData.softwareName + TableData.id)
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
        // console.log(this.pagecount);

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
      let url = "http://121.36.57.122:8080/feedBack/getAll";
      url = url.concat(
        "?pageIndex=" + currentPage.toString() + "&size=" + size
      );
      console.log(url);

      return url;
    },
  },
  mounted() {
    this.getAllData();
    // console.log(this.testTableData)
  },
  data() {
    return {
      //技术人员选项
      engineer_options: [],
      form: this.$form.createForm(this),
      showTableData,
      //根据数据进行page页数分页
      pagecount,
      // dialogTableVisible: false,
      // dialogFormVisible: false,
      // form: {
      //   name: "",
      //   region: "",
      //   date1: "",
      //   date2: "",
      //   delivery: false,
      //   type: [],
      //   resource: "",
      //   desc: "",
      // },
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
