<template>
<div class="center">
    <span>管理员中心 / 常见问题修改</span>
    <br/>
    <hr/>
    <br/>
     <div class="text"> 
        <el-row class="warp">
            <el-col :span="24" class="warp-main">
                <el-form ref="infoForm" :model="infoForm" :rules="rules" label-width="120px">
                    <div class="input">
                    <el-form-item label="标题" prop="a_title" class='one'>
                        <el-input v-model="infoForm.a_title"></el-input>
                    </el-form-item>

                    <el-form-item label="摘要" prop="a_zhaiyao" class="one">
                        <el-input v-model="infoForm.a_zhaiyao"></el-input>
                    </el-form-item>

                     <el-form-item label="软件名称" prop="a_name" class="one">
                        <el-input v-model="infoForm.a_name"></el-input>
                    </el-form-item>

                     <el-form-item label="软件版本号" prop="a_version" class="one">
                        <el-input v-model="infoForm.a_version"></el-input>
                    </el-form-item>
                  </div>

                   
                    <el-form-item label="此版本信息">
                        <div class="edit_containerone">
                            <quill-editor v-model="infoForm.a_content" >
                            </quill-editor>
                        </div>
                    </el-form-item>
                    

                     <el-form-item label="常见问题解答">
                        <div class="edit_containertwo">
                            <quill-editor v-model="infoForm.solution">
                            </quill-editor>
                        </div>
                    </el-form-item>

                     <el-form-item label="上传此次版本">
                         <input type="file" value="" id="file" @change="uploadConfig">
                    </el-form-item>


                    <el-form-item>
                        <el-button type="primary" @click="onSubmit" class="button">提交</el-button>
                    </el-form-item>
                </el-form>


            </el-col>
        </el-row>
    </div>
</div>
</template>
<script>
import { quillEditor } from 'vue-quill-editor' //调用编辑器
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
    data() {
        return {
            infoForm: {
                a_title: '',
                a_name:'',
                a_version:'',
                a_content:'',
                a_zhaiyao:'',
                solution:'',
                // editorOption: {}
            },
            //表单验证
            rules: {
                a_title: [
                    {required: true, message: '请输入标题', trigger: 'blur'}
                ],
                 a_zhaiyao: [
                    {required: true, message: '请输入摘要', trigger: 'blur'}
                ],
                a_content: [
                    {required: true, message: '请输入详细内容', trigger: 'blur'}
                ],
                 a_name: [
                    {required: true, message: '输入修复的软件名称', trigger: 'blur'}
                ],
                 a_version: [
                    {required: true, message: '输入修复的软件版本号', trigger: 'blur'}
                ]
            },
        }
    },                
              
    methods: {   

        uploadConfig(){
            //   let formData = new FormData();
            //   formData.append('file', e.target.files[0]);
            //  this.axios({
            //      url:'http://121.36.57.122:8080/file/upload',
            //      headers:{
            //         'Authorization':sessionStorage.getItem("token")
            //         },
            //      method:'post',
            //      params:{
            //          file:formData
            //      }
            //  }).then(res=>{
            //      console.log(res)
            //  }).catch(err=>{
            //       console.log(err)
            //  })
        },
        onSubmit() {  
            console.log(this.infoForm)
             this.axios({
                 url:'http://121.36.57.122:8080/edition/add',
                 headers:{
                    'Authorization':sessionStorage.getItem("token")
                    },
                 method:'post',
                 params:{
                    eddescribe:this.infoForm.a_content,
                    fileLink:'',
                    remark:this.infoForm.a_zhaiyao,
                    softwareId:this.infoForm.a_name,
                    solution:this.infoForm.solution,
                    title:this.infoForm.a_title,
                    versionNumber:this.infoForm.a_version
                 }
             }).then(res=>{
                 console.log(res)
                  this.$message.success('发布成功！');
                   this.infoForm.a_content = ''
                   this.infoForm.a_zhaiyao = ''
                   this.infoForm.a_name = ''
                   this.infoForm.solution = ''
                   this.infoForm.title = ''
                   this.infoForm.a_version = ''
             }).catch(err=>{
                  console.log(err)
             })
            console.log(this.infoForm)
        }
    },
    components: {
        quillEditor
    }
}
</script>


<style scoped>



.one{
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 50%;
    /* border: 1px solid black; */
    /* float: left; */
}

.center{
    /* height: 100%; */
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