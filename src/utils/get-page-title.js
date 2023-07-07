import storage from '@/utils/storage'

export default function getPageTitle(pageTitle) {
  // const app_info = storage.get('app_info')
  // const title = app_info ? app_info.sys_app_name : '小世界'
  const title = "挑战一下～"
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
