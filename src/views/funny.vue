<template>
  <div style="background: var(--background)">
    <!-- 两句诗 -->
    <div class="my-animation-slide-top">
      <twoPoem :isShehui="true"></twoPoem>
    </div>

    <div style="background: var(--background);padding: 40px 0" class="my-animation-slide-bottom">
      <el-button icon="el-icon-refresh" style="margin: 0 40px 0 40px; color: #15b2aa; background: transparent; border: transparent" @click="randomMusic">刷新一下</el-button>
      <el-button icon="el-icon-headset" style="margin: 0 40px 0 40px; color: #15b2aa; background: transparent; border: transparent" @click="toPlayer">玩一玩播放器？</el-button>
      <div class="funny-wrap" v-if="!$common.isEmpty(songs)">
        <div v-for="(item, index) in songs" :key="index">
          <div style="display: flex">
            <span class="iconRotate">
              <svg viewBox="0 0 1024 1024" width="28" height="28">
                <path
                  d="M502.272 948.224l-427.008-427.008c-1.536-1.536-1.536-3.584 0-4.608l427.008-427.008c1.536-1.536 3.584-1.536 4.608 0l427.008 427.008c1.536 1.536 1.536 3.584 0 4.608L506.88 948.224c-1.536 1.024-3.584 1.024-4.608 0z"
                  fill="#C9E6FF"></path>
                <path
                  d="M504.32 956.416c-2.56 0-5.632-1.024-7.68-3.072l-427.008-427.008c-4.096-4.096-4.096-11.264 0-15.36L496.64 83.456c4.096-4.096 11.264-4.096 15.36 0l427.008 427.008c4.096 4.096 4.096 11.264 0 15.36L512 953.344c-2.048 2.048-4.608 3.072-7.68 3.072z m-420.864-437.76l420.864 420.864 420.864-420.864L504.32 97.28l-420.864 421.376z"
                  fill="#2E66FF"></path>
                <path
                  d="M497.152 97.792l13.312 414.208 395.264-395.264c5.632-5.632 2.048-15.872-6.144-16.384L506.88 88.064c-5.632-0.512-9.728 4.096-9.728 9.728z"
                  fill="#FFFFFF"></path>
                <path
                  d="M503.296 529.92l-13.824-432.128c0-4.608 1.536-9.216 5.12-12.8s7.68-5.12 12.8-5.12l392.704 12.8c7.168 0 12.8 4.608 15.36 10.752 2.56 6.656 1.024 13.312-3.584 18.432l-408.576 408.064z m1.536-432.64l12.8 396.8 382.464-382.464c0.512-0.512 0.512-1.024 0.512-2.048-0.512-0.512-1.024-1.024-1.536-1.024l-392.704-12.8c-0.512 0-1.024 0.512-1.536 0.512v1.024z"
                  fill="#2E66FF"></path>
                <path
                  d="M522.24 946.688L508.416 532.48l-395.264 395.264c-5.632 5.632-2.048 15.872 6.144 16.384l392.704 12.8c5.632 0 10.24-4.608 10.24-10.24z"
                  fill="#FFFFFF"></path>
                <path
                  d="M512.512 964.096h-0.512l-392.704-12.8c-7.168 0-12.8-4.608-15.36-10.752-2.56-6.656-1.024-13.312 3.584-18.432l407.552-407.552 13.824 432.128c0 4.608-1.536 9.216-5.12 12.8-2.048 3.072-6.656 4.608-11.264 4.608z m-11.264-413.696l-382.464 382.464c-0.512 0.512-0.512 1.024-0.512 2.048 0.512 0.512 1.024 1.024 1.536 1.024l392.704 12.8c0.512 0 1.024-0.512 1.536-0.512 0 0 0.512-0.512 0.512-1.536l-13.312-396.288z"
                  fill="#2E66FF"></path>
                <path
                  d="M931.84 509.952l-414.208 13.312 395.264 395.264c5.632 5.632 15.872 2.048 16.384-6.144l12.8-392.704c0-5.632-4.608-10.24-10.24-9.728z"
                  fill="#FFB5EC"></path>
                <path
                  d="M919.552 929.28c-4.608 0-8.704-1.536-11.776-5.12l-407.552-407.552 432.128-13.824c4.608 0 9.216 1.536 12.8 5.12s5.12 8.192 5.12 12.8l-12.8 392.704c0 7.168-4.608 12.8-10.752 15.36-3.072 0-5.12 0.512-7.168 0.512z m-384-398.848l382.464 382.464c0.512 0.512 1.024 0.512 2.048 0.512 0.512-0.512 1.024-1.024 1.024-1.536l12.8-392.704c0-0.512-0.512-1.024-0.512-1.536 0 0-1.024-0.512-1.536-0.512l-396.288 13.312z"
                  fill="#2E66FF"></path>
                <path
                  d="M76.8 526.848l414.208-13.312-394.752-395.264c-5.632-5.632-15.872-2.048-16.384 6.144L67.072 517.12c0 5.632 4.096 10.24 9.728 9.728z"
                  fill="#FFF152"></path>
                <path
                  d="M76.8 534.528c-4.608 0-8.704-2.048-12.288-5.12-3.584-3.584-5.12-8.192-5.12-12.8l12.8-392.704c0-7.168 4.608-12.8 10.752-15.36 6.656-2.56 13.312-1.024 18.432 3.584l407.552 407.552-432.128 13.824v1.024z m12.8-411.136h-0.512c-0.512 0.512-1.024 1.024-1.024 1.536l-12.8 392.704c0 0.512 0.512 1.024 0.512 1.536 0 0 0.512 0.512 1.536 0.512L474.112 506.88 90.624 123.904c-0.512-0.512-1.024-0.512-1.024-0.512z"
                  fill="#2E66FF"></path>
              </svg>
            </span>
            <span class="funny-title">{{index + 1}}号选手：{{item.typeName}}</span>
