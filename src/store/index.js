import auth from './auth';
import {createStore} from 'vuex';

const store = createStore({
	modules:{
		auth,
	}
});

export default store;
