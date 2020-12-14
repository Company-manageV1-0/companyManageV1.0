<template>
  <div class="center">
    <Icon type="arrow-left" />
    <a-page-header
      class="header"
      title="用户中心 ｜ 我的反馈"
      @back=" () => { this.$router.push({ path: '../user_first/first' }); } "
    />
    <div class="container">
      <div class="form">
        <el-form ref="form" :model="form" label-width="250px">
          <br />
          <el-form-item label="选择软件">
            <el-select v-model="form.ruanjian" placeholder="请选择" class="op">
              <el-option key="bg" label="办公软件" value="办公软件"></el-option>
              <el-option key="yx" label="游戏软件" value="游戏软件"></el-option>
              <el-option key="kf" label="开发软件" value="开发软件"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="问题类型">
            <el-select v-model="form.type" placeholder="请选择" class="op">
              <el-option key="hp" label="黑屏" value="黑屏"></el-option>
              <el-option key="kd" label="卡顿" value="卡顿"></el-option>
              <el-option key="sj" label="升级失败" value="升级失败"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="请简要描述问题">
            <el-input v-model="form.jianyao" class="input"></el-input>
          </el-form-item>

          <el-form-item label="详细描述">
            <el-input
              type="textarea"
              rows="5"
              v-model="form.desc"
              class="input"
              placeholder="友善，精确的问题更快得到解答"
            ></el-input>
          </el-form-item>

          <el-form-item label="上传附件：">
            <el-button class="file_button" value="上传附件"
              >上传附件
            </el-button>
            <input
              type="file"
              @click="onSubmit"
              class=""
              id="notshow"
              ref="inputer"
            />
            附件大小不超过3M
          </el-form-item>

          <el-form-item label="手机号">
            <el-input
              v-model="form.phonenum"
              class="input"
              placeholder="用于及时联系"
            ></el-input>
          </el-form-item>

          <el-form-item label="邮箱号">
            <el-input
              v-model="form.email"
              class="input"
              placeholder="用于及时联系"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="Submit" class="but"
              >提交</el-button
            >
            <el-button class="but">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "feedback_form",
  data() {
    return {
      form: {
        ruanjian: "",
        type: "",
        jianyao: "",
        desc: "",
        phonenum: "",
        email: "",
      },
      // 得到从后端传来的地址
      file_url:''
    };
  },
  methods: {
    Submit() {
      // alert(sessionStorage.getItem("token"));
      // console.log(this.form)
      this.axios({
        method: "post",
        headers: {
          Authorization: sessionStorage.getItem("token"),
        },
        url: "http://121.36.57.122:8080/feedBack/add",
        params: {
          briefDescribe: this.form.jianyao,
          declareDescribe: this.form.desc,
          questionType: this.form.type,
          softwareName: this.form.ruanjian,
          phone: this.form.phonenum,
          email: this.form.email,
        },
      })
        .then((res) => {
          console.log(res);
          this.$message.success("提交成功");
        })
        .catch((err) => {
          console.log(err);
          this.$message.error("提交失败");
        });
    },
    onSubmit() {
      // let that = this;
      let inputDOM = this.$refs.inputer;
      // let oldLen = this.filLen;
      this.file = inputDOM.files[0];
      // let len = this.file.length;
      // this.key_file = this.file;

      var formData = new FormData(); //先var 一个formData出来；，接着把所有需要传递的参数都append里
      formData.append("file", this.file);
      // formData.append("key_file", this.ssl_key_file);
      // formData.append("name", that.param.name);
      //然后formData传递

      this
        .axios({
          url: "http://121.36.57.122:8080/file/upload",
          headers: {
            Authorization: sessionStorage.getItem("token"),
          },
          method: "post",
          file: formData,
        })
        .then((res) => {
          console.log(res);
          this.file_url = res.data.result;
          this.$message.success("上传文件成功");
        })
        .catch((error) => {
          console.log(error);
          this.$message.error("上传文件失败");
        });
    },
  },
};
</script>

<style scoped>
#notshow {
  /* display: none; */
  border: 1px solid black;
  height: 30px;
  width: 100px;
  margin-left: -100px;
  opacity: 0;
}

#notshow:hover {
  cursor: pointer;
  background-color: #c6e2ff;
}

.but {
  width: 100px;
  height: 40px;
  /* line-height: 30px; */
}
input {
  height: 30px;
  width: 200px;
}

form {
  /* border: 1px solid black; */
  width: 700px;
}

.container {
  border: 1px solid white;
  /* height: 500px; */
  border-radius: 10px;
  width:90%;
  margin-left: 5%;
  background: #fff;
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

.el-form{
  width: 800px;
}

</style>