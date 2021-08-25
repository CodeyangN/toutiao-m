import request from '@/utils/request'

export const addUserChannel = (channel) => {
	return request({
		url: '/v1_0/user/channels',
		method: 'PATCH',
		data: {
			channels: [channel]
		}
	})
}
export const deleteUserChannel = (channelId) => {
	return request({
		url: `/v1_0/user/channels/${channelId}`,
		method: 'DELETE',
	})
}