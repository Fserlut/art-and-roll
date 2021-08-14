import firebase from "firebase";

export default {
	state: {
		user: {
			name: '',
			email: '',
			uid: '',
			avatar: 'https://ionicframework.com/docs/demos/api/avatar/avatar.svg'
		}
	},
	getters: {
		user: s => s.user,
	},
	actions: {
		async setUserInfoToDB(state, payload) {
			await firebase.database().ref(`/users/${state.state.user.uid}/info`).update({
				avatar: payload.avatarUrl
			});
		}
	},
	mutations: {
		setAvatar(state, payload) {
			state.user.avatar = payload.avatar;
		},
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
