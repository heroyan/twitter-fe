import { createRouter, createWebHistory } from 'vue-router'

const constantRoutes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login')
    },
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/Home')
    }
]

const router = createRouter({
    // history: createWebHistory(),
    history: createWebHistory('/twitter/'),
    routes: constantRoutes
})

export default router