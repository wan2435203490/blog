//consider mapGetters
const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  permisaction: state => state.user.permisaction,
  permission_routes: state => state.permission.routes,
  topbarRouters: state => state.permission.topbarRouters,
  defaultRoutes: state => state.permission.defaultRoutes,
  sidebarRouters: state => state.permission.sidebarRouters,
  errorLogs: state => state.errorLog.logs,
  appInfo: state => state.system.info,
  articleTotal: state => {
    if (state.sortInfo !== null && state.sortInfo.length !== 0) {
      if (state.sortInfo.length === 1) {
        return state.sortInfo[0].countOfSort;
      } else {
        return state.sortInfo.reduce((prev, curr) => {
          if (typeof prev === "number") {
            return prev + curr.countOfSort;
          } else {
            return prev.countOfSort + curr.countOfSort;
          }
        });
      }
    } else {
      return 0;
    }
  },
  navigationBar: state => {
    if (state.sortInfo !== null && state.sortInfo.length !== 0) {
      return state.sortInfo.filter(f => f.sortType === 0);
    } else {
      return [];
    }
  }
}
export default getters
