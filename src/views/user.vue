<template>
  <div>
<!--    <div v-text="currentTime" class="login-time" style="color: #15b2aa; background: transparent"/>-->

    <!-- 登录和注册 -->
    <div v-if="$common.isEmpty(currentUser)"
         class="myCenter in-up-container my-animation-hideToShow">

      <!-- 背景图片 -->
      <el-image class="my-el-image"
                style="position: absolute"
                v-once
                lazy
                :src="$constant.two_poem_image[Math.floor(Math.random() * $constant.two_poem_image.length)]"
                fit="cover">
        <div slot="error" class="image-slot"></div>
      </el-image>

      <div class="in-up" id="loginAndRegister">

        <!--        注册-->
        <div class="form-container sign-up-container login-border">
<!--          <div class="myCenter">-->
<!--            <h1>注册</h1>-->
<!--            <input v-model="username" type="text" maxlength="30" placeholder="用户名">-->
<!--            <input v-model="password" type="password" maxlength="30" placeholder="密码">-->
<!--            <input v-model="email" type="email" placeholder="邮箱">-->
<!--            <input v-model="code" type="text" placeholder="验证码" disabled>-->
<!--            <a style="margin: 0" href="#" @click="changeDialog('邮箱验证码')">获取验证码</a>-->
<!--            <button @click="register()">注册</button>-->
<!--          </div>-->
          <div class=" login-container">
            <div class="login-main">
              <div class="register-title">用户注册</div>
              <el-form ref="registerForm" :model="registerForm" :rules="registerRules"
                       autocomplete="on" label-position="left">
                <el-form-item prop="username">
                  <span class="svg-container">
                    <i class="el-icon-user" />
                  </span>
                  <el-input ref="username" v-model="registerForm.username" placeholder="用户名"
                            name="username" type="text" tabindex="1" autocomplete="on"/>
                </el-form-item>
                <el-form-item prop="password">
                  <span class="svg-container">
                    <svg-icon icon-class="password" />
                  </span>
                  <el-input ref="password" v-model="registerForm.password" placeholder="密码"
                            name="password" :type="passwordType" tabindex="2" autocomplete="on"/>
                </el-form-item>
                <el-form-item prop="email">
                  <span class="svg-container">
                    <svg-icon icon-class="email" />
                  </span>
                  <el-input ref="email" v-model="registerForm.email" placeholder="邮箱"
                            name="email" type="text" tabindex="3" autocomplete="on"/>
                </el-form-item>
                <el-form-item prop="captcha" style="margin-bottom:0;">
                  <span class="svg-container">
                    <svg-icon icon-class="validCode" />
                  </span>
                  <el-input ref="captcha" v-model="registerForm.captcha" placeholder="验证码"
                            name="captcha" type="text" tabindex="4" autocomplete="on"/>
                </el-form-item>
                <el-form-item style="border:0;margin-bottom:0;">
                  <a href="#" style="float: right" @click="changeDialog('邮箱验证码')">获取验证码</a>
                </el-form-item>
                <el-button
                  :loading="registerLoading" type="primary" @click.native.prevent="handleRegister"
                  style="width: 100%; padding: 12px 20px; margin-bottom: 30px; float: right">
                  <span v-if="!registerLoading">注 册</span>
                  <span v-else>注 册 中...</span>
                </el-button>
              </el-form>
            </div>
          </div>
        </div>

        <!--        登录-->
        <div class="form-container login-border login-container">
          <div class="login-main">
            <div class="login-title">用户登录</div>
            <el-form ref="loginForm" :model="loginForm" :rules="loginRules"
              class="login-form" autocomplete="on" label-position="left"
                     >
              <!--            username-->
              <el-form-item prop="username">
                <span class="svg-container">
                  <i class="el-icon-user" />
                </span>
                <el-input ref="username" v-model="loginForm.username" placeholder="用户名"
                  name="username" type="text" tabindex="1" autocomplete="on"/>
              </el-form-item>
              <!--            password-->
              <el-tooltip v-model="capsTooltip" content="大写已打开" placement="right" manual>
                <el-form-item prop="password" style="margin-bottom:0;">
                  <span class="svg-container">
                    <svg-icon icon-class="password" />
                  </span>
                  <el-input
                    :key="passwordType" ref="password" v-model="loginForm.password"
                    :type="passwordType" placeholder="密码" name="password"
                    tabindex="2" autocomplete="on"
                    @keyup.native="checkCapslock" @blur="capsTooltip = false"
                    @keyup.enter.native="handleLogin"
                    style="background: transparent; border: transparent"
                  />
                  <span class="show-pwd" @click="showPwd">
                    <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"/>
                  </span>
                </el-form-item>
              </el-tooltip>

              <el-form-item style="border:0;margin-bottom:0;">
                <a href="#" style="float: right" @click="changeDialog('找回密码')">忘记密码？</a>
              </el-form-item>

              <!--            captcha  -->
              <el-form-item prop="code" style="width: 56%; float: left;">
                <span class="svg-container">
                  <svg-icon icon-class="validCode" />
                </span>
                <el-input ref="username" v-model="loginForm.captcha" placeholder="验证码"
                          name="username" type="text" tabindex="3" maxlength="5"
                          autocomplete="off" style="width: 75%; clear: right" @keyup.enter.native="handleLogin"
                />
              </el-form-item>
              <div
                class="login-code"
                style="cursor: pointer; width: 30%; height: 48px; float: right; background-color: #f0f1f5;">
                <img :src="codeUrl" @click="getCaptchaImg"
                  style="height: 48px; width: 100%; border: 1px solid rgba(0, 0, 0, 0.1); border-radius: 5px;">
              </div>
              <el-button
                :loading="loginLoading" type="primary" @click.native.prevent="handleLogin"
                style="width: 100%; padding: 12px 20px; margin-bottom: 30px">
                <span v-if="!loginLoading">登 录</span>
                <span v-else>登 录 中...</span>
              </el-button>
            </el-form>

          </div>
        </div>

        <div class="overlay-container">
          <div class="overlay">
            <div class="overlay-panel myCenter overlay-left">
              <h1>已有账号？</h1>
              <p>请登录🚀</p>
              <button class="ghost" @click="signIn()">登录</button>
            </div>
            <div class="overlay-panel myCenter overlay-right">
              <h1>没有账号？</h1>
              <p>注册一个？🤔</p>
              <button class="ghost" @click="signUp()">注册</button>
            </div>
          </div>
        </div>

      </div>

    </div>

    <!-- 用户信息 -->
    <div v-else class="user-container myCenter my-animation-hideToShow">
      <!-- 背景图片 -->
      <el-image class="my-el-image"
                style="position: absolute"
                v-once
                lazy
                :src="$constant.two_poem_image[Math.floor(Math.random() * $constant.two_poem_image.length)]"
                fit="cover">
        <div slot="error" class="image-slot"></div>
      </el-image>
      <div class="shadow-box-mini user-info" style="display: flex">
        <div class="user-left">
          <div>
            <el-avatar class="user-avatar" @click.native="changeDialog('修改头像')" :size="60"
                       :src="currentUser.avatar"></el-avatar>
          </div>
          <div class="myCenter" style="margin-top: 12px">
            <div class="user-title">
              <div>用户名：</div>
              <div>手机号：</div>
              <div>邮箱：</div>
              <div>性别：</div>
              <div>简介：</div>
            </div>
            <div class="user-content">
              <div>
                <el-input maxlength="30" v-model="currentUser.username"></el-input>
              </div>
              <div>
                <div v-if="!$common.isEmpty(currentUser.phoneNumber)">
                  {{ currentUser.phoneNumber }} <span class="changeInfo" @click="changeDialog('修改手机号')">修改（功能未接入）</span>
                </div>
                <div v-else><span class="changeInfo" @click="changeDialog('绑定手机号')">绑定手机号（功能未接入）</span></div>
              </div>
              <div>
                <div v-if="!$common.isEmpty(currentUser.email)">
                  {{ currentUser.email }} <span class="changeInfo" @click="changeDialog('修改邮箱')">修改</span>
                </div>
                <div v-else><span class="changeInfo" @click="changeDialog('绑定邮箱')">绑定邮箱</span></div>
              </div>
              <div>
                <el-radio-group v-model="currentUser.gender">
                  <el-radio :label="0" style="margin-right: 10px">薛定谔的猫</el-radio>
                  <el-radio :label="1" style="margin-right: 10px">男</el-radio>
                  <el-radio :label="2">女</el-radio>
                </el-radio-group>
              </div>
              <div>
                <el-input v-model="currentUser.introduction"
                          maxlength="60"
                          type="textarea"
                          show-word-limit></el-input>
              </div>
            </div>
          </div>
          <div style="margin-top: 20px">
            <proButton :info="'提交'"
                       @click.native="submitUserInfo()"
                       :before="$constant.before_color_2"
                       :after="$constant.after_color_2">
            </proButton>
          </div>
        </div>
        <div class="user-right">

        </div>
      </div>
    </div>


    <el-dialog :title="dialogTitle"
               :visible.sync="showDialog"
               width="30%"
               :before-close="clearDialog"
               :append-to-body="true"
               :close-on-click-modal="false"
               center>
      <div class="myCenter" style="flex-direction: column">
        <div>
          <div v-if="dialogTitle === '修改手机号' || dialogTitle === '绑定手机号'">
            <div style="margin-bottom: 5px">手机号：</div>
            <el-input v-model="phoneNumber"></el-input>
            <div style="margin-top: 10px;margin-bottom: 5px">验证码：</div>
            <el-input v-model="code"></el-input>
            <div style="margin-top: 10px;margin-bottom: 5px">密码：</div>
            <el-input v-model="password"></el-input>
          </div>
          <div v-else-if="dialogTitle === '修改邮箱' || dialogTitle === '绑定邮箱'">
            <div style="margin-bottom: 5px">邮箱：</div>
            <el-input v-model="email"></el-input>
            <div style="margin-top: 10px;margin-bottom: 5px">验证码：</div>
            <el-input v-model="code"></el-input>
            <div style="margin-top: 10px;margin-bottom: 5px">密码：</div>
            <el-input v-model="password"></el-input>
          </div>
          <div v-else-if="dialogTitle === '修改头像'">
            <uploadPicture :prefix="'userAvatar'" @addPicture="addPicture" :maxSize="1"
                           :maxNumber="1"></uploadPicture>
          </div>
          <div v-else-if="dialogTitle === '找回密码'">
            <div class="myCenter" style="margin-bottom: 12px">
              <el-radio-group v-model="passwordFlag">
                <el-radio :label="1" style="margin-right: 10px">手机号</el-radio>
                <el-radio :label="2">邮箱</el-radio>
              </el-radio-group>
            </div>
            <div v-if="passwordFlag === 1">
              <div style="margin-bottom: 5px">手机号：</div>
              <el-input v-model="phoneNumber"></el-input>
              <div style="margin-top: 10px;margin-bottom: 5px">验证码：</div>
              <el-input v-model="code"></el-input>
              <div style="margin-top: 10px;margin-bottom: 5px">新密码：</div>
              <el-input maxlength="30" v-model="password"></el-input>
            </div>
            <div v-else-if="passwordFlag === 2">
              <div style="margin-bottom: 5px">邮箱：</div>
              <el-input v-model="email"></el-input>
              <div style="margin-top: 10px;margin-bottom: 5px">验证码：</div>
              <el-input v-model="code"></el-input>
              <div style="margin-top: 10px;margin-bottom: 5px">新密码：</div>
              <el-input maxlength="30" v-model="password"></el-input>
            </div>
          </div>
          <div v-else-if="dialogTitle === '邮箱验证码'">
            <div>
              <div style="margin-bottom: 5px">邮箱：</div>
              <el-input v-model="registerForm.email"></el-input>
              <div style="margin-top: 10px;margin-bottom: 5px">验证码：</div>
              <el-input v-model="registerForm.captcha"></el-input>
            </div>
          </div>
        </div>
        <div style="display: flex;margin-top: 30px" v-show="dialogTitle !== '修改头像'">
          <proButton :info="codeString"
                     v-show="dialogTitle === '修改手机号' || dialogTitle === '绑定手机号' || dialogTitle === '修改邮箱' || dialogTitle === '绑定邮箱' || dialogTitle === '找回密码' || dialogTitle === '邮箱验证码'"
                     @click.native="getCaptcha()"
                     :before="$constant.before_color_1"
                     :after="$constant.after_color_1"
                     style="margin-right: 20px">
          </proButton>
          <proButton :info="'提交'"
                     @click.native="submitDialog()"
                     :before="$constant.before_color_2"
                     :after="$constant.after_color_2">
          </proButton>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  register, updateForForgetPassword, updateSecretInfo,
  updateUserInfo, getCaptcha, getCaptchaImg, login
} from "@/api/user";
  import moment from 'moment'
  import {username,password, captcha, len, email} from "@/utils/validate";

  const proButton = () => import( "./common/proButton");
  const uploadPicture = () => import( "./common/uploadPicture");

  export default {
    components: {
      proButton,
      uploadPicture
    },
    data() {
      return {
        loginForm: {
          username: '',
          password: '',
          rememberMe: false,
          captcha: '',
          uuid: ''
        },
        loginRules: {
          username,
          password,
          captcha
        },
        registerForm: {
          username: '',
          password: '',
          email: '',
          captcha: ''
        },
        registerRules: {
          username,
          password: [
            password,
            len(23,3),
          ],
          email,
          captcha
        },
        currentUser: this.$store.state.user.current,
        phoneNumber: "",
        avatar: "",
        showDialog: false,
        dialogTitle: "",
        codeString: "获取验证码",
        passwordFlag: null,
        currentTime: null,
        intervalCode: null,
        passwordType: 'password',
        codeUrl: '',
        loginLoading: false,
        registerLoading: false,
        capsTooltip: false
      }
    },
    computed: {},
    created() {
      this.getCaptchaImg()
      this.getCurrentTime()
    },
    destroyed() {
      clearInterval(this.timer)
    },
    methods: {
      handleRegister(){
        this.$refs.registerForm.validate((valid) => {
          if(valid){
            this.registerLoading = true
            this.registerForm.password = this.$common.encrypt(this.registerForm.password.trim())
            register(this.registerForm)
              .then(res => {
                if (!this.$common.isEmpty(res.data)) {
                  // this.$store.commit("loadCurrentUser", res.data);
                  // localStorage.setItem("userToken", res.data.accessToken);
                  this.registerForm.password = this.$common.decrypt(this.registerForm.password)
                  this.$router.push({path: '/'});
                  // let userToken = this.$common.encrypt(localStorage.getItem("userToken"));
                  // window.open(this.$constant.imBaseURL + "?userToken=" + userToken);
                }
              })
              .catch(() => {
                this.registerLoading = false
                this.registerForm.password = this.$common.decrypt(this.registerForm.password)
              })
          }else{
            console.log('error submit!!')
            return false
          }
        })
      },
      handleLogin() {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            this.loginLoading = true
            this.loginForm.password = this.$common.encrypt(this.loginForm.password.trim())
            this.$store.dispatch('user/login', this.loginForm)
              .then(() => {
                this.loginForm.password = this.$common.decrypt(this.loginForm.password.trim())
                this.$router.push({path: '/'});
              })
              .catch(() => {
                this.loginLoading = false
                this.loginForm.password = this.$common.decrypt(this.loginForm.password.trim())
                this.getCaptchaImg()
              })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      getCaptchaImg() {
        getCaptchaImg().then((res) => {
          if (res !== undefined) {
            this.codeUrl = res.data
            this.loginForm.uuid = res.id
          }
        })
      },
      checkCapslock({ shiftKey, key } = {}) {
        if (key && key.length === 1) {
          if (
            (shiftKey && key >= 'a' && key <= 'z') ||
            (!shiftKey && key >= 'A' && key <= 'Z')
          ) {
            this.capsTooltip = true
          } else {
            this.capsTooltip = false
          }
        }
        if (key === 'CapsLock' && this.capsTooltip === true) {
          this.capsTooltip = false
        }
      },
      showPwd() {
        if (this.passwordType === 'password') {
          this.passwordType = ''
        } else {
          this.passwordType = 'password'
        }
        this.$nextTick(() => {
          this.$refs.password.focus()
        })
      },
      getCurrentTime() {
        this.timer = setInterval((_) => {
          this.currentTime = moment().format('YYYY-MM-DD HH时mm分ss秒')
        }, 1000)
      },
      addPicture(res) {
        this.avatar = res;
        this.submitDialog()
      },
      signUp() {
        document.querySelector("#loginAndRegister").classList.add('right-panel-active');
      },
      signIn() {
        document.querySelector("#loginAndRegister").classList.remove('right-panel-active');
      },
      login() {
        if (this.$common.isEmpty(this.account) || this.$common.isEmpty(this.password)) {
          this.$message({
            message: "请输入账号或密码！",
            type: "error"
          });
          return;
        }

        let pwd = this.password.trim()
        if (pwd.length < 24) {
          pwd = this.$common.encrypt(pwd)
        }
        let user = {
          account: this.account.trim(),
          password: pwd
        };

        login(user)
          .then((res) => {
            if (!this.$common.isEmpty(res.data)) {
              // console.log("curuser",res.data)
              // this.$store.commit("loadCurrentUser", res.data);
              // localStorage.setItem("userToken", res.data.accessToken);
              // this.account = "";
              this.password = "";
              this.$router.push({path: '/'});
            }
          })
          .catch((error) => {
            this.$message({
              message: error,
              type: "error"
            });
          });
      },
      submitUserInfo() {
        if (!this.checkParameters()) {
          return;
        }

        let user = {
          username: this.currentUser.username,
          gender: this.currentUser.gender
        };

        if (!this.$common.isEmpty(this.currentUser.introduction)) {
          user.introduction = this.currentUser.introduction.trim();
        }

        this.$confirm('确认保存？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'success',
          center: true
        }).then(() => {
          updateUserInfo(user)
            .then((res) => {
              if (!this.$common.isEmpty(res.data)) {
                // this.$store.commit("loadCurrentUser", res.data);
                // this.currentUser = this.$store.state.user.current;
                this.$message({
                  message: "修改成功！",
                  type: "success"
                });
              }
            })
            .catch((error) => {
              this.$message({
                message: error,
                type: "error"
              });
            });
        }).catch(() => {
          this.$message({
            type: 'success',
            message: '已取消保存!'
          });
        });
      },
      checkParams(params) {
        if (this.dialogTitle === "修改手机号" || this.dialogTitle === "绑定手机号" || (this.dialogTitle === "找回密码" && this.passwordFlag === 1)) {
          params.flag = 1;
          if (this.$common.isEmpty(this.phoneNumber)) {
            this.$message({
              message: "请输入手机号！",
              type: "error"
            });
            return false;
          }
          params.place = this.phoneNumber;
          return true;
        } else if (this.dialogTitle === "修改邮箱" || this.dialogTitle === "绑定邮箱" || this.dialogTitle === "邮箱验证码" || (this.dialogTitle === "找回密码" && this.passwordFlag === 2)) {
          params.flag = 2;
          if (this.$common.isEmpty(this.registerForm.email)) {
            this.$message({
              message: "请输入邮箱！",
              type: "error"
            });
            return false;
          }
          params.place = this.registerForm.email;
          return true;
        }
        return false;
      },
      checkParameters() {
        if (this.$common.isEmpty(this.currentUser.username)) {
          this.$message({
            message: "请输入用户名！",
            type: "error"
          });
          return false;
        }

        if (this.currentUser.username.indexOf(" ") !== -1) {
          this.$message({
            message: "用户名不能包含空格！",
            type: "error"
          });
          return false;
        }
        return true;
      },
      changeDialog(value) {
        if (value === "邮箱验证码") {
          this.$refs.registerForm.validateField(["email","username","password"], valid =>{
            if (!valid){
              this.dialogTitle = value;
              this.showDialog = true;
              return true;
            }
          })
          return false;
        }else{
          this.dialogTitle = value;
          this.showDialog = true;
        }

      },
      submitDialog() {
        if (this.dialogTitle === "修改头像") {
          if (this.$common.isEmpty(this.avatar)) {
            this.$message({
              message: "请上传头像！",
              type: "error"
            });
          } else {
            let user = {
              avatar: this.avatar.trim()
            };

            updateUserInfo(user)
              .then((res) => {
                if (!this.$common.isEmpty(res.data)) {
                  // this.$store.commit("loadCurrentUser", res.data);
                  // this.currentUser = this.$store.state.user.current;
                  this.clearDialog();
                  this.$message({
                    message: "修改成功！",
                    type: "success"
                  });
                }
              })
              .catch((error) => {
                this.$message({
                  message: error,
                  type: "error"
                });
              });
          }
        } else if (this.dialogTitle === "修改手机号" || this.dialogTitle === "绑定手机号" || this.dialogTitle === "修改邮箱" || this.dialogTitle === "绑定邮箱") {
          this.updateSecretInfo();
        } else if (this.dialogTitle === "找回密码") {
          if (this.passwordFlag !== 1 && this.passwordFlag !== 2) {
            this.$message({
              message: "请选择找回方式！",
              type: "error"
            });
          } else {
            this.updateSecretInfo();
          }
        } else if (this.dialogTitle === "邮箱验证码") {
          this.showDialog = false;
        }
      },
      updateSecretInfo() {
        if (this.$common.isEmpty(this.code)) {
          this.$message({
            message: "请输入验证码！",
            type: "error"
          });
          return;
        }
        if (this.$common.isEmpty(this.password)) {
          this.$message({
            message: "请输入密码！",
            type: "error"
          });
          return;
        }
        let params = {
          code: this.code.trim(),
          password: this.$common.encrypt(this.password.trim())
        };
        if (!this.checkParams(params)) {
          return;
        }

        if (this.dialogTitle === "找回密码") {
          updateForForgetPassword(params)
            .then((res) => {
              this.clearDialog();
              this.$message({
                message: "修改成功，请重新登录！",
                type: "success"
              });
            })
            .catch((error) => {
              this.$message({
                message: error,
                type: "error"
              });
            });
        } else {
          updateSecretInfo(params)
            .then((res) => {
              if (!this.$common.isEmpty(res.data)) {
                // this.$store.commit("loadCurrentUser", res.data);
                // this.currentUser = this.$store.state.user.current;
                this.clearDialog();
                this.$message({
                  message: "修改成功！",
                  type: "success"
                });
              }
            })
            .catch((error) => {
              this.$message({
                message: error,
                type: "error"
              });
            });
        }
      },
      getCaptcha() {
        if (this.codeString === "获取验证码") {
          // 获取验证码
          let params = {};
          if (!this.checkParams(params)) {
            return;
          }

          let isForgetPassword = this.dialogTitle === "找回密码" || this.dialogTitle === "邮箱验证码"

          getCaptcha(params, isForgetPassword)
            .then((res) => {
              this.$message({
                message: "验证码已发送，请注意查收！",
                type: "success"
              });
            })
            .catch((error) => {
              this.$message({
                message: error,
                type: "error"
              });
            });
          this.codeString = "30";
          this.intervalCode = setInterval(() => {
            if (this.codeString === "0") {
              clearInterval(this.intervalCode)
              this.codeString = "获取验证码";
            } else {
              this.codeString = (parseInt(this.codeString) - 1) + "";
            }
          }, 1000);
        } else {
          this.$message({
            message: "请稍后再试！",
            type: "warning"
          });
        }
      },
      clearDialog() {
        this.registerForm.email = ""
        this.registerForm.phoneNumber = ""
        this.registerForm.password = ""
        this.loginForm.password = ""
        this.loginForm.captcha = ""
        this.loginForm.uuid = ""
        this.password = "";
        this.phoneNumber = "";
        this.email = "";
        this.avatar = "";
        this.showDialog = false;
        this.code = "";
        this.dialogTitle = "";
        this.passwordFlag = null;
      }
    }
  }
