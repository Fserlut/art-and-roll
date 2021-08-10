import firebase from 'firebase/app';

export default {
	actions: {
		async login(state, payload) {
			try {
				await firebase.auth().signInWithEmailAndPassword(payload.email, payload.password);
			} catch (e) {
				console.log(e);
			}
		},
		async register(state, payload) {
			try {
				await firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password);
				const uid = await state.dispatch('getUid');
				await firebase.database().ref(`/users/${uid}/info`).set({
					name: payload.name,
				})
			} catch (e) {
				console.log(e);
			}
		},
		async getUid() {
			let user = await firebase.auth().currentUser;
			return user ? user.uid : null;
		},
		async logout() {
			await firebase.auth().signOut();
		}
	}
}
