import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/create-room',
      name: 'create',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CreateRoom.vue') //rename component/*.vue page when this is setup
    },
     {
       path: '/room/:code', //add room code here to the url query to call specific room details from DB etc. not sure if something has to be changed
       name: 'room',
       component: () => import('../views/Room.vue')
     }
  ]
})

export default router
