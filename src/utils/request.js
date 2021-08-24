import axios from "axios";
import store from '../store/index'

const request = axios.create({
	baseURL: 'http://www.liulongbin.top:8000'
})
request.interceptors.request.use(
	(config) => {
		const { user } = store.state
		if (user && user.token) {
			config.headers.Authorization = `Bearer ${user.token}`
		}
		return config
	},
	(error) => {
		Promise.reject(error);
	});
export default request