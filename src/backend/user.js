import $api from "@/utils/backend";

export default class UserService {
	static async findUser(phone) {
		return $api.post('/find-user', {phone});
	}

	static async validLogin(login) {
		return $api.post('/valid-login', {login});
	}
}
