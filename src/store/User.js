export default {
	state: {
		user: {
			name: '',
			email: '',
			uid: ''
		}
	},
	getters: {
		user: s => s.user,
	},
	actions: {},
	mutations: {
		setUser(state, payload) {
			state.user.uid = payload.uid;
			state.user.name = payload.name;
			state.user.email = payload.email;
		},
		clearUser(state) {
			state.user = {}
		}
	},
}
