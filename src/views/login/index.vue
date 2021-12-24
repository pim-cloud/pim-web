<template>
  <div class="passport_content">
    <div class="gcs-login">
      <div class="gcs-login-panel">
        <div class="login-title">
          <h2>pim在线演示</h2>
        </div>
        <div class="gcs-login-container">
          <el-form ref="login" :model="login">
            <el-form-item prop="email" :rules="[{ required: true, message: '请输入邮箱' }]">
              <el-input v-model="login.email" placeholder="邮箱" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="password" :rules="[{ required: true, message: '请输入密码' }]">
              <el-input v-model="login.password" placeholder="密码" autocomplete="off" show-password></el-input>
            </el-form-item>
            <el-form-item>
              <el-button :loading="isLoading" type="primary" @click="logins('login')">登录</el-button>
              <el-button @click="resetForm('login')">重置</el-button>
            </el-form-item>
          </el-form>
          <div class="login-desc">
            <router-link to="/register">前往注册</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../../store/index";
import { login } from "../../api/passport";
import { encrypt } from "../../utils/encrypt";
import commonEffect from "../../utils/commonEffect";

export default {
  data() {
    return {
      isLoading: false,
      login: {
        email: '',
        password: '',
      },
    }
  },
  methods: {
    logins(name) {
      this.$refs[name].validate(async (valid) => {
        if (valid) {
          this.isLoading = true;
          try {
            const result = await login({
              ciphertext: encrypt({
                email: this.login.email,
                password: this.login.password,
                scene: 'web'
              })
            });
            const { token } = result?.data;
            store.commit("setToken", token);
            this.isLoading = false;
            //缓存数据
            if (store.state.global.token) {
              commonEffect().init()
              this.$router.push("/");
            } else {
              this.$router.replace("/login");
            }
          } catch (error) {
            this.isLoading = false;
          }
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
  },
};
</script>

<style lang="scss" scoped>
.passport_content {
  position: absolute;
  background-color: #f5f5f5;
  width: 500px;
  height: 400px;
  top: 50%;
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
    height: 300px;
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