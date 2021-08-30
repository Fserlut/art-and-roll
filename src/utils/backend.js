import axios from "axios";
import api from "@/api";
import store from "@/store";

const $api = axios.create({
	withCredentials: true,
	baseURL: api.baseUrl,
});

$api.interceptors.request.use((config) => {
	config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
	return config;
})

$api.interceptors.response.use((config) => {
	return config;
},async (error) => {
	const originalRequest = error.config;
	if (error.response.status == 401 && error.config && !error.config._isRetry) {
		originalRequest._isRetry = true;
		try {
			const response = await axios.post(`${api.baseUrl}/refresh`, {
				refreshToken: localStorage.getItem('refreshToken')
			})
			localStorage.setItem('refreshToken', response.data.tokens.refreshToken);
			localStorage.setItem('token', response.data.tokens.accessToken);
			return $api.request(originalRequest);
		} catch (e) {
			console.log('Ошибка при обновлении токена', e);
		}
	}
	throw error;
})

export default $api;
