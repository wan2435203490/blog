let titleTime, OriginTitle = document.title;
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    document.title = "w(ﾟДﾟ)w 不要走！再看看嘛！"
    clearTimeout(titleTime)
  } else {
    document.title = "♪(^∇^*)欢迎肥来~"
    //3e3=3*10的3次方
    titleTime = setTimeout(() => document.title = OriginTitle, 2e3)
  }
})
