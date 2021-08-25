import request from '@/utils/request'

export const getArticles = params => {
	return request({
		url: '/v1_0/articles',
		method: 'GET',
		params
	})
}
export const getArticleDetailAPI = article_id => {
	return request.get(`/v1_0/articles/${article_id}`)
}