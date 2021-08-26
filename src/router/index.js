import {createRouter, createWebHistory} from '@ionic/vue-router';
// eslint-disable-next-line no-unused-vars
import {RouteRecordRaw} from 'vue-router';
import Login from '../views/Login.vue'
import Register from "@/views/Register/index";
import Main from "@/views/Main";
import store from "@/store";
import Profile from "@/views/Profile";
import Messenger from "@/views/Messenger";
import Search from "@/views/Search";
import SmsCode from "@/views/SmsCode";

const routes = [
	{
		path: '/',
		redirect: '/login',
	},
	{
		path: '/login',
		name: 'Login',
		component: Login,
	},
	{
		path: '/smscode',
		name: 'SmsCode',
		component: SmsCode,
	},
	{
		path: '/register',
		name: 'Register',
		component: Register,
	},
	{
		path: '/main',
		name: 'Main',
		component: Main,
	},
	{
		path: '/profile',
		name: 'Profile',
		component: Profile,
	},
	{
		path: '/messenger',
		name: 'Messenger',
		component: Messenger,
	},
	{
		path: '/search',
		name: 'Search',
		component: Search,
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
