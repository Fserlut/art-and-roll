import api from "@/api";
import store from "@/store";

export default {
	async sendCode(user, type) {
		let res = await fetch(api.baseUrl + '/send-verify', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify({...user, type})
		});
		let data = await res.json();
		return data;
	},
	async checkCode(code) {
		let phone = store.getters.userPhone;
		let res = await fetch(api.baseUrl + '/check-code', {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify({code, phone})
		});
		let data = await res.json();
		return data;
	}
}
