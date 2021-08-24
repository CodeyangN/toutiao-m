import request from '../utils/request'
// import store from '../store'

export const login = (data) => {
	return request({
		url: '/v1_0/authorizations',
		method: 'POST',
		data
	})
}
export const sendSms = (mobile) => {
	return request({
		url: `/v1_0/sms/codes/${mobile}`,
		method: 'GET',
	})
}
export const getUserInfo = () => {
	return request({
		url: '/v1_0/user',
		method: 'GET'
		// headers: {
		// 	Authorization: `Bearer ${store.state.user.token}`
		// }
	})
}
export const getUserChannels = () => {
	return request({
		url: '/v1_0/channels',
		method: 'GET',
	})
}