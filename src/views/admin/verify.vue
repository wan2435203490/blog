<template>
  <div class="myCenter verify-container">
    <div class="verify-content">
      <div>
        <el-avatar :size="50" :src="$store.state.webInfo.avatar"></el-avatar>
      </div>
      <div>
        <el-input v-model="username">
          <template slot="prepend">账号</template>
        </el-input>
      </div>
      <div>
        <el-input v-model="password" type="password">
          <template slot="prepend">密码</template>
        </el-input>
      </div>
      <div>
        <proButton :info="'提交'"
                   @click.native="login()"
                   :before="$constant.before_color_2"
                   :after="$constant.after_color_2">
        </proButton>
      </div>
    </div>
  </div>
</template>

<script>
  import {login} from "@/api/user";

  const proButton = () => import( "../common/proButton");

  export default {
    components: {
      proButton
    },
    data() {
      return {
        // redirect: this.$route.query.redirect,
        redirect: "/admin",
        username: "",
        password: ""
      }
    },
    computed: {},
    created() {

    },
    methods: {
      login() {
        if (this.$common.isEmpty(this.username) || this.$common.isEmpty(this.password)) {
          this.$message({
            message: "请输入账号或密码！",
            type: "error"
          });
          return;
        }

        let user = {
          username: this.username.trim(),
          password: this.$common.encrypt(this.password.trim()),
          captcha: "captcha",
          uuid: "uuid",
          isAdmin: true
        };

        this.$store.dispatch('user/login', user)
          .then(() => {
            this.password = this.$common.decrypt(this.password.trim())
            this.$router.push({path: this.redirect});
          })
          .catch(() => {
            this.loginLoading = false
            this.password = this.$common.decrypt(this.password.trim())
            //this.getCaptchaImg()
          })

        // login(user)
        //   .then((res) => {
        //     // console.log(res.data)
        //       // localStorage.setItem("adminToken", res.data.accessToken);
        //       // this.$store.commit("loadCurrentAdmin", res.data);
        //       // this.username = "";
        //       this.password = "";
        //       //console.log(this.redirect)
        //       this.$router.push({path: this.redirect});
        //   })
        //   .catch((error) => {
        //     this.$message({
        //       message: error,
        //       type: "error"
        //     });
        //   });
      }
    }
  }
</script>

<style scoped>

  .verify-container {
    height: 100vh;
    background: var(--verifyImage) center center / cover repeat;
  }

  .verify-content {
    background: var(--maxWhiteMask);
    padding: 30px 40px 5px;
    position: relative;
  }

  .verify-content > div:first-child {
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    top: -25px;
  }

  .verify-content > div:not(:first-child) {
    margin: 25px 0;
  }

  .verify-content > div:last-child > div {
    margin: 0 auto;
  }

</style>
