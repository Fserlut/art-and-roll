import $api from "@/utils/backend";

export default class UserService {
	static async getUserData() {
		return $api.get('/user');
	}
}
