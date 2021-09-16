import store from "@/store";
import $api from "@/utils/backend";

export default {
	async sendCode(user, type) {
		let { data } = await $api.post('/send-verify', {...user, type});
		return data;
	},
	async checkCode(code) {
		let phone = store.getters.userPhone;
		try {
			let { data } = await $api.post('/check-code', {code, phone});
			return data;
		} catch (e) {
			return e
		}
	}
}
