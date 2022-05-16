import { createRouter, createWebHistory } from 'vue-router'
import Home from "@/views/Home.vue"
import Login from "@/views/Login.vue"
import Logout from "@/views/Logout.vue"
import Me from "@/views/Me.vue"
import Register from "@/views/Register.vue"
import Post from "@/views/Post.vue"
import Followers from "@/views/Followers.vue"
import Followees from "@/views/Followees.vue"

const constantRoutes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/logout',
        name: 'logout',
        component: Logout
    },
    {
        path: '/register',
        name: 'register',
        component: Register
    },
    {
        path: '/post',
        name: 'post',
        component: Post
    },
    {
        path: '/followees',
        name: 'followees',
        component: Followees
    },
    {
        path: '/followers',
        name: 'followers',
        component: Followers
    },
    {
        path: '/me',
        name: 'me',
        component: Me
    }
]

const router = createRouter({
    // history: createWebHistory(),
    history: createWebHistory('/twitter/'),
    routes: constantRoutes
})

export default router