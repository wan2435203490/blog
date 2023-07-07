import http from '@/utils/request'
import common from "@/utils/common";

const relativePath = "/article"

export function saveArticle(article) {
  if (common.isEmpty(article.id)){
    return http.post(relativePath, article)
  }else{
    return http.put(relativePath, article)
  }
}
export function deleteArticle(params) {
  return http.delete(relativePath, params)
}

export function listArticle(params) {
  return http.get(relativePath + '/list', params)
}
export function getArticleById(params) {
  return http.get(relativePath, params)
}