<!--            <span class="funny-title">随机音乐</span>-->
          </div>
          <div class="process-wrap">
<!--            <el-collapse v-model="activeName" accordion @change="changeFunny(item.classify)">-->
            <el-collapse v-model="activeName">
              <el-collapse-item :title="item.typeName" :name="item.typeName">
                <div class="my-animation-slide-bottom"
                     style="display: flex;flex-flow: wrap;margin-left: 20px"
                     v-if="!$common.isEmpty(item.songs)">
<!--                     v-if="!$common.isEmpty(item.data)">-->
                  <div style="width: 200px; " v-for="(song, i) in item.songs" :key="i">
                    <el-avatar class="funny-avatar myCenter" :size="120"
                               style="margin-left: 40px;margin-right: 40px"
                               @click.native="playSound(song.url, item.typeName)"
                               :src="song.picurl">
                      <img :src="$constant.random_image_small"/>
                    </el-avatar>
                    <div style="text-align: center; color: #15b2aa; font-size: 18px; margin-top: 10px">{{song.name}}</div>
                    <div style="text-align: center; color: #285452; font-size: 16px">{{song.artistsname}}</div>
                  </div>
                </div>
              </el-collapse-item>
            </el-collapse>
            <hr>
          </div>
        </div>
      </div>
    </div>

    <!-- 页脚 -->
    <myFooter></myFooter>
  </div>
</template>