</script>

<style lang="scss" scoped>

$bg: #ffffff;
$cursor: #000000;
$dark_gray: #15b2aa;
$light_gray: #eee;

#bottom_layer {
  visibility: hidden;
  width: 3000px;
  position: fixed;
  z-index: 302;
  bottom: 0;
  left: 0;
  height: 39px;
  padding-top: 1px;
  zoom: 1;
  margin: 0;
  line-height: 39px;
  // background: #0e6cff;
}
#bottom_layer .lh {
  display: inline-block;
  margin-right: 14px;
}
#bottom_layer .lh .emphasize {
  text-decoration: underline;
  font-weight: 700;
}
#bottom_layer .lh:last-child {
  margin-left: -2px;
  margin-right: 0;
}
#bottom_layer .lh.activity {
  font-weight: 700;
  text-decoration: underline;
}
#bottom_layer a {
  font-size: 12px;
  text-decoration: none;
}
#bottom_layer .text-color {
  color: #bbb;
}
#bottom_layer .aria-img {
  width: 49px;
  height: 20px;
  margin-bottom: -5px;
}
#bottom_layer a:hover {
  color: #fff;
}
#bottom_layer .s-bottom-layer-content {
  margin: 0 17px;
  text-align: center;
}
#bottom_layer .s-bottom-layer-content .auto-transform-line {
  display: inline;
}
#bottom_layer .s-bottom-layer-content .auto-transform-line:first-child {
  margin-right: 14px;
}
.s-bottom-space {
  position: static;
  width: 100%;
  height: 40px;
  margin: 23px auto 12px;
}
#bottom_layer .open-content-info a:hover {
  color: #fff;
}
#bottom_layer .open-content-info .text-color {
  color: #626675;
}
.open-content-info {
  position: relative;
  display: inline-block;
  width: 20px;
}
.open-content-info > span {
  cursor: pointer;
  font-size: 14px;
}
.open-content-info > span:hover {
  color: #fff;
}
.open-content-info .tip-hover-panel {
  position: absolute;
  display: none;
  padding-bottom: 18px;
}
.open-content-info .tip-hover-panel .rest_info_tip {
  max-width: 560px;
  padding: 8px 12px 8px 12px;
  background: #fff;
  border-radius: 6px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  text-align: left;
}
.open-content-info .tip-hover-panel .rest_info_tip .tip-wrapper {
  white-space: nowrap;
  line-height: 20px;
}
.open-content-info .tip-hover-panel .rest_info_tip .tip-wrapper .tip-item {
  height: 20px;
  line-height: 20px;
}
.open-content-info
.tip-hover-panel
.rest_info_tip
.tip-wrapper
.tip-item:last-child {
  margin-right: 0;
}
@media screen and (max-width: 700px) {
  .open-content-info {
    width: 16px;
  }
  .open-content-info .tip-hover-panel {
    right: -16px !important;
  }
}
.footer {
  background-color: #0e6cff;
  margin-bottom: -20px;
}

