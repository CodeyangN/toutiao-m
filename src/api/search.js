import request from '@/utils/request'

export const getSearchSuggest = (q) => {
	return request({
		url: '/v1_0/suggestion',
		method: 'GET',
		params: {
			q
		}
	})
}
export const getSearchResult = params => {
	return request({
		url: '/v1_0/search',
		method: 'GET',
		params
	})
}