import AuthService from "@/backend/auth";
import toast from "@/utils/toast";
import $api from "@/utils/backend";
import axios from "axios";
import api from "@/api";

export default {
	actions: {
		async checkAuth(state) {
			try {
				const { data } = await axios.get(api.baseUrl + '/refresh', {
					withCredentials: true,
				});
				await localStorage.setItem('token', data.tokens.accessToken);
				await state.commit('setUser', data.user);
				await state.commit('setAuth', true);
			} catch (e) {
				console.log(e);
			}
		},

		async login(state, {phone, code}) {
			try {
				const { data } = await AuthService.login(phone, code);
				localStorage.setItem('token', data.data.tokens.accessToken);
				state.commit('setUser', data.data.user);
				state.commit('setAuth', true);
				toast({
					message: 'Успешно! Перенапровляю в профиль',
					color: 'success',
					duration: 1000
				});
			} catch (e) {
				state.commit('setError', {message: e.response.data.message});
				throw e
			}
		},

		async logout(state) {
			await $api.post('/logout');
			localStorage.removeItem('token');
			state.commit('clearUser');
		}
	}
}
