import {createRouter, createWebHistory} from '@ionic/vue-router';
// eslint-disable-next-line no-unused-vars
import {RouteRecordRaw} from 'vue-router';
import Login from '../views/Login.vue'
import Register from "@/views/Register/index";
import Main from "@/views/Main";
import firebase from 'firebase/app';
import store from "@/store";
import Profile from "@/views/Profile";
import Messenger from "@/views/Messenger";
import Search from "@/views/Search";
import SmsCode from "@/views/SmsCode";

const routes = [
	{
		path: '/',
		beforeEnter(to, from, next) {
			if (!firebase.auth().currentUser){
				next('/login')
			}
			// store.dispatch('fetchUserData');
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
			// store.dispatch('fetchUserData');
			next('/main');
		}
	},
	{
		path: '/smscode',
		name: 'SmsCode',
		component: SmsCode,
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
			// store.dispatch('fetchUserData');
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
			next();
		}
	},
	{
		path: '/profile',
		name: 'Profile',
		component: Profile,
		async beforeEnter(to, from, next) {
			if (!firebase.auth().currentUser){
				next('/login')
			}
			// await store.dispatch('fetchUserData');
			next();
		}
	},
	{
		path: '/messenger',
		name: 'Messenger',
		component: Messenger,
		beforeEnter(to, from, next) {
			if (!firebase.auth().currentUser){
				next('/login')
			}
			next();
		}
	},
	{
		path: '/search',
		name: 'Search',
		component: Search,
		beforeEnter(to, from, next) {
			if (!firebase.auth().currentUser){
				next('/login')
			}
			next();
		}
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
