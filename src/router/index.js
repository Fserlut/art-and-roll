import {createRouter, createWebHistory} from '@ionic/vue-router';
// eslint-disable-next-line no-unused-vars
import {RouteRecordRaw} from 'vue-router';
import Login from '../views/Login.vue'
import Register from "@/views/Register";
import Main from "@/views/Main";
import firebase from 'firebase/app';
import store from "@/store";

const routes = [
	{
		path: '/',
		beforeEnter(to, from, next) {
			if (!firebase.auth().currentUser){
				next('/login')
			}
			store.commit('setUser', {name: firebase.auth().currentUser.displayName, email: firebase.auth().currentUser.email, uid: firebase.auth().currentUser.uid});
			next('/main');
		}
	},
	{
		path: '/login',
		name: 'Login',
		component: Login,
		beforeEnter(to, from, next) {
			if (!firebase.auth().currentUser){
				next()
			}
			next('/main');
		}
	},
	{
		path: '/register',
		name: 'Register',
		component: Register,
		beforeEnter(to, from, next) {
			if (!firebase.auth().currentUser){
				next()
			}
			next('/main');
		}
	},
	{
		path: '/main',
		name: 'Main',
		component: Main,
		beforeEnter(to, from, next) {
			if (!firebase.auth().currentUser){
				next('/login')
			}
			store.commit('setUser', {name: firebase.auth().currentUser.displayName, email: firebase.auth().currentUser.email, uid: firebase.auth().currentUser.uid});
			next();
		}
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