.login-container {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  //background: url("../../assets/login.png") no-repeat;
  //background-color: #0e6cff;
  position: relative;
  background-size: cover;
  background-position: 50%;
}

#particles-js {
  z-index: 1;
  width: 100%;
  height: 100%;
  position: absolute;
}

.login-left {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  background-color: rgba(64, 158, 255, 0);
  color: #fff;
  float: left;
  width: 50%;
  position: relative;
  min-height: 500px;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  .login-time {
    position: absolute;
    left: 25px;
    top: 25px;
    width: 100%;
    color: #15b2aa;
    opacity: 1;
    font-size: 18px;
    //font-weight: 500;
    //height: 30px;
  }
}

.login-left .img {
  width: 90px;
  height: 90px;
  border-radius: 3px;
}

.login-left .title {
  text-align: center;
  color: #fff;
  letter-spacing: 2px;
  font-size: 16px;
  font-weight: 600;
}

.login-border {
  position: relative;
  min-height: 450px;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  border-left: none;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  color: #fff;
  background-color: hsla(0, 0%, 100%, 1);
  width: 50%;
  float: left;
}

.login-main {
  margin: 0 auto;
  width: 80%;
}

.login-title {
  color: #15b2aa;
  margin-bottom: 40px;
  font-weight: 500;
  font-size: 22px;
  text-align: center;
  letter-spacing: 4px;
}