<script>
  import {listResourcePath} from "@/api/web_info";
  import {randomMusic} from "@/api/music";
  import constant from "@/utils/constant";

  const twoPoem = () => import( "./common/twoPoem");
  const myFooter = () => import( "./common/myFooter");

  export default {
    components: {
      twoPoem,
      myFooter
    },

    data() {
      return {
        pagination: {
          current: 1,
          size: 9999,
          order: "title",
          desc: false,
          resourceType: "funny",
          classify: ""
        },
        activeName: 0,
        audio: null,
        funnys: [{
          classify: "",
          count: null,
          data: [{
            classify: "",
            cover: "",
            url: "",
            title: ""
          }]
        }],
        funny: {
          classify: "",
          title: "",
          cover: "",
          url: ""
        },
        randomMusicCount: 20,
        songs: [],
        selectedType: null
      }
    },

    computed: {},

    watch: {},

    created() {
      // this.getFunny();
      this.randomMusic();
    },

    mounted() {

    },

    methods: {
      randomMusic(){
        randomMusic({count:this.randomMusicCount}).then(res => {
          if (!this.$common.isEmpty(res.data)) {
            this.songs = res.data;
          }
        })
      },
      toPlayer(){
        // let path=window.location.protocol+'//music.2fun.top'
        // console.log(path)
        // window.location.href=path
        window.open(constant.musicPlayerUrl, '_blank')
      },
      // getFunny() {
      //   listFunny()
      //     .then((res) => {
      //       if (!this.$common.isEmpty(res.data)) {
      //         this.funnys = res.data;
      //         this.changeFunny(this.funnys[0].classify);
      //       }
      //     })
      //     .catch((error) => {
      //       this.$message({
      //         message: error,
      //         type: "error"
      //       });
      //     });
      // },
      listFunny() {
        listResourcePath(this.pagination)
          .then((res) => {
            if (!this.$common.isEmpty(res.data) && !this.$common.isEmpty(res.data.records)) {
              this.funnys.forEach(funny => {
                if (funny.classify === this.pagination.classify) {
                  funny.data = res.data.records;
                  this.$forceUpdate();
                }
              });
            }
            this.pagination.classify = "";
          })
          .catch((error) => {
            this.$message({
              message: error,
              type: "error"
            });
          });
      },
      // changeFunny(classify) {
      //   this.funnys.forEach(funny => {
      //     if (funny.classify === classify && this.$common.isEmpty(funny.data)) {
      //       this.pagination.classify = classify;
      //       this.listFunny();
      //     }
      //   });
      // },
      playSound(src, type) {
        if(type === "QQ音乐随机"){
          this.audio.end()
          return
        }
        this.selectedType = type
        if (this.audio != null) {
          if (this.audio.src === src) {
            if (this.audio.paused) {
              this.audio.play();
            } else {
              this.audio.pause();
            }
          } else {
            this.play(src)
          }
        } else {
          this.audio = new Audio(src);
          this.addAudioListener()
          this.audio.play();
        }
      },
      addAudioListener(){
        // 播放结束触发
        this.audio.onended = () => {
          console.log("ended")
          for (let i = 0; i < this.songs.length; i++) {
            if(this.songs[i].typeName === this.selectedType){
              console.log("type:", this.songs[i].typeName)
              let j = Math.floor(Math.random() * this.songs[i].songs.length)
              console.log("j:", j)
              console.log("url:", this.songs[i].songs[j].url)
              this.play(this.songs[i].songs[j].url)
              break
            }
          }
        };
      },
      play(src){
        this.audio.src = src;
        this.audio.load();
        setTimeout(() => {
              this.audio.play();
            }, 1000);
      },
    }
  }
</script>

<style scoped>

  .funny-wrap {
    background-color: var(--maxMaxLightGray);
    width: 95%;
    border-radius: 10px;
    max-width: 1600px;
    margin: 0 auto;
    padding: 40px 20px 80px;
  }

  .funny-title {
    color: var(--black);
    font-size: 28px;
    font-weight: 700;
    margin-left: 12px;
  }

  .process-wrap {
    margin: 20px 0 40px;
  }

  .process-wrap hr {
    position: relative;
    margin: 30px auto 100px;
    border: 2px dashed var(--lightGreen);
    overflow: visible;
  }

  .process-wrap hr:before {
    position: absolute;
    top: -14px;
    left: 5%;
    color: var(--lightGreen);
    content: '❄';
    font-size: 30px;
    line-height: 1;
    transition: all 1s ease-in-out;
  }

  .process-wrap hr:hover:before {
    left: calc(95% - 20px);
  }

  .process-wrap >>> .el-collapse-item__header {
    border-bottom: unset;
    font-size: 20px;
    font-weight: 700;
    background-color: var(--maxMaxLightGray);
    color: var(--lightGreen);
    padding: 40px;
  }

  .process-wrap >>> .el-collapse-item__wrap {
    background-color: var(--maxMaxLightGray);
  }

  .process-wrap .el-collapse {
    border-top: unset;
    border-bottom: unset;
    border-radius: 10px;
    overflow: hidden;
  }

  .process-wrap >>> .el-collapse-item__wrap {
    border-bottom: unset;
  }

  .funny-item-title {
    text-align: center;
    margin: 0 10px;
    font-size: 18px;
    font-weight: 700;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .funny-item-title:hover {
    text-overflow: unset;
    overflow: unset;
  }

  .funny-avatar {
    cursor: pointer;
    /*transition: all 0.5s;*/
    /*user-select: none;*/
    transition: All 0.4s ease-in-out;
    -webkit-transition: All 0.4s ease-in-out;
    -moz-transition: All 0.4s ease-in-out;
    -o-transition: All 0.4s ease-in-out;
  }

  .funny-avatar:hover {
    /*transform: rotate(360deg);*/
    transform: rotate(360deg) scale(1.2);
    -webkit-transform: rotate(360deg) scale(1.2);
    -moz-transform: rotate(360deg) scale(1.2);
    -o-transform: rotate(360deg) scale(1.2);
    -ms-transform: rotate(360deg) scale(1.2);
  }

</style>
