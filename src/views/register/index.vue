<template>
  <div class="passport_content">
    <div class="gcs-login">
      <div class="gcs-login-panel">
        <div class="login-title">
          <h2>用户注册</h2>
        </div>
        <div class="gcs-login-container">
          <el-form :model="register" ref="register">
            <el-form-item
              prop="username"
              :rules="[
                {
                  required: true,
                  message: '请填写登录pim号',
                  trigger: 'blur',
                },
                { validator: validUsername, trigger: 'blur' },
              ]"
            >
              <el-input
                v-model.trim="register.username"
                placeholder="pim号"
                clearable
                maxlength="20"
              ></el-input>
            </el-form-item>
            <el-form-item
              prop="email"
              :rules="[
                { required: true, message: '请填写邮箱地址', trigger: 'blur' },
                {
                  type: 'email',
                  message: '请填写正确的邮箱地址',
                  trigger: ['blur', 'change'],
                },
              ]"
            >
              <el-input
                v-model.trim="register.email"
                placeholder="用户邮箱"
                clearable
                maxlength="20"
              ></el-input>
            </el-form-item>
            <el-form-item
              prop="code"
              :rules="[
                { required: true, message: '验证码不能为空', trigger: 'blur' },
              ]"
            >
              <el-input
                v-model.trim="register.code"
                placeholder="邮箱验证码"
                maxlength="4"
                clearable
              >
                <template #append>
                  <div style="width: 120px">
                    <el-button v-if="!this.countDown" @click="getCode"
                      >获取验证码</el-button
                    >
                    <div v-else>{{ this.countDown }}秒后重新发送</div>
                  </div>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item
              prop="password"
              :rules="[
                {
                  required: true,
                  message: '用户密码不能为空',
                  trigger: 'blur',
                },
                {
                  min: 6,
                  message: '长度至少大于6小于15个字符',
                  trigger: 'blur',
                },
                {
                  max: 15,
                  message: '长度至少大于6小于15个字符',
                  trigger: 'blur',
                },
              ]"
            >
              <el-input
                v-model.trim="register.password"
                placeholder="用户密码"
                type="password"
                maxlength="20"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                :loading="isLoading"
                @click="submitRegisterBtn('register')"
                class="btn-login"
                >立即注册
              </el-button>
            </el-form-item>
            <div class="login-desc">
              <router-link to="/login">已有账号？前往登录</router-link>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
import { code, register } from "../../api/passport";
import { encrypt } from "../../utils/encrypt";

export default {
  data() {
    return {
      isLoading: false,
      countDown: 0,
      register: { username: "", email: "", code: "", password: "" },
    };
  },
  methods: {
    submitRegisterBtn(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.isLoading = true;
          register({ ciphertext: encrypt(this.register) }).then(
            (res) => {
              if (res.code === 200) {
                this.isLoading = false;
                this.$refs[name].resetFields();
                ElMessage.success("注册成功，请前往登录！");
                this.$router.push("/login");
              }
              if (res.code === 202) {
                ElMessage.error(res.msg);
              }
            },
            () => {
              this.isLoading = false;
            }
          );
        } else {
          return false;
        }
      });
    },
    validUsername(rule, value, callback) {
      let len = /^.{6,10}$/;
      if (!len.test(value)) {
        callback(new Error("pim号长度必须是6-10位之间"));
      }
      let number = /^[0-9]*$/;
      let zi = /^[A-Za-z]+$/;
      let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,10}$/;
      if (number.test(value) || zi.test(value) || reg.test(value)) {
        callback();
      } else {
        callback(new Error("pim号必须是由6-10位字母+数字组合"));
      }
    },
    getCode() {
      if (this.register.email == "") {
        ElMessage.error("请先填写email");
        return;
      }
      this.countDown = 60;
      var auth_timetimer = setInterval(() => {
        this.countDown--;
        if (this.countDown <= 0) {
          clearInterval(auth_timetimer);
        }
      }, 1000);
      code({ email: this.register.email, type: "register_code_" }).then(
        (res) => {
          if (res.code === 200) {
            ElMessage.success("获取成功");
          }
          if (res.code === 202) {
            ElMessage.success("请求超时，请重新获取");
          }
        }
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.passport_content {
  position: absolute;
  background-color: #f5f5f5;
  width: 500px;
  height: 500px;
  top: 40%;
  left: 50%;
  margin-top: -200px;
  margin-left: -250px;
  border-radius: 3px;
}

.gcs-login {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background-color: #fff;
  z-index: 100;

  .gcs-login-panel {
    height: 360px;
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;

    .login-title {
      text-align: center;
      color: #62a8ea;

      h2 {
        letter-spacing: 6px;
      }
    }

    .login-desc {
      color: #62a8ea;
      cursor: pointer;
      float: right;
    }

    .gcs-login-container {
      box-sizing: border-box;
      margin: 40px;
      text-align: center;
    }
  }

  .btn-login {
    background-color: #62a8ea;
    width: 100%;
  }

  .btn-login:hover {
    opacity: 0.9;
  }
}
</style>