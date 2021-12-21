<template>
  <div>
    <el-form ref="PwdForm" :model="PwdForm" status-icon :rules="rules" label-width="120px">
      <el-form-item label="原密码" prop="oldpwd">
        <el-input v-model="PwdForm.oldpwd" show-password type="password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newpwd">
        <el-input v-model="PwdForm.newpwd" show-password type="password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="newpwds">
        <el-input v-model="PwdForm.newpwds" show-password type="password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updatePassword('PwdForm')">提交</el-button>
        <el-button @click="resetPassword('PwdForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import {ElMessage} from "element-plus";
import {updateP} from "../../api/relation";

export default {
  name: "Password",
  data() {
    const password = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入旧密码'))
      }
      callback()
    }
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else {
        if (this.PwdForm.newpwds !== '') {
          this.$refs.PwdForm.validateField('checkPass')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请确认密码'))
      } else if (value !== this.PwdForm.newpwd) {
        callback(new Error("两次输入不一致"))
      } else {
        callback()
      }
    }
    return {
      PwdForm: {
        oldpwd: '',
        newpwd: '',
        newpwds: '',
      },
      rules: {
        oldpwd: [{validator: password}],
        newpwd: [{validator: validatePass, trigger: 'blur'}],
        newpwds: [{validator: validatePass2, trigger: 'blur'}],
      },
    }
  },
  methods: {
    updatePassword(data) {
      this.$refs[data].validate((valid) => {
        if (valid) {
          //修改密码
          updateP({oldpwd: this.PwdForm.oldpwd, newpwd: this.PwdForm.newpwd}).then((res) => {
                this.resetPassword('PwdForm');
                if (res.code === 200) return ElMessage.success("修改成功");
                return ElMessage.error("修改失败");
              },
          );
        } else {
          return false
        }
      })
    },
    resetPassword(PwdForm) {
      this.$refs[PwdForm].resetFields()
    },
  }
}
</script>

<style scoped>

</style>