<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { userLogin, userRegister } from '@/api/userService'
import { useUserStore } from '@/stores/index'
import { ElLoading, ElMessage } from 'element-plus'

const router = useRouter()

// 游客登录
const goHome = (event) => {
  // 阻止表单默认提交行为
  event.preventDefault()
  // 加载3秒
  const loading = ElLoading.service({
    lock: true,
    text: '加载中……',
    background: 'rgba(0, 0, 0, 0.7)'
  })
  setTimeout(() => {
    loading.close()
    router.push('/home')
  }, 3000)
}

// 登录和注册界面切换
const container = ref(null)
const registerBtn = ref(null)
const loginBtn = ref(null)

onMounted(() => {
  registerBtn.value.addEventListener('click', () => {
    container.value.classList.add('active')
    registerUsername.value = ''
    registerPassword.value = ''
    registerConfirmPassword.value = ''
  })

  loginBtn.value.addEventListener('click', () => {
    container.value.classList.remove('active')
    loginUsername.value = ''
    loginPassword.value = ''
  })
})

// 登录表单提交
const loginUsername = ref('hngy02')
const loginPassword = ref('rjxh2025')

const submitLoginForm = async (event) => {
  // 阻止表单默认提交行为
  event.preventDefault()
  try {
    const { data } = await userLogin({
      username: loginUsername.value,
      password: loginPassword.value
    })
    if (data.status === 0) {
      // 登录成功，更新用户状态
      const userStore = useUserStore()
      userStore.setRole(data.is_admin === 0 ? 'user' : 'admin')
      userStore.login()
      userStore.setToken(data.token)
      ElMessage({
        message: '登录成功',
        type: 'success',
      })
      router.push('/home')
    } else {
      ElMessage({
        message: data.msg || '登录失败，请检查用户名和密码',
        type: 'error',
      })
    }
  } catch (error) {
    console.error('登录请求出错:', error)
    alert('登录请求出错，请稍后重试')
    ElMessage({
      message: '登录请求出错，请稍后重试',
      type: 'error',
    })
  }
}

// 注册表单提交
const registerUsername = ref(null)
const registerPassword = ref(null)
const registerConfirmPassword = ref(null)

const submitRegisterForm = async (event) => {
  // 阻止表单默认提交行为
  event.preventDefault()
  // 注册逻辑
  const res = await userRegister({ username: registerUsername.value, password: registerPassword.value })
  if (res.data.status === 0) {
    ElMessage({
      message: '注册成功，请登录',
      type: 'success',
      duration: 3000
    })
    // 清除表单
    registerUsername.value = ''
    registerPassword.value = ''
    registerConfirmPassword.value = ''
    // 点击登录按钮，切换到登录界面
    loginBtn.value.click()
  } else {
    ElMessage({
      message: res.data.msg || '注册失败，请稍后重试',
      type: 'error',
      duration: 3000
    })
  }
}

// github登录
const btnGithubLogin = () => {
  // //http://127.0.0.1:3007/api/8848TI/github
  // window.location.href = 'http://127.0.0.1:3007/api/8848TI/github'

  // axios.get('').then(res => {
  //   console.log(res)
  // }).catch(err => {
  //   console.log('错误：' + err)
  // })
}


</script>

<template>
  <div id="login">
    <div ref="container" class="container">
      <!-- 登录界面开始 -->
      <div class="form-box login">
        <form action="">
          <h1>登录</h1>
          <div class="input-box">
            <input v-model="loginUsername" type="text" placeholder="账号" required autocomplete="username">
            <i class="bi bi-person"></i>
          </div>
          <div class="input-box">
            <input v-model="loginPassword" type="password" placeholder="密码" required autocomplete="current-password">
            <i class="bi bi-lock"></i>
          </div>
          <div class="forgot-link">
            <router-link to="#">忘记密码？</router-link>
          </div>
          <button @click="submitLoginForm" class="btn">登录</button>
          <p>其它登录方式</p>
          <div class="social-icons">
            <router-link @click="btnGithubLogin" to="#"><i class="bi bi-github"></i></router-link>
            <router-link to="#"><i class="bi bi-google"></i></router-link>
            <el-popover
            placement="bottom-end"
            content="游客进入，免登录">
              <template #reference>
                <router-link @click="goHome" to="#"><i class="bi bi-person-circle"></i></router-link>   
              </template>
            </el-popover>
          </div>
        </form>
      </div>
      <!-- 登录界面结束 -->
      <!-- 注册界面开始 -->
      <div class="form-box register">
        <form action="">
          <h1>注册</h1>
          <div class="input-box">
            <input v-model="registerUsername" type="text" placeholder="账号" required autocomplete="username">
            <i class="bi bi-person"></i>
          </div>
          <div class="input-box">
            <input v-model="registerPassword" type="password" placeholder="密码" required autocomplete="new-password">
            <i class="bi bi-lock"></i>
          </div>
          <div class="input-box">
            <input v-model="registerConfirmPassword" type="password" placeholder="密码" required autocomplete="new-password">
            <i class="bi bi-lock"></i>
          </div>
          <button @click="submitRegisterForm" type="submit" class="btn">注册</button>
          <p>其它注册方式</p>
          <div class="social-icons">
            <router-link to="#"><i class="bi bi-github"></i></router-link>
            <router-link to="#"><i class="bi bi-google"></i></router-link>
            <el-popover
            placement="bottom-end"
            content="游客进入，免登录">
              <template #reference>
                <router-link @click="goHome" to="#"><i class="bi bi-person-circle"></i></router-link>   
              </template>
            </el-popover>            
          </div>
        </form>
      </div>
      <!-- 注册界面结束 -->
      <!-- 遮罩层切换开始 -->
      <div class="toggle-box">
        <div class="toggle-panel toggle-left">
          <h1>你好，欢迎</h1>
          <p>还没账户？前往注册</p>
          <button ref="registerBtn" class="btn register-btn">注册</button>
        </div>
        <div class="toggle-panel toggle-right ">
          <h1>欢迎，回来</h1>
          <p>已有账户？前往登录</p>
          <button ref="loginBtn" class="btn login-btn">登录</button>
        </div>
      </div>
      <!-- 遮罩层切换结束 -->
    </div>
  </div>
