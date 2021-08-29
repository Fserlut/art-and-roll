import $api from "@/utils/backend";

export default class AuthService {
	static async login(phone, code) {
		return $api.post('/check-code', {phone, code});
	}
}
