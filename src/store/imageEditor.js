export default {
	state: {
		target: false,
	},
	getters: {
		getTargetImage: s => s.target
	},
	actions: {},
	mutations: {
		clearTargetImage(state) {
			state.target = false;
		},
		setTargetImage(state, payload) {
			state.target = payload.photo;
		}
	},
}
