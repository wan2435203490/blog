export default {
  // baseURL: "http://localhost:8090/api",
  imBaseURL: "http://localhost:81",
  webURL: "http://localhost",

  requestTimeout: 10_000,
  //backend split by " "
  authorizationPrefix: "WanBlog ",

  baseURL: "https://2fun.top/api",
  // imBaseURL: "https://2fun.top/im",
  // webURL: "https://2fun.top",

  //天气 ip 等
  daily:"https://apis.jxcxin.cn/api/ip?title=%E5%B0%8F%E4%B8%96%E7%95%8C",
  //看板娘
  live2d_path: "https://cdn.jsdelivr.net/gh/stevenjoezhang/live2d-widget@latest/",
  cdnPath: "https://cdn.jsdelivr.net/gh/fghrsh/live2d_api/",
  waifuPath: "/webInfo/getWaifuJson",
  //一言
  hitokoto: "https://v1.hitokoto.cn",
  //随机图、一言、QQ头像、网易云解析等等
  shehui: "https://api.oick.cn/yulu/api.php",
  //目录生成
  tocbot: "https://cdnjs.cloudflare.com/ajax/libs/tocbot/4.11.1/tocbot.min.js",
  //今日诗词
  jinrishici: "https://v1.jinrishici.com/all.json",
  //随机图
  random_image: "https://api.horosama.com/random.php",
  random_image_small: "https://api.horosama.com/random.php?type=profile&resolution=small",
  //前后端定义的密钥，AES使用16位
  cryptojs_key: "deixiedianshenme",
  //https://developer.qiniu.com/kodo/1671/region-endpoint-fq
  //七牛云上传地址 当前华南-广东 不同bucket需要参考上面链接更改
  qiniuUrl: "https://upload-z2.qiniup.com",
  //七牛云下载地址
  // qiniuDownload: "http://rwox7ivob.hn-bkt.clouddn.com/",
  qiniuDownload: "https://www.2fun.top/",

  musicPlayerUrl: 'http://music.2fun.top/',

  // favoriteVideo: "https://www.douyin.com/video/6991432343617686820",
  favoriteVideo: "https://2fun.top/videos/1.mp4",

  loveWeiYan: "https://www.2fun.top/love/avatar/39.jpeg",
  loveMessage: "https://www.2fun.top/love/avatar/40.jpeg",
  lovePhoto: "https://www.2fun.top/love/avatar/41.jpeg",
  loveLike: "",

  loveSortId: 1,
  loveLabelId: 1,

  friendBG: "https://api.horosama.com/random.php",
  friendLetterTop: "https://cdn.cbd.int/hexo-butterfly-envelope/lib/before.png",
  friendLetterBottom: "https://cdn.cbd.int/hexo-butterfly-envelope/lib/after.png",
  friendLetterBiLi: "https://cdn.cbd.int/hexo-butterfly-envelope/lib/line.png",
  friendLetterMiddle: "https://cdn.cbd.int//hexo-butterfly-envelope/lib/violet.jpg",

  before_color_list: ["#ff4b2b", "#EF794F", "#67C23A", "orange", "rgb(131, 123, 199)", "#23d5ab"],

  tree_hole_color: ["#ee7752", "#e73c7e", "#23a6d5", "#23d5ab", "rgb(131, 123, 199)", "#23d5ab"],

  two_poem_image: ["https://api.horosama.com/random.php",
    "https://api.horosama.com/random.php"],
  // two_poem_image:[],

  before_color_1: "black",
  after_color_1: "linear-gradient(45deg, #f43f3b, #ec008c)",

  before_color_2: "rgb(21,178,170)",
  after_color_2: "linear-gradient(45deg, #f43f3b, #ec008c)",

  sortColor: ["linear-gradient(to right, #358bff, #15c6ff)",
    "linear-gradient(to right, #18e7ae, #1eebeb)",
    "linear-gradient(to right, #ff6655, #ffbf37)",
    "linear-gradient(120deg, rgba(255, 39, 232, 1) 0%, rgba(255, 128, 0, 1) 100%)",
    "linear-gradient(120deg, rgba(91, 39, 255, 1) 0%, rgba(0, 212, 255, 1) 100%)"
  ],

  pageColor: "#ee7752",
  commentPageColor: "#23d5ab",
  userId: 1,
  source: 0,

  mainContent: "这里就像与闹市隔绝的又一个世界",
  emojiList: ['衰', '鄙视', '再见', '捂嘴', '摸鱼', '奋斗', '白眼', '可怜', '皱眉', '鼓掌', '烦恼', '吐舌', '挖鼻', '委屈', '滑稽', '啊这', '生气', '害羞', '晕', '好色', '流泪', '吐血', '微笑', '酷', '坏笑', '吓', '大兵', '哭笑', '困', '呲牙']
}
