export default {
	state: {
		isRegistred: false,
		isAuth: false,
		user: {
			phone: '',
			name: '',
			login: '',
			avatar: '',
			artsCounter: 0,
			rollsCounter: 0,
			birthday: '',
		}
	},
	getters: {
		user: s => s.user,
		getArts: s => s.user.artsCounter,
		getRolls: s => s.user.rollsCounter,
		isRegistred: s => s.isRegistred,
		userPhone: s => s.user.phone,
		isAuth: s => s.isAuth,
	},
	actions: {
		async updateUser(state) {

		}
	},
	mutations: {
		setAuth(state, payload) {
			state.isAuth = payload;
		},
		setPhone(state, payload) {
			state.user.phone = payload.phone;
		},
		isRegistred(state, isRegistredVal) {
			state.isRegistred = isRegistredVal;
		},
		setAvatar(state, payload) {
			state.user.avatar = payload.avatar;
		},
		setUserId(state, payload) {
			state.user._id = payload.id
		},
		setUser(state, payload) {
			state.user = {...payload};
		},
		clearUser(state) {
			console.log('clear data');
			state.user = {}
		}
	},
}