</template>

<style scoped lang="scss">
#login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: var(--theme-main-bg);

  .container {
    position: relative;
    width: 850px;
    height: 550px;
    background-color: var(--theme-second-bg);
    border-radius: 30px;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
    margin: 20px;
    overflow: hidden;

    &.active {
      .toggle-box::before {
        left: 50%;
      }

      .form-box {
        right: 50%;

        &.register {
          visibility: visible;
        }
      }

      .toggle-panel {
        &.toggle-left {
          left: -50%;
          transition-delay: 0.6s;
        }

        &.toggle-right {
          right: 0;
          transition-delay: 1.2s;
        }
      }
    }

    h1 {
      font-size: 36px;
      margin: -10px 0;
    }

    p {
      font-size: 14.5px;
      margin: 15px 0;
    }
  }

  .form-box {
    position: absolute;
    right: 0;
    width: 50%;
    height: 100%;
    background-color: var(--theme-second-bg);
    display: flex;
    align-items: center;
    color: var(--color-text);
    text-align: center;
    padding: 40px;
    z-index: 1;
    transition: 0.6s ease-in-out 1.2s, visibility 0 1;

    &.register {
      visibility: hidden;
    }

    form {
      width: 100%;
    }
  }

  .input-box {
    position: relative;
    margin: 30px 0;

    input {
      width: 100%;
      padding: 13px;
      background-color: var(--theme-main-bg);
      border: none;
      outline: none;
      font-size: 16px;
      border-radius: 8px;
      color: var(--color-text);
      font-weight: 500;

      &::placeholder {
        color: var(--color-heading);
        font-weight: 400;
      }
    }

    label {
      position: absolute;
      top: 0;
    }

    i {
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 20px;
      color: var(--icon-color);
    }
  }

  .forgot-link {
    margin: -15px 0 15px;

    a {
      font-size: 14.5px;
      color: var(--color-text);
      text-decoration: none;
    }
  }

  .btn {
    width: 100%;
    height: 48px;
    background-color: var(--button-login-bg);
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border: none;
    cursor: pointer;
    font-size: 16px;
    color: var(--button-login-text);
    font-weight: 600;
  }

  .social-icons {
    display: flex;
    justify-content: center;

    a {
      display: inline-flex;
      padding: 10px;
      border: 2px solid var(--icon-color);
      border-radius: 8px;
      font-size: 24px;
      color: var(--icon-color);
      text-decoration: none;
      margin: 0 8px;
    }
  }

  .toggle-box {
    position: absolute;
    width: 100%;
    height: 100%;

    &::before {
      content: '';
      position: absolute;
      left: -250%;
      width: 300%;
      height: 100%;
      background-color: var(--button-primary-bg);
      z-index: 2;
      border-radius: 150px;
      transition: 1.8s ease-in-out;
    }
  }

  .toggle-panel {
    position: absolute;
    width: 50%;
    height: 100%;
    color: var(--theme-second-bg);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 2;
    transition: 0.6s ease-in-out;

    &.toggle-left {
      left: 0;
      transition-delay: 1.2s;
    }

    &.toggle-right {
      right: -50%;
      transition-delay: 0.6s;
    }

    p {
      margin-bottom: 20px;
    }

    .btn {
      width: 160px;
      height: 46px;
      background-color: transparent;
      border: 2px solid var(--theme-second-bg);
      box-shadow: none;
    }
  }

  @media screen and (max-width: 650px) {
    .container {
      height: calc(100vh - 40px);

      .form-box {
        bottom: 0;
        width: 100%;
        height: 70%;
      }

      &.active {
        .form-box {
          right: 0;
          bottom: 30%;
        }

        .toggle-box::before {
          left: 0;
          top: 70%;
        }

        .toggle-panel {
          &.toggle-left {
            left: 0;
            top: -30%;
          }

          &.toggle-right {
            bottom: 0;
          }
        }
      }

      .toggle-box::before {
        left: 0;
        width: 100%;
        top: -270%;
        height: 300%;
        border-radius: 20vw;
      }

      .toggle-panel {
        width: 100%;
        height: 30%;

        &.toggle-left {
          top: 0;
        }

        &.toggle-right {
          right: 0;
          bottom: -30%;
        }
      }
    }
  }

  @media screen and (max-width: 400px) {
    .form-box {
      padding: 20px;
    }

    .toggle-panel h1 {
      font-size: 30px;
    }
  }
}
</style>