.register-title {
  color: #15b2aa;
  margin-bottom: 20px;
  font-weight: 500;
  font-size: 22px;
  text-align: center;
  letter-spacing: 4px;
}

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  ::v-deep .el-input {
    display: inline-block;
    height: 46px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: #333;
      height: 47px;
      caret-color: #333;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form {
    ::v-deep .el-form-item__content {
      line-height: 0;
    }
  }

  .el-form-item {
    border: 1px solid rgba(0, 0, 0, 0.1);
    background: rgba(255, 255, 255, 0.8);
    border-radius: 5px;
    color: #454545;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 15px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  @media only screen and (max-width: 470px) {

    .login-main {
      width: 80%;
    }
    .login-left {
      display: none !important;
    }
    .login-border {
      width: 100%;
    }
    //.register-weaper {
    //  width: 100%;
    //  padding: 0 30px;
    //  box-sizing: border-box;
    //  box-shadow: none;
    //}

  }
}

  .in-up-container {
    height: 100vh;
    position: relative;
  }

  .in-up {
    //opacity: 1;
    border-radius: 10px;
    // {box-shadow:X轴偏移量 Y轴偏移量 阴影模糊半径 阴影扩展半径 阴影颜色 投影方式 }
    box-shadow: 10px 15px 30px var(--miniMask), 10px 10px 10px var(--miniMask);
    position: relative;
    overflow: hidden;
    width: 750px;
    max-width: 100%;
    min-height: 450px;
    margin: 10px;
    background: transparent;
  }

  .in-up p {
    font-size: 14px;
    letter-spacing: 1px;
    margin: 20px 0 30px 0;
  }

  .in-up a {
    color: var(--black);
    font-size: 14px;
    text-decoration: none;
    margin: 15px 0;
  }

  .form-container {
    position: absolute;
    height: 100%;
    transition: all 0.5s ease-in-out;
  }

  .sign-in-container {
    left: 0;
    width: 50%;
  }

  .sign-up-container {
    left: 0;
    width: 50%;
    opacity: 0.5;
    border-start-end-radius: 10px;
    border-top-right-radius: 10px;
  }

  .in-up button {
    border-radius: 2rem;
    border: none;
    background: var(--lightRed);
    color: var(--white);
    font-size: 16px;
    font-weight: bold;
    padding: 12px 45px;
    letter-spacing: 2px;
    cursor: pointer;
  }

  .in-up button:hover {
    animation: scale 0.8s ease-in-out;
  }

  .in-up button.ghost {
    background: transparent;
    border: 1px solid var(--white);
  }

  //.sign-up-container button {
  //  margin-top: 20px;
  //}

  .overlay-container {
    position: absolute;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: all 0.5s ease-in-out;
  }

  .overlay {
    background: var(--gradualRed);
    color: var(--white);
    position: relative;
    left: -100%;
    height: 100%;
    width: 200%;
    //opacity: 0.9;
  }

  .overlay-panel {
    position: absolute;
    top: 0;
    flex-direction: column;
    height: 100%;
    width: 50%;
    transition: all 0.5s ease-in-out;
  }

  .overlay-right {
    right: 0;
    transform: translateY(0);
  }

  .overlay-left {
    transform: translateY(-30%);
  }

  .in-up.right-panel-active .sign-in-container {
    transform: translateY(100%);
  }

  .in-up.right-panel-active .overlay-container {
    transform: translateX(-100%);
  }

  .in-up.right-panel-active .sign-up-container {
    transform: translateX(100%);
    opacity: 1;
  }

  .in-up.right-panel-active .overlay {
    transform: translateX(50%);
  }

  .in-up.right-panel-active .overlay-left {
    transform: translateY(0);
  }

  .in-up.right-panel-active .overlay-right {
    transform: translateY(20%);
  }

  .user-container {
    width: 100vw;
    height: 100vh;
    position: relative;
  }

  .user-info {
    width: 80%;
    z-index: 10;
    margin-top: 70px;
    height: calc(100vh - 90px);
    margin-bottom: 20px;
    border-radius: 10px;
    overflow: hidden;
  }

  .user-left {
    width: 50%;
    background: var(--maxMaxWhiteMask);
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    padding: 20px;
  }

  .user-right {
    width: 50%;
    background: var(--maxWhiteMask);
    padding: 20px;
  }

  .user-title {
    text-align: right;
    user-select: none;
  }

  .user-content {
    text-align: left;
  }

  .user-title div {
    height: 55px;
    line-height: 55px;
    text-align: center;
  }

  .user-content > div {
    height: 55px;
    display: flex;
    align-items: center;
  }

  .changeInfo {
    color: var(--white);
    font-size: 0.75rem;
    cursor: pointer;
    background: var(--themeBackground);
    padding: 3px;
    border-radius: 0.2rem;
    user-select: none;
  }

  @media screen and (max-width: 920px) {
    .user-info {
      width: 90%;
    }

    .user-left {
      width: 100%;
    }

    .user-right {
      display: none;
    }
  }
</style>
